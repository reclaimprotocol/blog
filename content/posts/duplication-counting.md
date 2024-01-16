---
title: "Duplication Counting : Ensuring one proof is used only once, without doxxing the user"
date: 2024-01-16T14:19:53-08:00
math: true
---
## Introduction

For many applications, it will be critical that multiple users are not able to claim the same credential, at least without being detected. For example, suppose a user proves they own some funds in a certain bank account, and then later shares that their banking login to another user who then proves the same credential. An application that requires users t have some minimum collateral will need to be able to detect if the same bank account is being claimed multiple times. 

Furthermore, the two users may be using their duplicated credentials for different applications, but these applications may still want to know that these users’ credentials are duplicated. Note that detecting duplicate credentials is trivial if all users must post their credentials to a public chain in an unencrypted format. However, for many kinds of credentials this public chain would leak sensitive information. 

### Model

We now fix some notation. Consider a single kind of credential, where each user $i$ proves their credential using data $D_i$. We divide the (useful) parts of each $D_i$  into the triple $D_i = (d^1_i, d^2_i, d^3_i)$ where: 

- $d^1_i$  is data that users are comfortable sharing publicly.
- $d^2_i$ is data that users are comfortable sharing to specific applications, but not publicly.
- $d_i^3$ is data that users either want to keep secret, or is irrelevant for the credential in question.

For example, if the data is returned from a banking website, then $d_i^1$   could be the amount of money in the bank account, $d_i^2$ the name of the account owner, and $d_i^3$ the routing number of the account. This is because users might be comfortable with the amount of money in their account being public, as nobody can link that information to them personally. Additionally, users might be comfortable sharing their name to specific applications that need this information, but will not want to share the routing number of their account to anyone. 

Finally, we denote the set of all possible $D_i$ values as $\mathcal D$.

### Problem

We will assume that users are not required to have continued interaction with the system after they prove and share their credentials with applications. We will call this the **************************non-interactive assumption**************************. Therefore, all information about a user’s credential that will be used for future duplication counting must be saved to a public database at the time that the credential is created. So, without loss of generality we can assume that for some fixed function $H$, when a user creates a credential using data $D_i$ , they must post to a public chain the data

$$
c_i = (d_i^1 ,H(d_i^2,d_i^3))
$$

as well as the signature of the attestor. When a user shows a credential to an application, they will also have to share the true value of $d_i^2$ .

For $H$ to work as a feasible solution, it must satisfy the following two conditions:

(1)  $H$ sufficiently obscures $d_i^2$  and $d_i^3$  so that no sensitive information is leaked.

(2)  $H$ outputs enough information so that distinct credentials are not counted as duplicates. That is, if $D_i \neq D_j$ then $c_i \neq c_j$.

Later in this article, we consider relaxing the non-interactive assumption. That is, users can be asked at a future date to cooperate in a protocol to show that some new credential is not a duplicate. We discuss how *[multi-party computation](https://en.wikipedia.org/wiki/Secure_multi-party_computation)* (MPC), at least theoretically, could be used to solve the problem given this relaxation. However, since MPCs of this size are not currently practical, we otherwise will keep the non-interactive assumption.  

### Entropy

For a given $H$ function to satisfy condition (1) is the *[entropy](https://en.wikipedia.org/wiki/Entropy)* in the space of possible credentials. Informally, the entropy of this space is a measure of how much random variation there will be between credentials.

Let $\mathcal D'$ be the set of all possible $(d_i^2,d_i^3)$ values. If it is reasonably inexpensive for someone to compute the hashed value of every (likely) element of $\mathcal D'$, then they can determine the value of every (likely) credential that has been posted on the chain. Condition (1) is then violated. So, the entropy of $\mathcal D'$ is critical for the security: if it is too low relative to the computational cost of $H$ then the scheme will not be secure. Letting $T(H)$ be the average cost (in time or memory) of computing the hashed value of some input, the cost to compute the hashed value of all elements of $\mathcal D$ will be $T(H)|\mathcal D'|.$

The two ways to alleviate this problem is to either increase the entropy of $\mathcal D'$ by expanding the scope of the data that must be used to create credentials (i.e. increasing $|\mathcal D'|$), or to increase the computational cost of $H$ (i.e. increasing $T(H)$). We will further discuss both of these strategies below in the Solutions section.  

### Credential Uniqueness

Condition (2) on $H$ says that credentials that are actually unique must not be erroneously counted as being duplicates. For example, suppose users are proving credentials using data from a government website, and multiple users have proven the credential that just says ‘My government login says I am at least 18.’ These credentials do not contain enough information to positively confirm that they are not duplicates. Enough information needs to be added to the credentials so that:

- Unique credentials appear as unique
- A credential cannot be duplicated by modifying a choice of the additional information
- The additional information does not leak sensitive data

### Individual Applications

The problem becomes somewhat simpler when, for some kind of credential, each application is only concerned with detecting duplicates among the credentials that are used for it. This is because the credentials do not need to be posted to a public chain, and so users share credentials of the form $(d_i^1,d_i^2,H(d_i^3))$ to applications. Otherwise, the same two conditions still apply to $H$.

# Solutions

Recall that $\mathcal D'$ is the set of all possible $(d_i^2,d_i^3)$ values. If $\mathcal |D'|$ is sufficiently large, then we claim that setting $H$ to be any reasonable hash function with unknown inverse will satisfy condition (1). This is because it is too expensive for someone to find inverse values of $H$ through brute force. Secondly, if every user credential will have a unique $(d_i^2,d_i^3)$ values, then this choice of $H$ will also satisfy condition (2) as long as the probability of collisions of $H$ is sufficiently low.

But what if $\mathcal D'$ does not contain enough entropy, or the $(d_i^2,d_i^3)$ will not be all unique? We now explores different strategies to overcome this problem. 

### Trusted Entity or TEEs

More options become available if there is an entity that can be trusted to participate in the protocol honestly, or a [trusted execution environment](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) can be used to emulate a trusted entity. We will assume that the entity is trusted to respond honestly to certain requests, but still is not allowed to learn the private data (i.e $d_i^3$  values) of the users. 

Consider using the trusted entity in the following scheme. The entity manages a database, and when a user $i$ proves a credential, they submit the credential to the entity’s database in the form $c_i = (d_i^1,d_i^2,H(d_i^3))$, as they would in the Individual Application case discussed above. Now, when the user shows $c_i$ to an application, the application can query the trusted entity with $c_i$ and the entity will respond with the number of times $c_i$ appears in the database. See that this will achieve similar security and privacy as the Individual Applications case.

Importantly, the entity must only respond to a query from an application if the application provides evidence of knowledge of a legitimate credential. This is because if people can make arbitrary queries to the entity’s database, and the entropy of the credential space is low, then they can discover some or all of the credentials in the database by brute force querying. 

### Secondary Data Source

For some data sources it may be possible to increase the entropy of $\mathcal D'$ or the uniqueness of $(d_i^2,d_i^3)$ values by incorporating another piece of data from the source. This secondary data source will have to be found on a case-by-case basis, and must satisfy the following two conditions:

- To allow for duplication detection the secondary data must persistent and cannot be changed by the user. Otherwise, users could prove a credential using one value of the secondary data source, change the value of this data, then prove the credential again, and it would not appear as a duplicate.

- The secondary data must not be publicly available data. Otherwise, if someone wants to check what credentials are on chain through brute force searching, they can look up the secondary data for each credentials they compute the hashed value for.

Here are some examples. 

Suppose the type of credential that users are proving is ownership of an email account, where $d_i^2$  is the address of the email account and $d_i^3$ is empty. Since many email addresses have fewer than eight characters (before the domain name), there may not be enough entropy to satisfy condition (1). Depending on what data is available on the email client, the secondary data source could be the date the email account was created, for example.

Now suppose the type of credential that users are proving is that they are over 18, using data from their government login. The data fields could be that $d_i^2$  is just a Boolean value of whether the user is over 18 or not, and $d_i^3$  is the user’s birthday. Since the number of possible birthdays is low, a secondary data source is needed. Possible data that could be added that may be available on the government website is the user’s social security number, or other private identifier.  

### Memory-Expensive Hashing

To make brute force searching more difficult, a memory-expensive hash function can be chosen for $H$. One standard choice for this hash is [Argon2](https://en.wikipedia.org/wiki/Argon2), which takes as input parameters the execution time and memory required to compute each output. These parameters can be tuned to be as low as possible while still making brute force searching infeasible. 

### MPC

This last solution would be an entirely different method of duplication counting. [Multi-party computation](https://en.wikipedia.org/wiki/Secure_multi-party_computation) (MPC) allows parties to ‘jointly compute a function over their inputs while keeping those inputs private’. That is, each user has some private data, and the users perform a protocol together that outputs a function of all the private data, but no user learns the private data of any other user. 

Current MPC implementations are too computationally expensive for our purposes. Furthermore, the use of MPCs would require use to lose to non-interactive assumption we described in the Problem section. However, theoretically MPCs could be used achieve stronger privacy guarantees for users. 

Consider the following scheme. When a user proves a credential, they post the credential on chain but encrypted with their private key. The user then engages in an MPC protocol with each other user who has proven a credential previously. This protocol outputs the number of credentials that are duplicates of the new credential, as well as a ZK-proof that the output is correct.
