<h1 align="center">
  Projeto NestJS - API De Finanças
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="32" alt="Nest Logo" /></a>
</h1>

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

<p align="center">
  <img alt="Imagem do Swagger UI" src="./docs/assets/banner.png" width="580px">
</p>

## 🗿 Projeto

Essa aplicação é um Backend de servidor web RESTful criado com o framework **NestJS** para controle de financias pessoais (ou grupo de pessoas ou um projeto)

Ele foi feito para servir de Back-end de API para outra aplicação web de front-end feita com o framework Angular chamada [Minhas Financias](https://github.com/Brendon3578/project-angular-my-financies)

Com ele é possível:

- Cadastrar e autenticar usuário via JWT (JSON Web Tokens)
- Criar financias de despesa e entrada para controle financeiro e categorizá-las via tags de categorias
- Criar áreas de trabalho para centralizar os gastos financeiros de equipes ou setores
- Adicionar ou remover Usuários dentro dessa área de trabalho permitindo a colaboração e monitoramento continuo nos gastos

## 🔥 Iniciar a aplicação

```bash
# Baixar as dependências
npm install

# Popular o banco de dados através do Prisma (prisma/seed.ts)
npx prisma db seed

# Iniciar o servidor nest no ambiente de desenvolvimento na porta 3000
npm run start:dev
```

> Os endpoints da API foi documentados utilizando o Swagger UI, para acessar a documentação basta inicializar a aplicação e abrir a seguinte URL `http://localhost:3000/v1/docs`

## ✨ Tecnologias

- [NestJS](https://nestjs.com/) - framework utilizado para criar a aplicação do servidor
- [Prisma](https://www.prisma.io/) - Object-Relational Mapping (ORM) utilizado para facilitar a conexão entre o servidor web Nest e o banco de dados SQLite criado localmente (no arquivo `db.json`)
- [SQLite Database](https://www.sqlite.org/) - Banco de dados utilizado para a implementação um banco de dados simples e rápido dentro da aplicação de forma local
- [PassportJS](https://www.passportjs.org/) - biblioteca  para autenticação de rotas do nest via estratégia [JWT ( JSON Web Token)](https://jwt.io/)
- [Swagger UI](https://swagger.io/tools/swagger-ui/) - ferramenta utilizada para documentar a API através de uma Interface fácil de ser usada e manipular a API em tempo real

## 🔮 Estrutura da aplicação

Para ver a estrutura da aplicação o funcionamento de cada parte da aplicação, veja [📁 Estrutura da Aplicação](./docs/application.md)

## Estrutura do Banco de Dados

Diagrama de Entidade-Relacionamento (ER) do Banco de Dados

<center>
  <img src="./prisma/dbml/diagram.png" alt="Diagrama de Entidade-Relacionamento">
</center>

## Outros comandos

```bash
# aplicação no ambiente de desenvolvimento
$ npm run start

# aplicação no ambiente watch mode (observação)
$ npm run start:dev

# aplicação no ambiente de produção
$ npm run start:prod

# Rodar testes unitários
$ npm run test

# Rodar testes e2e
$ npm run test:e2e

# Ver cobertura dos testes
$ npm run test:cov
```

<h3 align="center">
    Feito com ☕ por <a href="https://github.com/Brendon3578"> Brendon Gomes</a>
</h3>
