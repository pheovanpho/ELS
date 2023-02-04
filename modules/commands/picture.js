module.exports.config = {
  name: "picture",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "JRT",
  description: "Kho Ảnh Api JRT",
  commandCategory: "random-img",
  usages: "picture [args]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args, Users }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  let name = await Users.getNameUser(event.senderID)
  const { threadID, messageID } = event;
  var type;
  switch (args[0]) {
    case "rem":
      type = "rem";
      break;
    case "hololive":
      type = "hololive";
      break;
      case "naughty":
      type = "naughty";
      break;
      case "instagram":
      type = "instagram";
      break;
      case "kurumi":
      type = "kurumi";
      break;
      case "lucy":
      type = "lucy";
      break;
      case "sagiri":
      type = "sagiri";
      break;
     case "twitter":
      type = "twitter";
      break;
     case "vsbg":
      type = "vsbg";
      break;
     case "nobra":
      type = "nobra";
      break;
     case "china":
      type = "china";
      break;
     case "japan":
      type = "japan";
      break;
     case "chitanda":
      type = "chitanda";
      break;
     case "sexy":
      type = "sexy";
      break;
     case "girl":
      type = "girl";
      break;
     case "loli":
      type = "loli";
      break;
     case "trai":
      type = "trai";
      break;
     case "nude":
      type = "nude";
      break;
     case "background":
      type = "background";
      break;
     case "lienquan":
      type = "lienquan";
      break;
    default:
      return api.sendMessage(`[⚜️] LIST PICTURE [⚜️]\n»1/Rem\n»2/Hololive\n»3/Naughty\n»4/Instagram\n»5/Kurumi\n»6/Lucy\n»7/Sagiri\n»8/Twitter\n»9/VSBG\n»10/Nobra\n»11/China\n»12/Japan\n»13/Chitanda\n»14/Sexy\n»15/Girl\n»16/Loli\n»17/Trai\n»18/Nude\n»19/Background\n»20/Liên Quân (lienquan)`, threadID, messageID);
      break;
  }
  axios.get(`https://apimyjrt.nguyenhaidang.ml/${type}.php`).then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function() {
      api.sendMessage({
        body: `[⚜️] Hi ${name}\n[⚜️] Ảnh của bạn đây! `,
        attachment: fs.createReadStream(__dirname + `/cache/${type}.${ext}`)
      }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${type}.${ext}`), event.messageID);
    };
    request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/${type}.${ext}`)).on("close", callback);
  })
}