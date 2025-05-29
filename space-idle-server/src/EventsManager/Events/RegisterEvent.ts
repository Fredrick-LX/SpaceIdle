import { Event } from './index';

export class RegisterEvent extends Event {
    name = 'register';

    async handle(data: { username: string; email: string; password: string }, callback: Function, context: any) {
        const { username, email, password } = data;
        if (!username || !email || !password) {
            return callback({ code: 1, message: '用户名、邮箱或密码不能为空' });
        }
        // 检查用户是否已存在
        const user = await context.getUserByEmail(email);
        if (user) {
            return callback({ code: 2, message: '用户已存在' });
        }
        // 创建新用户
        const newUser = { id: Date.now().toString(), username, email, password };
        await context.db.put(`user:${email}`, newUser);
        callback({ code: 0, message: '注册成功', user: newUser });
    }
}
