---
title: "Proxying Is Enough"
date: 2024-05-29T15:40:12-04:00
draft: true
math: true
---
_\- Madhavan Malolan_

Recently Z. Luo et al released a paper titled ["Proxying is Enough: Security of Proxying in TLS Oracles and AEAD Context
Unforgeability"](https://eprint.iacr.org/2024/733.pdf) [(Hash)](https://etherscan.io/tx/0xa0c1f3d7a641a065688e148890a77f360b198e01e49aa28352e856682c4c12c9), where they discuss security of TLS Oracles.

From the paper,"_TLS oracles allow a TLS client to offer selective data provenance to an external (oracle) node such that the oracle node is ensured that the data is indeed coming from a pre-defined TLS server._"

In other words, A TLS Oracle proves what data the user saw when they opened a website on their browser. Browsers use HTTPS to transfer data between your device and the webserver. TLS is the security protocol used by HTTPS.

# Deco formalized security of MPC based TLS Oracles
The first construction for using https to generate zk proofs of what data was transferred between a user and a website was proposed by F. Zhang et al in their paper ["DECO: Liberating Web Data Using Decentralized Oracles for TLS"](https://arxiv.org/pdf/1909.00938). 

The key contribution was that they showed how they could use [MPC](https://en.wikipedia.org/wiki/Secure_multi-party_computation) to introduce an additional stakeholder in the [TLS handshake](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/), which can then be used to zk-proofs of data that was sent by the website. Optionally using selective reveals. Details of this are irrelevant for this post. All you need to know is Deco introduced an MPC based solution.

Along with this result, they also showed formally that this approach is secure.

# TLS Notary made practicality inroads
Deco, the paper, was released in 2019. As of 2024, there isn't an efficient implementation of the described protocol as is. However, [TLS Notary](https://tlsnotary.org/), an open sourced project implemented a similar construct using [Garbled Circuits](https://en.wikipedia.org/wiki/Garbled_circuit). 

TLS Notary is a project that one can clone and run on a consumer laptop. However, as of this writing, the data that had to be sent to-and-fro to establish an MPC using Garbled circuit ran into hundreds of MBs -- making it infeasible for mass adoption. 

But TLS Notary showed that it is possible to implement a garbled circuit based mpc three party tls handshake.

# Optimizing TLS Notary
There have been several attempts to optimize the TLS Notary approach to make it viable in the wild. Particularly on mobile devices with low compute, memory and network bandwidth. Opacity, ZKPass, Pado Labs are notable projects exploring this option.

# An alternate model - Proxying
TLS and thereby HTTPS are secured using symmetric keys. These keys don't help us know who encrypted the data -- the website or the user? Did the user send some data to themselves and are now claiming that this data came from the server? It's impossible to verify. To make HTTPS data verifiable, one must introduce a third party to witness certain aspects of the HTTPS session lifecycle. 

MPC based approaches introduce a witness at the tls handshake stage of the lifecycle. An alternate model is a Proxying model where you introduce the witness at the data transfer stage. All that the proxy does is, it witnesses the encrypted data that was tranferred from the user to the website and back. Basically, the request and the response in encrypted form, and provides an attestation to the `(encrypted-request, encrypted-response)` tuple.

This attested tuple can be fed to a zk circuit to selectively reveal some data from the response. Thereby producing the same output as what a TLS Notary would. _"The response R contains string S, and R was indeed received from website W in response to a user request Q"_.

This proxy based approach is much more efficient because it needs no change on the client browser because, browsers are already capable of using proxies. Additionally, doesn't need any heavy computation for establishing an MPC based TLS handshake.

Reclaim has been using the Proxy based approach, primarily because of feasibility of productizing.

# Is it secure?
Deco provided a formal security analyisis of the MPC approach. Whereas, there weren't any formal proofs for the security of the Proxy based model. 

This led to a wide spread understanding that the MPC approach is more secure than the Proxy model.

At Reclaim, we knew that the Proxy model is secure -- not using formal proofs, but through engineering observations. We also had internal and [external security audits in place](https://blog.reclaimprotocol.org/posts/audits/). But again, these are analysis from an engineering standpoint.

Z Luo et al, for the first time presented a formal analysis of the security of the Proxy based approach and concluded that _Proxying is secure enough_.

# What does it mean to be secure?

From Z Luo et al, theorem 6.1 the security is defined as the probability that someone tricked the protocol in generating a valid proof when it should have actually failed. 

That is, if someone gives you a proof generated using Reclaim Protocol or any other proxying based TLS Oracle where the proxy is an honest operator - what is the probablity that the proof is a fraud?

From the paper : 
![theorem 6.1](/images/zluo-6.1.png)

## Using AES-GCM looks very secure
AES GCM is the most popular cryptographic algorithm used in HTTPS. 
Plugging in the values for AES, 
- $|S| = 63 * 3600$ ; using the padding used in the paper. Note this not the actual padding used by Reclaim Protocol as we will soon see.
- $\lambda = 56*8$ ; for 56 bytes of padding, 8bits each
- $l=128$ ; block size for AESGCM is 128 bits

[That gives us](https://www.wolframalpha.com/input?i=log_10%28%2863*3600%29%5E2%2F%282%5E%288*56+-+2*128+%2B2%29%29%29) the probaility of the proof having been fradulently created to be

$0.0000000000000000000000000000000000000000000001$ %

That is an extremely small probability, and secure enough to practically say that we can be certain that the proof generated is fully secure. 

## Using ChaCha20 looks ...
AESGCM is the most popular, but it isn't zk friendly. Writing zk circuits for AESGCM can be very inefficient. So, Reclaim Protocol uses ChaCha20 instead. ChaCha20 is the second most popular cryptographic algorithm in HTTPS. [99%](https://www.f5.com/labs/articles/threat-intelligence/the-2021-tls-telemetry-report) of all the websites support ChaCha20. It is a requirement for every website to support ChaCha20 in TLS1.3 onwards.

Ok, so let's plug in those numbers
- $|S| = 63 * 3600$ ; stays the same
- $\lambda = 56*8$ ; stays the same
- $l=512$ ; block size for ChaCha20 is 512 bits

[That gives us](https://www.wolframalpha.com/input?i=log_10%28%2863*3600%29%5E2%2F%282%5E%288*56+-+2*512+%2B2%29%29%29) ... something wrong.

The formula tells us that the probability that the proof you are looking at is $10^{185}$% a fraud. That doesn't make sense.
1. Probability can't be greater than 100%, leave alone 1 followed by 185 zeros percent. 
2. This means, if you use ChaCha20, you can be (beyond) certain that the user has cheated, even when we know that the user is honest. That doesn't feel natural, does it?

## We reached out to Z Luo
When running our numbers on our actual production parameters, we realized there seems to be an issue - as we saw above. We reached out to Z Luo, who was very receptive and offered to dive deeper. 

![zluo discord](/images/zluo-discord.png)

## The updated formula
Coming soon ...

## The Real Numbers, in production
Coming soon ...





