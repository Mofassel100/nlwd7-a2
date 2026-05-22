import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { TIssue } from "./issues.interface";

const issueCreate = async (payload: TIssue, id: string) => {
  const { description, title, type } = payload;
  const reporter_id = id;

  const result = await pool.query(
    `
     INSERT INTO issues(description,reporter_id,title,type) VALUES($1,$2,$3,$4) RETURNING *
      
      `,
    [description, reporter_id, title, type],
  );
  delete result.rows[0].password;

  return result;
};
const getAllIssuesFromDB = async () => {
  const result = await pool.query(
    `
    SELECT * FROM issues 
      
      `,
  );
  return result;
};

export const issueService = {
  issueCreate,
  getAllIssuesFromDB,
};
