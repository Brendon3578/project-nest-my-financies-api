<h1> 📁 Estrutura da Aplicação </h1>

A aplicação **Projeto NestJS - API De Finanças** criada em NestJS foi estrutura da seguinte forma:

- [Estrutura de pastas do NestJS](#estrutura-de-pastas-do-nestjs)
  - [Diretório /common e /configuration](#diretório-common-e-configuration)
  - [Diretório /auth](#diretório-auth)
- [Utilização do Prisma ORM](#utilização-do-prisma-orm)
  - [Comandos do Prisma utilizados na construção da aplicação](#comandos-do-prisma-utilizados-na-construção-da-aplicação)

## Estrutura de pastas do NestJS

 [/src](../src/) - contêm o arquivo fonte da aplicação nest, nela é inicializada a aplicação em si, e é definido toda a regra de negócio da API: controllers, DTOs, services, guards, serviços de autenticação, entre outros artefatos

- [main.ts](../src/main.ts) - é o arquivo principal da aplicação Nest, no qual é instanciado a aplicação, e dentro dessa instância é definido as configurações que são usadas em torno de toda aplicação:
  - O ***port***: definido para inicializar na porta 3000  `http//localhost:3000`
  - ***exception filters***: registrados globalmente para exceções que são disparadas em qualquer ***endpoint*** da aplicação e retornar um erro *user-friendly* de ser tratado
  - **pipes**: registrados globalmente para validar as requisições que são feitas em todos os ***endpoints***
- [app-module.ts](../src/app.module.ts): é o módulo **root** (raiz) da aplicação, nele o NestJs configura automaticamente todas as injeções de dependências usadas entorno da aplicação, sendo também utilizado para definir algumas configurações globais

### Diretório /common e /configuration

[/config/](../src/configuration/) - diretório que guarda o [config.ts](../src/configuration/config.ts) que define as variáveis de ambiente para ser usado na aplicação, Ex: Secret Token do JWT

[/common/](../src/common/) - é um diretório usado para guardar ficheiros que são utilizados em qualquer parte da aplicação

- [/common/prisma/](../src/common/prisma/) - usado pra guardar o Prisma Client, que é inicializado de forma global e utilizado como um **service** do Nest dentro da aplicação, para interagir com o BD
- [/common/errors/](../src/common/errors/) - usado para guardar erros criados que são disparados entorno da aplicação. Ex: [erro de relacionamento inválido](../src/common/errors/invalid-relation.error.ts)
- [/common/exceptions/](../src/common/exceptions/) - usado para guardar ***exception filters*** (filtros de exceções) para manipular erros e retornar um erro *user-friendly* de ser tratado. Ex: [tratar erros disparados pelo Prisma Client](../src/common/exceptions/prisma-client-exception/prisma-client-exception.filter.ts)

### Diretório /auth

[/auth](../src/auth/) - diretório que guarda a camada de **autenticação da aplicação**

Nela é definido o **módulo, controller e service** da autenticação e o **guard** utilizado em alguns endpoints da aplicação para barrar que o acesso que não está autenticado. Também é definido a estratégia JWT usada pela biblioteca **PassportJS**

- [auth.module.ts](../src/auth/auth.controller.ts) - módulo que configura:
  - a estratégia usada pelo PassportJS (que é o JWT)
  - define as configurações utilizados pelo módulo e serviço JWT: a chave **secret**, e a expiração do token
- [auth.controller.ts](../src/auth/auth.controller.ts) - controller que define a rota HTTP utilizada para se autenticar que é `auth/login`
- [auth.service.ts](../src/auth/auth.controller.ts) - serviço que tem o papel de validar de fato, se o usuário existe ou se a senha (que está criptografada) está correta e  retornar o **token de acesso do JWT assinado**

Nesse diretório também é definido o DTO da requisição POST do endpoint `auth/login` para se autenticar através do JWT, que verifica se o email e a senha é valida (se são strings, etc) e o Entity que é retornado ao fazer a requisição de autenticação, que no caso, é um json simples contendo accessToken do JWT

## Utilização do Prisma ORM

- [/prisma](../prisma/) - contêm o *schema* e outros arquivos envolvendo o ecossistema do Prisma, que é um Object-Relational Mapping (ORM) utilizado para abstrair a complexidade de se utilizar, manipular e fazer consultas dentro de um banco de dados em uma aplicação de backend do Node.js
  - [schema.prisma](../prisma/schema.prisma) - é o ***schema*** do prisma, utilizando para mapear e modelar as entidades (tabelas do banco de dados) que vão ser utilizadas dentro da aplicação
  - [database.db](../prisma/database.db) - é o banco de dados do SQLite, que é criado e utilizado localmente
  - [seed.ts](../prisma/seed.ts) - arquivo com o objetivo de popular o banco de dados do SQL lite, inserindo dados fictícios
  - [/migrations](../prisma//migrations/) - diretório que armazena as migrações (versionamento do banco de dados)
  - [/dbml](../prisma/dbml/) - diretório que armazena o arquivo [Database Markup Language (DBML)](https://github.com/holistics/dbml) que é um **Diagram as Code** utilizado para criar o Diagrama de Entidade-Relacionamento (ER) do BD, que pode ser visualizado através da plataforma: <https://dbdiagram.io/>

### Comandos do Prisma utilizados na construção da aplicação

```bash
# iniciar o prisma dentro da pasta rai
npx prisma init

# popular o banco de dados, através do arquivo 'seed.ts' - configurado no package.json
npx prisma db seed

# gerar o prisma client, e o diagrama ER com base no schema feito
npx prisma generate

# criar uma nova migration (versionamento do BD)
npx prisma migrate dev

# iniciar uma interface web para visualizar e manipular os registros do banco de dados
npx prisma studido
```

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
