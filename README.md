FYP Project Introduction Website: https://fyp.johnnyip.com


### URL to demonstration
https://fyp-front.johnnyip.com/

### Summary
| Name | Features |
|---|---|
| Frontend | Developed with React.js |
| Backend-Operation | Developed with Spring Boot, Spring Security (JWT), Hibernate (MySQL) |
| Backend-Blockchain | Developed with Hyperledger Fabric (private blockchain), using the official tutorial<br>Expose a Spring Boot API endpoint for create and read operations to the blockchain network. |



## Table of Content (Click and jump to section)
- [**Frontend**](https://github.com/uowchk-group2/fyp#frontend)
  - [How to start test env](https://github.com/uowchk-group2/fyp#frontend)
  - [CI/CD Pipeline](https://github.com/uowchk-group2/fyp#cicd-pipeline)
  - [Library Used](https://github.com/uowchk-group2/fyp#library-used)
- [**Backend - Operation Center**](https://github.com/uowchk-group2/fyp#backend-operation)
  - [Endpoint URL](https://github.com/uowchk-group2/fyp#endpoint-url)
  - [Main Features](https://github.com/uowchk-group2/fyp#main-features)
  - [CI/CD Pipeline](https://github.com/uowchk-group2/fyp#cicd-pipeline-1)
- [**Backend - Blockchain Center**](https://github.com/uowchk-group2/fyp#backend-blockchain)
  - [CI/CD Pipeline](https://github.com/uowchk-group2/fyp#cicd-pipeline-2)
  - [1. Setting up test Hyperledger Fabric network with bash scripts](https://github.com/uowchk-group2/fyp#1-setting-up-test-hyperledger-fabric-network-with-bash-scripts)
    - [a. Setup](https://github.com/uowchk-group2/fyp#a-setup)
    - [b. Creating Channels](https://github.com/uowchk-group2/fyp#b-creating-channels)
    - [c. Deploy chaincode](https://github.com/uowchk-group2/fyp#c-deploy-chaincode)
    - [d. Invoking chaincode](https://github.com/uowchk-group2/fyp#d-invoking-chaincode)
  - [2. Spring Boot API server for executing transactions in Hyperledger Fabric](https://github.com/uowchk-group2/fyp#2-spring-boot-api-server-for-executing-transactions-in-hyperledger-fabric)
    - [a. Copy the required certificates from linux](https://github.com/uowchk-group2/fyp#a-copy-the-required-certificates-from-linux)


# Frontend
Developed with React.js

## How to start test env
```
cd frontend
npm install --force
npm run dev
```

## CI/CD Pipeline

On every commit, the changes will be built into docker image: https://hub.docker.com/r/unclechuen/fyp-frontend

### Steps
1. Developer push changes to GitHub 
2. Jenkins Server detect changes
3. Build the docker image
4. Deploy the docker image on the test server at home


## Library Used
### [Redux-toolkit](https://redux-toolkit.js.org)
  - State container across the whole website, more easier to use than Redux
### [Mantine](https://mantine.dev)
  - Adding Styled UI components easily
### [Next.js](https://nextjs.org)
  - Server-side rendering, improve loading speed
### [Tabler](https://tabler-icons-react.vercel.app)
  - Various Icons
### [Axios](https://github.com/axios/axios)
  - Making API calls more convenient


# Backend-Operation
Spring Boot, developed with IntelliJ IDEA

### Endpoint URL: 

https://tomcat.johnnyip.com/fyp-backend/

  [API Documentation](https://docs.google.com/document/d/1ROnOzZ-v2Nq0-r_Jd9Kr6YWaX7hOC2oHp2QacXloSz4/edit?usp=sharing) (2. Backend Database Section)


## Main Features
**Spring Security (JWT Token)**
Authenticate users with:
- **Username password** (Retrieve JWT Token at 1st time)
- **JWT Token** (Every requests)

**Connection with MySQL**
- **Sprint Data JPA**


## CI/CD Pipeline

On every commit, the changes will be deployed to tomcat server: https://tomcat.johnnyip.com/fyp-backend/

### Steps
1. Developer push changes to GitHub 
2. Jenkins Server detect changes
3. Build the .war file
4. Deploy the .war file to Tomcat Server


# Backend-Blockchain
## What is included

### 1. Bash Scripts for setting up test Hyperledger Fabric network
Source codes cloned from [official documentation](https://hyperledger-fabric.readthedocs.io/en/latest/test_network.html) and  [hyperledger/fabric-samples repository](https://github.com/hyperledger/fabric-samples) 

### 2. Spring Boot - REST API server
Endpoint URL: https://tomcat.johnnyip.com/fyp-hyperledger/

  [API Documentation](https://docs.google.com/document/d/1ROnOzZ-v2Nq0-r_Jd9Kr6YWaX7hOC2oHp2QacXloSz4/edit?usp=sharing) (3. Blockchain Network Section)
  

## CI/CD Pipeline

On every commit, the changes will be deployed to tomcat server: https://tomcat.johnnyip.com/fyp-hyperledger/

### Steps
1. Developer push changes to GitHub 
2. Jenkins Server detect changes
3. Build the .war file
4. Deploy the .war file to Tomcat Server

## 1. Setting up test Hyperledger Fabric network with bash scripts
#### a. Setup
Setting up a experimental blockchain network, with **2 peer nodes** in a **single Linux server**, with **Docker images**

_Prerequisite:_
- Docker installed on Linux machine
- Folder **hyperledger-fabric-scripts** is placed inside Linux
- Install dependencies (Docker, git ... ) [here](https://hyperledger-fabric.readthedocs.io/en/latest/prereqs.html) and [here](https://hyperledger-fabric.readthedocs.io/en/latest/install.html)

```
#Change directory into scripts folder
cd backend-blockchain/hyperledger-fabric-scripts/scripts

#Add 'execute' right to all users, prevent "Permission denied"
chmod +x network.sh 

#Setting up the network
./network.sh up

#Removing the network
./network.sh down

#Restart the containers after a system shutdown
docker restart $(docker ps -a -q)
```
After the script is successfully ran, 4 docker process should be set up and running
| Image name | Description | Ports |
| ----------- | ----------- | ----------- |
| hyperledger/fabric-tools:latest | A necessary cli tool | - |
| hyperledger/fabric-orderer:latest | orderer.example.com | 7050 |
| hyperledger/fabric-peer:latest | peer0.org1.example.com | 7051 |
| hyperledger/fabric-peer:latest | peer0.org2.example.com | 9051 |

Paths to certificate files: 
```
organizations/peerOrganizations/org1.example.com
organizations/peerOrganizations/org2.example.com
```

--- 
#### b. Creating channels
Creating channels and make the 2 peers joining them
```
#Add 'execute' right to all users, prevent "Permission denied"
chmod +x scripts/*

./network.sh createChannel -c fyp
```

--- 
#### c. Deploy chaincode
**Meaning of tags**
- -ccn: Chaincode Name
- -ccp: Chaincode Source Path
- -ccl: Chaincode language
- -c  : Channel to be deployed
```
#Add 'execute' right to all users, prevent "Permission denied"
chmod +x scripts/deployCC.sh

./network.sh deployCC -ccn orders -ccp ../chaincode-javascript/orders -ccl javascript -c fyp
./network.sh deployCC -ccn deliveryNotes -ccp ../chaincode-javascript/deliveryNotes -ccl javascript -c fyp
./network.sh deployCC -ccn deliveryStatus -ccp ../chaincode-javascript/deliveryStatus -ccl javascript -c fyp
./network.sh deployCC -ccn documents -ccp ../chaincode-javascript/documents -ccl javascript -c fyp

```

--- 
#### d. Invoking chaincode
```
export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051

#Spreading the cmd above for readability

#Put data into blockchain
peer chaincode invoke \
      -o localhost:7050 \
      --ordererTLSHostnameOverride orderer.example.com \
      --tls \
      --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" \
      -C fyp \
      -n deliverynotes2 \
      --peerAddresses localhost:7051 \
      --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" \
      --peerAddresses localhost:9051 \
      --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" \
      -c '{"function":"CreateAsset","Args":["1","1","NA","NA","50","2022-06-14","Driver Company","2022-06-14"]}'

#GetAllAssets
peer chaincode query -C orders -n basic -c '{"Args":["GetAllAssets"]}'
```

---

### 2. Spring Boot API server for executing transactions in Hyperledger Fabric
#### a. Copy the required certificates from linux
Directory: hyperledger-fabric-scripts/mainScripts/organizations/peerOrganizations/org1.example.com/

- **TLS Certificate**
  - Path: peers/peer0.org1.example.com/tls/ca.crt

- **CA Certificate**
  - Path: users/User1@org1.example.com/msp/signcerts/User@org1.example.com-cert.pem

- **Private Key**
  - Path: users/User1@org1.example.com/msp/keystore/priv_sk

Put all files into: src/main/resources/certs
![](/img/screenshot_1.png)
