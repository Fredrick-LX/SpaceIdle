import { Level } from 'level';

type User = { id: string; username: string; email: string; password: string };

export async function getUserByEmail(db: Level<string, User>, email: string) {
    try {
        const user = await db.get(`user:${email}`);
        return user;
    } catch (err) {
        return null;
    }
}

export async function getUserByUsername(db: Level<string, User>, username: string) {
    try {
        let foundUser = null;
        for await (const [key, value] of db.iterator()) {
            if (value.username === username) {
                foundUser = value;
                break;
            }
        }
        return foundUser;
    } catch (err) {
        return null;
    }
} 