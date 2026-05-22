import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import type TUser from "./auth.interface";
// User Signup
const userSignup = async (payload: TUser) => {
  const { name, email, password, role } = payload;
  const hashPassord = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `
     INSERT INTO users(name, email,password,role) VALUES($1,$2,$3,$4) RETURNING * 
      `,
    [name, email, hashPassord, role],
  );
  delete result.rows[0].password;
  return result;
};
// User login
const userLogin = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;
  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email=$1`,
    [email],
  );
  if (userData.rows.length === 0) {
    throw new Error("User not found!");
  }
  const user = userData.rows[0];
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new Error("Password is wrong");
  }
  const token = jwt.sign(user, config.secret as string, {
    expiresIn: "2d",
  });
  delete user.password;
  return { token, user };
};
export const authService = {
  userSignup,
  userLogin,
};
