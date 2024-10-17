import OpenAI from "openai"
import { config } from "dotenv"
import { readFileSync } from "fs"
import { resolve } from "path"

config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Читаем FAQ из файла
const faqPath = resolve("src/lib/faq.txt")
const faqContent = readFileSync(faqPath, "utf-8")

export async function POST({ request }) {
  try {
    const { prompt } = await request.json()

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: `FAQ:\n${faqContent}` },
        { role: "user", content: prompt }
      ],
      temperature: 0,
      max_tokens: 1000
    })

    return new Response(JSON.stringify(response), { status: 200 })
  }
  catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
