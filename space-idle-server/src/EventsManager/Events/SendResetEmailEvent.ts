import { Event } from './index';

export class SendResetEmailEvent extends Event {
    name = 'sendResetEmail';

    async handle(data: { email: string }, callback: Function, context: any) {
        const { email } = data;
        if (!email) {
            return callback({ code: 1, message: '邮箱不能为空' });
        }
        // 这里应实现发送邮件逻辑，示例直接返回成功
        callback({ code: 0, message: '重置邮件已发送（模拟）' });
    }
}
