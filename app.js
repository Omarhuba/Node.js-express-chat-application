const express = require('express')
const req = require('express/lib/request')
const cookieParser = require('cookie-parser')
const app = express()
const Chat = require('./chat')

const PORT = process.env.PORT || 8080



app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('/', (req,res) => {
    if(req.cookies.username){
        res.redirect('/chat')
    }else{
        res.render('index')
    }
})

app.get('/chat', (req,res) => {
    if(!req.cookies.username){
        res.redirect('/')
    }else{
        res.render('pages/chat', {
            username: req.cookies.username,
            messages: Chat.getMessages()
        })
    }
})

app.post('/setname', (req,res) => {
    res.cookie('username', req.body.username)
    res.redirect('/chat')
})

app.post('/logout', (req,res) => {
    res.cookie("username", "", {maxAge:0})
    res.redirect('/')
})

app.get('/messages', (req,res)=>{
    const messages = req.query.after ?
    Chat.getMessages(req.query.after) :
    Chat.getMessages()
    res.render('partials/messages', {messages})
})


app.post('/messages', (req,res)=>{
    if(!req.cookies.username){
        res.redirect('/')
    }else{
        const {message} = req.body
        const {username} = req.cookies
        Chat.createMessage(username, message)
        res.redirect('/chat')
    }
    
})





app.listen(PORT, ()=>console.log(`SERVER STARTED AT PORT :${PORT}`))
