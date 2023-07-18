export const startedInlineKeys = {
    reply_markup: {
        inline_keyboard: [
            [
                {text: 'Пополнить баланс', callback_data: 'balance'}
            ],
            [
                {text: 'Посмотреть тарифы', callback_data: 'rates'}
            ],
            [
                {text: 'Важная информация', callback_data: 'information'}
            ],
            [
                {text: 'Техподдержка', callback_data: 'support'}
            ]
        ]
    }
};