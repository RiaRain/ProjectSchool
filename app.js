import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const urlencodedParser = express.urlencoded({extended: false});

var appsAll = []
var names = JSON.parse(fs.readFileSync("./DB.txt"));

const app = express();
app.listen(3000, ()=>{
    console.log('Сервер запущен')
})

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/src'));

app.get("/get_names", (req, res) => {

    if(names.length != 0){
         res.send(names);
    }else{
        res.send(["Заявок нет"]); 
    }
       
})

app.get("/index.html", (req, res) => {
    res.sendFile(__dirname+"/front nir/index.html");
})

app.get("/registration.html", (req, res) => {
    res.sendFile(__dirname+"/front nir/registration.html");
})

app.get("/contact.html", (req, res) => {
    res.sendFile(__dirname+"/front nir/contact.html");
})

app.get("/timetable.html", (req, res) => {
    res.sendFile(__dirname+"/front nir/timetable.html");
})

app.get("/teachers.html", (req, res) => {
    res.sendFile(__dirname+"/front nir/teachers.html");
})

app.get("/admin.html", (req, res) => {
    res.sendFile(__dirname+"/front nir/admin.html");
})

app.get("/admin-input.html", (req, res) => {
    res.sendFile(__dirname+"/front nir/admin-input.html");
})

app.post("/add_name", (req, res)=>{
    if(req.body && (req.body.name || req.body.name == 0)){
        names.push(req.body.name);
        fs.writeFileSync("./DB.txt", JSON.stringify(names));
        res.sendStatus(200);
    }else{
        res.sendStatus(403);
    }
})

app.delete("/delete_num", (req, res)=>{
    if(req.body && (req.body.index || req.body.index == 0)){
        names.splice(req.body.index, 1);
        fs.writeFileSync("./DB.txt", JSON.stringify(names));
        res.sendStatus(200);
    }else{
        res.sendStatus(403);
    }
})

app.patch("/update_app", (req, res)=>{
    if(req.body && (req.body.index || req.body.index == 0) && (req.body.name2 || req.body.name2 == 0)&& (req.body.email2 || req.body.email2 == 0)&& (req.body.tel2 || req.body.tel2 == 0)){
        appsAll.push(req.body.name2);
        appsAll.push(req.body.email2);
        appsAll.push(req.body.tel2);
        names[req.body.index] = appsAll;
        fs.writeFileSync("./DB.txt", JSON.stringify(names));
        appsAll = [];
        res.sendStatus(200);
    }else{
        res.sendStatus(403);
    }
})

app.post("/add_app_form", urlencodedParser, (req, res)=>{
    if(req.body && (req.body.name || req.body.name == 0) && (req.body.email || req.body.email == 0) && (req.body.tel || req.body.tel == 0)){
        appsAll.push(req.body.name);
        appsAll.push(req.body.email);
        appsAll.push(req.body.tel);
        names.push(appsAll);
        fs.writeFileSync("./DB.txt", JSON.stringify(names));
        appsAll = [];
        res.send("Заявка принята");
    }else{
        res.sendStatus(403);
    }
    
})

