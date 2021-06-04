const { Telegraf } = require('telegraf');
require('dotenv').config();
const bot = new Telegraf(process.env.TOKEN);

///
const main = require('./functions/main.js');
const help = require('./functions/help.js')
const messages = require('./functions/messages.js');
const leaderboard = require('./functions/leaderboard.js')
const daily_leaders = require('./functions/daily-leaders.js')
///

bot.on('new_chat_members', (ctx)=>{
    ctx.reply(`Привет, ${ctx.from.first_name}. Тебя приветствует наше небольшое уютное сообщество. \nЧто бы узнать все функции бота напиши слово "help"`)
})

bot.on('message', async (ctx) => {
    if(ctx.chat.type == 'private') return;

    let message =  ctx.message.text;
    if(message) {message = ctx.message.text.split(/\s+/g)} else return;

    if(['help', '/help', '@/helpcutestdogebot'].includes(message[0].toLowerCase())){
        help(bot, ctx);
    } else if(['messages', '/messages', '/messages@cutestdogebot'].includes(message[0].toLowerCase())){
        messages(ctx); 
    } else if(['leaderboard', '/leaderboard', '/leaderboard@cutestdogebot'].includes(message[0].toLowerCase())){
        leaderboard(ctx);
    } else if(['daily-leaders', '/daily', '/daily@cutestdogebot'].includes(message[0].toLowerCase())){
        daily_leaders(ctx);
    } else {
        main(ctx);
    };

});
bot.on('callback_query', (query)=>{
    if(query.update.callback_query.data == 'messages'){
        messages(query);  
    };
    if(query.update.callback_query.data == 'leaderboard'){
        leaderboard(query);
    };
    if(query.update.callback_query.data == 'daily-leaders'){
        daily_leaders(query);
    };
});


bot.launch();
