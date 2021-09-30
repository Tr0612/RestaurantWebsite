var express = require('express')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var db = require('./database');
var app = express();
// var router = express.Router();
app.listen(8000);
app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
//Email Sender SMTP
const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: 'sadsadasdasdasd784@gmail.com',
            pass: 'tr@1234567890',
         },
    secure: true,
    });

app.get('/text-mail',(req,res)=>{
    res.render('pages/form')
});

var bookScheme = mongoose.Schema(
    {
        name:String,
        members:String,
        mobile:String,
        email:String
    }
)
var bookModel = mongoose.model('Booking',bookScheme);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/'+"index.html"); 
 });

app.get('/book',function(req, res){
    res.sendFile(__dirname + '/form.html');
})


app.post('/confirm-booking', function(req, res){
    console.log(req.body);  
    var name = req.body.name;
    var members = req.body.members;
    var email = req.body.email;
    var mobile = req.body.mobile;
    let booking = new bookModel(
        {
            name : name,
            members : members,
            email : email,
            mobile : mobile,
        }
    )
    booking.save(function(err,book){
        if(err){
            return console.log(err);
        }
        // else{
        //     res.redirect('/');
        // }
    })
    const mailData = {
        from : 'sadsadasdasdasd784@gmail.com',
            to:email,
            subject: 'Hotel Booking Confirmation',
            // text: 'Hi '+name+' your booking for '+ members+' been confirmed',
            html: '<b>Hey there <%=name=%></b>',
    };
    transporter.sendMail(mailData,(error,info)=>{
        if (error){
            return console.log(error);
        }
        else{
        console.log({message:'Mail sent',message_id:info.messageId});
    }
});
// window.alert("Your booking is confirmed.Check your mail");
return res.sendFile(__dirname+'/booked.html');
    
})


var pizza = [
    {
        title : 'Sicilian Pizza',
        content : 'Silicilan Pizza has been a quintessential part of the Italian culinary culture, which originated from a place called Sicily in Italy.',
        price : '120'
    },
    {
        title : 'Detroit Pizza',
        content : 'Detroit-style pizza is a rectangular pizza with a thick crust that is crispy and chewy. It is traditionally topped with tomato sauce and Wisconsin brick cheese that goes all the way to the edges.',
        price : '100'
    },
    {
        title : 'Greek Pizza',
        content : 'In the cuisine of the United States, Greek pizza is a style of pizza crust and preparation where the pizza is proofed and cooked in a metal pan rather than stretched to order and baked on the floor of the pizza oven.',
        price : '140'
    }
]

var starters = [
    {
        title : 'Paneer Tikka.',
        content : 'Paneer tikka is an Indian dish made from chunks of paneer marinated in spices and grilled in a tandoor. It is a vegetarian alternative to chicken tikka and other meat dishes. It is a popular dish that is widely available in India and countries with an Indian diaspora.',
        price : '80'
    },
    {
        title :'Dahi Vada.',
        content : 'Dahi vada is a type of chaat originating from the Indian subcontinent and popular throughout South Asia. It is prepared by soaking vadas in thick dahi.',
        price : '60'
    },{
        title : 'Sabudana Tikki.',
        content : 'Sabudana vada is a traditional Maharashtrian snack, where patties made of soaked tapioca pearls, mashed potatoes, peanuts, spices and herbs are deep fried until crisp and golden.',
        price : '90'
    }
]

var drinks = [
    {
        title : 'Coca-Cola.',
        content : 'Coca-Cola, or Coke, is a carbonated soft drink manufactured by The Coca-Cola Company.',
        price : '30'
    },
    {
        title : 'Pepsi.',
        content : 'Pepsi is a carbonated soft drink manufactured by PepsiCo.',
        price : '30'
    },
    {
        title : 'Sprite.',
        content : 'Sprite is a colorless, lemon and lime-flavored soft drink created by The Coca-Cola Company.',
        price : '30'
    }
]


app.get('/menu', function(req, res) {
    res.render(__dirname + '/menu.html',{pizza:pizza,starters:starters,drinks:drinks});
})


