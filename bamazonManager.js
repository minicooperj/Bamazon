//  npm install mysql
var mysql = require('mysql');
var Table = require('easy-table');
var inquirer = require('inquirer');

var connection = mysql.createConnection({

	host: "localhost",
	port: 3306,


	// Your username

	user: "root",

	// Your password

	password:"Coopp758702",
	database: "Bamazon"
});

connection.connect(function(err){
	if (err) throw err;
	console.log("Connected as id " + connection.threadId);
});
