// stores/useLotteryStore.ts
import { defineStore } from 'pinia'

// 定義參加者的型別
interface LotteryState {
    participants: string[]
}

export const useLotteryStore = defineStore('lottery', {
    state: (): LotteryState => ({
        participants: ['Alice', 'Bob', 'Charlie', 'Dave'], // 假資料
    }),
    actions: {
        addParticipant(name: string) {
            if (name.trim() !== '') {
                this.participants.push(name.trim())
            }
        },
        removeParticipant(name: string) {
            this.participants = this.participants.filter(
                participant => participant !== name
            )
        },
    },
})
