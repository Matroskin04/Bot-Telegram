import TelegramBot from "node-telegram-bot-api";
import 'dotenv/config'
import fs from "fs";
import ErrnoException = NodeJS.ErrnoException;

const token = process.env.BOT_TOKEN;
if (!token) throw new Error('Bot Token is not found.')

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
const idAdmin = 1060935573;

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const first_name = msg.chat.first_name;

    if (msg.text) {

        const text = msg.text.toLowerCase();

        if (~text.indexOf("привет")) {
            bot.sendMessage(chatId, 'Приветик, ' + first_name + '!');
        } else if (~text.indexOf("start")) {
        } else if (~text.indexOf("закрыть")) {
            bot.sendMessage(chatId, 'Клавиатура закрыта', {
                reply_markup: {
                    remove_keyboard: true
                }
            });
        } else if (~text.indexOf("клав")) {
            openKlava(chatId);
        } else if (~text.indexOf("здраст")) {
            bot.sendMessage(chatId, 'Здравствуй, здравствуй, ' + first_name + '!');
        } else if (~text.indexOf("здравст")) {
            bot.sendMessage(chatId, 'Здравствуй, здравствуй, ' + first_name + '!');
        } else if (~text.indexOf("дур")) {
            bot.sendMessage(chatId, '' + first_name + ', не ругайся, а то обижусь!');
        } else if (~text.indexOf("туп")) {
            bot.sendMessage(chatId, '' + first_name + ', не ругайся, а то обижусь!');
        } else if (~text.indexOf("класи")) {
            openClassik(chatId, first_name);
        } else if (~text.indexOf("класси")) {
            openClassik(chatId, first_name);
        } else if (~text.indexOf("про автора")) {
            bot.sendMessage(chatId, 'Про автора бота', {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Автор',
                                url: 'https://polyakovdmitriy.ru'
                            }
                        ],
                        [
                            {
                                text: 'Классика',
                                callback_data: 'classik'
                            }
                        ]
                    ]
                }
            })
        } else {
            bot.sendMessage(chatId, '' + first_name + ', я тебя не понимать!');
        }
    }
    bot.forwardMessage(chatId, idAdmin, msg.message_id);

});

bot.onText(/\/start/, (msg, match) => {

    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Приветик, ' + msg.chat.first_name + '!');
    openKlava(chatId);

});

bot.on('callback_query', (query) => {
    const chatId = query.message?.chat.id;
    if (query.data === 'classik') {
        openClassik(chatId, query.message?.chat.first_name);
    }
});

bot.on('contact', (msg) => {

    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Спасибо! Ваш заказ принят, мы с Вами свяжемся!');

});

function openClassik(chatId: any, first_name: any) {
    fs.readdir('./src/klasik/', function(err: ErrnoException | null,files: string[]) {
        if (err) {
            console.error(err);
            return;
        }

        if (files.length === 0) {
            console.error('No files found in ./klasik/');
            return;
        }

        const rf = files[Math.floor(Math.random()*files.length)];

        if (!chatId || !first_name) {
            console.error('Missing chatId or first_name');
            return;
        }

        bot.sendMessage(chatId, '' + first_name + ', лови классическую музыку!');
        bot.sendAudio(chatId, './src/klasik/' + rf).then(()=>{
            bot.sendMessage(chatId, 'И слушай!');
        });
    })
}

function openKlava(chatId: any) {
    bot.sendMessage(chatId, 'Клавиатура открыта', {
        reply_markup: {
            keyboard: [
                [
                    {
                        text: 'Классика'
                    }, {
                    text: 'Закрыть'
                }
                ],
                [
                    {
                        text: 'Заказать разработку бота',
                        request_contact: true
                    }
                ],
                [
                    {
                        text: 'Про автора'
                    }
                ]
            ],
            one_time_keyboard: true
        }
    })
}