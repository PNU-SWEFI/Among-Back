const express = require(`express`)
const cors = require(`cors`)
const session = require(`express-session`)
const cookieParser = require(`cookie-parser`)
const morgan = require(`morgan`)
const path = require(`path`)
const db = require(`./models`)

const app = express()



db.sequelize.sync({force: false})
    .then(() =>{
        console.log(`db 연결 성공`)
    })
    .catch(console.error)
passportConfigure()

app.use(morgan(`dev`))
app.use(cors({
    // frontserver address
    origin: true,
    credentials: true
}))


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET
}))


app.listen(3065, () =>{
    console.log(`서버 실행 중..`)
})
