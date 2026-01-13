import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

config({
  path: ".env.local",
});

const runMigrate = async () => {
  // Skip migrations during Vercel build - they should run at runtime
  if (process.env.VERCEL === "1") {
    console.log("⏭️  Skipping migrations during Vercel build (will run at runtime)");
    process.exit(0);
  }

  if (!process.env.POSTGRES_URL) {
    console.log("⏭️  POSTGRES_URL not defined, skipping migrations");
    process.exit(0);
  }

  // Configure postgres connection with timeout
  const connection = postgres(process.env.POSTGRES_URL, {
    max: 1,
    connect_timeout: 10,
  });

  const db = drizzle(connection);

  console.log("⏳ Running migrations...");

  try {
    const start = Date.now();
    await migrate(db, { migrationsFolder: "./lib/db/migrations" });
    const end = Date.now();

    console.log("✅ Migrations completed in", end - start, "ms");
    await connection.end();
    process.exit(0);
  } catch (error) {
    await connection.end();
    throw error;
  }
};

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});
