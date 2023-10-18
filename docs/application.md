# 📁 Estrutura da Aplicação

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
