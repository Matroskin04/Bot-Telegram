import {WithId} from 'mongodb'

export class BalanceOfUserType {
    constructor(
        public userId: number,
        public balance: number
    ) {
    }
}