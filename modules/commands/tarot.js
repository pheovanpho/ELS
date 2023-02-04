module.exports.config = {
    name: "tarot",
    version: "2.6.2",
    hasPermssion: 0,
    credits: "JRT",
    description: "Xem bài tarot",
    commandCategory: "Kiến thức",
    cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
    const axios = require("axios")
    const c = (await axios.get('https://raw.githubusercontent.com/J-JRT/tarot/mainV2/data.json')).data
  if(args[0] > c.length) return api.sendMessage('[⚜️]→ Không Thể Vượt Quá Số Bài Đang Có Trong Data', event.threađID)
    if(!args[0]){
    var k = Math.floor(Math.random() * c.length)
  } else {
      var k = args[0]
  }
    const x = c[k]
    const t = (await axios.get(`${x.image}`, {
        responseType: "stream"
      })).data;
    const msg = ({
        body: `====== [ 𝐓𝐀𝐑𝐎𝐓 ] ======\n\n➢ Tên: ${x.name}\n➢ Thuộc bộ: ${x.suite}\n➢  Mô tả: ${x.vi.description}\n➢ Diễn dịch: ${x.vi.interpretation}\n➢ Đảo ngược: ${x.vi.reversed}`,
        attachment: t
    })
    return api.sendMessage(msg, event.threadID, event.messageID)
     }