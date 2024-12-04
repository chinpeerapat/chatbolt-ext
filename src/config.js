export const OPENROUTER_API_KEY = 'your-api-key-here'
export const APP_NAME = 'AI Assistant Extension'
export const SITE_URL = 'chrome-extension://' + chrome.runtime.id

export const AVAILABLE_MODELS = [
  { id: 'openai/gpt-4', name: 'GPT-4' },
  { id: 'anthropic/claude-3.5-sonnet:beta', name: 'Claude 3.5' },
  { id: 'google/gemini-flash-1.5-8b', name: 'Gemini' }
]
