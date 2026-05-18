import { testDatabaseConnection } from "./connection.js";

const result = await testDatabaseConnection();

console.log(result);

process.exit(result.connected ? 0 : 1);