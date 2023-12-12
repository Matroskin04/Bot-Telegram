import TelegramBot from "node-telegram-bot-api";
import 'dotenv/config'
import {confirmationDeposit, startedInlineKeys} from "./keyboards/inline-keyboards";
import {BalanceOfUser} from "./db/models-shemas-db/balances-of-users";
import {BalanceOfUserType} from "./types/types";
import {runDB} from "./db/db";


const token = process.env.BOT_TOKEN;
if (!token) throw new Error('Bot Token is not found.')

const startDB = async () => {
    await runDB();
    console.log('App is started successfully');
}
startDB()

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
const idAdmin = 1060935573;


//commands
bot.setMyCommands([
    {command: '/start', description: 'Запустить бота'},
    {command: '/info', description: 'Information'}
])

bot.on('message', async msg => {
    const text: string | undefined = msg.text;
    const chatId: number = msg.chat.id;

    if (text === '/start') {
        await bot.sendMessage(chatId, ` Привет, через меня ты можешь опубликовать свои рекламные объявления
Для навигации по боту, используйте кнопки ниже ⤵️`, startedInlineKeys);
    }
})

//callback inlineKeyBoard
bot.on('callback_query', async (query) => {

    // let sum: number = 0;

    if (query.data === 'balance') {
        await bot.sendMessage(query.from.id, 'Введите сумму пополнения:');

        const messageListener = async (msg: TelegramBot.Message) => {
            let sum = Number.parseFloat(msg.text || '');

            if (!sum) {
                await bot.sendMessage(msg.chat.id, 'Ошибка! Введите, пожалуйста, сумму ввиде числа');

            } else {
                await bot.sendMessage(msg.chat.id, `Вы уверены, что хотите пополнить баланс на ${sum} рублей?`, confirmationDeposit);
                // Remove the listener
                bot.removeListener('message', messageListener);
            }
        };

        bot.on('message', messageListener);
    }

    if (query.data === 'deposit') {
let sum = 1

        const userBalance = await BalanceOfUser.findOne({userId: query.from.id});
        if (userBalance) {
            userBalance.balance += sum;
            const result = await userBalance.save(); //возвращает объект

            await bot.sendMessage(query.from.id, `Вы пополнили баланс на ${sum}. Ваш баланс: ${result.balance}`);

        } else {
            const newUserBalance = new BalanceOfUserType(query.from.id, sum);
            await BalanceOfUser.create(newUserBalance);

            await bot.sendMessage(query.from.id, `Вы пополнили баланс на ${1}. Ваш баланс: ${sum}`);

        }


    }


    if (query.data === 'main_menu') {
//         await bot.deleteMessage(query.message!.chat.id, query.message!.message_id);
//         await bot.sendMessage(query.from.id, ` Привет, через меня ты можешь опубликовать свои рекламные объявления
// Для навигации по боту, используйте кнопки ниже ⤵️`,  startedInlineKeys)
        await bot.editMessageText(` Привет, через меня ты можешь опубликовать свои рекламные объявления
Для навигации по боту, используйте кнопки ниже ⤵️`,  {
            chat_id: query.message!.chat.id,
            message_id: query.message!.message_id,
            reply_markup: startedInlineKeys.reply_markup
        })
    }
});