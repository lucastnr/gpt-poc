import { Injectable } from "@nestjs/common";
import OpenAI from "openai";
import { ChatCompletion, ChatCompletionChunk } from "openai/resources/chat";
import { Stream } from "openai/streaming";

@Injectable()
export class GptService {
  private model = "gpt-3.5-turbo-16k";
  private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  async complete<T extends boolean>({
    prompt,
    stream,
  }: {
    prompt: string;
    stream: T;
  }) {
    return this.openai.chat.completions.create({
      model: this.model,
      messages: [
        {
          content: "You can only answer in brazilian portuguese.",
          role: "system",
        },
        {
          content: prompt,
          role: "user",
        },
      ],
      stream,
    }) as unknown as Promise<
      T extends true ? Stream<ChatCompletionChunk> : ChatCompletion
    >;
  }
}
