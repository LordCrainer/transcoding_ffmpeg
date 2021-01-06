const vars = {
  socket: {
    socketServer: process.env.socket.server,
    options: {
      transports: ["websocket"],
      rejectUnauthorized: false,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 15,
      path: process.env.socket.path
    }
  }
};
export default vars;
