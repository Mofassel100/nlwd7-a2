import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { TIssue } from "./issues.interface";
import type TUser from "../auth/auth.interface";

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
const getSingleIssuesFromDB = async (id: string) => {
  const result = await pool.query(
    `
    SELECT * FROM issues WHERE id=$1
      
      `,
    [id],
  );
  return result;
};
// IssueUpdated successfully
const IssuesUpdatedFromDB = async (
  issueId: string,
  user: TUser,
  payload: TIssue,
) => {
  // console.log("IssueService:", issueId, user.role, payload);
  // const isUserExist = await pool.query(
  //   `
  //   SELECT * FROM users WHERE id=$1
  //     `,
  //   [],
  // );
  const isIssueExist = await pool.query(
    `
    SELECT * FROM issues WHERE id=$1
    `,
    [issueId],
  );
  const { description, title, type, status } = payload;
  if (isIssueExist.rows.length === 0) {
    throw new Error("Issue not found");
  }

  const isMaintainer = user.role === "maintainer";
  const isContributorAllowed = user.role === "contributor";
  console.log(isMaintainer, isContributorAllowed);
  if (!isMaintainer && !isContributorAllowed) {
    throw new Error("Unauthorized access");
  }
  if (user.role === "maintainer") {
    const result = await pool.query(
      `
    UPDATE issues 
    SET 
    description=COALESCE($1,description),
    title=COALESCE($2,title),
    type=COALESCE($3,type),
    status=COALESCE($4,status) 

    WHERE id=$5 RETURNING *
    `,
      [description, title, type, status, issueId],
    );

    return result;
  }
  const issue_reporter_id = isIssueExist.rows[0].reporter_id === user.id;
  const issue_status = isIssueExist.rows[0].status === "open";
  if (isContributorAllowed && issue_reporter_id && issue_status) {
    const result = await pool.query(
      `
    UPDATE issues 
    SET 
    description=COALESCE($1,description),
    title=COALESCE($2,title),
    type=COALESCE($3,type)
    WHERE id=$4 RETURNING *
    `,
      [description, title, type, issueId],
    );
    return result;
  }

  // console.log("isIssueExist", isIssueExist.rows[0]);
};

export const issueService = {
  issueCreate,
  getAllIssuesFromDB,
  getSingleIssuesFromDB,
  IssuesUpdatedFromDB,
};
