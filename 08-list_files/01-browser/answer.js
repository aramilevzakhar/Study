// подключение зависимостей
const express = require('express');
const path = require('path');

// настройка приложения
const app = express();
app.use('/public', express.static('public'));
app.use('/css', express.static('css'));
app.set('view engine', 'ejs'); // npm i ejs
const params = {"port": 8000, "hostname": "127.0.0.1"};
// const dir_files = path.join("public", "docs");
const dir_files = "docs";

// паттерн проектирования MVC
// model data
const model_data = require("./models/model").model_data;
// const get_list = require("./models/model").get_list_files;
const get_list = require("./models/model").get_list_files_full;
const {readFileSync} = require("fs");

// controller
app.get('/', (req, res) => {
    model_data.list_files = get_list(path.join("public", dir_files));
    console.log(model_data);
    res.render('index-03', model_data);
});

app.get("/q33/:id", (req, res) => {
    const id = Number(req.params.id);
    //console.log(model_data.list_files[id].file_type);


    model_data.list_files = get_list(path.join("public", dir_files));
    //console.log(model_data.list_files);
    model_data.list_files = model_data.list_files
        .filter(item => item.file_type == model_data.list_files[id].file_type);
    console.log(model_data);
    res.render('index-03', model_data);


});


app.get("/q8/:id", (req, res) => {
    //console.log(__dirname);
    // console.log(req.params);
    const id = Number(req.params.id);
    // console.log(`id ${id}`);
    
    let file_name = model_data.list_files[id].file_name;
    let file_path = model_data.list_files[id].file_path;

    // console.log(file_path);
    let file_path_name = path.join(file_path, file_name);
    let content = readFileSync(file_path_name, 'utf-8');

    
    // console.log(file_path_name);
    res.download(path.join(__dirname, file_path_name));



	// res.sendFile(__dirname + "/views/index-test.html");
});

app.get(`/${dir_files}/:id`, (req, res) => {
    // console.log(req.params);
    const id = Number(req.params.id);
    // console.log(`id ${id}`);
    
    let file_name = model_data.list_files[id].file_name;
    let file_path = model_data.list_files[id].file_path;

    // console.log(file_path);
    let file_path_name = path.join(file_path, file_name);
    let content = readFileSync(file_path_name, 'utf-8');

    console.log(content);
    res.render('file', { content: content, title: file_name });
    // console.log("send file completed - " + dir_files);
    // console.log(`This is ${path.join(__dirname, "public", dir_files, file_name)}`);
    // res.download(path.join(__dirname, "public", dir_files, file_name));


});

// запуск приложения
app.listen(params.port, params.hostname, () => {
    console.log(`Сервер запущен - http://${params.hostname}:${params.port}/`);
    console.log('остановить сервер - Ctrl+C');
});