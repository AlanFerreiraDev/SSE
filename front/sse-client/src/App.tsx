import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './queryClient'
import { useSSE } from './hooks/useSSE'

const App: React.FC = () => {
  const messages = useSSE('http://localhost:3333/sse')

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col items-center pt-10 bg-gradient-to-r from-light-blue via-blue to-light-blue">
        <h1 className="text-3xl font-semibold text-dark-blue mb-6 flex items-center gap-2">
          <span>🔵</span>
          Mensagens SSE
          <span>💬</span>
        </h1>
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg w-full max-w-md border border-blue">
          <ul className="space-y-2">
            {messages.map((msg, index) => (
              <li
                key={index}
                className="p-3 rounded-md bg-blue/10 text-dark-blue font-medium flex items-center gap-2"
              >
                <span>💠</span>
                {msg}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </QueryClientProvider>
  )
}

export default App
