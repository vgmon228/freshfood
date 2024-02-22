const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, 
    sameSite: true
  }
}))
app.use(require('./routers'))



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})