export interface GameData {
    id: string; // 与账户id对应
    level: number;
    coins: number;
    inventory: string[];
    progress: any;
}

export class GameDataManager {
    private games: Map<string, GameData> = new Map();

    addGameData(gameData: GameData) {
        this.games.set(gameData.id, gameData);
    }

    getGameData(id: string): GameData | undefined {
        return this.games.get(id);
    }

    updateGameData(id: string, data: Partial<GameData>) {
        const game = this.games.get(id);
        if (game) {
            Object.assign(game, data);
        }
    }

    deleteGameData(id: string) {
        this.games.delete(id);
    }
} 