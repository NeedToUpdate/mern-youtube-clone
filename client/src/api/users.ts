import axios from "axios";
import { loginUri, userUri } from "../utils/URIs";

export async function registerUser({ username, password, confirmPassword }: { username: string; password: string; confirmPassword: string }) {
  return axios.post(userUri, { username, password, confirmPassword });
}
export async function loginUser({ username, password }: { username: string; password: string }) {
  return axios.post(loginUri, { username, password });
}
