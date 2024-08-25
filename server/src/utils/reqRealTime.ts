import { Server } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { SellerReq } from '../types/typeDao';

let io: Server;

export const initSocketIO = (server: HTTPServer) => {
  io = new Server(server);

  io.on('connection', socket => {
    // console.log(`Admin connected: ${socket.id}`);

    socket.on('disconnect', () => {
      // console.log(`Admin disconnected: ${socket.id}`);
    });
  });
};

export const emitNewSellerRequest = (newRequest: SellerReq) => {
  if (io) {
    io.emit('newSellerRequest', newRequest);
  }
};
