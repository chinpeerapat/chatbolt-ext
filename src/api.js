import OpenAI from 'openai'
import { OPENROUTER_API_KEY, APP_NAME, SITE_URL } from './config'

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': SITE_URL,
    'X-Title': APP_NAME,
  }
})

export async function getAIResponse(messages, model) {
  try {
    const completion = await openai.chat.completions.create({
      model: model,
      messages: messages
    })
    return completion.choices[0].message
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
