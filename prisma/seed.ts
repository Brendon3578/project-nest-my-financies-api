import { PrismaClient } from '@prisma/client';
// rodar npx prisma db seed

// inicializar Prisma Client
const prisma = new PrismaClient();

async function createCategory(name: string, description: string) {
  return await prisma.category.upsert({
    where: { name },
    update: {},
    create: {
      name,
      description,
    },
  });
}

async function createEntry(
  name: string,
  description: string,
  paid: boolean,
  value: number,
  date: Date,
  type: string,
  category_id: number,
) {
  return await prisma.entry.create({
    data: {
      name,
      description,
      paid,
      value,
      date,
      type,
      category_id,
    },
  });
}

const dateWithEspecificMonth = (month: number = 1) =>
  new Date(new Date().setMonth(month));

async function main() {
  // criar duas categorias "dummy" (burras - sem valor)
  const category1 = await createCategory(
    'Moradia',
    'Pagamentos de Conta da Casa',
  );

  const category2 = await createCategory('Saúde', 'Plano de Saúde e Remédios');

  const category3 = await createCategory('Salário', 'Salário de emprego');

  const entry1 = await createEntry(
    'Conta de Água',
    'Conta água agosto',
    false,
    88.5,
    dateWithEspecificMonth(7),
    'despesa',
    category1.id,
  );

  const entry2 = await createEntry(
    'Remédio',
    'Remédio genérico',
    true,
    10.5,
    dateWithEspecificMonth(5),
    'despesa',
    category2.id,
  );

  const entry3 = await createEntry(
    'Salário',
    'Salário de emprego top',
    true,
    5350,
    dateWithEspecificMonth(10),
    'receita',
    category3.id,
  );

  console.log({ category1, category2, category3, entry1, entry2, entry3 });
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
