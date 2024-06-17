---
title: "SORBS DAO"
date: 2024-06-17T15:49:48-04:00
draft: false
---
_- Madhavan Malolan_


[SORBS shutdown](https://www.theregister.com/2024/06/07/sorbs_closed/), the crypto community should pool to buy it and keep it going. 
Potentially, expand it to be AI-ready. Let me explain.

# Sharing Blocklists
Blocklisting is a simple strategy for handling spam. If you know someone is spamming the system, rate limit them or block them completely.

If you are DDoS'ing a server, your IP gets blocked.
If you are spamming people's inboxes, your domain gets blocked.

SORBS is, or was, a domain name block list. So, if you spam the shit out of gmail users, and you are added to this list - a self hosted dovecot email server will also start blocking your emails. People share the list of misbehaving users and servers.

Similarly Google, Cloudflare and others share IP address blocklists for IP addresses known to be trying to DDoS servers.

# One way to stop spam
Get rid of bots. Elon Musk keeps talking about how X.com is trying to remove bots to reduce spam.

How do you stop bots? Simple - put in a captcha.

Captcha relies on scarcity of intelligence. Only humans posses enough intelligence to solve a captcha.
No deterministic known algorithm could reliably break the captchas. 

However, [LLMs now posses](https://www.reddit.com/r/LocalLLaMA/comments/16wwsc0/multimodalllm_could_be_dealigned_with_visual/) enough intelligence too. That means, the number of entities with intelligence to solve a captcha went from a slowly growing 7B humans to potentially trillions of AI agents with marginal costs of spinning up a new one.

So, captchas are no good.

# The one thing that continues to stay scarce
Human flesh. That's what's scarce. One way to continue to limit infinite bots from spawning is to link them to a person. A long standing solution to the bot problem is proof of personhood. But, that's not enough.

Say, X.com wants to enforce proof of personhood on users. It can probably do it multiple ways. They could use something like world id, or use a weaker but fairly acceptable form - phone number verification, assuming it is hard for non humans to get a valid phone number in most places.

Once there is a proof of personhood attached to the user - the user is allowed to use the website. Is the user a human or a bot, it is impossible to say any longer. 

# Sharing identity blocklists
Since we can't detect if a user is a bot or a human any more - we need a way to mark users as spammy users. 

You can't look at an IP address and say it's potentially a DDoS'ing server - unless they actually engage in DDoSing. You can't look at a domain name and say this domain is going to send spammy emails, unless they do.

Similarly, you can't tell if a user is a spammy user, unless they spam.

Instead of being proactive about spammy users, we'll have to be reactive.

If a user is spamming X.com, X.com should block that user's identity and publish that list publicly. 
Tomorrow, if the same user (with the same identity) tries to post on Facebook.com, they might get blocked there too - because, Facebook might import the blocklist from X.com. 

# Why not just use a Google Login as the identity
Simple. 
1. Why would you trust a centralized identity provider?
2. Why would Facebook agree to use Google Login?

# What is this identity
This identity can be a strong form like say a Government issued ID.
Generate a cryptographic proof of a Government ID - using say their passport, the tax payer ID, citizenship ID etc. 
There are many [techniques](https://reclaimprotocol.org) to generate a cryptographic attestation, without leaking PII.

However, not everyone may be comfortable with using a Government issued ID. In which case, they can create an ID and link other, but several, weaker forms of identity - like their [shopping cart, travel history etc](https://link.reclaimprotocol.org/pop). 

Irrespective of whether the user chooses a strong form or a weak form, they identify themselves with an ID. This ID maybe a DID, a Bitcoin/Ethereum/Solana wallet address, or just a simple gpg public key.
What matters is, there is an identity and exactly one human could have created that identity - without the possibility of reuse of an identity. That is, if you are proving your shopping cart purchases for a weak form identity - no other user should be able to generate another identity using the same Amazon account.

# Buy out SORBS?
Since SORBS is shutting down, can we as a community buy it and keep it running? That way, we not only keep a useful service going, but also set up the crypto solutions to be readily usable for AI problems when they arise.

I am thinking of bidding to keep SORBS running Constitution DAO style. Would be great if you could take a moment to fill up a [survey to gauge interest](https://forms.gle/sxY4k6v1BevegNkS9).