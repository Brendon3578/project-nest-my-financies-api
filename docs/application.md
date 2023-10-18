# 📁 Estrutura da Aplicação

Nessa aplicação Nest, a estrutura de arquivos da aplicação está da seguinte forma:

## Utilização do Prisma ORM

- [/prisma](../prisma/) - contêm o *schema* e outros arquivos envolvendo o ecossistema do Prisma, que é um Object-Relational Mapping (ORM) utilizado para abstrair a complexidade de se utilizar, manipular e fazer consultas dentro de um banco de dados em uma aplicação de backend do Node.js
  - [schema.prisma](../prisma/schema.prisma) - é o ***schema*** do prisma, utilizando para mapear e modelar as entidades (tabelas do banco de dados) que vão ser utilizadas dentro da aplicação
  - [database.db](../prisma/database.db) - é o banco de dados do SQLite, que é criado e utilizado localmente
  - [seed.ts](../prisma/seed.ts) - arquivo com o objetivo de popular o banco de dados do SQL lite, inserindo dados fictícios
  - [/migrations](../prisma//migrations/) - diretório que armazena as migrações (versionamento do banco de dados)
  - [/dbml](../prisma/dbml/) - diretório que armazena o arquivo [Database Markup Language (DBML)](https://github.com/holistics/dbml) que é um **Diagram as Code** utilizado para criar o Diagrama de Entidade-Relacionamento (ER) do BD, que pode ser visualizado através da plataforma: <https://dbdiagram.io/>

### Comandos utilizados do prisma

- `npx prisma init`: iniciar o prisma dentro da pasta raiz
- `npx prisma migrate dev`: criar uma migração (versionamento) para o banco de dados
- `npx prisma studio`: ferramenta que abre no browser para visualizar e manipular os dados dos banco de dados

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
