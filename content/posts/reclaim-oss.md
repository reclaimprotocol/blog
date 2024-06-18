---
title: "Opensourcing Reclaim Protocol"
date: 2024-06-18T14:13:36-04:00
draft: true
---
_- Madhavan Malolan_

tl;dr - We built a stack to make HTTPS verifiable, and open sourced it.

# What are we solving?
If I were to ask you if you've ever ordered Nike Sneakers and asked you to prove it - what would you do?
You'd probably open Amazon and show me a screenshot of the order that you had placed.

That works in informal settings when there is already some trust. If you were my friend, i'd believe the screenshot. 

However, the trust breaks at scale. Say, I was a business (and not your friend) that is willing to give you discounts on shoes if you've ever purchased a Nike Sneaker - I can't trust your screenshot anymore. There is a strong incentive for you to morph the screenshot, and there'd be no way for me to know.

Is there a way to make a screenshot tamper-proof cryptographically? Or more specifically, make the data on your screen verifiable and sharable? 

[Reclaim Protocol](https://reclaimprotocol.org) lets you generate a cryptographic proof of data exchanged over a HTTPS connection. So, a user can generate a cryptographic proof of the data they see on their browser.

## Who has this problem?
Some examples (from real customers)
- A credit card company in India wants to verify the address of the customer. Today, they send a person physically to the customer's home to verify. Instead, they are using Reclaim Protocol to ask users to submit a proof of the address at which they've ordered food for the last 3 months.
- A SME lending company wants to verify the sales merchants have made before giving out a loan. Today, they schedule a video call with screensharing and ask the merchant to open their shopify, ebay, amazon dashboards and take note of their sales. This takes a week to schedule. Using Reclaim Protocol, they just ask for a cryptographic proof of their sales.
- A food delivery company wants to poach customers from its competitor. Using Reclaim Protocol, they can ask their users to prove that they have premium subscription on the competitor and get a discount.

# Other solutions
- **OCR** - Letting people upload screenshots and extract information using OCR. However this is extremely susceptible to fraudulent screenshots being uploaded. Detecting edits on an image is extremely hard.

- **Storing username and password** - Plaid stored username passwords for a long time and logged into the bank on behalf of the user, read the data and sent that data to the third party app. This is obviously not good because such services become a honeypot for hackers.

- **The new Plaid** - However, Plaid doesn't need to store username password in the plain, because they have access to OAuth APIs from Banks. So, users can give or revoke permissions to Plaid to read their data from the bank. This works for bank account related information, but doesn't work for other sources of information - like Amazon, Netflix, Youtube etc. 

- **Physical Notary** - All that this does is delegates the process of verifying correctness of a document to a third party who is bound legally to not lie. It has obvious limitations because of the physical nature of such notaries, and reliance on human perception and judgement in evaluation of the documents being notarized.

# Key Insights
HTTPS is end to end encrypted using [PKI](https://en.wikipedia.org/wiki/Public_key_infrastructure). However, HTTPS uses symmetric keys. Symmetric keys provide security (in that data cannot be read by an third party), but it doesn't provide any guarantees on the authenticity (it is impossible to know who is the sender).

- If data has been encrypted on a HTTPS connection, we can be certain it has been encrypted either by the website or by the client
- If we add an extra bit of information - which direction did the data move - we will know who is the sender
- If we know the direction of data movement, and that it was decrypted correctly, we can get strong guarantees of authenticity of information

## Proxying
When the user is using a client to open a website, all the data needs to be routed through a HTTPS Proxy. This Proxy is forwarding all the requests and responses as is. It stores whether the blurb of data transferred was a request or a response (1 bit). Note, the Proxy cannot read the data itself because it is encrypted end to end. The security is guaranteed by TLS (and therby HTTPS).

## Selective Disclosure
Once the response has been received and the direction bit has been recorded, the next step is to prove correct decryption. 
Some parts of the request and response that are publicly known before hand are revealed. 

On the response the HTTP response code e.g. `HTTP/1.1 200 OK` and the `Date: ` headers are revealed. For the sake of this Protocol, we treat these two fields as not leaking any useful information. 

On the request the Domain, Path and Connection headers are revealed. Again, we assume these to be not leaking information. Some `Path`s have sensitive information embedded in them. We reject such URLs - we cannot apply Reclaim Protocol to such webpages. 

## Zero Knowledge Proofs
The selective disclosures use [zero knowledge proofs](https://en.wikipedia.org/wiki/Zero-knowledge_proof). This zero knowledge proof takes the encrypted request/repsonse as the public input and decryption key as the private input. It then decrypts the data inside the zk-circuit and returns the public headers.

This output along with the zero knowledge proof is proof enough that the encrypted data contain the said headers and the client owns a decryption key that decrypts this encrypted data. It doesn't reveal the decryption key or any other part of the data.

## Proving information
The last step is to extract information from the page. In addition to revealing the public headers, the zk-circuit also accepts a regular expression as a public input. The zk-circuit spits out the regex matches too.

All in all, the zk-circuit proves that the client owns the decryption key that decrypts the encrypted data in such a way that the public headers are correct as expected and contains data as matched by the regex.

You can find the informal overview of the cryptographic security [here](https://blog.reclaimprotocol.org/posts/proxying-is-enough/), or a formal paper (eprint) [here](https://eprint.iacr.org/2024/733.pdf). 

# Attack vectors
## Fake Key Reveal
One way to break the security is to attempt a fake key reveal. Once the client receives the encrypted data, the zk proof is created on the client itself. The zk proof just proves that the client has _some_ key `K1` that decrypts the encrypted data that was seen by the Proxy. However, it doesn't prove that it was the same key that was used by the client and website during that transfer. 

So, technically speaking, the client can receive information using key `K1` and when generating the zk-proof, it could use key `K2` as the private input and no one would know. 

To mitigate this problem we reveal certain public headers. The intuition being, if the known headers are decrypted exactly as they should, it is extremely unlikely - and practically impossible for the client to create a new key `K2` such that the decryption of the headers remains exactly intact.

You can see the [formal analysis of the security here](https://blog.reclaimprotocol.org/posts/proxying-is-enough/#the-real-numbers-in-production).

## Bribing
The website and the client share a symmetric key. So, technically the client can calculate the key that is being used by the website to encrypt the data. That means, the client can encrypt the data. It would be impossible to know if the client has encrypted the data or the website. The security comes from the fact that the Proxy is recording the direction of motion of encrypted data. 

This is good enough in the honest setting. However, if the client bribes the Proxy to record a fraudulent encrypted data blurb as having come from the website. If the Proxy accepts this bribe and stores the encrypted data and direction bit as the client demands, the security of the entire proof is compromised. 

To mitigate this problem, Reclaim Protocol uses decentralization. There are N Proxies available. When a client wants to generate a proof, it must record its request onchain. Using the request itself as a seed, a pseudorandom subset of K Proxies are selected. The entire process of proof generation is executed K times. Even if one Proxy accepts a bribe, the other Proxies will have a different record. Only if majority of the K Proxies arrive at a consensus, is when the proof is accepted. The Proxies join the network by staking some money. That money gets slashed if they are caught misbehaving.

That then leads to the question, what happens if multiple Proxies are corrupted? In such cases the protocol allows for an appeal process. When there is either a lack of consensus or if there is a whistleblower, a different set of K Proxies is selected. These Proxies have a higher stake and slashed more if they misbehave. This escalation can happen indefinite number of times. 

This is ofcourse a very high level description. For more details you can check out our [whitepaper here](https://link.reclaimprotocol.org/whitepaper-draft)

The variables in the protocol are set such that the expected cost of bribing Proxies to successfully create a proof that should not have been possible to create is $1M.

## DNS Poisoning
The Proxy has to forward requests to the right website. The request is sent to the website's server as identified by the `Domain:` header in the request. The `Domain:` header is public and revealed by the client when requesting to generate a proof and stored on the blockchain. 

The Proxy must look up that domain on a DNS and forward the requets to that ip address. The DNS would be set in the Proxy's configuration `/etc/resolv.conf` to something like `8.8.8.8`. However, a sophisticated attack known as [ARP Poisoning](https://en.wikipedia.org/wiki/ARP_spoofing) exists in which an attacker is able to trick the Proxy to believe that a server they control is 8.8.8.8 instead of the the actual google DNS with that ip address.

For doing this attack, the attacker needs to be on the same network as the Proxy. We _do not_ have a mitigation for this attack. Rather, we consider this an extremely infeasible attack and likely to cost more than $1M to conduct - that is because, this attacker needs to probably bribe the datacenters at which the Proxies are physically located to let them host their attacking machine. If a Proxy is at an AWS datacenter, the server is already protected by physical security and VPCs. 

If this attack is going to cost more than a million dollars to execute, one might as well just bribe the proxies credibly instead!

In any case, this doesn't change the higher bound of economic security of the proofs from $1M.



# Implementation
All of the code is open sourced under an AGPL License.
If your code is open sourced, you can modify and use any of the modules of Reclaim Protocol's stack as you wish.
If your code is closed source , you will need to obtain a license from the Reclaim Protocol Foundation.

There are some key components to the Reclaim Protocol stack. The list below explains each's function.

## TLS
The fundamental piece is writing the TLS library from scratch. This is basically the implementation of TLS in javascript. 
You can see the entire [source code here](https://gitlab.reclaimprotocol.org/reclaim/tls)

## Witness SDK aka Attestor SDK
This is the module that does the verification of the correctness of the request and the response. As mentioned above, the request should contain the right request headers and the right response headers. 

You can see the [source code here](https://gitlab.reclaimprotocol.org/reclaim-clients/witness-sdk/)
This module is imported by both the Client and the Proxy. 

### Request verification
This sdk adds the right headers to the request
```
		const httpReqHeaderStr = [
			reqLine,
			`Host: ${getHostHeaderString(url)}`,
			`Content-Length: ${contentLength}`,
			'Connection: close',
			//no compression
			'Accept-Encoding: identity',
			...buildHeaders(pubHeaders),
			...secHeadersList,
			'\r\n',
		].join('\r\n')

```

The headers such as `Content-Length`, `Connection`, `Accept-Encoding` are static values. So, later when decrypting the request the client must be able to decrypt the request such that these requests are decrypted as is. Additionally, the `Host` and `Path` are also revealed so that we can be sure where the request is to be sent. 

Revealing the Host and Path makes it possible for us to verify that certain information came from amazon.com and not a-fake-amazon.com.

### Response verification
The response verification is a little different. Because we cannot force the website to add certain headers, we need to rely on what the website sends in typical use.

```
const OK_HTTP_HEADER = 'HTTP/1.1 200'

const dateHeaderRegex = '[dD]ate: ((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (?:[0-3][0-9]) (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (?:[0-9]{4}) (?:[01][0-9]|2[0-3])(?::[0-5][0-9]){2} GMT)'
const dateDiff = 1000 * 60 * 5 // allow 5-min difference

```

We check for the first two lines of the response.
The first line is the HTTP header. We accept only a 200. Anything else, we just fail the proof generation. So the reponse must contain this string in its decryption.
Additionally, the second line should be a timestamp `Date: ` header. This is the header that's sent by almost all websites. This header is usually used to cache responses. 
We require that this Date field exists and the value is within the last five minutes. Restricting it to last five mintues restricts the allowed values the header can decrypt into. Lower the number of allowed decryption values, [higher the security of the proof](https://blog.reclaimprotocol.org/posts/proxying-is-enough/#what-does-it-mean-to-be-secure).

## ZK Circuit
The ZK Circuit is invoked by the Client, via the witness sdk.
The ZK Circuit is capable of decrypting AES-GCM and ChaCha20 ciphers. It cannot decrypt AES-CBC. 
The circuit when compiled has 36K constraints. This is a relatively small zk circuit and should be good enough for execution on low compute devices like low to mid range mobile phones. 
This circuit has been audited by [ZKSecurity](https://zksecurity.xyz)

This is a Groth16 proof. This proof is extremely small and can be verified in any language. It is small enough to be verified on a blockchain too.

## Proxy aka Node aka Attestor aka Witness ...
The Proxy is responsible for sending the request to the right server, forward the response to the client and store for each data block transferred store the direction of motion of that data. The Proxy converts data from a scalar to a vector. 

Along with storing this information, it also provides a signature - signing the encrypted data and the direction bit.
This signature helps verify the proof even if the Proxy is offline to provide the direction bit for a certain encrypted data

An efficiency hack is that the Proxy also may optionally provide a signature for verification of the zk-proof. That is, the client generates a zk-proof and sends it to the Proxy. The Proxy checks 
1. is the zk-proof not corrupt
2. the expected headers are present in the output of the zk-proof
3. the correct encrypted data was used as public input of the zk-proof

This allows the verifier of the proof only to verify a simple signature, instead of verifying the zk-proof. This is particularly helpful when the proofs are to be verified on a blockchain with limited compute. However, the verifier may choose to not trust the Proxy's second signature and verify the zk-proof from scratch itself.

You can see the [source code here](https://gitlab.reclaimprotocol.org/reclaim/tls-receipt-verifier/-/tree/main/node?ref_type=heads);

## SDKs
The SDKs have two purposes
1. Initiating proof generation
2. Verifying the generated proof

These proofs can be generated and verified in any programming language, on any platform. However, we provide certain libraries to do it efficiently and by abstracting away the intricacies. 

### Initiating
Reclaim Protocol can be used on a block chain and outside. At the time of this writing most of the customers of Reclaim Protocol have nothing to do with a blockchain. The offchain SDKs abstract away all the implementation details, including but not limited to generating the request, putting the request on a blockchain, executing the https requests via the proxy, generating the zk-proof.

Once the proof is generated, these SDKs also upload the proof to a backend as configured in the init function.
#### Inapp SDKs
The simplest and the recommended way to integrate Reclaim Protocol is using the Inapp SDK. This SDK packages everything the client needs to do in one easy to use SDK. 
This SDK also features a Webview with some customizations. This Webview is responsible for displaying data to the user as what a regular browser would, and at the same time route requests via the Proxy for generating proofs. The SDK also does several optimizations, but most importantly filters out requests that don't need a proof to be generated. Exactly one URL needs to be Proxied. 

This SDK is currently available for [flutter](https://comingsoon.com). React Native, Kotlin and Swift will follow. Some of these are already in development. [Do reach out](https://t.me/madhavanmalolan) if you are blocked on this. We can try to expedite.

This is the only SDK that needs to be licensed if being used in a closed source software. The last thing we want is for someone to use our SDK, and modify it to extract the user's private information.

#### Helper SDKs
Inapp SDKs add a little bit of bloat to the app (~30MB). Additionally, these inapp sdks can only be used by, well, apps. There are various websites that want to request proofs from their users. For such cases, we have a js-sdk. This js-sdk renders either a button or a qr code - depending on if user is on mobile or desktop. When the user taps on generate proof on the website (or scans a QR code using their phone's camera), their phone would open an Instant App on Android or Appclip on iOS.

Instant App and Appclips are miniapps supported by Android and iOS that don't need any installation from the appstore. When the user is trying to create a proof, they are directly taken to the proof generation flow without having to install anything. 

This is the recommended SDK if you are trying to integrate Reclaim Protocol on a website.
You can [try it out here](https://demo.reclaimprotocol.org).

### Verifying
Once the proof is uploaded to the backend, it needs to be verified to make sure that it hasn't been tampered with, and is actually correct.
#### Backend
The node-sdk allows you to verify the proofs uploaded on any node-js backend. 
Supporting Go and Python is planned.

You can see the source code here and usage here.

#### Blockchain
The proofs can also be verified on-chain. Similar to the backend sdk, the proof can be verified on-chain for not having been tampered and correctness. 
Blockchain verification is available on all major blockchains including but not limited to Ethereum, EVM L2s, Solana, Cosmos, Polkadot.

# Licensing
All except the in-app sdk is under a permissive AGPL license. The in-app SDK is under an AGPL with an additional clause. 

If you are integrating Reclaim Protocol in your AGPL open sourced project, you have no additional work to do.
If you are integrating in a closed source project, you will need to receive a License from the Foundation. You will additionally need a security Audit from a firm approved by the Foundation. There is a small usage fee involved. All the fees go to the Foundation. 


[Just reach out to me](https://t.me/madhavanmalolan), and I will point you in the right direction. We will keep it simple, I promise.

