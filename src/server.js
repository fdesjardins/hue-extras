const express = require('express')

const app = express()

app.get('*', (req, res) => {
  res.json({ done: true })
})

const server = app.listen(9595)
