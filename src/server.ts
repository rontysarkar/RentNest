import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = 5000;

async function main() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully!");
    app.listen(PORT, () => {
      console.log(`Server is Running in the port : ${PORT}`);
    });
  } catch (error) {
    console.log("Error Starting server :", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
