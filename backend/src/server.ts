import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // For dev
  },
});

const supabaseUrl = process.env.SUPABASE_URL || 'https://example.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'example-key';
const supabase = createClient(supabaseUrl, supabaseKey);

interface PlayerData {
  id: string;
  position: { x: number; y: number; z: number };
  health: number;
}

const players = new Map<string, PlayerData>();

io.on('connection', (socket: Socket) => {
  console.log(`Player connected: ${socket.id}`);

  players.set(socket.id, {
    id: socket.id,
    position: { x: 0, y: 1, z: 0 },
    health: 100,
  });

  // Send current state to new player
  socket.emit('currentPlayers', Array.from(players.values()));

  // Broadcast to others
  socket.broadcast.emit('playerJoined', players.get(socket.id));

  socket.on('move', (position: { x: number; y: number; z: number }) => {
    const player = players.get(socket.id);
    if (player) {
      player.position = position;
      socket.broadcast.emit('playerMoved', { id: socket.id, position });
    }
  });

  socket.on('chatMessage', (msg: string) => {
    io.emit('chatMessage', { sender: socket.id, text: msg });
  });

  socket.on('disconnect', () => {
    console.log(`Player disconnected: ${socket.id}`);
    players.delete(socket.id);
    io.emit('playerLeft', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`MMO Backend running on port ${PORT}`);
});
