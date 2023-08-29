import {
  BadRequestException,
  Controller,
  Get,
  MessageEvent,
  Query,
  Sse,
} from "@nestjs/common";
import { Observable, bufferTime, from, map } from "rxjs";
import { GptService } from "./gpt.service";

@Controller()
export class AppController {
  constructor(private readonly gptService: GptService) {}

  @Get()
  @Sse("completion-stream")
  async getCompletionStream(
    @Query() { prompt }: { prompt: string }
  ): Promise<Observable<MessageEvent>> {
    if (!prompt) {
      throw new BadRequestException("Prompt is required");
    }
    const result = await this.gptService.complete({ prompt, stream: true });
    let message = "";

    return from(result).pipe(
      bufferTime(100),
      map((chunks) => {
        chunks.forEach((chunk) => {
          const choice = chunk.choices[0];
          if (choice.finish_reason === null) {
            message += choice.delta.content;
          }
        });
        return {
          data: {
            chunk: chunks[chunks.length - 1],
            message,
          },
        };
      })
    );
  }
}
