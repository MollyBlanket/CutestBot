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
    await main(ctx);

    let message =  ctx.message.text;
    if(message) {message = ctx.message.text.split(/\s+/g)} else return;

    if(message[0].toLowerCase() == 'help'){
        return await  help(bot, ctx);
    };
    if(message[0].toLowerCase() == 'messages'){
        return await messages(ctx); 
    };
    if(message[0].toLowerCase() == 'leaderboard'){
        return await leaderboard(ctx);
    };
    if(message[0].toLowerCase() == 'daily-leaders'){
        return await daily_leaders(ctx);
    };
    await main(ctx);

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
