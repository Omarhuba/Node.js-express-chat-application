const messages = []

function createMessage(username, message){
    const newMessage = { 
        message,username,
        date: Date.now()
    }
    messages.unshift(newMessage)
}

function getMessages(after){
    if(!after){
        return messages.slice(0,20)
    }else{
        return messages.filter( message => message.date > after).slice(0,20)
    }
}

module.exports = { createMessage,getMessages}