---
title: "Proxying Is Enough"
date: 2024-05-29T15:40:12-04:00
draft: false
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

From the paper for ChaCha20 : 
![ChaCha Formula](/images/zluo-6.1_corrected.png)

## Analysing the numbers on the paper

AES GCM is the most popular cryptographic algorithm used in HTTPS. 
The above formula is what is used to detemine what is the probability of being able to convince a person that certain data showed up on their browser, when it actually didn't. 

- $|S|$ is the number of allowed openings. In other words, the request and response contain some parts that can be revealed publicly. If all you make a set $S$ of all the possible values in the data that is revealed, gives you $|S|$
- $\lambda$ is the length of the string that can be revealed publicly without compromising privacy. Particularly, the set S of all possible values this string takes should be a finite set.
- $v$ is the IV size, which is a fixed constant for an encryption scheme


Plugging in the values for AES, 
- $|S| = 1 * 3600$ ; using the number of openings for the padding used in the paper. This comes from the fact that the paper assumes 63 allowed http status codes, and last 10 minutes as a valid timestamp. However, in practice, Reclaim Protocol accepts only 1 status code - 200 as a valid http status code, corresponding to "OK". We reject all other response codes. E.g. if there's a 404 status code, meaning the webpage doesn't exist - there is no point creating a proof of data that exists on the error page.
- $\lambda = 56*8$ ; for 56 bytes of padding, 8bits each; the paper uses the first two lines of the https response which contains the http status code and timestamp.
- $v$ ; IV for ChaCha20 is 12 bytes (96 bits)

[That gives us](https://www.wolframalpha.com/input?i=log_10%28%28%281*3600%29%5E2%29%2F%282%5E%288*56+-+2*96+%2B2%29%29%29) the probaility of the proof having been fradulently created to be

$10^{-70} = 0.0000000000000000000000000000000000000000000000000000000000000000000001\\%$

That is an extremely small probability, and secure enough to practically say that we can be certain that the proof generated is fully secure. To put it in perspective, this probability is so low that, if all the computers, including your mobile phone, were dedicated breaking the security of this protocol - it would take _1,000,000,000,000,000,000,000,000,000,000 (one million trillion trillion) times the age of the universe_ to actually break it!

## The Real Numbers, in production
Reclaim Protocol needs provenance of both the request and the response. The response calculation is pretty much the same as what is mentioned in the paper. 

### Padding, $\lambda$

In our implementation, we reveal the following in the request
1. HTTP version
2. Connection header
3. URL (host + path)

This is very specific to our implementation. On Reclaim Protocol, we have the users commit to the "provider" they are generating a proof for. So, they commit to the URL before executing the HTTPS Handshake. The protocol described in the paper is more generic. That is the user can prove something about any arbitrary HTTPS request they make from their browser, making the URL an unknown. If we get rid of that generalization, the known URL header can be used as _padding_.

Another small modification from the paper is that instead of revealing the first few characters as padding, we mix and match various parts of the headers to form a long enough invariant. We identify various parts of the headers that we know the values of before hand. This is possible because of the product/protocol specific assumptions made, which constrains the things a malicious user can modify in the headers. 

- Shortest status code : `GET [...] http/1.1` ; 13 characters
- Connection header : `connection: close` ; 17 characters
- Shortest possible URL : `Host: a.co` and path `/` ; 11 characters 

For ChaCha20,
![ChaCha Formula](/images/zluo-6.1_corrected.png)

So, we're looking at a minimum of 42 characters being used as padding. 
$$\lambda = 42 \text{bytes} = 336 \text{bits}$$

### Number of valid openings, $|S|$ 
|S| represents size of the set of all the values that the padding can map to.

**Http Status Code**
- HTTP version : only accepted value is `1.1`, which is the most supported version. Versions `2` and `3` are backward compatible with `1.1`

**Connection header**
- Every https connection is expected to have a `connection close` header. there are no variations for this header. So, there is exactly one valid opening for this header.

**URL**
- The url is known before hand, so there is exactly one valid opening for the URL

So, total valid openings is exactly $1$.
$$ |S| = 1 $$

### Key size
Since we use chacha20, the IV is 12 bytes or 96 bits
$$v = 96 $$

### Putting everything together
Feeding the above values in the formula, [we get probability](https://www.wolframalpha.com/input?i=log_10%282%2F2%5E%28%2814%2B17%2B5%29*8+-+2*96+%2B1%29%29) of breaking the security of Reclaim Protocol as
$$ 10^-{40} = 0.00000000000000000000000000000000000000001\text{\\%}$$ 

Again, that means if all the computers on the planet including everything from your mobile phone to all the A100 gpus used for LLM training, you would need the age of the universe to break the security. A little less security than the response, but still very secure.

Not bad. At all.

# Conclusion
The Proxying method used by Reclaim Protocol is secure for practical use, beyond any doubt -- putting an end to the debate whether or not proxying is secure enough when compared to the MPC based approaches for zk-tls. 

This is not to shit on the work being done by the teams on the MPC approach. That is valuable, and Reclaim Protocol continues to explore the frontiers of what is possible and what is more efficient - in close collaboration with teams working on alternate approaches. ZK is fast evolving. Staying on the bleeding edge is extremely critical. 

That said, it turns out **_Proxying is enough_** to take the solution to market.

