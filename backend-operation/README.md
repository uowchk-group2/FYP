FYP Project Introduction Website: https://fyp.johnnyip.com

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
