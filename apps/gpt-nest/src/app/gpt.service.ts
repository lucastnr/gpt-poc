import { Injectable } from "@nestjs/common";
import OpenAI from "openai";

@Injectable()
export class GptService {
  private model = "gpt-3.5-turbo-16k";
  private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  constructor() {}

  async complete(prompt: string) {
    return this.openai.chat.completions.create({
      model: this.model,
      messages: [
        {
          content: prompt,
          role: "user",
        },
      ],
    });
  }
}