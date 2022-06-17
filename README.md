# fyp-frontend
FYP Project Introduction Website: https://fyp.johnnyip.com

Developed with React.js

### URL to demonstration
https://fyp-front.johnnyip.com/


## Table of Content (Click and jump to section)
- [How to start test env]()
- [CI/CD Pipeline](https://github.com/uowchk-group2/fyp-hyperledger-api#cicd-pipeline)
- 
- 



## How to start test env
```
npm install --force
npm run dev
```

## CI/CD Pipeline

On every commit, the changes will be deployed to tomcat server: https://tomcat.johnnyip.com/fyp-hyperledger/

### Steps
1. Developer push changes to GitHub 
2. Jenkins Server detect changes
3. Build the .war file
4. Deploy the .war file to Tomcat Server

---
