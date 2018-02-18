/**
Eat-Da-Burger! is a restaurant app that lets users input the names of burgers they'd like to eat.
Whenever a user submits a burger's name, your app will display the burger on the left side of the page -- waiting to be devoured.
Each burger in the waiting area also has a Devour it! button. When the user clicks it, the burger will move to the right side of the page.
Your app will store every burger in a database, whether devoured or not.

Using Node, Express, Handlebars
with MySQL and a homemade ORM.

It follows the MVC design pattern:
- use Node and MySQL to query and route data in your app, and
- Handlebars to generate your HTML.

**/

/**
We set up the server file Express middleware:

**/

// Require the following npm packages inside of the server.js file:
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
