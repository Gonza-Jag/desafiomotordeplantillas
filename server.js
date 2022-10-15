const express = require ("express");
const handlebars = require("express-handlebars");
const path = require ("path");
const Contenedor = require("./contenedorProductos");

const contenedorProductos = new Contenedor("camisetas.txt");

const folderViews = path.join(__dirname, "views");
console.log(folderViews)

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(8080,()=>console.log("server running"));


//CONFIGURAR MOTOR
//definir el motor
app.engine("handlebars",handlebars.engine());

//ubicar carpeta de templates extension . handlebars
app.set("views",folderViews);

//definir con cual se trabaja
app.set("view engine","handlebars");

//RUTAS

/*app.get("/",(req,res)=>{
    res.render("home",{
        nombre:'Gonzalo',
        apellido:'Godoy',
        edad:'27',
        email:'gonzalo@gmail.com',
        telefono:'124578963'

    })
})*/
app.get("/contacto",(req,res)=>{
    res.render("contact")
})
app.get("/usuarios",(req,res)=>{
    console.log(req.body)
    res.render("usuarios")
})
//esta ruta muestra todos los prods
app.get("/",async (req,res)=>{
    try{
        const products =  await contenedorProductos.getAll();
        const viewData = { products}           


        res.render("products", viewData)
        
    } catch(error) {
        res.status(500).send("Hubo un error en el servidor")
    }





})
//
app.post("/productos", async(req,res)=>{

    try{
        const productoNuevo = req.body;
     const producto = await   contenedorProductos.save(productoNuevo);
     console.log(req.body)
    
     res.redirect("/" )


    }catch{

    }


})
//ESTA RUTA MUESTRA FORMULARIOS PARA CARGAR.
app.get("/productos/subir",(req,res)=>{
    res.render("formularioproductos")
})
    

        


