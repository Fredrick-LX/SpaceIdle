export abstract class Event {
    abstract name: string;
    abstract handle(data: any, callback: Function, context: any): Promise<void>;
}

export class RegisterEvent extends Event {
    name = 'register';
    async handle(data: any, callback: Function, context: any) {
        const { getUserByEmail, db } = context;
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
    }
}

export class LoginEvent extends Event {
    name = 'login';
    async handle(data: any, callback: Function, context: any) {
        const { getUserByEmail } = context;
        const { email, password } = data;
        const user = await getUserByEmail(email);
        if (!user || user.password !== password) {
            return callback({ code: 1, message: '邮箱或密码错误' });
        }
        callback({ code: 0, message: '登录成功', data: { id: user.id, username: user.username, email: user.email } });
    }
}

export class ResetPasswordEvent extends Event {
    name = 'reset-password';
    async handle(data: any, callback: Function, context: any) {
        const { getUserByEmail, db } = context;
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
    }
}

export class SendResetEmailEvent extends Event {
    name = 'send-reset-email';
    async handle(data: any, callback: Function, context: any) {
        const { getUserByEmail } = context;
        const { email } = data;
        const user = await getUserByEmail(email);
        if (!user) {
            return callback({ code: 1, message: '用户不存在' });
        }
        callback({ code: 0, message: '重置邮件已发送（模拟）' });
    }
}
