## server-manga
<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation

Install Depedencies by using this command 
* npm
  ```sh
  npm install 
  ```
* yarn
  ```sh
  npm yarn 
  ```


### Usage
change config in config,json in folder config 

```
"development": {
    "username": "root",
    "password": null, //fill with your password mysql
    "database": "database", //your database name
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
```

after that run 

```
npx sequelize-cli db:migrate
```

add .env file and add this 
```
JWT_SECRET=my-app-private-key-10256
PORT=5000
```

and then run on your local by commmand 

```
npm start
```

