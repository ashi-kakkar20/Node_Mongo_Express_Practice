var express= require('express');
var app=express();

var bodyparser= require('body-parser');
var brands='/models/brand';
app.use(bodyparser.json());

var mongoose= require('mongoose');
var Brand= require('./model/brands');

var options={ user:'myTester', pass:'xyz123'}

mongoose.connect('mongodb://localhost:27017/demodb',options);
var db=mongoose.connection;

app.get('/', function(req,res)
{
    res.send('Hellooo World !!');
})


app.get('/api/brands', function(req,res)
{
  //  res.send('Hellooo World !!');
  Brand.find(function(err,data)
  {
    if(err)
    {
        throw err;
    }
    else{
        res.json(data);
    }
  })
})

app.get('/api/brands/:id', function(req,res){
Brand.findById(req.params.id, function(err,data)
{
    if(err)
    {
        throw err;
    }

    else
    {
        res.json(data);
    }
})
})

app.post('/api/brands',function(req,res){
    Brand.create(req.body,function(err,data){
 if(err)
 {
     throw err;
 }

  else{
      res.json(data);
  }
})
})

app.put('/api/brands/:id', function(req,res){
    var query={ _id:req.params.id};
    var update={name : req.body.name,
                desc : req.body.desc}
    Brand.findOneAndUpdate(query,update,function(err,data){
        if(err)
        {
            throw err;
        }
        else{ res.json('Record updated successfully');
    }
    
    })
})
/* app.get('/api/brands1', function(req,res)
{
  //  res.send('Hellooo World !!');
  Brand.getBrands(function(err,data)
  {
    if(err)
    {
        throw err;
    }
    else{
        res.json(data);
    }
  })
}) */

app.delete('/api/brands/:id',function(req,res){
    var obj={ _id: req.params.id }
    Brand.findByIdAndRemove(obj, function(err,data){
    if(err)
    {
        throw err;
    }

    else{
        res.send('Record Deleted successfully');
    }
})
})

app.listen(3000,function()
{
    console.log('The server is running at port 3000');
})