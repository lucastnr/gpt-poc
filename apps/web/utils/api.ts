import axios from "axios";
import OpenAI from "openai";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCompletion = (prompt: string) => {
  console.log(process.env.NEXT_PUBLIC_API_URL);
  return axiosClient.get<OpenAI.Chat.ChatCompletion>("/", {
    params: {
      prompt,
    },
  });
};
