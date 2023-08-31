const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', function(socket) {
  console.log('a user connected');
});

http.listen(30001, function() {
  console.log('listening on *:30001');
});
