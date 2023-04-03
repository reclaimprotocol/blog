---
title: "Casestudy : Verified YC Founders NFT Airdrop"
date: 2023-04-03T10:38:05-07:00
draft: false
---

Using Reclaim Protocol, YCombinator Alum DAO could airdrop NFTs and Tokens only to YC Alumni without needing any website or API change from YC. 

YC doesn't have an API to authorize YC Alumni. So, for a DAO that is not directly affiliated to YC, how can it conduct an Airdrop only to YC Founders? Also, how can a YC Founder make sure that they cannot be left out of the airdrop because of censoring or a human error? Reclaim solves both of those problems.

Using Reclaim Protocol, a founder can login into the YC internal alumni portal and prove that they have access to the portal. This proof is a zk proof. This proof can be used both on chain and off chain. 

# Demo
You can see the entire [demo here](https://www.loom.com/share/5f497f8b0a5342d3b6e43dc35d2b41fd).

# Technical information
![YC Alumni DAO](/images/seq-yc.png)

This has been made using the javascript verification SDK [@reclaimprotocol/reclaim-sdk](https://www.npmjs.com/package/@reclaimprotocol/reclaim-sdk). However, the verification can also be done on a smart contract.

You can find the source code for this here : [github](https://github.com)
For further details, you can contact the developer [@swetashaw_](https://twitter.com/swetashaw_)
