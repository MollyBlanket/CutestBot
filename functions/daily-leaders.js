const stats = require('./activity.json');

module.exports = async (ctx) => {
    let time = new Date().toJSON().slice(0,10).replace(/-/g,'/');

    let members = Object.keys(stats[ctx.chat.id]);
    let messages = []
    for(let i=0; i!=members.length; i++){
        let member = stats[ctx.chat.id][members[i]];
        
        member.daily_activity[time] && messages.push([member.daily_activity[time], member.name]);
        
    };


    
    messages = messages.sort(([a], [b]) => b - a);

    let leaderboard = '';
    for(let i=0; i<messages.length; i++){
        leaderboard += `${i+1}. ${messages[i][1]} - ${messages[i][0]} messages\n`
    };
    ctx.reply(`Whole mesagges today\n${leaderboard}`)
};  
