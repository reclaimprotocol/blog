---
title: "Progressive KYC"
date: 2024-01-09T19:10:15-08:00
draft: false
---

KYC is a loaded term. Depending on your business, jurisdiction and usecase, you'd have different KYC requirements. Reclaim Protocol works with various customers across the spectrum. In this post, I'll walk you through some of our customers and how they think about KYC - incase, some of it is suitable to you.

Additionally, a few businesses where KYC requirements are unclear or uncertain - like crypto - we see customers taking the approach of progressive KYC. That is, imposing different degrees of KYC requirements on the user proportional to risk determined from their data.

## National IDs and Bank Accounts as proof of compliance
In some usecases, all that the business needs to know is that the user is not from a sanctioned country. The first line of defence for such compliance is IP Blocklisting. Many users also use VPNs and Onion Routing which makes it hard to determine the origin IP of the user. Though there are sofisticated solutions for IP origin detection, it has hard limits. To enforce KYC requirements and to ensure that the user is not from a sanctioned country - especially when the user is classified as high risk - some of our customers ask the user to prove their citizenship or country of residence. A business in India, uses proof of Aadhaar card ownership. A business in the US requires the user to have an IRS account. When a National ID is not available, some customers are exploring using presence of bank accounts in a certain country as a close proxy.

## Secondary KYC
Many businesses don't want to take on the burden of KYC'ing their customers. There are many incumbents who have already setup processes to KYC their own users. In some cases, regulation may allow users to use secondary KYC. That is, as long as a business can confirm that the user has completed KYC on an incumbent's website, the same KYC can be reused. This seems to be a popular solution in the Crypto ecosystem. Notably, Coinbase [published a way](https://blockworks.co/news/coinbase-identity-verification-kyc) to verify that a user has completed KYC on Coinbase. 

For many other websites, including Coinbase's competitors, there doesn't seem to be a way to prove that the KYC has been completed. In such cases, our customers are using Reclaim Protocol to prove that the user has completed KYC on services like OKX, Synapse and a whole bunch of KYC'd products.

## KYC in Crypto
Regulation in general and KYC regulation in particular has been confusing in Crypto. There seems to be various touchpoints at which KYC could be required.
### UI Layer using KYC Pixel
Uniswap works with risk assesment companies like [TRM Labs](https://blog.uniswap.org/trm) to determine whether the user is from a sanctioned country, is present on a sanctioned list or is a high risk customer. The Uniswap.org webapp blocks certain customers at the UI level. Uniswap, the company, is behind the Uniswap Webapp. However, there is no clear business owner of Uniswap the smart contract. 

KYC Pixel is one such solution. This is a pixel that can be embedded on any html page, similar to [Meta Pixel](https://www.facebook.com/business/tools/meta-pixel). This pixel collects information about the user such as IP address, Wallet Address, VPN usage etc to determine a risk score. A business can configure the requirements of KYC basis the degree of risk. If the IP is from a suspicious location or is determined to be using a VPN that routes data from snactioned countries, the pixel could prompt the user to provide proof of residence using a National ID or a live Bank account. 

KYC Pixel is available in a closed beta today. Contact [Abhilash](https://t.me/abhilashi) to learn more.

### RPC Layer using Reclaim RPC
Reclaim RPC is a solution available to enforce KYC at the RPC layer instead of the frontend. Some of our customers use Reclaim RPC to not have to worry about processing transactions from a high risk customer. This RPC neither forwards nor indexes transactions that originate from a high risk customer wallet address. When a high risk customer initiates a transaction via this RPC, the RPC errors out asking the user to submit Secondary KYC before retrying. 

Using this RPC is the quickest way for a dapp to enforce KYC without making any other changes to their codebase. However, Reclaim RPC and KYC Pixel both can be bypassed by interacting directly with the smart contract. Both of these solutions are light weight solutions that are most relevant in situations where the underlying smart contract is sufficiently decentralized. 

### Smart contract checks
The other solution available to developers is the Reclaim Onchain SDKs - available for [EVM](github.com/reclaimprotocol/solidity-sdk), [Solana](github.com/reclaimprotocol/solana-sdk), [Polkadot](github.com/reclaimprotocol/dot-sdk) and [Cosmos](github.com/reclaimprotocol/cosmos-sdk). These onchain SDKs and libraries can be used to require proofs of Secondary KYC to be submitted with every transaction. The developer would have full control on what KYC to accept and what to reject - by configuiring the proofs required. The developer must add a `hasCredential()` modifier to all their contract entrypoints.

### KYC'd chain using Reclaim RaaS
The final boss is a KYC'd chain. Reclaim RaaS is a way to spin up a compliant rollup. This is built on top of the OP stack with hard requirements of compliance and participation. We are working with large financial institutions to launch a chain where every customer and wallet address is a KYC'd customer. Yet another app specific rollup enforces that every user on their app and thus their appchain has a certain reputation on gaming platforms such as Steam. This RaaS is in a closed beta. To get access, please contact [Madhavan](https://t.me/madhavanmalolan).

# Disclaimer
None of this is legal advice. Please make sure you study the KYC requirements for your business before implementing any of the above mentioned solutions. 
