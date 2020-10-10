'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Hoek = require('hoek');


// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});



server.register(require('vision'), (err) => {

    Hoek.assert(!err, err);

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'html'
    });
	

});

server.register(require('inert'), (err) => {
	Hoek.assert(!err, err);
});


// Add the route
server.route({
    method: 'GET',
    path:'/hello', 
    handler: function (request, reply) {

        return reply('hello world');
    }
});

// Add the route
server.route({
    method: 'GET',
    path:'/', 
    handler: function (request, reply) {

        return reply.view('index');
    }
});

server.route({
path: "/styles/{path*}",
method: "GET",
handler: {
    directory: {
        path: "./styles",
        listing: false,
        index: false
    }
}});

server.route({
path: "/scripts/{path*}",
method: "GET",
handler: {
    directory: {
        path: "./scripts",
        listing: false,
        index: false
    }
}});



// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});