(async ()=>{
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  const u = await prisma.user.findUnique({ where: { email: 'john@example.com' } }).catch(()=>null);
  console.log('user:', u);
  await prisma.$disconnect();
})();
