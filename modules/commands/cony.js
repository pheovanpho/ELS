module.exports.config = {
 name: "cony",
 version: "1.0.0", 
 hasPermssion: 0,
 credits: "JRT",
 description: "Tỉ lệ có Ny của bạn trong năm nay",
 commandCategory: "Game", 
 usages: "cony", 
 cooldowns: 10,
 dependencies: {
   "request": "",
   "fs-extra":"",
   "axios":""
}};
module.exports.run = async function({ api, event, Users }) {
    var tle = Math.floor(Math.random() * 101);
    var name = (await Users.getData(event.senderID)).name
    const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
const res = await axios.get("https://apimyjrt.nguyenhaidang.ml/vsbg.php");
//lấy data trên web api
const data = res.data.data;
//tải ảnh xuống
let download = (await axios.get(data, {
			responseType: "stream"
		})).data;
    return api.sendMessage({body:`[⚜️]→ Chúc mừng ${name}\n[⚜️]→ Tỉ lệ có người yêu của bạn là: ${tle}%\n[⚜️]→ Nếu bạn có được người đó rồi thì hãy biết trân trong nhé >,< <3`, attachment: download,  }, event.threadID, event.messageID);
       return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/5.jpg")).on("close",() => callback());
 }