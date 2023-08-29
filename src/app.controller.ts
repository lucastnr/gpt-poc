import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  constructor() {}

  @Get("teste")
  getHello() {
    return "Hello World!";
  }
}
