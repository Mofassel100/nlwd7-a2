export default interface TUser {
  name: string;
  email: string;
  password: string;
  role: "contributor" | "maintainer";
}
