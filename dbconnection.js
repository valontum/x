var mysql = require('mysql');



    
var connection = mysql.createConnection({
        
	host: "35.192.81.77",
	user: "edualb_user",
	password: "thi$i$great$_@123",
	port     : '4300',
	database:'edualb'   

  
});



connection.connect();

module.exports = connection;
