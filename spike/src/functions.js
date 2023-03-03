const { promiseImpl } = require('ejs');
var mysql=require('mysql');
var db=mysql.createConnection({ host:'localhost',user:'root',password:'',database:'chatapp'});

class UsersMain{
    UserData(email_entered,pass_entered){
        var usersQuery="select getUsers_go(?,?) as id";
        return new Promise((resolve,reject)=>{
            db.query(usersQuery,[email_entered,pass_entered],function(err,res){                          
                return resolve(res[0]);                
            })
            })
    }

    
    userChatsIds(id){        
        var sql='select * from (select sender_id as ids,msg_createddate from users_messages where receiver_id = ? GROUP by sender_id UNION SELECT receiver_id as ids,msg_createddate as ids FROM users_messages where sender_id = ? GROUP by receiver_id ) as usersData GROUP by ids ORDER by msg_createddate desc';
        return new Promise ((resolve,reject) =>{
            db.query(sql,[id,id],function(err,res){                
                if(err){
                    var data="error";                               
                }else{            
                    data=res;                                       
                }   
                resolve(data);             
            })
        })
    }

    userOriMsg(userId,otherUserId){
        var sql2='call getUsersData(?,?)';      
        return new Promise ((resolve,reject) =>{                         
            db.query(sql2,[userId,otherUserId],function(err,res){                
                if(err){
                }else{                    
                    resolve(res[0]);
                }              
            })   
        })     
    }

    userDatamain(id){
        var homeMsgs=[]; 
        var Usersdata="select users_messages.receiver_id,users_messages.msg_content,users.user_pic,users.name,users.user_id from users INNER JOIN users_messages ON users.user_id=users_messages.receiver_id or users.user_id=users_messages.sender_id where users.user_id=? and users_messages.receiver_id!=1 GROUP by receiver_id Order by msg_createddate DESC";
        return new Promise((resolve,reject)=>{
            db.query(Usersdata,[id],function(err,res){                                     
                return resolve(res);
            })
        })
    }

    userNamesPage(id){        
        var Userscalldata="select * from users where user_id!=?";
        return new Promise((resolve,reject)=>{
            db.query(Userscalldata,[id],function(err,res){                   
                return resolve(res);
            })
        })
    }

    singleUserChat(ownId,id){
        var Chat_array=[];        
        var messagesRes='call getSingleUserChat(?,?)';
        return new Promise((resolve,reject)=>{
            db.query(messagesRes,[ownId,id],function(err,res){                                
                if(res[0]!=''){
                    Chat_array[0]=res[0];
                }
                if(res[1]!=''){
                    Chat_array[1]=res[1];
                }
                return resolve(Chat_array);
            })
        })
    }

    inserting(main,other,mesg){     

            var sql="insert into users_messages(msg_content,msg_status,receiver_id,receiver_status,sender_id,sender_status,user_id)values(?,1,?,0,?,1,?)";        
        
        return new Promise((resolve,reject)=> {
            db.query(sql,[mesg,other,main,main],function(err,res){     
                if(err){
                    console.log(err);
                }
                return resolve(res.insertId);            
            })
        })
    }

    UpdateNewMsg(data){
        var updateQry='update users_messages set receiver_status=? where msg_id=?';
        return new Promise((resolve,reject)=>{
            db.query(updateQry,[data[2],data[3]],function(err,res){
                if(err){
                    console.log('update query error');
                }else{
                    console.log('update query worked');
                }
            })
        })
    }

}

module.exports={ UsersMain };