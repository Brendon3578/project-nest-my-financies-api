<h1 align="center">
  API De Finanças criada utilizando <i> NestJs </i>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="32" alt="Nest Logo" /></a>
</h1>

<center>

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

</center>

## 🔥 Iniciar a aplicação

```bash
# Baixar as dependências
npm install

# Popular o banco de dados através do Prisma (prisma/seed.ts)
npx prisma db seed

# Iniciar o servidor nest no ambiente de desenvolvimento na porta 3000
npm run start:dev
```

## ✨ Tecnologias

- [NestJS](https://nestjs.com/): framework utilizado para criar a aplicação do servidor
- [Prisma](https://www.prisma.io/): Object-Relational Mapping (ORM) utilizado para facilitar a conexão entre o servidor web Nest e o banco de dados SQLite criado localmente (no arquivo `db.json`)
- [SQLite Database](https://www.sqlite.org/): Banco de dados utilizado para produzir um banco de dados simples e rápido dentro da aplicação

## 🔮 Estrutura da aplicação

Nessa aplicação Nest, a estrutura de arquivos da aplicação está da seguinte forma:

- 📁 O diretório `/src` contêm o *source code* (código fonte) da aplicação, que possui:
  - 🛒 O módulo `categories` (categorias) que define os *endpoints* para a rota `/categories` e a lógica de negócio dessa rota.
  - 🛒O módulo `entries` (entradas) que define os *endpoints* para a rota `/entries` e a lógica de negócio dessa rota.
  - 📁 O diretório `exceptions` que dentro há a camada que lida com as exceções (erros) que ocorrem dentro da aplicação Nest
    - ❗ Dentro há o `prisma-client-exception` que é um filtro de exceções para lidar e manipular exceções ocorridas pelo Prisma ORM, para retornar ao cliente erros personalizado que podem ser tratados corretamente
  - 🛒 O módulo e serviço `prisma` que configura o **Prisma Client** para ser utilizado dentro da aplicação Nest
- 🔨 O arquivo `main.ts`, que inicializa a aplicação **Nest** e define as configurações utilizadas por ela
- 🔨 Arquivo `.env` que guarda as variáveis de ambiente da aplicação
- 📁 O diretório `/prisma` que contêm o esquema (*models* das tabelas) do Prisma, e as migrações do database
  - 🗄 Arquivo `database.db` que guarda as informações do database SQL Lite

- As pastas `dto` que estão dentro de `/categories` e `/entries` contêm os DTOs (Data Transfer Object) que são objetos que definem como os dados serão enviados pela rede, são utilizados também para a validação dos valores enviados
- Os ***controller*** servem para lidar com as requisições e respostas para os endpoints. É através dos ***services*** que acessam o database

---

## Anotações de Estudo

### Principais Comandos

- Comandos do **NestJS**:
  - `npm run start:dev`: iniciar o nest no ambiente de desenvolvimento
  - `nest generate module categorias`: criar um módulo de categorias para agrupar o contexto de uma feature, no exemplo acima, feature de categorias
  - `nest generate resource categorias`: criar todos os recursos (todos os métodos http do REST, ou GraphQL, micro-serviço, etc) de uma feature, podendo criar todos os entry points do CRUD
  - `nest g service prisma`: gerar um serviço nest para agrupar os contratos de serviço do prisma
  - `nest generate filter prisma-client-exception`: gerar um filter para agrupar exceções do prisma
- Comandos do **Prisma**:
  - `npm install @prisma/client`: instalar o prisma client
  - `npx prisma init`: iniciar o prisma dentro da pasta raiz
  - `npx prisma migrate dev`: criar uma migração (versionamento) para o banco de dados
  - `npx prisma studio`: ferramenta que abre no browser para visualizar e manipular os dados dos banco de dados

#### Rodando a aplicação

```bash
# aplicação no ambiente de desenvolvimento
$ npm run start

# aplicação no ambiente watch mode (observação)
$ npm run start:dev

# aplicação no ambiente de produção
$ npm run start:prod
```

#### Testes

```bash
# Rodar testes unitários
$ npm run test

# Rodar testes e2e
$ npm run test:e2e

# Ver cobertura dos testes
$ npm run test:cov
```

## Anotações

### Diferença entre os métodos HTTP: Patch x Put

- `PUT`: Atualizar o recurso por **completo**, é obrigado a passar **TODOS** os dados
- `PATCH`: Atualização **parcial**, passar todos os dados, ou apenas um único grupo de dados

### Nest Repl

É possível rodar um ambiente REPL (Read-Eval-Print-Loop) para testar o back-end do nest pelo terminal, você pode chamar os métodos dos providers e controllers pelo terminal.

Você cria um arquivo repl.ts e testa usando o comando `npm run start -- --entryFile repl`

```ts
// repl.ts
import { repl } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  await repl(AppModule);
}

bootstrap();
```
