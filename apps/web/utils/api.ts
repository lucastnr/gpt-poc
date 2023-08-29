import axios from "axios";
import { ChatCompletionChunk } from "openai/resources/chat";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface ChatStreamResponse {
  message: string;
  chunk: ChatCompletionChunk;
}

export const getCompletionStream = (
  prompt: string,
  options: {
    onMessage: (response: ChatStreamResponse) => void;
    onError?: () => void;
    onOpen?: () => void;
  }
) => {
  const uri = axiosClient.getUri({
    params: {
      prompt,
    },
  });
  const events = new EventSource(uri);
  events.onmessage = (event) => {
    options.onMessage?.(JSON.parse(event.data));
  };
  events.onerror = (ev) => {
    options.onError?.();
    events.close();
  };
  events.onopen = () => {
    options.onOpen?.();
  };
};
