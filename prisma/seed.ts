import prisma from "../src/database";

async function main() {
    // Estutura de Seed Padrão
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
})
