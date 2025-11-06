# myfirst_project
This is a basic Spring Boot REST API project created from scratch.

## Project Structure
```
myfirst_project/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── example/
│   │   │           └── demo/
│   │   │               ├── DemoApplication.java
│   │   │               └── HelloController.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/
├── pom.xml
└── README.md
```

## Features
- Spring Boot 3.1.5
- Spring Web (REST API)
- Spring Data JPA
- H2 Database (for development)
- Basic Hello World REST endpoint

## How to Run
1. Make sure you have Java 17+ installed
2. Open the project in IntelliJ IDEA
3. Run the `DemoApplication` class
4. Visit http://localhost:8080/hello in your browser
5. You should see "Hello, World!" message

## Available Endpoints
- GET `/` - Welcome message with available endpoints
- GET `/hello` - Returns "Hello, World!" message
- GET `/hello/{name}` - Returns personalized hello message (e.g., /hello/John)
- GET `/status` - Returns JSON with application status and timestamp
- GET `/h2-console` - H2 Database console (for future database operations)

## How to Test Your API
Once the application is running, you can test these URLs in your browser:
- http://localhost:8080/ (welcome page)
- http://localhost:8080/hello (basic hello)
- http://localhost:8080/hello/YourName (personalized hello)
- http://localhost:8080/status (JSON status response)

## Next Steps
1. Test the application by running it
2. Add more REST endpoints
3. Set up Kafka integration
4. Add database entities and repositories
