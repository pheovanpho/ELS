module.exports.config = {
	name: "tikvideo",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Thiệu Trung Kiên",
	description: "Tải video tiktok",
	commandCategory: "Phương tiện",
	usages: "tikvideo + link",
	cooldowns: 5
}, 
  module.exports.run = async function({ args,event,	api }) {
  const axios = require("axios");
  const fs = require("fs-extra");
    const request = require("request");
  var img = [];
  if(!args[0]){
    return api.sendMessage(`[⚜️]➜ Chưa nhập nội dung !!!`,event.threadID, event.messageID)
  }
  const res = (await axios.get(`https://leanhtruong.edu.vn/api/tiktok?url=${encodeURI(args[0])}`)).data
   let imga = (await axios.get(res.thumbail , { responseType: "arraybuffer" } )).data; 
         fs.writeFileSync(__dirname + "/cache/tiktok.png", Buffer.from(imga, "utf-8") );
         img.push(fs.createReadStream(__dirname + "/cache/tiktok.png"));
  var msg = {body: `[⚜️]=== 『 𝑻𝑰𝑲𝑻𝑶𝑲 𝑹𝑬𝑷𝑳𝒀 』 ===[⚜️]\n\n[⚜️]➜ Title: ${res.title}\n[⚜️]➜ Tiktoker: ${res.author_video}\n[⚜️]➜ Title Music : ${res.data_music.title}\n\n1.Tải Video\n2.Tải Music\n\n[⚜️]➜ Reply tin nhắn để chọn!`,attachment: img}
  return api.sendMessage(msg, event.threadID, (error, info) => {
        global.client.handleReply.push({
            type: "reply",
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID,
            video: res.data_nowatermark[0].url,
            mp3: res.data_music.url,
            title: res.title,
          authorvd: res.author_video,
          text : res.data_music.title
        })
    }) 
}
module.exports.handleReply = async function ({ args, event, Users, Currencies, api, handleReply }) {
  
 const axios = require("axios");
  const fs = require("fs-extra");
    const request = require("request");
    let { author, video,mp3, title,authorvd, text  , messageID } = handleReply;
  api.unsendMessage(handleReply.messageID);
    if (event.senderID != author) return api.sendMessage("[⚜️]➜ Không lấy được thông tin", event.threadID, event.messageID); 
    switch(handleReply.type) {
        case "reply": {
        switch(event.body){
          case"1":{
            var callback = () => api.sendMessage({body:`[⚜️]=== 『 𝑻𝑰𝑲𝑻𝑶𝑲 𝑽𝑰𝑫𝑬𝑶 』 ===[⚜️]\n\n[⚜️]➜ Tiktoker: ${authorvd}\n[⚜️]➜ Title : ${title}\n`,attachment: fs.createReadStream(__dirname + "/cache/toptop.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/toptop.mp4"),event.messageID);
return request(encodeURI(`${video}`)).pipe(fs.createWriteStream(__dirname+'/cache/toptop.mp4')).on('close',() => callback());     
          }
            case"2":{
            var callback = () => api.sendMessage({body:`[⚜️]=== 『 𝑻𝑰𝑲𝑻𝑶𝑲 𝑨𝑼𝑫𝑰𝑶 』 ===[⚜️]\n\n[⚜️]➜ Song: ${text}`,attachment: fs.createReadStream(__dirname + "/cache/toptop.m4a")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/toptop.m4a"),event.messageID);
return request(encodeURI(`${mp3}`)).pipe(fs.createWriteStream(__dirname+'/cache/toptop.m4a')).on('close',() => callback());     
          }
        }
        }
    }
}