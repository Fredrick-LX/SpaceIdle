import { Event } from './index';

export class ResetPasswordEvent extends Event {
    name = 'resetPassword';

    async handle(data: { email: string; newPassword: string }, callback: Function, context: any) {
        const { email, newPassword } = data;
        if (!email || !newPassword) {
            return callback({ code: 1, message: '邮箱或新密码不能为空' });
        }
        const user = await context.getUserByEmail(email);
        if (!user) {
            return callback({ code: 2, message: '用户不存在' });
        }
        user.password = newPassword;
        await context.db.put(`user:${email}`, user);
        callback({ code: 0, message: '密码重置成功' });
    }
}
