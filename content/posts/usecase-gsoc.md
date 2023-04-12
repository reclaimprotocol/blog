---
title: "Casestudy: Claim GSoC bounty using Reclaim Protocol"
date: 2023-04-12T16:23:15-07:00
draft: false
---
_By [@solvedbiscuit71](https://twitter.com/@solvedbiscuit71)_

GSoC is an annual program sponsored by Google that offers a stipend to student who complete coding project for chosen open source organisation. At the end of the program, students present their completed project to the community and receive stipend for their contribution.

A student becomes a contributor to an Open Source repository byt fixing issues and raising PRs. They then need to get the certificate and stipend for the contribution. They need to prove their work to Google. This is where Reclaim Protocol comes into picture.

> Using Reclaim protocol, you can export data from any website and generate zk proof for it. This proof generation is completely privacy preserving.


# Why use Reclaim instead of Github’s API?
Though Github provides the [collaborators API](https://docs.github.com/en/rest/collaborators/collaborators?apiVersion=2022-11-28) to verify whether a user is a contributor of a particular repository.

For using this API,
- The contributor must authenticate using OAuth
- The organisation must enable _members and metadata_ permission

There is also the fact that members of the organisation, with high privileges, can add or remove collaborators manually.


Reclaim protocol doesn’t need any endpoints from Github. Using Reclaim Protocol, a user can generate a claim and then create a zkproof for it. Here, the claim is _user U is a contributor of repository R_.

# Demo & Technical Details

*Below sequential diagram shows Reclaim protocol in action, or watch a [demo](/videos/usecase-gsoc-demo.mp4) video. You can also see the sourcecode [here](https://github.com/solvedbiscuit71/reclaim-gsoc).*

![Reclaim_in_GSoC.png](/images/usecase-gsoc-seq.png)

The project uses the MERN stack and Questbook’s reclaim-sdk to generate Template and Callback URL. The tech stack includes,

- Node Server
- ExpressJS
- React
- MongoDB
- Reclaim SDK

The verification is done by the [@reclaimprotocol/reclaim-sdk](https://www.npmjs.com/package/@reclaimprotocol/reclaim-sdk) node package. However, it can also be done using smart contract.

# Conclusion

Reclaim protocol can be used in GSoC to automate the process of processing certificates and stipends to the student-developers.

Repository Link: [Github](https://github.com/solvedbiscuit71/reclaim-gsoc)

For further information you can contact the developer [@solvedbiscuit71](https://twitter.com/solvedbiscuit71)

