FYP Project Introduction Website: https://fyp.johnnyip.com

Developed with React.js

### URL to demonstration
https://fyp-front.johnnyip.com/


## Table of Content (Click and jump to section)
- [How to start test env](https://github.com/uowchk-group2/fyp-frontend/edit/master/README.md#how-to-start-test-env)
- [CI/CD Pipeline](https://github.com/uowchk-group2/fyp-hyperledger-api#cicd-pipeline)
- [Library Used](https://github.com/uowchk-group2/fyp-frontend/edit/master/README.md#library-used)



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
