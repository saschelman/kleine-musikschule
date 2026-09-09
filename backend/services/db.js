const { PrismaClient } = require("@prisma/client");

// Single shared Prisma client instance for the entire application.
// Creating multiple instances wastes database connections.
const prisma = new PrismaClient();

module.exports = prisma;
