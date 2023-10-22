// run: 'npx prisma db seed'
import { PrismaClient } from '@prisma/client';

import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
// inicializar Prisma Client

// bcrypt configure
const roundsOfHashing = 10;

async function createUser({ name, email, password }) {
  const hashedPassword = await bcrypt.hash(password, roundsOfHashing);

  return await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
    },
    create: {
      name,
      password: hashedPassword,
      email,
    },
  });
}

async function createWorkspace({ admin_id, title, description }) {
  const workspace = await prisma.workspace.create({
    data: {
      admin_id,
      title,
      description,
    },
  });

  // create relationship
  await prisma.usersOnWorkspaces.create({
    data: {
      user_id: admin_id,
      workspace_id: workspace.id,
    },
  });

  return workspace;
}

async function createCategory({ workspace_id, name, description }) {
  return await prisma.category.create({
    data: {
      workspace_id,
      name,
      description,
    },
  });
}

async function createEntry({
  author_id,
  category_id,
  workspace_id,
  name,
  description,
  value,
  type,
  paid,
  date,
}) {
  return await prisma.entry.create({
    data: {
      name,
      description,
      paid,
      value,
      date,
      type,
      category_id,
      author_id,
      workspace_id,
    },
  });
}

const dateWithSpecificMonth = (month: number = 1) =>
  new Date(new Date().setMonth(month));

async function main() {
  // criar duas categorias "dummy" (burras - sem valor)
  const user = await createUser({
    name: 'Brendon Gomes',
    email: 'brendonemail@email.com',
    password: '12345678',
  });

  const workspace = await createWorkspace({
    admin_id: user.id,
    title: 'Faturamento da AWS',
    description: 'Faturamento do projeto AWS - FinOps',
  });

  const category = await createCategory({
    workspace_id: workspace.id,
    name: 'Amazon EC2',
    description: 'Faturamento mensal de instâncias EC2 da AWS',
  });

  const entry = await createEntry({
    category_id: category.id,
    workspace_id: workspace.id,
    author_id: user.id,
    name: 'instância EC2 t2.micro',
    description: 'Faturamento mensal da instância EC2 t2.micro Linux',
    paid: true,
    type: 'saldo',
    date: dateWithSpecificMonth(7),
    value: 30.3,
  });

  console.log({ user, workspace, category, entry });
}

// executar a função principal
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // fechar Prisma Client no final da execução
    await prisma.$disconnect();
  });
