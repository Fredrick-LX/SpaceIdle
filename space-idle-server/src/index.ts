import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Level } from 'level';
import { createServer } from 'http';
import { Server } from 'socket.io';

// 数据库初始化
// 定义User类型
type User = { id: string; username: string; email: string; password: string };
const db = new Level<string, User>('./db', { valueEncoding: 'json' });

const app = express();
app.use(cors());
app.use(bodyParser.json());

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

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
  // 注册
  socket.on('register', async (data, callback) => {
    const { username, email, password, confirmPassword } = data;
    if (!username || !email || !password || !confirmPassword) {
      return callback({ code: 1, message: '参数不完整' });
    }
    if (password !== confirmPassword) {
      return callback({ code: 1, message: '两次密码不一致' });
    }
    const exist = await getUserByEmail(email);
    if (exist) {
      return callback({ code: 1, message: '邮箱已注册' });
    }
    const user = { id: Date.now().toString(), username, email, password };
    await db.put(`user:${email}`, user);
    callback({ code: 0, message: '注册成功', data: { id: user.id, username, email } });
  });

  // 登录
  socket.on('login', async (data, callback) => {
    const { email, password } = data;
    const user = await getUserByEmail(email);
    if (!user || user.password !== password) {
      return callback({ code: 1, message: '邮箱或密码错误' });
    }
    callback({ code: 0, message: '登录成功', data: { id: user.id, username: user.username, email: user.email } });
  });

  // 重置密码
  socket.on('reset-password', async (data, callback) => {
    const { email, oldPassword, newPassword, confirmPassword } = data;
    const user = await getUserByEmail(email);
    if (!user) {
      return callback({ code: 1, message: '用户不存在' });
    }
    if (user.password !== oldPassword) {
      return callback({ code: 1, message: '原密码错误' });
    }
    if (newPassword !== confirmPassword) {
      return callback({ code: 1, message: '两次新密码不一致' });
    }
    user.password = newPassword;
    await db.put(`user:${email}`, user);
    callback({ code: 0, message: '密码重置成功' });
  });

  // 发送重置密码邮件（模拟）
  socket.on('send-reset-email', async (data, callback) => {
    const { email } = data;
    const user = await getUserByEmail(email);
    if (!user) {
      return callback({ code: 1, message: '用户不存在' });
    }
    callback({ code: 0, message: '重置邮件已发送（模拟）' });
  });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); 