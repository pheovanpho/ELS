module.exports.config = {
    name: 'lienquan',
    version: '1.1.1',
    hasPermssion: 0,
    credits: 'DC-Nam',
    description: 'LQM',
    commandCategory: 'Thông tin',
    usages: 'lienquan',
    cooldowns: 2,
    dependencies: {
        'image-downloader': '',
    }
};
const {
    get
} = require('axios'),
streamURL = async a => (await get(a, {
    responseType: 'stream'
})).data,
random_ = a => a[Math.floor(Math.random()*a.length)];
module.exports.run = async function({
    api, event, args
}) {
    try {
        switch (args[0]) {
            case 'infohero': {
                const str = args.splice(1).join(' '),
                i = str.indexOf('&'),
                hero = str.slice(0, i).trim(),
                level = str.slice(i+1).trim();
                if (i == -1) return api.sendMessage(`Vui lòng nhập đúng định dạng: tên tướng & level`, event.threadID, event.messageID);
                const {
                    data
                } = (await get(`https://api.nambsls.repl.co/lienquan/chi-tiet-tuong?h=${hero}&l=${level}`)).data;
                api.sendMessage({
                    body: `[⚜️]=== 『 CHI TIẾT TƯỚNG 』 ===[⚜️]\n◆━━━━━━━━━━━━━━━━◆\n\n[⚜️]➜ Tên: ${data.hero_name}\n[⚜️]➜ Cấp Độ:${level}\n\n[⚜️]=== 『 CHỈ SỐ 』 ===[⚜️]\n◆━━━━━━━━━━━━━━━━◆\n\n${data.stat.map(i => `${i[0]}: ${i[1]}`).join('\n')}\n\n[⚜️]➜ [Reply] + [Skill | Bio | Guide].`, attachment: await streamURL(random_(data['image-skin'].original))
                }, event.threadID, (err, datam) => global.client.handleReply.push({
                        name: 'lienquan', messageID: datam.messageID, author: event.senderID, data, 'case': 'chi-tiet-tuong'
                    }), event.messageID);
            }; break;
            case 'listhero': api.sendMessage((await get(`https://api.nambsls.repl.co/lienquan/find-hero?c=listhero`)).data.message, event.threadID); break;
            default: api.sendMessage(`[⚜️]=== 『 AREA OF VALOR 』 ===[⚜️]\n◆━━━━━━━━━━━━━━━━◆\n\n[⚜️]➜ infohero + tên tướng [⚜️]➜ xem thông tin tướng.\n[⚜️]➜ listhero [⚜️]➜ xem danh sách tướng.`, event.threadID);
            };
        }catch(err) {
            api.sendMessage(err.response.data.message, event.threadID, event.messageID)
        };
    };
    module.exports.handleReply = async function({
        handleReply: $, api, event
    }) {
        try {
            if ($.case == 'chi-tiet-tuong') {
                const aLow_0 = event.args[0].toLowerCase();
                if (aLow_0 == 'skill') {
                    const a = [], b = ($.data.skill.map(i=>i.splice(1).join('\n'))).join(`\n${'_'.repeat(13)}\n`);
                   for(const i of $.data.skill) a.push(await streamURL(i[0]));
                    return api.sendMessage({body:b,attachment: a}, event.threadID, event.messageID);
                };
                if (aLow_0 == 'bio') return api.sendMessage($.data.tieusu, event.threadID, event.messageID);
                if (aLow_0 == 'guide') return api.sendMessage(`${$.data.vitri}\n\n[⚜️]➜ [Reply] + [Nâng chiêu | Ngọc | Trang bị] `, event.threadID, (err, data) => global.client.handleReply.push({
                    name: 'lienquan', messageID: data.messageID, author: $.author, data: $.data, 'case': 'guide'
                }), event.messageID);
            };
            if($.case == 'guide'){
              const bLower = event.body.toLowerCase();
              if(bLower == 'nâng chiêu'){
                var a = [], b = '', tttc = $.data.thứ_tự_tăng_chiêu;
               if(!tttc.image) tttc.data.status.forEach((a,b$) => {
                    const a$c = [];
                  if(a[0])a$c.push('Nội tại');
                  if(a[1])a$c.push('Chiêu 1');
                  if(a[2])a$c.push('Chiêu 2');
                  if(a[3])a$c.push('Chiêu 3');
                  b+=`[⚜️]➜ Cấp ${b$+1}: ${a$c.join(', ')}\n`;
                });
                if(!tttc.image) for(const i of tttc.data.icon[0]) a.push(await streamURL(i)); else a.push(await streamURL(tttc.image));
                api.sendMessage({body: b, attachment:a},event.threadID, event.messageID);
              };
              if(bLower == 'ngọc'){
                 var a = [], b = '';
                 ['Đỏ','Tim','Xanh'].forEach(async(d,i) => {
                    x = $.data.ngoc[i],
                    b += `${d}: ${x[1].replace(/\n|\t/g, ' ').replace('  ',',')}\n`,
                    a.push(await streamURL(x[0]));
                 });
                 api.sendMessage({body:b,attachment:a},event.threadID, event.messageID);
              };
              if(bLower == 'trang bị'){
                 var a = [], b = '';
                 $.data.trang_bi.forEach(async(d,i)=>{
                   b += `${i+1}. ${d[1]}\n`,
                   a.push(await streamURL(d[0]));
                 });
                 api.sendMessage({body:b,attachment:a},event.threadID, event.messageID);
              };
            };
        }catch(err) {
            api.sendMessage(`${err}`, event.threadID, event.messageID);
        };
    };