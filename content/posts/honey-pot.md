---
title: "Honeypot Mechanism for additional protocol security"
date: 2024-01-16T13:54:06-08:00
draft: False
---
To discourage attestors from certifying false claims, we want to make this dishonest behavior as financially risky as possible. While the [Reporting Mechanism](https://www.notion.so/Reporting-Mechanism-51306b54f4b94a4cba81090f7461acca?pvs=21) already provides some such financial risk, even more risk can be added through the Honeypot Mechanism. This mechanism which allows users to prepare trap claims, and attestors who accept a bribe to certify a trap claim will get caught in the trap. Trapped attestors are then charged a penalty, and the penalty is given to the user who trapped them as a reward.

![Honey Pot](/images/honey-pot-1.jpg)

Here is how the Honeypot mechanism works. For reasons that will be clear shortly, at any time users are allowed to submit a **************************cryptographic commitment************************** of an **************encryption key************** to the blockchain. A cryptographic commitment is a way someone can hide some secret information, but they are able to reveal the true value of the information at any future time. It’s like putting something in a locked box and leaving the box in a public space, and you can later unlock the box and show everyone what was in it. The important part is that everyone will know that the contents of the box could not have been tampered with between it being locked and unlocked. 

 

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a286e6c7-2514-47c8-a776-44b02bb2aa86/a004f6f6-cda0-47a2-b50a-0f6db5650458/Untitled.png)

The encryption keys that users can commit to will serve to set up traps that can later be sprung on dishonest attestors. 

Now, suppose a user has certified a false claim by bribing the attestors. The user can then issue what we call a *********challenge********* to the attestors. When an attestor is challenged, they must provide:

1. The encrypted data $D$ that was used for the claim (if the attestor was being honest, this is the data that was returned by the website.)
2. The ZK-proof that the user created and shared with the attestor

(As a technical aside, for the Honeypot mechanism to work we need to add an additional step to the main Reclaim protocol where the user must sign $D$ and send this signature to the attestor, to demonstrate that they signed off on the data appearing authentic. The purpose of this will be clear later.)

Once the attestor has provided this information, it can be verified that the encrypted data and the ZK-proof indeed show that the claim is true. 

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a286e6c7-2514-47c8-a776-44b02bb2aa86/00440360-e216-4d74-84fc-138c82ef2a67/Untitled.png)

If the verification does not work, or if the attestor does not provide the information within some given time frame, then the attestor is marked as *******trapped*******. When an attestor is trapped, they are charged a set penalty which is taken from their staked funds. 

On the other hand, suppose the attestor does provide the information in time and that the verification works. Then, the user has an opportunity to reveal an encryption key $k$ that they had previously committed to. It can then be verified whether this key properly decrypts the encrypted data $D$ that the attestor provided. 

If $k$ does properly decrypt $D$, then some dishonesty must be afoot! This is because there is no way the user could have predicted in advance what the encryption key for the data would be, since this key is decided during the TLS handshake between the user and the website. In other words, the user locked away $k$ at some point in the past, but the actual encryption key for the data returned by the website would have been created at some future time. 

So what must have happened? Well, the only explanation is that the user had created some false encrypted data, sent it to the attestor, and got the attestor to sign off on the claim using the false data instead. Because the user got to create this false data themselves, they could encrypt it using the key $k$ they had committed to. Therefore, the attestor must have been dishonest, so the attestor is marked as trapped.

To summarize what we’ve covered so far, when a user tries to bribe an attestor to sign off on a false claim using fake data that the user supplies, the attestor will have to worry that they are being setup in a trap. 

---

But what if an attestor is smart and says to the user: sure I’ll sign off on your false claim, but only if you let me encrypt the fake data using a key of my own choosing, so I can be sure that I’m not being trapped. How can this strategy be stopped?

We can use the same strategy and let attestors trap users! After a claim has been certified, any attestor for the claim can issue a challenge to the user. When an attestor challenges the user, no input is required from the user, but the attestor must provide:

1. The encrypted data $D$ that was used for the claim (and which was signed by the user)
2. An encryption key $k'$ 

It can then be verified that $k'$ properly decrypts $D$, and if this is true, then the user is marked as trapped. Why? Because during the normal, honest operation of the Reclaim protocol, the attestor is not able to learn the value of the encryption key for the data returned by the website. The only way the attestor could know the key is if they themselves had encrypted some fake data, and we know the user agreed to this happening because the user had signed this data knowing it was fake. (They would know it’s fake because they know the real encryption key resulting from the TLS handshake, and can verify that this key does not work for the fake data.)     

Summarizing everything together, suppose a user wants to bribe some attestors to certify a false claim, and the attestors are willing to accept the bribe for this. However, they now have a problem: 

1. If the user creates the fake data using a secret key of their own, then the attestors will worry that the user had already posted a commitment to this key to the blockchain, and they are being set up for a trap. 
2. If the the fake data is made using a key that is not kept secret from the attestors, then the user will worry that any attestor can trap them after the claim is certified. 

So, there is no way (we know of) for both the user and the attestors to trust that they are not being trapped, which creates a disincentive for dishonest behavior. 

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a286e6c7-2514-47c8-a776-44b02bb2aa86/c039c6c3-c41d-4761-b3ff-56adfe265180/Untitled.png)

While people may try to come up with clever new ways to avoid getting trapped, the financial reward for catching others in traps will incentivize people to come up with clever new ways to trap! And critically, anyone behaving honestly will have nothing to worry about.
