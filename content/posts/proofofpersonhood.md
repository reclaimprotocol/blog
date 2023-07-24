---
title: "Proof of Personhood"
date: 2023-07-24T22:31:37Z
draft: false
---

Vitalik published a comprehensive study and opinions on Proof of Personhood [here](). Though I agree with most of the article, there are a few more points I'd like to add. 

# Proof of personhood and Sybil resistance
Proof of Personhood is a subset of Sybil resistance schemes. A common mistake is to collate the two. From wikipedia - "A Sybil attack is a type of attack on a computer network service in which an attacker subverts the service's reputation system by creating a large number of pseudonymous identities and uses them to gain a disproportionately large influence." The error many make is to say if a user controls more than one identity, is a Sybil attack. The key phrase "large number of pseudonymous identities" is oft missed. Is two a large number? In some cases yes, in some not. The solutions in both the cases will make different tradeoffs. 

In some cases it is enough to prove that there is a human behind an account. Think captchas. If a user is trying to enter a discord server it is enough to prove that the user is a human and that they have the requisite credentials to join the server. In such cases it is fairly acceptable if the user joins a chat server with multiple identities as long as there are no bots that are let in. There may not even be a direct incentive for the user to create multiple idenitities in the same chat server. However, there is an incentive for the user to vote using multiple identities if there is one person one vote. By making a large number of identities, a single hacker can sway the decision of a democratic process.

# Sufficient but not necessary
Many times you want to know a specific credential about a person. For example, only people who have more than 100 commits this year are allowed to join a DAO. You don't need the user to prove their human-ID for this. Common proof of personhood approach for this is to prove you are a person and also prove that you have made 100 commits. The former is moot, when you can delgegate the Sybil resistance to the source of the information. That is, Github already has Sybil resistance (aka bot protection) built in. So, if a username has 100 commits - this DAO needs to validate the number of commits and nullify the username so that the same username cannot be used to enter the DAO again. The Sybil resistance can be inherited from external trusted sources. The degree of importance of the decisions made by this DAO is likely capped by the degree of trust you're willing to place on the quality of the source of information, albeit centralized. You might not trust this DAO with the red button to launch a nuclear missile - because a powerful government will arm twist Github to create fake profiles with 100 commits and Sybil attack the DAO. However, you can trust the DAO with decisions like what testcases should pass, what PRs get merged or any other developer facing decision.

If we had a _perfect_ proof of personhood system, we could trust the DAO with infinitely important decisions. But, for a wide range of applications we needn't wait for the _perfect_ solution - if such exists.

# Cost of bot attacks
We don't need a system where the cost to create a second identity is infinite. We need one where the cost to create an n'th identity increases exponentially. It might be possible, and favorable, to allow multiple identities to be created by the same person. As long as creating more than, say, ten identities is prohibitively expensive - it will still unlock a large number of usecases. We can be sure that the system allows for humans to have between one to ten identities. Again, community participation like in a discord server - it is acceptable to have 10 users with the same human behind it. There's no direct incentive for the human to participate with different identities except to stay pseudonymous. 

# Proof of Credentials
For me, proof of credentials - the super set of proof of personhood - is way more interesting.
It is not the fact that the user is a human that is interesting, but it is about what they've accomplished. Being born, is just one of those accomplishments. 
If we have provable credentials that a user can present, it opens a new design space. Proof of Credentials makes identities fungible. Fungible identities are identities that are indistinguishable from one another. That is, a user who is a Google employee and has 100 commits to the Ethereum repository is indistinguishable from another Google employee with 100 commits. If we were to setup a DAO with these two gating criteria, there is no way to allow one and deny the other. It is impossible to tell one apart from the other. Fungible identities allow for many interesting downstream effects. 
## Freedom from Discrimiation
Having fungible identities that don't reveal one's race, religion, age, sex etc. is a super power. One shouldn't have to reveal their official name to prove that they're a Google employee.

## Staking Identities
When people have multiple identities, they can stake identities to commit to honest or good behaviour. Imagine a social network where the users can join communities based on their credentials and stay pseudonymous but if they violate the rules provably, their identity is revealed. 

## Meritocracy
All DAOs today are based on Democracy. But having the tools to know the credentials of the user in real time in a provable fashion allows for communities to tend their decision making in favour of meritocracy. Where users with the right credentials have a stronger voice in decision making. In such a decision making system, say a DAO, it is acceptable to have billions of bots part of the DAO but with no decision making power. Can we do better than a mere one person one vote system? 

# Government is bad is a Lazy argument
There are three decisions in designing a proof of personhood
1. Integrity - the data collected is resistant to tampering, doesn't have any back doors today or in future. Worldcoin falls short on this dimension. Governments can also generate multiple fake identities - however, in my view, the cost to get the Government to collude is far greater than a private organization.
2. Privacy - the collectors of the data shouldn't be able to doxx the user or share the data without their permission. Proof of Humanity and Bright ID fall short here  - there always exists a set of people who know the real identity of the user.
3. Decentralization - a system that has zero trust assumptions allows the system to be driven by aligning incentives for honest behaviour such that it is possible to fork the protocol should the users detect dishonest behaviour.

The error that most solutions are making is that they're not separating the concerns correctly. All these properties needn't be achieved by the same layer of the stack. Solutions can augment each other. We should strive to build solutions standing on the shoulders of giants.

## Adhaar in India
Adhaar in India was a massive effort to get everyone an ID. It has taken over 10 years to get to 90% coverage. I've seen the monumental task it was to setup booths that were accessible to everyone. The mainstream media has been blasting the importance of Adhaar card every evening. NGOs setup camps to help the illiterate to sign up too. The second closest system that has reached the remote parts of India is PayTM, a digital payments app. In its 13 year famed history, it has managed to get only 20% of Indians onboard.

I think World Coin and other biometric based proof of personhood systems are underestimating the cost and effort needed to onboard 8 billion users using a physical go-to-market.

## Separation of concerns
When a Government is already maintaining a fairly trustworthy registry of users, why not build on top? 
Agreed, Adhaar isn't private. Infact there have been recorded leaks of personal information - but that doesn't stop us from inheriting the trustworthiness of the data collected. The privacy and decentralization can be a layer on top of this trustworthy data. We already have tools like ZKPs and MPC to achieve this end. 

Not only the government, but many centralized systems already have the data we seek. Github has the information of who committed how much, twitter has information on who said what when. This information can be aggregated using zkproofs - such that the centralized source of trusted data can't leak information to downstream applications that have been built using these credentials.

We already have companies and governments who already know a lot about users. It is lazy to dismiss them as "not web3". It is inefficient to build the entire stack ground up all over again.


