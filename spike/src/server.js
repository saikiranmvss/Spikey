var express = require('express');
var app = express();
var mysql= require('mysql');
const http = require('http');
var session=require('express-session');
// var session=require('cookie-session');
const server = http.createServer(app)
const { Server } = require("socket.io");
var bodyParser=require('body-parser');

const io= new Server(server,{
  cors:{
    origin:"http://192.168.0.144:3000",
    method:['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
  },
});
const lib = require('./functions.js');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: false}));
// app.use(
//     session({
//         name: 'session',
//         secret: 'secretKeyWooo'        
//     })
// );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view-engine','ejs');
var os=require('os');
var network=os.networkInterfaces();
var networksIps=[];
for (const Ips of Object.keys(network)) {    
    networksIps.push(network[Ips][1]['address']);
}

// cors policy start here


// decalring variables globally


var UserIdarray=[];


// end here

const cors = require("cors");
app.use(cors({
  origin: '*'
}));
app.use(cors({
  origin: 'http://192.168.0.144:3000',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true
}));

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

// cors policy end here

app.get('/',async(req,res)=>{
  if(req.session.page_view){    
  }else{
    req.session.page_view=1; 
  }  
  res.send('API is working properly');
})

app.post('/message',function(req,res){      
  res.json({msg:'success'});
})
app.post('/validate',async(req,res)=>{    
    var users =new lib.UsersMain(); 
    var userRes=await users.UserData(req.body.email,req.body.password);
    if(userRes.id!='email_err' && userRes.id!='pass_err'){      
      UserIdarray[userRes.id]=userRes.id;
    }    
    res.json({msgs:userRes.id});
})
app.post('/allusersdata',async(req,res)=>{      
  var users =new lib.UsersMain();   
  var allUsers=[];
  var userHomeData= await users.userChatsIds(req.body.id);  
  for(var i =0 ; i < userHomeData.length;i++){    
    var dataFinal=await users.userOriMsg(req.body.id,userHomeData[i].ids);
    allUsers[i]= dataFinal[0];   
        
  }
    // var allUsers=await users.userDatamain(req.body.id);    
res.json({allUsers})
})

app.post('/usersdata',async(req,res)=>{    
  var users =new lib.UsersMain();   
  var allUsesrsName=[];
var allUsesrsName=await users.userNamesPage(req.body.id);
res.json({allUsesrsName})
})

app.post('/logout_user',async(req,res)=>{
  var ids=req.session.user_ids;
})

app.post('/user_chat',async(req,res)=>{
  var chat_ress= new lib.UsersMain();    
  var chat_res= await chat_ress.singleUserChat(req.body.ownId,req.body.id);    
  if(chat_res[0]!=undefined){
    var chat_return1=chat_res[0];
  }else{
    var chat_return1=[];
  }

  if(chat_res[1]!=undefined){
    var chat_return2=chat_res[1];
  }else{
    var chat_return2=[];
  }  

  var dismsg='';
  var displayMsgArray=[];
  for(const mainmsgings of chat_return1){  
      if(mainmsgings.sender_id==req.body.ownId){            
          dismsg+='<div class="msg_rec_div">'+mainmsgings.msg_content+'</div>';
      }else{ 
              dismsg+='<div class="msg_sent_div">'+mainmsgings.msg_content+'</div>';;            
                  
      }
    }
    displayMsgArray[0]=dismsg;
  res.json({chat_return1,chat_return2,displayMsgArray});
})

var usersSessions=[];
io.on('connection', (socket) => {  

  console.log('SOCKET CONNECTING '+socket.id); 

  socket.on('loggedin',function(data){    
    console.log(data+' socket-id '+socket.id);
    usersSessions[data]=socket.id;  
    console.log(usersSessions);
  })

  socket.on('disconnect', function() {  
    console.log('SOCKET DISCONNECTING '+socket.id);    
  });
  
  socket.on('send_message',async(data)=>{
    var callInsert= new lib.UsersMain();
   var insertMsgId= await callInsert.inserting(data[2],data[1],data[0]);
    var msgDataView=[data[0],data[1],data[2],insertMsgId];    
    console.log(data[1]+' msg-socket '+usersSessions[data[1]]);
    socket.to(usersSessions[data[1]]).emit('received_msg',msgDataView);
  })
  socket.on('update_msg',async(data)=>{
    var updateMsg=new lib.UsersMain();
    await updateMsg.UpdateNewMsg(data);
  })

})

const PORT = process.env.PORT || 9999;
server.listen(9999,()=>{
  console.log(`server runs`);
})