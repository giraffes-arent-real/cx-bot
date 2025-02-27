import { exec as childProcessExec } from "child_process";
import type { safeExecResult } from "../../typings";
import { promisify } from "util";
import fetch from "node-fetch"

export async function safeExec(command: string): Promise<safeExecResult> {
  try {
    const result = await exec(command);
    return { ...result, exitCode: 0, err: null };
  } catch (err) {
    return {
      err: err as Error,
      stdout: "",
      stderr: (err as Error).message,
      exitCode: ((err as Error & { code: number }).code ?? 1) as number,
    };
  }
}

export async function getCat() {

  let cat = await fetch("https://api.thecatapi.com/v1/images/search", { headers: {"X-API-KEY": process.env.CAT_API_KEY}})
  return cat.url;

}

const exec = promisify(childProcessExec);