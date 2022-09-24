<h1 align="center">
    <img src=".github/logo.svg" width="300px" />
</h1>

<h2 align="center">

[![GitHub size](https://img.shields.io/github/repo-size/pauloreis7/codebank?color=purple)](https://github.com/pauloreis7/codebank/issues)
[![GitHub](https://img.shields.io/badge/types-TypeScript-%23007acc)](https://github.com/pauloreis7/codebank)
[![GitHub size](https://img.shields.io/github/last-commit/pauloreis7/codebank?color=%23964b00)](https://github.com/pauloreis7/codebank/commits)
[![GitHub stars](https://img.shields.io/github/stars/pauloreis7/codebank?color=%23f9d71c&style=flat)](https://github.com/pauloreis7/codebank/stargazers)
[![GitHub license](https://img.shields.io/github/license/pauloreis7/Foodfy)](https://github.com/pauloreis7/codebank/blob/master/LICENSE)

</h2>

<h1 align="center">
    <img src=".github/app-demo.gif" />
</h1>

<h4 align="center">🏁 Application already finished 🏁</h4>

<p align="center">🏦 Digital bank for issuing credit cards and making purchases in an e-store. Micro services based ☁️</p>

## 🔗 Index

---

 <p>👉 <a href="#about">About the project</a> </p>
 <p>👉 <a href="#layout">Application Layout</a> </p>
 <p>👉 <a href="#func">Features</a> </p>
 <p>👉 <a href="#techs">Technologies</a> </p>
 <p>👉 <a href="#requests">Project Prerequisites</a> </p>
 <p>👉 <a href="#work">Download and execution</a> </p>
 <p>👉 <a href="#contribute">Contribute with the project</a> </p>
 <p>👉 <a href="#author">Author</a> </p>
 <p>👉 <a href="#license">License</a> </p>

<a id="about"></a>

## 🔎 About the project

---

<p>Application completely based on micro services of a digital bank for issuing credit cards and financial transactions. Integrated to an e-commerce to perform purchase transactions over the internet with the created credit card.</p>

<a id="layout"></a>

## 🎨 Application Layout

---

<p align="center">

## 💻 Desktop

### 🏪 Store

<img src=".github/layout/store-products-list.jpeg"/>
<img src=".github/layout/store-product.jpeg"/>
<img src=".github/layout/store-checkout.jpeg"/>
<img src=".github/layout/store-order.jpeg"/>

### 🏦 Bank

<img src=".github/layout/invoices-login.jpeg"/>
<img src=".github/layout/invoices-issue-card.jpeg"/>
<img src=".github/layout/invoices-list.jpeg"/>

## 📱 Mobile

### 🏪 Store

<img src=".github/layout/store-product-mobile.jpeg"/>
<img src=".github/layout/store-checkout-mobile.jpeg"/>
<img src=".github/layout/store-order-mobile.jpeg"/>

### 🏦 Bank

<img src=".github/layout/invoices-login-mobile.jpeg"/>
</p>

<a id="func"></a>

## ✅ Features

---

- [x] E-commerce for purchase transactions
- [x] See purchase order
- [x] Digital bank for issue credit cards
- [x] Responsive
- [x] Perform financial transactions with the created credit card
- [x] View credit card invoice with transactions status
- [x] Asynchronous messaging system for communication between microservices
- [x] Use gRPC and HTTP2 for web communication
- [x] Containerization of all microservices
- [x] Integration of kafka connect with elasticsearch and kibana
- [x] Use elasticsearch and kibana to visualize transaction metrics dashboards

- [x] Microservice: bank
- [x] Microservice: store-api
- [x] Microservice: store-web
- [x] Microservice: invoices-api
- [x] Microservice: invoices-web

<a id="techs"></a>

## 🧪 Technologies

---

### 💻 Project developed with the following technologies

- [Apache Kafka](https://kafka.apache.org/)
- [Elasticsearch](https://www.elastic.co/elasticsearch/)
- [Kibana](https://www.elastic.co/kibana/)
- [Docker](https://www.docker.com/)
- [gRPC](https://www.grpc.io/)
- [Postgresql](https://www.postgresql.org/)
- [Python](https://www.python.org/)
- [SQLAlchemy / Alembic](https://www.sqlalchemy.org/)
- [Pydantic](https://pydantic-docs.helpmanual.io/)
- [Poetry](https://python-poetry.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [JavaScript](https://www.javascript.com/)
- [React](https://reactjs.org/)
- [Nextjs](https://nextjs.org/)
- [Node](https://nodejs.org/)
- [Chakra-ui](https://chakra-ui.com/)
- [React query](https://react-query.tanstack.com/)
- [Nestjs](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)

<a id="requests"></a>

## 🚨 Project Prerequisites

---

Before you start, you will need to have the following tools installed on your machine:

- [Git](https://git-scm.com)
- [Python](https://www.python.org/)
- [Poetry](https://python-poetry.org/)
- [Node](https://nodejs.org/)

🐳 Run the containerized api (Docker)

- [Docker-compose](https://docs.docker.com/compose/)

💡 Also, it is good to have an editor to work with the code like [VSCode](https://code.visualstudio.com/)

<a id="work"></a>

## 🏄‍♂️ Download and execution

---

```bash

# Clone the repository
$ git clone <https://github.com/pauloreis7/codebank>

# Access the project folder terminal/cmd
$ cd codebank

# Open project in VSCode
$ code .

# Navigate (cd) to each of the microservices folder and run the docker-compose
$ docker compose up

# The store web app will start on port 3001
access  <http://localhost:3001>

# The bank web app will start on port 3000
access  <http://localhost:3000>

```

<a id="contribute"></a>

## 🎉 How Contribute

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/pauloreis7/codebank/pulls)

---

<b>1. Fork the project.</b> <br />
<b>2. Create a new branch with your changes: git 3. checkout -b my-feature</b> <br />
<b>3. Save your changes and create a commit message telling what you have done: git commit -m "feat: My new feature</b> <br />
<b>4. Submit your changes: git push origin my-feature</b>

<a id="author"></a>

## Author

---

## 👨‍💻 Author

<a href="https://github.com/pauloreis7">

<img style="border-radius: 50%;" src="https://avatars1.githubusercontent.com/u/63323224?s=400&v=4" width="100px;" alt=""/>

<b>Paulo Reis</b> 🏆

</a>

<p>Made by Paulo Reis 🤴 Contact us 👋</p>

<a href = "mailto:paulosilvadosreis2057@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/paulo-reis7/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
<a href="https://www.instagram.com/pauloreis.7" target="_blank"><img src="https://img.shields.io/badge/-Instagram-%23E4405F?style=for-the-badge&logo=instagram&logoColor=white" target="_blank"></a>

<a id="license"></a>

## 📝 License

---

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.🏛️
