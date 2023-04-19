---
title: "Reclaim protocol ensures privacy"
date: 2023-04-18T18:02:09-07:00
draft: false
---

Reclaim Protocol can prove that a user opened a certain webpage and the said webpage had some information on it. For example, a user opens their bank account webpage and generates a proof of their bank balance as mentioned on the web page. There are two parts to _opening a webpage_. The request, and the response. User's privacy needs to be maintained in the request as well as the response. This post is going to talk about how the request is validated yet keeping the request private.

_Using the app to generate proof_ When generating a proof, the user logs in into a website, say bankofamerica.com, using the browser on Reclaim Wallet. This browser is just a standard browser but with two changes.
1. It routes all the traffic through a transparent HTTP Proxy
2. It uses a custom implementation of TLS Library, as we'll see further in this post
Both of these have no impact on the security and privacy of the connection between the user and the website.

# Transparent Http Proxy
_Common_ HTTP Proxies are common parts of the infrastructure of the internet. Useres routinely use HTTP Proxies. When you're accessing the internet from a cafe, from an office, you're probably using a HTTP Proxy. The Reclaim App, routes all the http traffic through a HTTP Proxy too, without compromising any security of the connection to bankofamerica.com. 

_Role_ The job of the HTTP Proxy is just to forward all the request and response between the user and the website. But it also stores the encrypted request and the response. Please note, it forwards and stores only the encrypted request and response. It can't see the contents thereof. 

# Custom Implementation Of TLS1.3
[libtls](https://www.npmjs.com/package/node-tls) is a common TLS library used to send and receive https data. HTTPS is a protocol built on top of TLS. When a user opens a HTTPS website, they're using TLS to send the request to open a webpage and receive the response as an html page. 

To recap, we're trying to prove using Reclaim Protocol that a user opened the webpage W and the server responded with html response H, in response to W.

The http proxy is seeing all the encrypted request and response between the user and the webserver. The request it sees is `E(W)`. It knows the user sent a request, but doesn't know the contents of the request. Similarly it also sees that the webserver responded with `E(H)`.

But how to we prove to the http proxy that the user opened the correct webpage? How do we know that the user opened bankofamerica.com/myaccount and not fake-bank-of-america.com/myaccount? One simple way is for the user to reveal to the http proxy the decryption key. This is the key that the user and the webserver are using to [encrypt and decrypt messages](). So, if the user reveals the key to the http proxy, the http proxy can decrypt `E(W)`. 

`Decrypt(E(W), key) = W`. 

Once it has access to `W`, the http proxy can read the request and acertain that the request was made to bankofamerica.com indeed. However, there's a problem. To access bankofamerica.com/myaccount, the user would have logged in. And, `W` would contain the authentication token in it. What that means is, the http proxy will also be able to read the authentication token from `W`. If it has that authentication token or cookie, it can login on behalf of the user and initiate a transaction to siphon out all the money from the said bank account. Oops.

_Key Update_ This is where the custom implementation of TLS comes into play. When a request is being made, the request `W` is broken into 3 parts
```
W1 - domain, path, other headers
W2 - cookie/authentication token
W3 - request body
```

Instead of sending `E(W)`, the user now sends the request in three parts `E(W1)`, `E(W2)`, `E(W3)`. But after sending each part it also sends a special TLS 1.3 message called `KeyUpdate`. The message, well, updates the key used for encryption. So, `W1`, `W2`, and `W3` are all encrypted with different keys.

Once the request is complete and the response has been received by the user, they send another TLS message saying `CloseSession` to indicate the session should be closed and no new requests should be handled using the existing keys. 

Once the session is closed, the user will reveal keys K1 pertaining to E(W1) and K3 pertaining to E(W3). So, the http proxy is able to see that the correct domain was sent the request, the correct path was called and the correct request body was sent. But, it won't be able to see the authentication token held in W2, because the user never revealed K2 to the http proxy. 

Thus, using this construct the http proxy is able to attest that the correct request was sent and _some_ response was sent by the server. 
The correctness of the response also needs to be checked, but that's a totally different construct using zkcircuits because we don't want to ask bankofamerica.com to make any changes. That is for another blog! 


