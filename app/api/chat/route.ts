import OpenAI from "openai";
import { NextResponse } from "next/server";
import { ResponseCreateParamsNonStreaming } from "openai/resources/responses/responses.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

interface ResponseCreateParamsWithThread extends ResponseCreateParamsNonStreaming {
  output_text?: string;
}

export async function POST(req: Request) {
  try {
    const { messages, promptType } = await req.json();

    const response = await openai.responses.create({
      model: "gpt-4o",
      input: [{ role: "system", content: promptType }, ...messages],
      store: true,
    } as ResponseCreateParamsWithThread);
    const message = response.output_text || "응답 없음 😅";
    return NextResponse.json({
      message,
      thread_id: response._request_id,
    });
  } catch (error: any) {
    console.error("GPT 요청 실패:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
