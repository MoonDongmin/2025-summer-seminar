import { Module } from "@nestjs/common";

import { EmailController } from "./EmailController";

@Module({
  controllers: [EmailController],
})
export class EmailModule {}


