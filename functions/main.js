const fs = require('fs');
const fileName = './functions/activity.json'
const file = require('./activity.json');

module.exports = async (ctx) => {
    const chat_id = ctx.chat.id;
    const member_id = ctx.from.id;
    let time = new Date().toJSON().slice(0,10).replace(/-/g,'/');
   

    if(!(chat_id in file)){
        file[chat_id] = {
            [member_id]: {
                name: `${ctx.from.first_name} ${ctx.from.last_name ? ctx.from.last_name : ""}`,
                whole_activity: 0,
                daily_activity: {
                    [time]: 0
                }
            }
        };
        fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
            if (err) return console.log(err);
        }); 
        return
    };
    
    

    if(!(member_id in file[chat_id])){
        file[chat_id][member_id] ={
            name: `${ctx.from.first_name} ${ctx.from.last_name ? ctx.from.last_name : ""}`,
            whole_activity: 0,
            daily_activity: {
                [time]: 0
            }
        };
    
        fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
            if (err) return console.log(err);
        }); 
        return
    }; 

    file[chat_id][member_id].name = `${ctx.from.first_name} ${ctx.from.last_name ? ctx.from.last_name : ""}`
    file[chat_id][member_id].whole_activity += 1;
    file[chat_id][member_id].daily_activity[time] ? file[chat_id][member_id].daily_activity[time] += 1 : file[chat_id][member_id].daily_activity[time] = 1;

    fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
    });  
};

