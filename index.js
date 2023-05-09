const express = require("express");
const app =express();
var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'uma',
  password : 'Amuv@1997!',
  database : 'users'
});

db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + db.threadId);
});

app.get('/getAllUsers',((req,res)=>{
    // console.log(req.query['abc'])
    // console.log('i am inside get');
    // connect to db and fetch all users
    // assign to variable and send it as json
    // res.send('hi welcome '+ " my name is " + req.query['name']+" my age is"+req.query['age'] )
    // res.json([{name:req.query["name"],age:req.query["age"]}])
    db.query('SELECT * from userdata where isActive=1 ', function (error, results, fields) {
       if (error) console.log(error)
       console.log('All Users:',results)
      })
}))
// create a userlist
var usersList=[{id:1,name:'uma',age:'25'},
               {id:2,name:'vedha',age:'22'},
               {id:3,name:'sangeetha',age:'27'},
               {id:4,name:'sujatha',age:'25'}]
// get all users
app.get('/users',((req,res)=>{
res.json(usersList)

}))
// get user by id++++
app.get('/getUserById/:id',((req,res)=>{
//    let user = usersList.filter(e=>e.id==req.params.id)
//     res.json(user)
db.query('SELECT * from userdata where id=?',[req.params.id], function (error, results, fields) {
    if (error) console.log(error)
    console.log('All Users:',results)
    res.json(results)
   })
    }))
app.put('/updateUserById/:id',((req,res)=>{
    //    let user = usersList.filter(e=>e.id==req.params.id)
    //     res.json(user)
    // let message='hiiiiiiiii'
    
    db.query('update userdata set message=? where id=?',[req.query.message,req.params.id], function (error, results, fields) {
        if (error) console.log(error)
        console.log('updated successfully')
        res.json(results)
        })
        }))
    
// app.get('/myApi',(()=>{
//     console.log('i am inside myApi');
// }))

app.listen(3000,()=>{
    console.log('listening on port 3000');
})

