import { google } from "googleapis";

import { MyGlobal } from "../MyGlobal";

/**
 * Google OAuth 유틸리티
 *
 * - 인증 URL 생성
 * - 콜백 코드로 토큰 교환 (access + refresh)
 */
export namespace GoogleOAuth {
  /**
   * 인증 URL 생성
   */
  export function generateAuthUrl(params?: { redirectUri?: string }): string {
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = MyGlobal.env;
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET)
      throw new Error("GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET 이(가) 필요합니다.");

    const redirectUri =
      params?.redirectUri ??
      process.env.GOOGLE_REDIRECT_URI ??
      `http://localhost:${MyGlobal.env.API_PORT}/email/google/callback`;

    const oauth2 = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      redirectUri,
    );

    return oauth2.generateAuthUrl({
      access_type: "offline", // refresh token 발급을 위해 필수
      prompt: "consent", // 이미 동의한 계정에서도 refresh token 보장
      scope: ["https://mail.google.com/"],
    });
  }

  /**
   * 콜백 코드로 토큰 교환
   */
  export async function exchangeCodeForTokens(args: {
    code: string;
    redirectUri?: string;
  }): Promise<{ accessToken: string; refreshToken?: string }>
  {
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = MyGlobal.env;
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET)
      throw new Error("GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET 이(가) 필요합니다.");

    const redirectUri =
      args.redirectUri ??
      process.env.GOOGLE_REDIRECT_URI ??
      `http://localhost:${MyGlobal.env.API_PORT}/email/google/callback`;

    const oauth2 = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      redirectUri,
    );

    const { tokens } = await oauth2.getToken(args.code);
    return {
      accessToken: tokens.access_token ?? "",
      refreshToken: tokens.refresh_token ?? undefined,
    };
  }
}


