import { Pool } from "pg";
import { config } from "../config";
export const pool = new Pool({
  connectionString: config.connection_string,
});
export const initDB = async () => {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role VARCHAR(30) NOT NULL DEFAULT 'contributer',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `);

    await pool.query(`
    DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'post_type'
    ) THEN
        CREATE TYPE post_type AS ENUM ('bug', 'feature_request');
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'issue_status'
    ) THEN
        CREATE TYPE issue_status AS ENUM ('open', 'in_progress', 'resolved');
    END IF;
END$$;
      CREATE TABLE IF NOT EXISTS issues(
      id SERIAL PRIMARY KEY,
      title VARCHAR(150) NOT NULL,
      description TEXT NOT NULL,
      CONSTRAINT description_min_length CHECK (char_length(description)>=20),
      type post_type NOT NULL,
      status issue_status NOT NULL DEFAULT 'open',
      reporter_id INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )
        `);

    console.log("Database connected successfully!");
  } catch (error) {
    console.log(error);
  }
};
