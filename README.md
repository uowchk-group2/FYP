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
[Frontend](https://github.com/uowchk-group2/fyp#fribtebd)
- [How to start test env](https://github.com/uowchk-group2/fyp#frontend)
- [CI/CD Pipeline](https://github.com/uowchk-group2/fyp#cicd-pipeline)
- [Library Used](https://github.com/uowchk-group2/fyp#library-used)
[Backend - Operation Center]
- 

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
