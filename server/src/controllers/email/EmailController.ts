import core from "@nestia/core";
import { Controller, Get, Query } from "@nestjs/common";

import { EmailProvider } from "../../providers/mailer/EmailProvider";
import { EnvUtil } from "../../utils/EnvUtil";
import { GoogleOAuth } from "../../utils/GoogleOAuth";
import { MyGlobal } from "../../MyGlobal";

/**
 * Email HTTP Controller.
 *
 * - Exposes a simple HTTP API to send emails
 * - Uses the internal `EmailProvider` (Gmail connector wrapper)
 * - Mirrors the style of the BBS controllers for consistency
 */
@Controller("email")
export class EmailController {
  /**
   * Google OAuth: 인증 URL 발급
   */
  @Get("google/auth-url")
  public authUrl(): { url: string } {
    // 한글 주석: 인증 URL을 생성하여 클라이언트에 반환
    const url = GoogleOAuth.generateAuthUrl();
    return { url };
  }

  /**
   * Google OAuth: 콜백 (code -> refresh token 교환 및 저장)
   */
  @Get("google/callback")
  public async callback(@Query("code") code?: string): Promise<{ saved: boolean; hasRefreshToken: boolean }>{
    // 한글 주석: code 파라미터가 없으면 오류
    if (!code) throw new Error("Google OAuth 'code' 파라미터가 필요합니다.");

    const { refreshToken } = await GoogleOAuth.exchangeCodeForTokens({ code });
    if (!refreshToken) {
      // 한글 주석: refresh token 이 오지 않는 경우가 있으므로, prompt=consent 로 다시 동의 유도 필요
      return { saved: false, hasRefreshToken: false };
    }

    // 한글 주석: .env 파일과 런타임 환경변수에 저장
    EnvUtil.upsertEnv("GOOGLE_REFRESH_TOKEN", refreshToken);
    return { saved: true, hasRefreshToken: true };
  }

  /**
   * Send an email.
   *
   * This endpoint accepts recipient, subject (optional), and message body
   * and sends a simple HTML email using Gmail connector.
   */
  @core.TypedRoute.Post("send")
  public async send(
    @core.TypedBody() input: EmailController.ISendInput,
  ): Promise<EmailController.ISendOutput> {
    // 한글 주석: refresh token 이 없다면, 인증 URL 안내를 포함한 오류를 던짐
    if (!MyGlobal.env.GOOGLE_REFRESH_TOKEN) {
      const url = GoogleOAuth.generateAuthUrl();
      const err: any = new Error("GOOGLE_REFRESH_TOKEN 이 설정되지 않았습니다. 먼저 아래 URL로 인증을 완료하세요.");
      err.authUrl = url;
      throw err;
    }
    const id = await EmailProvider.sendSimpleEmail({
      to: input.to,
      subject: input.subject ?? "Message from Agentica",
      bodyText: input.message,
    });
    return { id };
  }
}

export namespace EmailController {
  export interface ISendInput {
    /** Recipient email address */
    to: string;
    /** Email subject (optional). Defaults to "Message from Agentica" */
    subject?: string;
    /** Plain text message body */
    message: string;
  }

  export interface ISendOutput {
    /** Provider-specific message id */
    id: string;
  }
}


