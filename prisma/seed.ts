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

async function createOrganization({ admin_id, title, description }) {
  const organization = await prisma.organization.create({
    data: {
      admin_id,
      title,
      description,
    },
  });

  // create relationship
  await prisma.usersOnOrganizations.create({
    data: {
      user_id: admin_id,
      organization_id: organization.id,
    },
  });

  return organization;
}

async function createCategory({ organization_id, name, description }) {
  return await prisma.category.create({
    data: {
      organization_id,
      name,
      description,
    },
  });
}

async function createEntry({
  author_id,
  category_id,
  organization_id,
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
      organization_id,
    },
  });
}

const dateWithSpecificMonth = (month: number = 1) =>
  new Date(new Date().setMonth(month));

async function main() {
  // criar duas categorias "dummy" (burras - sem valor)
  const user = await createUser({
    name: 'Tester user',
    email: 'testeruser@email.com',
    password: '123',
  });

  const organization = await createOrganization({
    admin_id: user.id,
    title: 'Área de Trabalho de Teste sobre Faturamento da AWS',
    description: 'Faturamento do projeto AWS - FinOps',
  });

  const category = await createCategory({
    organization_id: organization.id,
    name: 'Amazon EC2',
    description: 'Faturamento mensal de instâncias EC2 da AWS',
  });

  const entry = await createEntry({
    category_id: category.id,
    organization_id: organization.id,
    author_id: user.id,
    name: 'instância EC2 t2.micro',
    description: 'Faturamento mensal da instância EC2 t2.micro Linux',
    paid: true,
    type: 'saldo',
    date: dateWithSpecificMonth(7),
    value: 30.3,
  });

  console.log({ user, organization, category, entry });
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
