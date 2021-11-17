const express = require('express')
const app = express()
const path = require('path')
const {eastern} = require('./data')
const authorizeUser = require('./middleware/authorizeUser')

app.use(authorizeUser)

app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'example.html'))
})

app.get('/api/eastern',(req,res)=>{
    const newEast = eastern.map((east)=>{
        const {id,teams,shopping,roster}= east
        return {id,teams,shopping,roster}
    })
    res.json(newEast)
})

app.get('/api/v1/teams',(req,res)=>{
    console.log(req.query)
    const { search }= req.query
    let sortEastern = eastern.map((team) => team.teams)

    if(search){
        sortEastern = sortEastern.filter((east)=>{
            return east[0].teamName.includes(search); 
        })
    }
    res.status(200).json(sortEastern)
})

app.get('/api/v2/shop',(req,res)=>{
    console.log(req.query)
    const { search }= req.query
    let sortEastern = eastern.map((item) => item.shopping)

    if(search){
        sortEastern = sortEastern.filter((east)=>{
            return east[0].player.includes(search); 
        })
    }
    res.status(200).json(sortEastern)
})

app.get('/api/v3/roster',(req,res)=>{
    console.log(req.query)
    const { search }= req.query
    let sortEastern = eastern.map((players) => players.roster)

    if(search){
        sortEastern = sortEastern.filter((east)=>{
            return east[0].player.includes(search); 
        })
    }
    res.status(200).json(sortEastern)
})

app.listen(5000,()=>{
    console.log('Server is listening on port 5000......')
})