
module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log('a user connected with socket iD',socket.id);
        // socket logic here
        socket.on('chat-message', (msg) => {
           // socket.broadcast.emit(msg);
            io.emit('chat-message', msg);
        });

    });
};
