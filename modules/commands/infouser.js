const sendWaiting = true; // bật hoặc tắt gửi tin nhắn "đang tạo hình ảnh, vui ồng chờ đợi...";
const textWaiting = "Đang khởi tạo hình ảnh, vui lòng chờ đợi trong giây lát";
const fonts = "/cache/Lobster.ttf"
const downfonts = "https://drive.google.com/u/0/uc?id=1uni8AiYk7prdrC7hgAmezaGTMH5R8gW8&export=download"
const fontsLink = 20
const fontsInfo = 15
const colorName = "#FF00FF"

module.exports.config = {
  name: "infouser",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "D-Jukie",
  description: "Tạo card thông tin người dùng facebook",
  commandCategory: "Thông tin",
  usages: "infosuer",
  cooldowns: 10,
  dependencies: {
    canvas: "",
    axios: "",
    "fs-extra": "",
  },
};

module.exports.circle = async (image) => {
  const jimp = global.nodemodule["jimp"];
  image = await jimp.read(image);
  image.circle();
  return await image.getBufferAsync("image/png");
}
module.exports.run = async function ({ api, event, args, Users }) {
  if ((this.config.credits) != "D-Jukie") { return api.sendMessage(`⚡️Phát hiện credits đã bị thay đổi`, event.threadID, event.messageID)}
  let { senderID, threadID, messageID } = event;
  const { loadImage, createCanvas } = require("canvas");
  const request = require('request');
const fs = require("fs-extra")
const axios = require("axios")
const Canvas = require("canvas")
  let pathImg = __dirname + `/cache/1.png`;
  let pathAvata = __dirname + `/cache/2.png`;
  /*                 */
  if(event.type == "message_reply") { uid = event.messageReply.senderID }
    else uid = event.senderID;
    const res = await axios.get(`https://www.nguyenmanh.name.vn/api/fbInfo?id=${uid}&apikey=ogDIVInu`); 
  let getAvatarOne = (await axios.get(`https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
  let bg = (
    await axios.get(encodeURI(`https://i.imgur.com/AJdZtK9.jpg`), {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
  avataruser = await this.circle(pathAvata);
  fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));

/*-----------------download----------------------*/
if(!fs.existsSync(__dirname+`${fonts}`)) { 
      let getfont = (await axios.get(`${downfonts}`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+`${fonts}`, Buffer.from(getfont, "utf-8"));
    };
/*---------------------------------------------*/

  let baseImage = await loadImage(pathImg);
  let baseAvata = await loadImage(avataruser);
  let canvas = createCanvas(baseImage.width, baseImage.height);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(baseAvata, 80, 73, 295, 295);
    var gender = res.data.result.gender == 'male' ? "Nam" : res.data.result.gender == 'female' ? "Nữ" : "Giới tính mà cũng không biết á?";
    var birthday = res.data.result.birthday ? `${res.data.result.birthday}` : "Bạn sinh vào ngày 30-2- năm không nhớ à!!!";
    var love = res.data.result.love ? `${res.data.result.love}` : "Vẫn đang F.A sml à???"
var relationship = res.data.result.relationship ? `${res.data.result.relationship}` : "Chưa có người yêu mà!!!!"
    var location = res.data.result.location ? `${res.data.result.location}` : "Bạn hiện không ở trên Trái Đất!!!"
	var hometown = res.data.result.hometown ? `${res.data.result.hometown}` : "Quê ở đâu mà còn không biết à?"
    var url_profile = res.data.result.profileUrl ? `${res.data.result.profileUrl}` : `${url_profile}`
  Canvas.registerFont(__dirname+`${fonts}`, {
        family: "Lobster"
    });
  ctx.font = `${fontsInfo}px Lobster`;
  ctx.fillStyle = "#FFEC8B";
  ctx.textAlign = "start";
  fontSize = 15;
  ctx.fillText(`${res.data.result.name}`,680, 163);
  ctx.fillText(`${res.data.result.gender}`, 590, 205);
  ctx.fillText(`${res.data.result.follow}`, 590, 244);
  ctx.fillText(`${love}`, 590, 279);
  ctx.fillText(`${birthday}`, 590, 318);
  ctx.fillText(`${location}`, 590, 354);
  ctx.fillText(`${uid}`, 590, 393);
  ctx.font = `${fontsLink}px Play-Bold`;
  ctx.fillStyle = "#F08080";
  ctx.textAlign = "start";
  fontSize = 20;  
  ctx.fillText(`» Profile: ${url_profile}`, 19, 468);
  ctx.beginPath();
  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  fs.removeSync(pathAvata);
  
  return api.sendMessage(
    { attachment: fs.createReadStream(pathImg) },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};

 