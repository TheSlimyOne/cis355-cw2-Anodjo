const express = require("express")
const path = require('path')
const app = express()
const port = 3000
const fs = require("fs")
app.listen(port)

// Setting path where templates will be in.
app.set('views',path.join(__dirname,'views'))

// Setting which engine we will be using.
app.set('view engine','ejs')

// Setting the configurations for all routes
app.use(express.urlencoded({extended: true}))

// Allows the use of public files.
app.use(express.static('public'))

app.get('/',(req,res)=>{
    console.log("request received!!!")
    res.render('index.ejs',{title:"Home"})
    
})

app.get('/greet/:user',(req,res)=>{
    if (req.params.user === "admin"){
       res.redirect('/')
    }
    else{
        let todo = ['Mow the lawn',"Finish laundry","Do the dishes"]
        let username = req.params.user[0].toUpperCase() + req.params.user.slice(1)
        
        res.render('greet.ejs',{user:username, todo:todo})
    }
   
    console.log(req.params)
})

app.get('/fruit/:name/:color',(req,res)=>{
    res.send(`<p> Name: ${req.params.name}, 
                Color: ${req.params.color} </p>`)
    console.log(req.params)
})



app.get('/contact',(req,res)=>{
    res.render('contact.ejs',{title:"Contact Us"})
})

app.get('/about',(req,res)=>{
    res.render('about.ejs',{title:"About Us"})
})

app.get('/random',(req,res)=>{
    res.send({num:Math.random()})
})

app.get('/food',(req,res) => {
    const data = fs.readFileSync("food.json")
    let recipes = JSON.parse(data.toString())


    res.render('food', recipes)

})