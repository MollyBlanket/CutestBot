const stats = require('./activity.json');

module.exports = async (ctx) => {
    let members = Object.keys(stats[ctx.chat.id]);
    let messages = []
    for(let i=0; i!=members.length; i++){
        let member = stats[ctx.chat.id][members[i]]
        messages.push([member.whole_activity, member.name]);
    };

    messages = messages.sort(([a], [b]) => b - a);

    let leaderboard = '';
    for(let i=0; i<messages.length; i++){
        leaderboard += `${i+1}. ${messages[i][1]} - ${messages[i][0]} messages\n`
    };
    ctx.reply(`Whole activity\n${leaderboard}`)
};  