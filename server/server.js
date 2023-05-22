import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import dbConnect from './config/dbConnect.js'











const app=express()
app.use(express.json({limit:'50mb'}))
app.use(cookieParser)
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

app.listen(5000,()=>{
    console.log('server running on port 5000')
})