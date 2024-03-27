const express=require("express");
const app=express();
const port=8080;
const path=require("path");

const { v4: uuidv4 } = require('uuid');

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set("view engine","view");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
// app.use(express.static("public"));


let posts = [
    {
        id: uuidv4(),
        username: "Shreya",
        content: "Coding is tough but fun!!"
    },
    {
        id: uuidv4(),
        username: "Puneet",
        content: "Achieved a very good package for my first internship."
    },
    {
        id: uuidv4(),
        username: "Shruti",
        content: "Hard work is very crucial to achieve success"
    },
];

app.listen(port,()=>{
    console.log(`Hello!! Listening to port ${port}`);
});

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{ posts });
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p) => id === p.id);
    console.log(post);
    if(post){
        res.render("singlePost.ejs",{ post });
    }
    else{
        res.send("No data ");
    }
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    console.log(post);
    res.render("edit.ejs",{post});
})

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id= uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    const newContent=req.body.content;
    let post=posts.find((p)=> id=== p.id);
    post.content=newContent;
    // console.log("Patching done");
    // console.log(post);
    res.redirect("/posts");
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts = posts.filter((p) => p.id !== id);
    console.log("delete request");
    // res.send("Deleted post");
    res.redirect("/posts");
})