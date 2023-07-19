import TelegramBot from "node-telegram-bot-api";
import 'dotenv/config'
import {startedInlineKeys} from "./keyboards/inline-keyboards";


const token = process.env.BOT_TOKEN;
if (!token) throw new Error('Bot Token is not found.')

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
        await bot.sendMessage(chatId,` Привет, через меня ты можешь опубликовать свои рекламные объявления
Для навигации по боту, используйте кнопки ниже ⤵️`, startedInlineKeys);
    }
})

//callback inlineKeyBoard
bot.on('callback_query', async (query) => {
    if (query.data === 'balance') {
        await bot.sendMessage(query.from.id, 'Введите сумму пополнения:');

        const messageListener = async (msg: any) => {
            if (!Number.parseFloat(msg.text || '')) {
                await bot.sendMessage(msg.chat.id, 'Ошибка! Введите, пожалуйста, сумму ввиде числа');

            } else {
                await bot.sendMessage(msg.chat.id, `Вы пополнили баланс на ${msg.text}`);
                // Remove the listener
                bot.removeListener('message', messageListener);
            }
        };

        bot.on('message', messageListener);
    }
});