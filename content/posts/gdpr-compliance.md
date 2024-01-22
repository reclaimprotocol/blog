---
title: "Staying GDPR Compliant "
date: 2024-01-21T16:01:02-05:00
draft: true
---

Collecting user data using Reclaim helps you to further your compliance with GDPR. Particularly, GDPR's requirement for explicity consent and purpose limitation.

| In the GDPR, "explicit consent" is detailed under Article 7, which emphasizes that consent must be freely given, specific, informed, and unambiguous, with a clear affirmative action from the data subject. As for "purpose limitation," Article 5(1)(b) states that personal data must be collected for specified, explicit, and legitimate purposes and not further processed in a manner that is incompatible with those purposes. For the full legal text and further details, you can refer to the official GDPR legal text on gdpr-info.eu.

When using Reclaim Protocol, you, the developer would request the data using the following code

```
const client = new ReclaimClient(appSecret);
//...
client.addContext({ message : "Requesting data for Acme Corp Airdrop"});
/...
```

When you set the context message in the request, the user is asked to provide an explicit approval to share this information with you. 
When the user signs in and generates a proof of their data, they are also shown the context for this proof that is being requested. When the proof is generated, the proof also contains a cryptographic affirmation from the user that they have generated the proof for this purpose, and this purpose alone. Even if you store this information on your database, you'd also be storing the affirmation the user provided. 

As long as you store information and use the information for the stated purpose alone - you are GDPR compliant
