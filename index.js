const express = require("express")
const app = express()
const path = require("path")
const PORT = 5050;

const router = require("./src/router/main")

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src/assets')));

app.use(router)


app.listen(PORT, ()=>{
    console.log(`Server run http://localhost:${PORT}`)
})