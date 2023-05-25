import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import dbConnect from './config/dbConnect.js'
// import userAuthRouter from './routers/userAuthRouter.js'
import userAuthRouter from './routers/userAuthRouter.js'
import adminAuthRouter from './routers/adminAuthRouter.js'


const app=express()
app.use(express.json({limit:'50mb'}))
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.resolve()+'/public'))
app.use(
    cors({
        origin:[
            'http://localhost:3000'
        ],
        credentials:true,
    })
)

dbConnect()
app.use('/',userAuthRouter)
app.use('/admin/auth/',adminAuthRouter)

app.listen(5000,()=>{
    console.log('server running on port 5000 hello')
})