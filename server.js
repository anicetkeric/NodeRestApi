'use strict';
const Hapi = require('hapi');
const MySQL = require('mysql');
const Joi = require('joi');

//MySQL Database Connection
const connection = MySQL.createConnection({
     host: 'localhost',
     user: '<db_user>',
     password: '<db_password>',
     database: 'book_db'
});

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000
});

connection.connect();

// Add the route
server.route({
    method: 'GET',
    path:'/helloworld',
    handler: function (request, reply) {
    return reply('hello world');
}
});

//Listing all books
server.route({
    method: 'GET',
    path: '/GetAllbook',
    handler: function (request, reply) {

        connection.query('SELECT * FROM book', function (error, results, fields) {
            if (error) throw error;
            console.log(results);
            reply(results);
        });

    }
});

//Listing single book
server.route({
    method: 'GET',
    path: '/Getbook/{id}',
    handler: function (request, reply) {
        const id = request.params.id;

        connection.query('SELECT * FROM book WHERE id = "' + id + '"', function (error, results, fields) {
            if (error) throw error;
            console.log(results);
            reply(results);
        });

    },
    config: {
        validate: {
            params: {
                id: Joi.number().integer()
            }
        }
    }
});

//Creating a new book
server.route({
    method: 'POST',
    path: '/insertBook',

    handler: function (request, reply) {

        const title = request.payload.title;
        const author = request.payload.author;
        const price = request.payload.price;      

        connection.query('INSERT INTO book (title,author,price) VALUES ("' + title + '","' + author + '","' + price + '")', function (error, results, fields) {
            if (error) throw error;
            console.log(results);
            reply(results);
        });

    },
    config: {
        validate: {
            payload: {
                title:[Joi.string(), Joi.number()],
                author: [Joi.string(), Joi.number()],
                price: Joi.number()
            }
        }

    }
});

//Deleting a book
server.route({
    method: 'DELETE',
    path: '/deleteBook/{id}',
    handler: function (request, reply) {
        const id = request.params.id;

        console.log(id);
        connection.query('DELETE FROM book WHERE id = "' + id + '"', function (error, result, fields) {
            if (error) throw error;

            if (result.affectedRows) {
                reply(true);
            } else {
                reply(false);
            }

        });
    },
    config: {
        validate: {
            params: {
                id: Joi.number().integer()
            }
        }

    }
});

server.start((err) => {
   if (err) {
     throw err;
   }
  console.log('Server running at:', server.info.uri);
});
