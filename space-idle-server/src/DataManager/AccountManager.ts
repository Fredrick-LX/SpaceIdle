export interface AccountData {
    uuid: string;//唯一标识
    username: string;
    password: string;//使用md5加密后的密码,比较时对密码进行md5加密后比较
    createTime: number;//创建时间
    lastLoginTime: number;//最后登录时间
    email?: string;
}

export class AccountManager {
    private accounts: Map<string, AccountData> = new Map();

    addAccount(account: AccountData) {
        this.accounts.set(account.uuid, account);
    }

    getAccount(uuid: string): AccountData | undefined {
        return this.accounts.get(uuid);
    }

    updateAccount(uuid: string, data: Partial<AccountData>) {
        const account = this.accounts.get(uuid);
        if (account) {
            Object.assign(account, data);
        }
    }

    deleteAccount(uuid: string) {
        this.accounts.delete(uuid);
    }
} 