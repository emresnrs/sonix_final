import { sqlDriver } from "@workspace/ui/db/client";
import { MIGRATIONS } from "@workspace/database/migrations";

let initializationPromise: Promise<void> | null = null;

export const initClientDb = () => {
  if (initializationPromise) return initializationPromise;

  initializationPromise = (async () => {
    console.log("[initClientDb] Starting database initialization");
    try {
      await sqlDriver`
        CREATE TABLE IF NOT EXISTS "_migrations" (
          "id" integer PRIMARY KEY AUTOINCREMENT,
          "name" text NOT NULL,
          "applied_at" integer DEFAULT (unixepoch() * 1000)
        );
      `;
      console.log("[initClientDb] _migrations table checked/created");

      const appliedMigrations =
        (await sqlDriver`SELECT name FROM "_migrations"`) as {
          name: string;
        }[];
      const appliedMigrationNames = new Set(
        appliedMigrations.map((m) => m.name)
      );

      for (const migration of MIGRATIONS) {
        if (!appliedMigrationNames.has(migration.name)) {
          console.log(`[initClientDb] Applying migration: ${migration.name}`);
          try {
            await sqlDriver`BEGIN TRANSACTION`;
            const statements = migration.sql.split("--> statement-breakpoint");

            for (const statement of statements) {
              if (statement.trim()) {
                const strings = [statement.trim()] as unknown as TemplateStringsArray;
                (strings as any).raw = [statement.trim()];
                await sqlDriver(strings);
              }
            }

            await sqlDriver`INSERT INTO "_migrations" (name) VALUES (${migration.name})`;
            await sqlDriver`COMMIT`;
            console.log(`[initClientDb] Migration ${migration.name} applied successfully`);
          } catch (error) {
            await sqlDriver`ROLLBACK`;
            console.error(
              `[initClientDb] Migration failed, changes rolled back: ${migration.name}`,
              error
            );
            throw error;
          }
        }
      }
      console.log("[initClientDb] Database initialization complete");
    } catch (error) {
      console.error("[initClientDb] Failed to initialize client database:", error);
      initializationPromise = null;
      throw error;
    }
  })();

  return initializationPromise;
};
