---
title: "Reclaim X Semaphore"
date: 2023-09-19T15:52:49+05:30
draft: true
---

# Reclaim X Semaphore: Using 2 zero-knowledge proof technologies to decentrally prove identity and receive tokens anonymously

[Reclaim Protocol][reclaim-home] allows users to produce *proofs of provenance*, which can be utilized to prove identities. [Semaphore Protocol][semaphore-home] allows users to register an identity and anonymously signal later, which can be utilized for airdrops.
In this blog, we see how one can build a dApp which lets users to prove ownership of email-ids, submit the proof to a smart contract to register a semaphore identity and later receive token airdrops whenever they want.

## Why two ZKPs?

1. Solution using just Reclaim Protocol: Using Reclaim protocol, a user can prove ownership of an email address. However, this introduces the possibility of doxxing, as the user's tokens can be tracked and their email address gets linked to their wallet.
2. Solution using just Semaphore: The token smart contract owner can do verifications themselves in a centralized manner and register the user on semaphore. The user can initiate airdrop whenever they like. This still has the potential for data misuse (and denial of registration).
3. Reclaim X Semaphore: The solution which does away with all the above issues involves using reclaim proofs with unique ID to anonymously yet authentically register on semaphore and signal for airdrop whenever needed.
Using this proof, we register on semaphore and then the user can get airdrops by signalling anonymously whenever they want.

## Sequence Diagram of the Application Logic

![Reclaim X Semaphore Sequence Diagam](/images/reclaimXsemaphore.png)

## Step 1: Reclaim template generation
A reclaim template encodes the proof requirement as per the use case. Upon opening a template in [Reclaim Wallet][reclaim-wallet] app, the users can produce proofs corresponding to the template. To facilitate template generation, one can use [Reclaim-SDK][reclaim-sdk]. Here we host an express backend which has a dedicated endpoint for template generation.

```sh
> npm i express cors @reclaimprotocol/reclaim-sdk
```

```typescript
// imports
import express from 'express';
import cors from 'cors';
import { reclaimprotocol } from "@reclaimprotocol/reclaim-sdk";

const app = express();
const port = 3000;
const reclaim = new reclaimprotocol.Reclaim();

/*
... Your endpoints and functions here
*/

// starting the server
app.listen(port, async () => {
    console.log(`Express server is listening on port ${port}`)
});
```

#### Endpoint 1: create template
```typescript
app.get("/request-proofs", async (req, res) => {
    try {
        const request = reclaim.requestProofs({
            title: "G-Coin",
            baseCallbackUrl: callbackUrl, // <- endpoint that Reclaim Wallet sends proof to.
            requestedProofs: [
                new reclaim.CustomProvider({
                    provider: 'google-login',
                    payload: {}
                }),
            ],
        });
        const reclaimUrl = await request.getReclaimUrl({shortened: true});
        const {callbackId, template, id} = request;
        res.status(200).json({reclaimUrl, callbackId, template, id});
    }
    catch (error) {
        res.status(500).json({error: "Failed to request proofs"});
    }
    return;
});
```

## Step 2: Endpoint which the Reclaim Wallet sends proof to (callback):

Upon proof generation, the Reclaim Wallet app allows the user to send their proofs to an endpoint (this has to be specified in the template). The express server can be made to receive proofs from the app. This can be stored in a database for further use. Here we store it in a local variable for temporary use.

#### Endpoint 2: callback
```typescript
let lastCallBackId;
let lastProof;
app.use(express.text({ type: "*/*" }));
app.post("/callback", async (req, res) => {
    try {
        const {callbackId: callbackId} = req.query;
        const { proofs } = JSON.parse(decodeURIComponent(req.body));
        const isProofCorrect = await reclaim.verifyCorrectnessOfProofs(callbackId as string, proofs);
        lastCallBackId = callbackId;
        lastProof = proofs;

        res.json({msg: "Callback received."});
    }
    catch (error) {
        res.json({msg: "Proof verification failed."});
    }
    return;
});
```

If you have a separate frontend where you let the user submit Reclaim proof and register on Sempahore, you need an endpoint to fetch the proof.

#### Endpoint 3: fetch proof
```typescript
app.get("/get-proofs/", async (req, res) => {
    try {
        const {id: callbackId} = req.query;
        if (id === lastCallBackId) {
            res.status(200).json(lastProof);
        }
        else {
            res.status(500).json({msg: "Call back Id not the latest"});
        }
    }
    catch (error) {
        res.status(500).json({msg: error});
    }
    return;
});
```

## Step 4: Generate Semaphore Identity
A semaphore identity consists of an *identity trapdoor* and *identity nullifier*, and the hash, the *identity commitment* is registered on semaphore's merkle tree (specific). The identity is supposed to be kept secret, so let the user generate an identity themselves or run the following in the frontend. The *identity nullifier* is later used to generate semaphore proofs.

#### Frontend Function 1: new identity

```typescript
import {Identity} from "@semaphore-protocol/identity";

const identity = new Identity();
const identityCommitment = identity.commitment;
```

## Step 5: Smart Contract
To realize the decentralized and anonymous feature of our application, we need to move the rest of the application logic on chain.
We need 2 functions in our smart contract:
 - *Verify Reclaim Proofs and Register Semaphore Identity*: This function verifies reclaim proofs, stores the hash of the proof parameter to disallow resubmission of proofs, and registers the identity commitment on semaphore merkle tree.
 - *Verify Semaphore Proof and Airdrop Tokens*: This function lets the user submit semaphore proofs with the signal being the address to airdrop the tokens to (security measure to avoid frontrunning).

#### RSToken.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface SemaphoreInterface {
    function createGroup(
        uint256 groupId,
        uint256 merkleTreeDepth,
        address admin
    ) external;

    function addMember(uint256 groupId, uint256 identityCommitment) external;

    function verifyProof(
        uint256 groupId,
        uint256 merkleTreeRoot,
        uint256 signal,
        uint256 nullifierHash,
        uint256 externalNullifier,
        uint256[8] calldata proof
    ) external;
}

interface ReclaimContractInterface {
    struct CompleteClaimData {
		bytes32 identifier;
		address owner;
		uint32 timestampS;
		uint256 epoch;
	}
	struct ClaimInfo {
		string provider;
		string parameters;
		string context;
	}
    struct Witness {
		address addr;
		string host;
	}
    struct Epoch {
		uint32 id;
		uint32 timestampStart;
		uint32 timestampEnd;
		Witness[] witnesses;
		uint8 minimumWitnessesForClaimCreation;
	}
    function assertValidEpochAndSignedClaim(uint32 epochNum, ClaimInfo memory claimInfo, CompleteClaimData memory claimData, bytes[] memory signatures) external view;
}

contract RSToken is ERC20 {
    address public owner;
    address public semaphoreAddress;
    address public reclaimContractAddress;
    uint256 public groupId;
    uint256 public merkleTreeDepth;

    mapping (bytes32 => bool) public registeredList;

    constructor(
        address _semaphoreAddress,
        uint256 _groupId,
        uint256 _merkleTreeDepth,
        address _reclaimContractAddress
        ) ERC20("RSToken", "RST") {
            owner = msg.sender;
            groupId = _groupId;
            semaphoreAddress = _semaphoreAddress;
            merkleTreeDepth = _merkleTreeDepth;
            SemaphoreInterface(semaphoreAddress).createGroup(groupId, merkleTreeDepth, address(this));
            reclaimContractAddress = _reclaimContractAddress;
    }

    function verifyProofAndRegisterMember(
        uint32 epochNum,
        string memory provider,
        string memory parameters,
        string memory context,
		ReclaimContractInterface.CompleteClaimData memory claimData,
		bytes[] memory signatures,
        uint256 _identityCommitment
        ) external {
            // Ensure correct provider
            bool isCorrectProvider = keccak256(abi.encodePacked(provider)) == keccak256(abi.encodePacked("google-login"));
            require(isCorrectProvider, "The provider is not google-login");
            
            // Compute claimInfo and call assertValid..() from Reclaim SC.
		    ReclaimContractInterface.ClaimInfo memory claimInfo = ReclaimContractInterface.ClaimInfo(provider, parameters, context);
            ReclaimContractInterface(reclaimContractAddress).assertValidEpochAndSignedClaim(epochNum, claimInfo, claimData, signatures);

            // Check if the parameter is not registered yet by mapping the hash and store the hash.
            bytes32 hash = keccak256(abi.encodePacked(parameters));
            require(registeredList[hash]==false, "Candidate already registered");
            registeredList[hash] = true;

            // Add the member
            SemaphoreInterface(semaphoreAddress).addMember(groupId, _identityCommitment);
    }

    function airDropTo(
        uint256 _merkleTreeRoot,
        uint256 _signal,
        uint256 _nullifierHash,
        uint256 _externalNullifier,
        uint256[8] calldata _proof
        ) external {

        require(_externalNullifier == 100, "The external nullifier is required to be 100.");

        // use signal to represent the airdrop. This is used in place of contextAddress to avoid doxxing and frontrunning.
        address receiver = address(uint160(_signal));

        SemaphoreInterface(semaphoreAddress).verifyProof(groupId, _merkleTreeRoot, _signal, _nullifierHash, _externalNullifier, _proof);
        _mint(receiver, 100 * (10 ** decimals()));
    }
}
```

## Step 6: Submit Reclaim proofs and register identity
The user needs to call `verifyProofAndRegisterMember(...)` from the smart contract to register and be able to receive airdrop later.

#### Frontend Function 2: on chain submission of proofs and identity

```typescript
import { ethers } from 'ethers';
import { RSTokenABI } from 'RSTokenABI.json'; // get the contract ABI

const RSTokenAddress = '0x0...'; // Address of the deployed contract
const privateKey = '0x0...'; // user's private key
const provider = new ethers.JsonRpcProvider(optGoerliProvider);
// To avoid using privateKey in plaintext, use a wallet and a corresponding provider.
const ownerAccount = new ethers.Wallet("Your rpc provider");
const RSTokenContract = new ethers.Contract(RSTokenAddress, RSTokenAbi, ownerAccount);

async function RSTokenVerifyAndRegister() {
    try {
    const tx = await RSTokenContract.verifyProofAndRegisterMember(proof.epoch, proof.provider, proof.parameters, proof.context, claimData, proof.signatures, identityCommitment);
    const receipt = await tx.wait();
    }
    catch (error) {
        console.log("RSTokenVerifyAndRegister Error: ", error);
    }
    return;
}
```

## Step 7: Generate Semaphore Proof
Now that a user has registered themselves, they can claim an airdrop whenever they want. While claiming, their identity can't be linked back to them, preventing doxxing. Also, we use signal parameter of the proof to indicate the airdrop address, preventing frontrunning attack.

#### Frontend Function 3: generate semaphore proof
```typescript
import { Group } from "@semaphore-protocol/group";
import { generateProof } from "@semaphore-protocol/proof";
import { SemaphoreEthers } from "@semaphore-protocol/data";

const groupNo = 123456; // assign a unique id to the merkle tree.
let fullProof;
async function RSTokenGenProof() {
    try {
        const semaphoreEthers = new SemaphoreEthers("optimism-goerli", {address: semaphoreAddress});
        const members = await semaphoreEthers.getGroupMembers(groupNo.toString());
        const group = new Group(groupNo, merkleTreeDepth, members);
        fullProof = await generateProof(identity, group, "100", signal, { zkeyFilePath: "./semaphore.zkey", wasmFilePath: "./semaphore.wasm" });
    }
    catch (error) {
        console.log("Error: ", error);
    }
    return;
}
```

## Step 8: Claim Airdrop
Finally, a user can claim an airdrop whenever they want by submitting the semaphore proof using the *identity nullifier*. Only one signal can be sent per *external nullifier* (which we require to be "100" to ensure airdrop occurs only once).

#### Frontend Function 4: receive airdrop
```typescript
async function RSTokenAirDrop() {
    try {
        const tx = await RSTokenContract.airDropTo( fullProof.merkleTreeRoot, fullProof.signal, fullProof.nullifierHash, fullProof.externalNullifier, fullProof.proof);
        const receipt = await tx.wait();
    }
    catch (error) {
        console.log("Error: ", error);
    }
    return;
}
```

## Further Ideas
 - Airdrop tokens using other providers like Aadhaar DOB, Tinder Match Count, etc.
 - **Intra-organization voting**: Every one with an email id corresponding to the organization can register themselves and vote anonymously. Fix the *external nullifier* and use *signal* to indicate your vote.
 - **Anonymous Feedbacks**: Use *external nullifier* to indicate your movie/product/etc. and signal to indicate your rating.

## Conclusion
In this blog, we saw how one can build a dApp which operates in a trustless and permissionless manner, and avoids security issues like doxxing and frontrunning by using 2 state of the art zero-knowledge proof technologies, namely Reclaim Protocol and Semaphore Protocol.


   [reclaim-home]: <https://www.reclaimprotocol.org/>
   [semaphore-home]: <https://semaphore.pse.dev/>
   [reclaim-wallet]: <https://play.google.com/store/apps/details?id=com.credentialswallet&hl=en_US>
   [reclaim-sdk]: <https://www.npmjs.com/package/@reclaimprotocol/reclaim-sdk>