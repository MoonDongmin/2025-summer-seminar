import { Agentica } from "@agentica/core";
import {
  AgenticaRpcService,
  IAgenticaRpcListener,
  IAgenticaRpcService,
} from "@agentica/rpc";
import { WebSocketRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { HttpLlm, OpenApi } from "@samchon/openapi";
import OpenAI from "openai";
import { WebSocketAcceptor } from "tgrid";
import typia from "typia";

import { MyConfiguration } from "../../MyConfiguration";
import { MyGlobal } from "../../MyGlobal";

import { FigmaService } from "@wrtnlabs/connector-figma";
import { GmailService } from "@wrtnlabs/connector-gmail";
import { GoogleCalendarService } from "@wrtnlabs/connector-google-calendar";
import { EmailProvider } from "../../providers/mailer/EmailProvider";

@Controller("chat")
export class MyChatController {
  @WebSocketRoute()
  public async start(
    @WebSocketRoute.Acceptor()
    acceptor: WebSocketAcceptor<
      undefined,
      IAgenticaRpcService<"chatgpt">,
      IAgenticaRpcListener
    >,
  ): Promise<void> {
    const agent: Agentica<"chatgpt"> = new Agentica({
      model: "chatgpt",
      vendor: {
        api: new OpenAI({
          apiKey: MyGlobal.env.OPENAI_API_KEY,
          baseURL: "https://openrouter.ai/api/v1",  // OpenRouter base URL 설정
        }),
        model: "gpt-4o-mini",
      },
      controllers: [
        // {
        //   name: "Figma Connector",
        //   protocol: "class",
        //   application: typia.llm.application<FigmaService, "chatgpt">(),
        //   execute: new FigmaService(),
        // },
        {
          name: "Gmail Connector",
          protocol: "class",
          application: typia.llm.application<GmailService, "chatgpt">(),
          execute: new GmailService({
            // 한글 주석: 런타임에 최신 토큰을 동적으로 가져오도록 함수형으로 변경
            get googleClientId() {
              return process.env.GOOGLE_CLIENT_ID ?? MyGlobal.env.GOOGLE_CLIENT_ID!;
            },
            get googleClientSecret() {
              return process.env.GOOGLE_CLIENT_SECRET ?? MyGlobal.env.GOOGLE_CLIENT_SECRET!;
            },
            get googleRefreshToken() {
              const token = process.env.GOOGLE_REFRESH_TOKEN ?? MyGlobal.env.GOOGLE_REFRESH_TOKEN;
              if (!token) {
                throw new Error("GOOGLE_REFRESH_TOKEN이 설정되지 않았습니다. /email/google/auth-url에서 인증을 완료하세요.");
              }
              return token;
            },
          }),
        },
      ],
      config: {
        retry: 3,
        locale: "ko-KR",
        timezone: "Asia/Seoul",
      },
    });

    const service: AgenticaRpcService<"chatgpt"> = new AgenticaRpcService({
      agent,
      listener: acceptor.getDriver(),
    });
    await acceptor.accept(service);
  }
}
