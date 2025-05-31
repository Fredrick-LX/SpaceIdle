import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Level } from 'level';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { EventsManager } from './EventsManager/Manager';
import { RegisterEvent, LoginEvent, ResetPasswordEvent, SendResetEmailEvent } from './EventsManager/Events';
import { getUserByEmail, getUserByUsername } from './utils';

// 数据库初始化
// 定义User类型
type User = { id: string; username: string; email: string; password: string };
const db = new Level<string, User>('./db', { valueEncoding: 'json' });

const app = express();
app.use(cors());
app.use(bodyParser.json());

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' }, path: '/ws' });

const eventsManager = new EventsManager();
eventsManager.register(new RegisterEvent());
eventsManager.register(new LoginEvent());
eventsManager.register(new ResetPasswordEvent());
eventsManager.register(new SendResetEmailEvent());

// Socket.io 事件
io.on('connection', (socket) => {
    console.log(`新连接: socket.id=${socket.id}, 时间=${new Date().toISOString()}`);
    socket.onAny(async (eventName, data, callback) => {
        await eventsManager.handle(eventName, data, callback, {
            getUserByEmail: (email: string) => getUserByEmail(db, email),
            getUserByUsername: (username: string) => getUserByUsername(db, username),
            db
        });
    });
});

const PORT = 1453;
httpServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}); 