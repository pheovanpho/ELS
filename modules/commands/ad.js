const request = require('request');

const fs = global.nodemodule["fs-extra"]

module.exports.config = {

  name: "ad",

  version: "1.0.0",

  hasPermssion: 0,

  credits: "JRT",

  description: "Kiểm tra thông tin adminbot",

  commandCategory: "Thông tin",

  usages: "ad",

  cooldowns: 0,

  dependencies: {

"request": ""

}

};
module.exports.run = async({api,event,args,Users,global,Currencies}) => {

var callback = () => api.sendMessage(

  {body:`[⚜️]=== 『 INFORMATION ADMIN 』 ===[⚜️]
◆━━━━━━━━━━━━━━━━◆


[👀]→ Tên: Nguyễn Đức Hiếu
[💮]→ Biệt danh: ELS 
[❎]→ Ngày tháng năm sinh: 26/11/2001 
[👤]→ Giới tính: Nam
[💫]→ Chiều cao cân nặng: 1m79 x... kg
[❤️]→ Tên duyên phận: ...
[🧸]→ Biệt danh: ...
[💥]→ Ngày sinh: ...
[💘]→ Mối quan hệ: ĐỘc thân
[🌎]→ Quê quán: Thái Bình - Hà Nội
[🌸]→ Tính cách: Thích 1 mình
[🌀]→ Sở thích: Thích cái đẹp, đi phượt,đi xem phim, thưởng thức các món ẩm thực khác nhau

[⚜️]=== 『 CONTACT 』 ===[⚜️]
◆━━━━━━━━━━━━━━━━◆


[☎]→ SĐT & Zalo: 0836645838
[🌐]→ Facebook: https://www.facebook.com/nguyenhieutb11
[⛲]→ Instagram: https://www.instagram.com/duchieu.26

[⚜️]=== 『 CONTACT 』 ===[⚜️]
◆━━━━━━━━━━━━━━━━◆


[💵]→ Momo: 0836645838 
[💵]→ Mbbank: 9992001666666 
[💵]→ Sacombank: 9926112001 
[💵]→ ZaloPay: 0836645838 

[⚜️]=== 『 PROBLEM 』 ===[⚜️]
◆━━━━━━━━━━━━━━━━◆


[❗]→ Mọi thắc mắc hay bot không hoạt động có thể hỏi trực tiếp admin theo các link ở trên.
[📌]→ Hãy đồng hành cùng BOT ELS và mình nhé. Cảm ơn mọi người <3

✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

[📝]→ Bot được điều hành bởi ELS`,

    attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => 

    fs.unlinkSync(__dirname + "/cache/1.png"));  

      return request(

        encodeURI(`https://graph.facebook.com/${100009355185480}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(

fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());

       };