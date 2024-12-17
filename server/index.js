const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500)
        res.end('Error loading index.html')
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(data)
      }
    })
  } else if (req.url === '/sse') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    })

    let messageCounter = 0
    const intervalId = setInterval(() => {
      const someMessage = `Message: ${messageCounter}`
      const payload = `event: myCustomEvent\ndata: ${someMessage}\n\n`
      res.write(payload)
      messageCounter++
    }, 1000)

    req.on('close', () => {
      clearInterval(intervalId)
    })
  } else {
    res.writeHead(404)
    res.end('Not Found')
  }
})

server.listen(3333, () => {
  console.log('Server running at http://localhost:3333/')
})
