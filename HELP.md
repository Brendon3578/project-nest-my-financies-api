<h1 align="center">
  API De Finanças criada utilizando <i> NestJs </i>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="32" alt="Nest Logo" /></a>
</h1>

## Iniciar a aplicação

```bash
# Baixar as dependências
npm install

# Iniciar o servidor nest no ambiente de desenvolvimento na porta 3000
npm run start
```

## Tecnologias

## Anotações de Estudo

### Principais Comandos

#### Nest Js

- `npm run start:dev`: iniciar o nest no ambiente de desenvolvimento
- `nest generate module categorias`: criar um módulo de categorias para agrupar o contexto de uma feature, no exemplo acima, feature de categorias
- `nest generate resource categorias`: criar todos os recursos (todos os métodos http do REST, ou GraphQL, micro-serviço, etc) de uma feature, podendo criar todos os entry points do CRUD
- `nest g service prisma`: gerar um serviço nest para agrupar os contratos de serviço do prisma
- `nest generate filter prisma-client-exception`: gerar um filter para agrupar exceções do prisma

#### Prisma

É uma ORM para modelagem de dados

`npm install @prisma/client`: instalar o prisma client
`npx prisma init`: iniciar o prisma dentro da pasta raiz
`npx prisma migrate dev`: criar uma migração (versionamento) para o banco de dados
`npx prisma studio`: ferramenta que abre no browser para visualizar e manipular os dados dos banco de dados

## Rodando a aplicação

```bash
# aplicação no ambiente de desenvolvimento
$ npm run start

# aplicação no ambiente watch mode (observação)
$ npm run start:dev

# aplicação no ambiente de produção
$ npm run start:prod
```

## Testes

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

## Estrutura da aplicação

Nessa aplicação Nest, a estrutura de arquivos da aplicação está da seguinte forma:

- O diretório `/src` contêm o *source code* (código fonte) da aplicação, que possui:
  - O módulo `categories` (categorias) que define os *endpoints* para a rota `/categories` e a lógica de negócio dessa rota.
  - O módulo `entries` (entradas) que define os *endpoints* para a rota `/entries` e a lógica de negócio dessa rota.
  - O diretório `exceptions` que dentro há a camada que lida com as exceções (erros) que ocorrem dentro da aplicação Nest
    - Dentro há o `prisma-client-exception` que é um filtro de exceções para lidar e manipular exceções ocorridas pelo Prisma ORM, para retornar ao cliente erros personalizado que podem ser tratados corretamente
  - O módulo e serviço `prisma` que configura o **Prisma Client** para ser utilizado dentro da aplicação Nest
  - O arquivo `main.ts`, que inicializa a aplicação **Nest** e define as configurações utilizadas por ela
- Arquivo `.env` que guarda as variáveis de ambiente da aplicação
- O diretório `/prisma` que contêm o esquema (*models* das tabelas) do Prisma, e as migrações do database
  - Arquivo `database.db` que guarda as informações do database SQL Lite

- As pastas `dto` que estão dentro de `/categories` e `/entries` contêm os DTOs (Data Transfer Object) que são objetos que definem como os dados serão enviados pela rede, são utilizados também para a validação dos valores enviados
- Os ***controller*** servem para lidar com as requisições e respostas para os endpoints. É através dos ***services*** que acessam o database
