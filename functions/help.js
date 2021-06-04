const inline_keyboard =
[
    [
        {
            text: 'messages',
            callback_data: 'messages'
        }
    ],
    [
        {
            text: 'daily-leaders',
            callback_data: 'daily-leaders'
        },
        {
            text: 'leaderboard',
            callback_data: 'leaderboard'
        }
    ]
];

const message_text = `
messages - Твоя активность на сервере;
daily-leaders - Активность группы за сегодняшний день;
leaderboard - Общая активность группы за все дни;

Поддержать бедного и юного програмиста собаками - DNbwscEk1etVUUtBghu5xLEWj2ghQPtVVp
`


module.exports = async (bot, ctx) => {
    ctx.reply(message_text, { reply_markup: {inline_keyboard}});
};