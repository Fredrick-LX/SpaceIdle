import { Event } from './index';

export class LoginEvent extends Event {
    name = 'login';

    async handle(data: { username: string; password: string }, callback: Function, context: any) {
        const { username, password } = data;
        // 这里可以添加登录逻辑，例如校验用户名和密码
        // 示例：
        if (!username || !password) {
            return callback({ code: 1, message: '用户名或密码不能为空' });
        }
        // 假设有getUserByEmail方法
        const user = await context.getUserByEmail(username);
        if (!user || user.password !== password) {
            return callback({ code: 2, message: '用户名或密码错误' });
        }
        // 登录成功
        callback({ code: 0, message: '登录成功', user });
    }
} 