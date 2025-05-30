export interface AccountData {
    id: string;
    username: string;
    password: string;
    email?: string;
}

export class AccountManager {
    private accounts: Map<string, AccountData> = new Map();

    addAccount(account: AccountData) {
        this.accounts.set(account.id, account);
    }

    getAccount(id: string): AccountData | undefined {
        return this.accounts.get(id);
    }

    updateAccount(id: string, data: Partial<AccountData>) {
        const account = this.accounts.get(id);
        if (account) {
            Object.assign(account, data);
        }
    }

    deleteAccount(id: string) {
        this.accounts.delete(id);
    }
} 