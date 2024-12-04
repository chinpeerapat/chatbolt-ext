import React, { useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import { getAIResponse } from './api'
import { AVAILABLE_MODELS } from './config'

function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0].id)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    setIsLoading(true)
    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')

    try {
      const response = await getAIResponse(newMessages, selectedModel)
      setMessages([...newMessages, response])
    } catch (error) {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container">
      <select 
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
        className="model-select"
      >
        {AVAILABLE_MODELS.map(model => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
      
      <div className="chat-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="message assistant-message">
            Thinking...
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          <FaPaperPlane />
        </button>
      </form>
    </div>
  )
}

export default App
