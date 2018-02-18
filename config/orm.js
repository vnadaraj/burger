// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];
  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }
  // translate array of strings to a single comma-separated string
  return arr.toString();
}


// Methods that will execute the necessary MySQL commands in the controllers.

// These are the methods we will use in order to retrieve and store data in the database.

// Object for all our SQL statement functions.

// Object Relational Mapper (ORM)
// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection

var orm = {
	// selectAll()
	selectAll: function(tableInput, cb) {
		var queryString = "SELECT * FROM " + tableInput + ";";
		console.log(queryString);
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			console.log(result);
			cb(result);
		});
	},
	// insertOne()
	insertOne: function(table, cols, vals, cb) {
		var queryString = "INSERT INTO " + table;

		queryString = queryString + " (";
		queryString = queryString + cols.toString();
		queryString = queryString + ") ";
		queryString = queryString + "VALUES (";
		queryString = queryString + printQuestionMarks(vals.length);
		queryString = queryString + ") ";

		console.log(queryString);

		connection.query(queryString, vals, function(err, result) {
			if (err) {
				throw err;
			}
			console.log(result);
			cb(result);
		});
	},
	// updateOne()
	// An example of objColVals would be {burger_name: "Dummy Burger 1", devoured: true}
	updateOne: function(table, objColVals, condition, cb) {
		var queryString = "UPDATE " + table;

		queryString = queryString + " SET ";
		queryString = queryString + objToSql(objColVals);
		queryString = queryString + " WHERE ";
		queryString = queryString + condition;

		console.log(queryString);

		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			console.log(result);
			cb(result);			
		});
	}

};


// Export the orm object for the model burger.js
module.exports = orm;

