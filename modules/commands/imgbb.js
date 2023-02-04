module.exports.config = {
    name: 'imgbb',
    version: '10.02',
    hasPermssion: 0,
    credits: 'DC-Nam',
    description: 'Tải hình ảnh lên imgbb và trả về link!',
    commandCategory: 'Công cụ',
    usages: '[reply ảnh | link]',
    cooldowns: 3
};
const {
    post
} = require('axios');
module.exports.run = async function({
    api, event, args
}) {
    const out = (a, b, c, d) => api.sendMessage(`${a}`, b?b: event.threadID, c?c: null, d?d: event.messageID);
    try {
        out((await post(`https://api.nambsls.repl.co/tien-ich/imgbb-upload.json`, {
            d: event.type == 'message_reply'?event.messageReply.attachments.map(i => i.url):args
        })).data.msg);
    }catch(err) {
        const x = err.response;
        out(x?x.data.msg: err);
    }
};