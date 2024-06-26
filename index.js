/*
socket.emit('message', "this is a test"); //sending to sender-client only
socket.broadcast.emit('message', "this is a test"); //sending to all clients except sender
socket.broadcast.to('game').emit('message', 'nice game'); //sending to all clients in 'game' room(channel) except sender
socket.to('game').emit('message', 'enjoy the game'); //sending to sender client, only if they are in 'game' room(channel)
socket.broadcast.to(socketid).emit('message', 'for your eyes only'); //sending to individual socketid
io.emit('message', "this is a test"); //sending to all clients, include sender
io.in('game').emit('message', 'cool game'); //sending to all clients in 'game' room(channel), include sender
io.of('myNamespace').emit('message', 'gg'); //sending to all clients in namespace 'myNamespace', include sender
socket.emit(); //send to all connected clients
socket.broadcast.emit(); //send to all connected clients except the one that sent the message
socket.on(); //event listener, can be called on client to execute on server
io.sockets.socket(); //for emiting to specific clients
io.sockets.emit(); //send to all connected clients (same as socket.emit)
io.sockets.on() ; //initial connection from a client.
*/
require('dotenv').config();

/*
const express = require('express')
//const path = require('path')
const PORT = process.env.PORT || 5000
http   = require('http'),
app    = express(),
server = http.createServer(app),

//io   = require('socket.io').listen(server); //socket.io version 2.
io     = require('socket.io')(server);	//socket.io version 4.4.1 cf 'package.json'
server.listen(PORT, () => console.log(`Listening on ${ PORT }`)) //socket.io version 2.

//var sequelize = require('socket.io-sequelize');
*/



const bodyParser = require('body-parser')
const validator  = require('express-validator')
const Sequelize  = require('sequelize')

//******************************************************************
// If you try to require a directory, it expects there to be an index.js file in that directory. Otherwise, you have to simply require individual files:
// require('./controllers/users'). 
// Alternatively, you can create an index.js file in the controllers directory and add the following:
// module.exports.users = require('./users');
// module.exports.posts = require('./posts');
//and then import: var c = require('./controllers');. You can then use them via c.users and c.posts.
//******************************************************************

const PORT        = process.env.PORT || 7000; //the 'port' is the same as 'aiven' database port. do not use '6000' 
const REMOTE_HOST = 'https://android-chat-server.onrender.com/';
//const REMOTE_HOST = 'http://localhost:5000';

//////////////////////////////////////////////////
/*original marche
const app        = express()
const http       = require('http').Server(app)
const io         = socket(http)
*/
//////////////////////////////////////////////////

/////////////////////////////////
const express    = require('express')
const { createServer } = require("http");
const { Server }       = require("socket.io");
const app        = express();
const http       = createServer(app);
//const io         = new Server(http, { /* options */ });
///////////////////////////////


//const Op         = Sequelize.Op

//const pgsqldb    = require('./queries')
//const fs         = require("fs");
//const url        = require('url');
//const utf8       = require('utf8');
//const crypto     = require('crypto');

const route      = require('./app/routes') // an 'index.js' is expected in folder 'routes'

/* marche
console.log("'process.env.DATABASE = '" + process.env.DATABASE + "\n" +
            "'process.env.USER     = '" + process.env.USER     + "\n" +
			"'process.env.PASSWORD = '" + process.env.PASSWORD + "\n" +
			"'process.env.HOST     = '" + process.env.HOST     + "\n" +
			"'process.env.PORT     = '" + process.env.PORT     
			);
			
const sequelize = new Sequelize(
							process.env.DATABASE, 
							process.env.USER, 
							process.env.PASSWORD, 
							{ "host":process.env.HOST,
							  "port":process.env.PORT,
							  "dialect":'postgres',   
							  "client_encoding": 'utf8',
							  dialectOptions: {
								ssl: {
									require: true, //seule, marche bd render
									"ca": fs.readFileSync("./ca.pem").toString(), //require=true, ca et port=5000: error : Port scan timeout reached, failed to detect open port 25884 from PORT environment variable. Bind your service to port 25884 or update the PORT environment variable to the correct port
																					//require=true, ca et port=PORT=25884 : marche
								}
							  }
							});
*/

/*
const sequelize = new Sequelize({
	dialect:'postgres',
	database:'postgres', //process.env.DATABASE,
	user:'postgres', //process.env.USER,
	password:'tomcat@14200', //process.env.PASSWORD,
	host:'localhost', //process.env.HOST,
	port:5432,
	//ssl:true
});
*/
/*
//test connection
async function testDbConnection() {
	try{
		return await sequelize.authenticate();
		//return "hello the world";
		console.log("'./index.js' : connection success");
	}catch(error){
		console.error("'./index.js' : connection fail : ", error);
		throw error;
	}
}

testDbConnection().then(res => console.log("test connection : " + res));
*/

///const mysql = require('mysql2')
//console.log('process.env.DATABASE_URL = ' + process.env.DATABASE_URL)
//const connection = mysql.createConnection(process.env.DATABASE_URL)
//console.log('Connected to PlanetScale!')
//connection.end();

//Sequelize-pgsql
//io.use(sequelize('pgsql', 'postgres', 'tomcat14200', { host: 'localhost' }, 'D:\node-pg-sequelize\models'));

//const { Pool } = require('pg');

/*
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
*/
//const Pool = require('pg').Pool

/*
//localhost
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'tomcat@14200',
  port: 5432,
  client_encoding: 'utf8',
  //ssl: true,
  max: 20,
  min: 1,
  idleTimeoutMillis: 1000,
})
*/

/*
//Heroku
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
*/

/*
//Heroku other color db qui marche au 21-05-22
const pool = new Pool({
  connectionString: process.env.HEROKU_POSTGRESQL_PURPLE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
*/

/*
//Render
const pool = new Pool({
  //connectionString: DATABASE_URL,
   connectionString:process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
*/

/*
//HelioHost
const pool = new Pool({
  user: 'tomcaty_tomatish',
  host: 'johnny.heliohost.org',
  database: 'tomcaty_Supabase_pgsql',
  password: 'tomcat14200',
  port: 5432,
  client_encoding: 'utf8',
  //ssl: true,
  max: 20,
  min: 1,
  idleTimeoutMillis: 1000,
})
*/

/*
//Render + Aiven + env
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  client_encoding: 'utf8',
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("./ca.pem").toString(),
  },
  max: 20,
  min: 1,
  idleTimeoutMillis: 1000,
});
*/

/*
//Render + Heliohost + env
const pool = new Pool({
  user: process.env.USER1,
  host: process.env.HOST1,
  database: process.env.DATABASE1,
  password: process.env.PASSWORD1,
  port: process.env.PORT1,
  client_encoding: 'utf8',
  max: 20,
  min: 1,
  idleTimeoutMillis: 1000,
});
*/

//console.log('process.env.DATABASE_URL = ' + process.env.DATABASE_URL);
//console.log('pool = ' + pool);


    
////////////////////////////////////////////////////////////////////////////////////////////
// Dans le navigateur les commandes sont les suivantes: localhost:3000/users, localhost:3000/users/:id=1; ...
//app.get('/users', pgsqldb.getUsers)
//app.get('/users/:id', pgsqldb.getUserById)
//app.post('/users', pgsqldb.createUser)
//app.put('/users/:id', pgsqldb.updateUser)
//app.delete('/users/:id', pgsqldb.deleteUser)

////////////////////////////////////////////////////////


const path = require('path');
app
  .get('/', (req, res) => {
	  const options = {
        root: path.join(__dirname)
    };
	
	const response = 'Hello World from express listening on ' + PORT;
    //res.send(response);
	
	var mascots = [
		{ name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
		{ name: 'Tux', organization: "Linux", birth_year: 1996},
		{ name: 'Moby Dock', organization: "Docker", birth_year: 2013}
	];
	var tagline = "No programming concept is complete without a cute animal mascot.";

	res.render('pages/index', {
		mascots: mascots,
		tagline: tagline
	});
	
	//res.render('pages/index');
	
	const fileName = 'index.html';
	//res.sendFile(__dirname, 'index.html');
	
	/*
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
	*/
  })
  // about page
 .get('/about', function(req, res) {
	res.render('pages/about');
 });
  
 

  
  //app.use(express.static("./public"));
  //app.use('/api', routes);	//in browser type : http://localhost:3000/api
    
	/*
	app.use(cors())
	app.use((req, res, next) => {
	  req.Op = Op
	  res.io = io
	  next()
	});
	app.use(bodyParser.json())
	app.use(validator())
	*/
	
	app.use(route)
    app.set('view engine', 'ejs');
	app.use(express.static("./public"));
	
	http.listen(PORT,() => {
	  console.log('Listening on ' + PORT)
	});
	
	var io = require('socket.io-client');
	var socket = io.connect(REMOTE_HOST, {reconnect: true});

	// Add a connect listener
	socket.on('connect', function (socket) { //'connect' is a key word
		console.log('Connected!');
	});
	socket.emit('test_socket', 'Hello the world', (msg)=>{
			console.log('Ack from server : nb users = ' + msg);
		}
	);
	
	const connected_users = require('./common-data/'); //expected 'index.js' in folder './common-data/' 
	var users = connected_users.connected_users;
	
	socket.emit('monitor_users');
	
	socket.on('monitor_users_back', (myArrayMap)=> {
		
		console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj monitor_users_back : myArrayMap.size = ' + myArrayMap + " jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
		
		var usersMap = new Map(myArrayMap)
		
		var usersMap = new Map(myArrayMap)
		console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! = " + usersMap + " !!!!!!!!!!!!!!!!!!!!!!!!!!!");
		for (let user of usersMap) {
			//console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! user " + user + " !!!!!!!!!!!!!!!!");
			console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! id = " + user[0] + " name = " + user[1] + " !!!!!!!!!!!!!!!!");
		}
    
		
		//export the received data
		users.push(myArrayMap)
		
		/*
		console.log('jjjj: (myMap is instanceof Map) = ' + (myMap instanceof Map) + " jjjj");
		console.log('jjjj: myMap.keys = ' + Object.keys(myMap) + " jjjj");
		
		if(myMap != null){
			console.log("");
			console.log("")
			const keys = myMap.keys(); //iterator
			let key = keys.next();
			
			while (!	key.done) {
				 console.log("map  value = " + myMap.get(key.value) + " key =  " + key.value); // key : value
				 key = keys.next();		 //next key
			}
			console.log("");
			console.log("");
		}
		*/
		
	});
	
