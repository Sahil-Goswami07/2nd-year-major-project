const express=require("express");
const app=express();
const user=require("./routes/user.js")
const post=require("./routes/post.js");
const cookieParser=require("cookie-parser")
const session=require("express-session ")
const path=require("path")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions={
    secret:"secret",
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:1000*60*60}
}
app.use(session(sessionOptions))

app.get("/register",(req,res)=>{
    let{name="anonymous"}=req.query;
    req.session.name=name
    req.flash("success","user registered successfully")
    // res.send(`Welcome, ${name}`)
    res.redirect("/hello")
})

req.get("/hello",(req,res)=>{
    res.render("page.ejs",{name: req.session.name,msg:req.flash("success")})
})


// app.get("/reqcount",(req,res)=>{
//     if( req.session.count){
//         req.session.count++
//     }else{
//         req.session.count=1
//     }
//     res.send(`you sent a request ${req.session.count} times`)
// })

// app.get("/test",(req,res)=>{
//     res.send("test successfully logged")
// })
// app.use(cookieParser("secretCode"))
// app.get("/getsignedcookie", (req,res)=>{
//     res.cookie("made-in","India",{signed:true});
//     res.send("signed cookie created")
// })

// app.get("/verify",(req,res)=>{
//     console.log(req.signedcookie)
//     res.send("verify cookie created")
// })

// app.get("/signup",(req,res)=>{
//     res.cookie("greet","namaste")
// })

// app.get("/greet",(req,res)=>{
// let{name="anonymous"}=req.cookies
//     res.send(`hi, ${name}`)
// })
// app.get("/",(req,res)=>{
//     console.dir(req.cookie)
//     res.send("home page")
// })

// app.use("/users",user)
// app.use("/posts",posts)

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})