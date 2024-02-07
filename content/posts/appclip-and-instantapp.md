---
title: "Appclip and Instantapp"
date: 2024-02-07T14:05:33-05:00
draft: false
---

Most people assume that to generate proofs using Reclaim Protocol, you need to install a chrome extension or a mobile app. This is true for most zk-tls solutions out there, including Reclaim Protocol until early 2024. Not any more.

All that you need is a mobile phone. You don't need to install anything on it. You just scan a QR code, and the Reclaim Protocol proof generation starts. 

Check out the Demo
{{< youtube id="txvSnvS07ZM " >}}

# Appclips and InstantApps
Appclips and InstantApps are mini apps that can be opened on iOS and Android respectively without having to install an app. 
[InstantApps on Android](https://developer.android.com/topic/google-play-instant) have been around since 2016. However [Appclips on iOS](https://developer.apple.com/app-clips/) were launched in 2020. Though they have both been around for a while, there doesn't seem to be a lot of apps leveraging the tech. 

These mini apps are chached on the servers of Apple and Google. So, when the user triggers it - the miniapp is immediately downloaded within a couple of seconds. This is great when the user typically has to do an action only once. So, instead of asking the user to download an app for a single time use, developers can give a great app-like experience without the user having to install the app.

This mini app stays on the mobile phone until it has been explicitly cleared by the user or if the operating system needs to make more space for other apps and data. That way, if the user has to use the same miniapp within a span of, say, 24 hours - they can save the couple seconds the OS takes to download the miniapp.

# Constraints
One of the main challenges we had to face while developing an AppClip and InstantApp version of Reclaim Protocol was the size limitation. These miniapps can be a maximum of 10MB in size. That is incredibly small by today's standards. Most simple apps Doordash, Whatsapp are all in the range of 70-80MB. We have to be an order of magnitude smaller in size to be able to run as a miniapp.

The other big challenge and why we had an app until early 2024 is because we had to generate zkproofs on the client side. We have been using Circom Groth16 proofs. The canonical circom library, snarkjs, itself is [9.91MB](https://www.npmjs.com/package/snarkjs) at the time of this writing. That'd leave us with 0.09MB to write the rest of the app. Further more, to maintain code robustness and speed of iteration we wanted to have a common codebase for iOS and Android.  That means we'd have to use a framework like React Native or Flutter - which further adds bloat. This is an incredible engineering feat to optimize the code to the last byte to get it under the accepted size limits.

A lot of engineering has also gone into writing a custom library out of Snarkjs and reducing the size of the library to under 2MB. Stripping off all the bells and whistles we're not using. This allowed us to have enough space left to build a React Native shared codebase. But we're _just_ at the boundary of what we can fit into that size limit. Should we hit the size limit, we might have to rewrite the entire code in native swift and kotlin. But that's for another day. 

# App
You may install the app from the appstore or playstore. Every appclip and instantapp needs a corresponding app on the respective store. However, there is no advantage of installing the app at the time of this writing. It's almost a formality we had to oblige to. 

That said, if you are a developer and are building new data providers - we do need you to install the app. There are a few handy [developer tools](https://dev.reclaimprotocol.org) that are accessible only via the installed app. Your end-users never need to install the app.

# Try it out!
You can try it out right now. Make sure you don't have Reclaim Protocol app and head over to this website on your laptop. Then pull up your camera to scan the QR code.

[demo.reclaimprotocol.org](https://demo.reclaimprotocol.org)

We would love to hear your feedback. If you have any questions, please don't hesitate to ask on our [Telegram Group](https://t.me/+I7OZhOVVGKs0YTE1). All our developers and founders are active here. 

