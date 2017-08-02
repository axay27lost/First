var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


var mongoose=require('mongoose');
//mongoose.connect('mongodb://localhost:27017/bookshop');
mongoose.connect('mongodb://testuser:test@ds129593.mlab.com:29593/bookshop');

var db=mongoose.connection;
db.on('error',console.error.bind(console,'# mongoDB - connect error'));

//----Set Up
app.use(session({
    secret:'mySessionString',
    saveUninitialized:false,
    resave:false,
    cookie:{maxAge: 1000*60*60*24*2},
    store:new MongoStore({mongooseConnection:db,ttl:2*24*60*60})
}));


//--Save
app.post('/cart',function (req,res) {
    var cart=req.body;
    req.session.cart=cart;
    req.session.save(function (err) {
        if(err)
        {
            throw err;
        }
        res.json(req.session.cart);
    })
});

//----------Get Request

app.get('/cart',function (req,res) {
    if(req.session.cart !== 'undefined')
    {
        res.json(req.session.cart);
    }
});

//------End

var Books=require('./models/books.js');

//-------------Post
app.post('/books',function (req,res) {
    var book=req.body;

    Books.create(book,function (err,books) {
        if(err)
        {
          throw err;
        }
        res.json(books);
    })
});

//---------------get Books

app.get('/books',function (req,res) {
    Books.find(function (err,books) {
        if(err)
        {
          throw err;
        }
        res.json(books)
    });
});

//------------------Delete Books

app.delete('/books/:_id',function (req,res) {
    var query={_id:req.params._id};
    Books.remove(query,function (err,books) {
      if(err)
      {
          console.log("# API delete Error",err);
      }
      res.json(books);
    });
});


//---------------------Update Books

app.put('/books/:id',function (req,res) {
    var book=req.body;
    var query=req.params._id;

    var update={
      '$set':{
        title:book.title,
          description:book.description,
          image:book.image,
          price:book.price
    }};
    var options={new :true};
    Books.findOneAndUpdate(query,update,options,function (err, books) {
      if(err)
      {
        throw err;
      }
      res.json(books);
    })
});


//---------GET Image APP

app.get('/images',function (req,res) {
    const imgFolder=__dirname+'/public/images/';
    const fs=require('fs');
    fs.readdir(imgFolder,function (err,files) {
        if(err)
        {
            return console.error(err);
        }
        const filesArr=[];
        files.forEach(function (file) {
            filesArr.push({name:file});
        });
        res.json(filesArr);
    })
})

//ENDS



app.listen(3001,function (err) {
   if(err){
       return console.log(err);
   }
   console.log("API Server Is running on 3001");
})