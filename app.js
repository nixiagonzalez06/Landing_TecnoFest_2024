const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Panda04061218123",
    database:"mydb"
});

db.connect((err)=>{
    if (err){
        throw err;
    }
    console.log("Conexion existosa");
});

//rutas
app.post('/addparticipante',(req,res)=>{

    let data = req.body;
    
    const consultaSQL = 'insert into participantes (Nombre_Apellido, Telefono, Tipo_Estudiante) values ("'+ data.Nombre_Apellido +'", "'+ data.Telefono +'", '+ data.Tipo_Estudiante +');';
    db.query(consultaSQL,(err,result)=>{
if(err){
    throw err;
}
res.send('registro guardado');

    });
});

app.get('/getparticipante', (req, res)=>{
    const consultaSQL = 'SELECT * FROM participantes order by Nombre_Apellido desc;';

    db.query(consultaSQL,(err, result)=>{
        if(err){
            throw err
        }

        res.status(200).send(result);
    });

});

app.delete('/deleteparticipante',(req,res)=>{
    const id = req.query.Id;
    //console.log(id);
    const consultaSQL = 'delete from participantes where idParticipantes='+id+'';
db.query(consultaSQL,(err,result)=>{
    if(err){
        throw err
    }

    res.status(200).send("Registros eliminado");
});

});

app.put('/updateparticipante',(req,res)=>{
    const id = req.query.Id;
    const data = req.body;

    const consultaSQL = 'update participantes set Nombre_Apellido = "'+data.Nombre_Apellido+'", Telefono = "'+data.Telefono+'", Tipo_Estudiante = "'+data.Tipo_Estudiante+'" where idParticipantes = '+id+'';

    db.query(consultaSQL,(err,res)=>{
        if(err){
            throw err
        }

        res.status(200).send("El usuario ha sido actualizado");
    });

});

app.use(express.static('static'));

app.get('/', (req,res)=> {
//res.send('Proyecto')
res.sendFile(__dirname + '/views/index.html');

});

app.listen(4200, ()=> {
    console.log("servidor 4200");
});