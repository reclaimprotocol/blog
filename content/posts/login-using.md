---
title: "Login Using Anything"
date: 2024-01-23T16:13:58-05:00
draft: false
---

Sign in with Google is all over the internet, but have you seen a Sign in with Uber,  Sign in with Fortnite, or Sign in with Amazon? No - that's because these websites don't expose an OAuth API.

Skip if you already know what OAuth is. OAuth API is an API that, for example, Google exposes. This OAuth API has two steps. The first step is to retrieve the Auth Token. When the user taps on Sign in with Google, they're redirected to the Google sign in webpage. You will notice that the URL of this website contains a parameter called `redirect_uri`. This is the website that will be called by Google if the login is successful. When Google redirects, it will also append a url parameter called `authorization_code`. Your website must then send this authorization code to Google to receive a Authorization Token. This authorization token is what identifies the user. You can access the user's information using this authorization token. You can almost always access the user's name and email address upon successful login, and other information like their date of birth and even make modifications to their data or profile - if you had requested for those permissions while generating the access token. 

As you'd suspect, if you generate an OAuth token from Google - you can use it to access the user's information only on Google. This is good enough for many usecases that need to ensure that the user is unique. You can store the user's email on your database as a user id. You can just use the fact that every user on Google has a unique email address. You don't need to build your own username password database. It's very convenient. 

However, if you want to not only acertain that the user has a Google account but also want additional checks, Google Login is not helpful. If you want the number of followers on Twitter, you'd use Twitter's OAuth. If you want the friends graph on Facebook, you'd use the Facebook Oauth. However there are only a handful of social websites that expose OAuth APIs. If you want the number of rides the user has taken on Uber, or the number of times the user has bought a pizza - you can't get that information using Google, Facebook or Twitter's OAuth API. 

So, what do you do? Instead of using Login with Google as your first entry point - you can ask the user to login using the service from which you want to import the data, using [Reclaim Protocol](https://dev.reclaimprotocol.org). Say, Uber for example. Instead of Sign in with Uber, you can ask users to sign in with Uber. When they are signing in, you can ask them to also share the data like the number of rides with you. If you use Reclaim Protocol, when the user taps on sign in with Uber, they'll be redirected to Uber's login screen. Once they login, reclaim protocol will retrieve the data and send it to your website. Instead of using OAuth Tokens, reclaim protocol uses another cryptographic primitive called zk-proofs. 

These zk-proofs contain information that you had requested from the user along with their username (if you had asked for it). You can use the username the same way you would use the email address from Google Sign In - that is, as the primary key on your `users` table. And you also get requested data like the number of rides on Uber as meta data that you can feed to your business logic.

Here's a demo video :
{{<tweet id="1747244739299053772" user="protocolreclaim">}}

If you'd like to integrate login with a website of your choice, [hit us up](https://t.me/madhavanmalolan) - we'll set it up for you!

