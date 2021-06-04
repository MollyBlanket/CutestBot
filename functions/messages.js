const stats = require('./activity.json');

module.exports = async (ctx) => {
    let time = new Date().toJSON().slice(0,10).replace(/-/g,'/');

    ctx.telegram.getUserProfilePhotos(ctx.from.id, 0, 1)
        .then(async a=> {
            let photo = a.photos[0];
            
            if(photo){
                await ctx.replyWithPhoto(a.photos[0][0].file_id, { 
                caption: `Whole your activity is ${stats[ctx.chat.id][ctx.from.id].whole_activity} \n`+
                    'Today you sent '+stats[ctx.chat.id][ctx.from.id].daily_activity[time]+' messages' 
                });
            } else{
                ctx.reply(`Whole your activity is ${stats[ctx.chat.id][ctx.from.id].whole_activity} \n`+
                'Today you sent '+stats[ctx.chat.id][ctx.from.id].daily_activity[time]+' messages')
            }; 
        });
};