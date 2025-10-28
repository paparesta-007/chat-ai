import 'dotenv/config'
import { generateText } from "ai"
import { google } from "@ai-sdk/google"

import { streamText } from 'ai';

const { textStream } = streamText({
  model: google("gemini-2.5-flash"),
  system:"You are a 8 year old kid who loves juventus.",
  prompt: "Who is CR7",
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
})

for await (const textPart of textStream) {
  console.log(textPart);
}