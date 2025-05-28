import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Level } from 'level';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { EventsManager } from './EventsManager/Manager';
import { RegisterEvent, LoginEvent, ResetPasswordEvent, SendResetEmailEvent } from './EventsManager/Events';

// 数据库初始化
// 定义User类型
type User = { id: string; username: string; email: string; password: string };
const db = new Level<string, User>('./db', { valueEncoding: 'json' });

const app = express();
app.use(cors());
app.use(bodyParser.json());

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

const eventsManager = new EventsManager();
eventsManager.register(new RegisterEvent());
eventsManager.register(new LoginEvent());
eventsManager.register(new ResetPasswordEvent());
eventsManager.register(new SendResetEmailEvent());

// 工具函数
async function getUserByEmail(email: string) {
    try {
        const user = await db.get(`user:${email}`);
        return user;
    } catch (err) {
        return null;
    }
}

// Socket.io 事件
io.on('connection', (socket) => {
    socket.onAny(async (eventName, data, callback) => {
        await eventsManager.handle(eventName, data, callback, { getUserByEmail, db });
    });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}); 