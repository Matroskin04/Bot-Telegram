import TelegramBot, {Message} from "node-telegram-bot-api";
import 'dotenv/config'
import fs from "fs";
import ErrnoException = NodeJS.ErrnoException;
import {log} from "util";

const token = process.env.BOT_TOKEN;
if (!token) throw new Error('Bot Token is not found.')

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
const idAdmin = 1060935573;

/*
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
}*/

// bot.setMyCommands([
//     {command: '/greet', description: 'Начальное приветствие'},
//     {command: '/info', description: 'Information'}
// ])




//КНОПКИ
bot.on('message', async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    const options = {
        reply_markup: {
            keyboard: [
                [
                    { text: 'Кнопка 1' },
                    { text: 'Кнопка 2' }
                ],
                [
                    { text: 'Кнопка 3' },
                    { text: 'Кнопка 4' }
                ]
            ],
        }
    };

    if (text === 'buttons') {
        await bot.sendMessage(chatId,'Ok', options)
    }


    if (text === 'buttons2') {
        await bot.sendMessage(chatId,'Ok2')
        await bot.setChatMenuButton({chat_id: chatId, menu_button: {type: 'commands'}})
    }

})

bot.onText(/\/setchatmenubutton/, (msg) => {
    const chatId = msg.chat.id;

    const buttonText = 'Кнопка меню';
    const buttonURL = 'https://example.com';

    bot.setChatMenuButton(buttonText, buttonURL)
        .then(() => {
            bot.sendMessage(chatId, 'Кнопка меню установлена');
        })
        .catch((error) => {
            console.log('Ошибка:', error);
        });
});

bot.on('photo', async (msg) => {
    const chatId = msg.chat.id;

    const photoId = msg.photo![0].file_id;
    console.log(photoId)
    const fileData = await bot.getFileLink(photoId);
    console.log(fileData)
})


//лисенер + инфа по чату
bot.onText(/прив/i, async (msg, match) => {
    const chatId = msg.chat.id;
    const userName = msg.from?.first_name


    if (chatId === -1001916433137) {
        const chatInfo = await bot.getChat(chatId);
        console.log('getChat:', chatInfo);

        const chatInfo1 = await bot.getChatMemberCount(chatId);
        console.log('getChatMemberCount:', chatInfo1);

        const chatInfo2 = await bot.getChatMember(chatId, 106093).catch(e => {
            console.log('User is not found')
        });
        console.log('getChatMember:', chatInfo2);
    }

    bot.sendMessage(chatId, `Hi, my dear friend, ${userName}`).then((value) => {

        // const result1 = bot.removeTextListener(/прив/i);
        // console.log(result1);
    })
})


//логика ответа
bot.onText(/hi/i, async (msg, match) => {

    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, 'Hi, sup?').then((msg) => {

        bot.onReplyToMessage(chatId, msg.message_id, (msg: Message) => {

            if ( /ok/i.test(msg.text!) ) {
                bot.sendMessage(chatId, 'Oh, cool!');

            } else if ( /bad/i.test(msg.text!) ){
                bot.sendMessage(chatId, 'What\'s happened?')
            } else {
                bot.sendMessage(chatId, 'Thank you for answering')
            }
        })
    })
})

