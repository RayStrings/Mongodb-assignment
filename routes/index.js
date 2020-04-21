const router = require('express').Router();
const { MongoClient } = require('mongodb');MongoClient;


const todo = require('./todolist.json');
//const employees = require('./employeelist.json');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true});

let employeedb;
let todoCollection;

//this function connects to the mongo db
const mainConnect = async () => {  
    await client.connect(); 
    employeedb = client.db('employeedb');
    todoCollection = employeedb.collection('todo');

};
mainConnect();

const createMany = async (data) => {
    try{
        const result = await todoCollection.insertMany(data);
        return result;
    }catch (error) {
        console.log(error)
    }
    finally {}
}

const createTodo = async (data) => {
    try{
        const result = await todoCollection.insertOne(data);
        return result;
    }catch (error) {
        console.log(error)
    }
    finally{}
}

const getAll = async () => {
    try {
        const result = await todoCollection.find({}).toArray();
        return result;
    } catch (error) {
        console.log(error)
    }
    finally{}
}

const employees = [
    {
        name: "Raymond Addo",
        ID: "EMP001",
        position: "HR Manager",
        image: "/images/Ray.jpg"
    },
    {
        name: "Bismark Osabutey",
        ID: "EMP002",
        position: "IT Manager",
        image: "/images/Bismark.jpg"
    },
    {
        name: "Aaron Bruce",
        ID: "EMP003",
        position: "Production Manager",
        image: "/images/Aaron.jpg"
    },
    {
        name: "Morris Vorvor",
        ID: "EMP004",
        position: "Arranger",
        image: "/images/Morris.jpg"
    }
]

router.get('/', (req, res)=>{
    res.render('home', {
        title:'Home',
    })
});

router.get('/employeelist',  (req, res)=>{
    res.render('employee', {
        title:'Employees',
        employees
    })
    
});

router.get('/todolist', async (req, res)=>{
   const todolist = await getAll();
    res.render('todo',{
       todolist
   })
   
});
     
router.get('/createMany', async (req, res)=>{
    const todolist = await createMany(todo)
    res.redirect('/todolist')
 });
      
module.exports = router;