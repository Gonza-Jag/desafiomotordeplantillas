const fs = require("fs");

class Contenedor{
    constructor(archivo){
        this.archivo = archivo;
    }
    
    save = async(product)=>{
        try {
            //leer el archivo existe
            if(fs.existsSync(this.archivo)){
                const contenido = await fs.promises.readFile(this.archivo,"utf8");
                if(contenido){
                    const productos = JSON.parse(contenido);
                    const lastIdAdded = productos.reduce((acc,item)=>item.id > acc ? acc = item.id : acc, 0);
                    const newProduct={
                        id: lastIdAdded+1,
                        ...product
                    }
                    productos.push(newProduct);
                    await fs.promises.writeFile(this.archivo, JSON.stringify(productos, null, 2))
                } else{
                    //si no existe ningun contenido en el archivo
                    const newProduct={
                        id:1,
                        ...product
                    }
                    //creamos el archivo
                    await fs.promises.writeFile(this.archivo, JSON.stringify([newProduct], null, 2));
                }
            } else{
                // si el archivo no existe
                const newProduct={
                    id:1,
                    ...product
                }
                //creamos el archivo
                await fs.promises.writeFile(this.archivo, JSON.stringify([newProduct], null, 2));
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    getById = async(id)=>{
        try {
            if(fs.existsSync(this.nameFile)){
                const contenido = await this.getAll();
                if(contenido){
                    const productos = JSON.parse(contenido);
                    const producto = productos.find(item=>item.id===id);
                    return producto
                } else{
                    return "El archivo esta vacio"
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    getAll = async()=>{
        try {
            const contenido = await fs.promises.readFile(this.archivo,"utf8");
            const productos = JSON.parse(contenido);
            return productos
        } catch (error) {
            console.log(error)
        }
    }
    
    deleteById = async(id)=>{
        try {
            const contenido = await fs.promises.readFile(this.archivo,"utf8");
            const productos = JSON.parse(contenido);
            const newProducts = productos.filter(item=>item.id!==id);
            await fs.promises.writeFile(this.archivo, JSON.stringify(newProducts, null, 2));
        } catch (error) {
            console.log(error)
        }
    }
    
    deleteAll = async()=>{
        try {
            await fs.promises.writeFile(this.archivo, JSON.stringify([]));
        } catch (error) {
            console.log(error)
        }
    }
    updateById = async(id, body)=>{
        try {
            const productos = await this.getAll();
            const productPos = productos.findIndex(elm=>elm.id === id);
            productos[productPos] = {
                id:id,
                ...body
            };
            await fs.promises.writeFile(this.archivo, JSON.stringify(productos, null, 2))
            return productos;
        } catch (error) {
            console.log(error)
        }
    }
}



const listaProductos = new Contenedor("./camisetas.txt")
const producto1 = {
    title:"Camiseta Argentina",
    price:18000,
    thumbnail:"https://todosobrecamisetas.com/wp-content/uploads/camiseta-adidas-argentina-2022-3.jpg"
}

const producto2 = {
    title:"Camiseta Brasil",
    price:16000,
    thumbnail:"http://cdn.shopify.com/s/files/1/0560/0152/7831/products/image_1083cd10-d2ff-4666-9393-057442c950d9.jpg?v=1660183379"
}



const crearProducto = async()=>{
    await listaProductos.save();
    
}

const deleteById = async(id)=>{
    
    await listaProductos.deleteById(id);
}

const getAll = async()=>{
    const camisetas = await listaProductos.getAll();
    console.log(camisetas)
    
}
const deleteAll = async()=>{
    await listaProductos.deleteAll()
    
}
const getById = async()=>{
    const camiseta = await listaProductos.getById();
    console.log(camiseta)
    
    
}

//crearProducto();
//deleteById();
//getAll();
//deleteAll()
//getById(2)

module.exports = Contenedor;
