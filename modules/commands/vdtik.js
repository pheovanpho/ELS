module.exports.config = {
    name: "vdtik",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "tdunguwu",
    description: "Tải video tiktok không logo!",
    commandCategory: "Phương tiện",
    cooldowns: 0,
    dependencies: {
        "fs-extra": "",
		"axios": "",
        "request": ""
    }
};
module.exports.run = async ({ api, event,args }) =>   {
  try {
    const axios = global.nodemodule["axios"];
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
	 const { threadID, messageID, senderID, body } = event;
let text = args.join(" ")
  if (!text) return api.sendMessage('[⚜️]➜ Vui lòng nhập link video tiktok!', event.threadID, event.messageID);
  const length_0 = parseInt(text.length)
 const link = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|")[0];
const res = await axios.get
(`https://docs-api.nguyenhaidang.ml/tiktok/download?link=${link}`);
var url = res.data.hdplay;
var title = res.data.title;
var author_video = res.data.author.nickname;
    var data_music = res.data.music_info.author;
    var view = res.data.play_count;
    var tim = res.data.digg_count;
    var comment = res.data.comment_count;
    var share = res.data.share_count;
    var dl = res.data.download_count;
    var idtik = res.data.author.unique_id;
 
 
	 var callback = () => api.sendMessage({body:`[⚜️]=== 『 TIKTOK VIDEO 』 ===[⚜️]\n◆━━━━━━━━━━━━━━━━◆\n\n[⚜️]➜ Tên người dùng: ${author_video}\n[⚜️]➜ Tên tài khoản: ${idtik}\n[⚜️]➜ URL: https://www.tiktok.com/@${idtik}\n[⚜️]➜ Nội dung: ${title}\n[⚜️]➜ Tên nhạc: ${data_music}\n[⚜️]➜ Lượt xem: ${view}\n[⚜️]➜ Lượt tim: ${tim}\n[⚜️]➜ Lượt bình luận: ${comment}\n[⚜️]➜ Lượt chia sẻ: ${share}\n[⚜️]➜ Lượt tải: ${dl}`,attachment: fs.createReadStream(__dirname + "/cache/1.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.mp4"),event.messageID);
	 return request(encodeURI(`${url}`)).pipe(fs.createWriteStream(__dirname+'/cache/1.mp4')).on('close',() => callback());  }
   catch (err) {
        console.log(err)
        return api.sendMessage("[⚜️]➜ Không thể xử lý yêu cầu của bạn!", event.threadID);
    }  
}