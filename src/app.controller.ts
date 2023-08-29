import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import { GptService } from "./gpt.service";

@Controller()
export class AppController {
  constructor(private readonly gptService: GptService) {}

  @Get()
  main(@Query() { prompt }: { prompt: string }) {
    if (!prompt) {
      throw new BadRequestException("Prompt is required");
    }
    return this.gptService.complete(prompt);
  }
}
