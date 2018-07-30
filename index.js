const {MongoClient,ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/Integrify',(err, client) => {
    if(err){
        console.log('Unable to connect to MongoDB server')
    }
    console.log('Connnected to mongodb server');
    const db = client.db('Integrify');
    db.collection('Students').insertMany( [
        { name: "Jaya", age: 15,country:'Finland' },
        { name: "Sheela", age: 20,country:'Finland' },
        { name: "Anitha" , age: 30,country:'India' },
        { name:"Durai", age:"34",country:"India"}
     ] );
    db.collection("Students").insertOne({
        name:"AishuKutty",
        age:3,
        country:'Finland'
    },(err, data)=>{
        if(err){
            console.log('Data was not added',err)
        }
        console.log(JSON.stringify(data.ops,undefined, 4))
    })

    db.collection('Students').find().toArray().then((doc) => {
        console.log(JSON.stringify(doc,undefined,4));
    },(err) => {
        console.log('Not found',err)
    });

    db.collection("Students").find({name:"karthik"}).toArray().then((doc) =>{
        console.log(JSON.stringify(doc,undefined,4))
    },(err)=>{
        if(err){
            console.log('data was not found')
        }
    })

    db.collection("Students").find({name: "Anitha" }).count().then((count) =>{
        console.log('Number of students',count)

    },(err)=>{
        if(err){
            console.log('data was not found')
        }
    })
    db.collection("Students").find({name:"Appa"}).count().then((count)=>{
        console.log('students',count)

    },(err)=>{
        if(err){
            console.log('data was not found')
        }
    })

    db.collection("Students").deleteOne(
        { name:" ", age:20,country:"Finland",item:"Agila" }   
     )

     db.collection("Students").deleteMany({name:"Vaithi"},(err)=>{
         if(err){
             console.log('data not found')
         }
      console.log("deleted")
     })

     db.collection("Students").findOneAndUpdate({name:"Anitha"},{$set:{name:"AnithaPackia"}},{returnOriginal:false}).then((doc)=>{
        if(err){
            console.log('not updated')
                 }
                 console.log("updated");
     }
)
    client.close();
})