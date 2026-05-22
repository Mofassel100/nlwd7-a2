export default interface TUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: "contributor" | "maintainer";
}
