import { FormData } from "@/components/main/main-form/Main-form";
import axios from "axios";

const $api = axios.create({
  timeout: 10000,
  baseURL: process.env.NEXT_PUBLIC_DEV_API,
});

export const sendForm = async (data: FormData) => {
  return await $api.post("/form/", data).catch((err) => {
    throw err;
  });
};
