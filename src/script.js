import PrismaClient from '@prisma/client';

const prisma = new PrismaClient.PrismaClient();

async function main() {
  const newLink = await prisma.link.create({
    data: {
      description: 'How to GraphQL',
      url: 'www.howtographql.com',
    },
  });
  const allLinks = await prisma.link.findMany();
  console.log(allLinks, newLink);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
