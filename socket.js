
module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log('a user connected with socket iD',socket.id);
        // socket logic here
        socket.on('chat-message', (msg) => {
            io.emit('chat-message', msg);
        });

        // typing channel
        socket.on('typing',()=>{
            socket.broadcast.emit('show_typing_status');
        });

        socket.on('typing_status',()=>{
           socket.broadcast.emit('stop_typing') ;
        });
    });
};
