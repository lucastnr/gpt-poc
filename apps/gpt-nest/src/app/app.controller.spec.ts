import { BadRequestException } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { GptService } from "./gpt.service";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [GptService],
      imports: [ConfigModule.forRoot()],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("root", () => {
    it("should throw error from missing prompt", async () => {
      try {
        await appController.main({ prompt: undefined });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
