import { useEffect, useState } from 'react'

export function useSSE(url: string) {
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    const eventSource = new EventSource(url)

    const handleMessage = (event: MessageEvent) => {
      // Todas as mensagens customizadas serão recebidas aqui
      setMessages((prev) => [...prev, event.data])
    }

    // Listener para mensagens padrão (event: message)
    eventSource.addEventListener('message', handleMessage)

    // Listener para o evento customizado "myCustomEvent"
    eventSource.addEventListener('myCustomEvent', handleMessage)

    eventSource.onerror = (err) => {
      console.error('SSE error:', err)
    }

    return () => {
      eventSource.removeEventListener('message', handleMessage)
      eventSource.removeEventListener('myCustomEvent', handleMessage)
      eventSource.close()
    }
  }, [url])

  return messages
}
