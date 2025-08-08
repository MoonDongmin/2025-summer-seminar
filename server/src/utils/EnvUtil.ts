import fs from "fs";
import path from "path";

import { MyConfiguration } from "../MyConfiguration";

/**
 * 환경변수 파일(.env) 업데이트 유틸리티
 *
 * - 지정된 키의 값을 .env 파일에 upsert
 * - 런타임에서도 process.env 값을 동기화
 */
export namespace EnvUtil {
  /**
   * 지정 키/값을 `.env` 파일에 upsert 하고, `process.env` 도 동기화
   */
  export function upsertEnv(key: string, value: string): void {
    // 유효성 검사
    if (!key || typeof key !== "string") {
      throw new Error("EnvUtil.upsertEnv: key 가 유효한 문자열이 아님");
    }

    const envPath = path.resolve(MyConfiguration.ROOT, ".env");
    let content = "";
    if (fs.existsSync(envPath)) {
      content = fs.readFileSync(envPath, "utf8");
    }

    const lines = content.length > 0 ? content.split(/\r?\n/) : [];
    const keyPattern = new RegExp(`^${escapeRegExp(key)}\s*=`);
    let found = false;
    const nextLines = lines.map((line) => {
      if (keyPattern.test(line)) {
        found = true;
        return `${key}=${escapeEnvValue(value)}`;
      }
      return line;
    });

    if (!found) nextLines.push(`${key}=${escapeEnvValue(value)}`);

    // 파일 저장 (말미 개행 보장)
    fs.writeFileSync(envPath, nextLines.join("\n") + "\n", "utf8");

    // 런타임 동기화
    process.env[key] = value;
  }

  function escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  /**
   * .env 값에 개행/공백이 들어가도 안전하도록 최소 이스케이프
   */
  function escapeEnvValue(v: string): string {
    // 공백이나 # 포함 시 쿼티드로 감싸기
    if (/\s|#/.test(v)) return JSON.stringify(v);
    return v;
  }
}


