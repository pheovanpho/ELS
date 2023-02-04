module.exports.config = {
	name: "song",
	version: "1.0.5",
	hasPermssion: 0,
	credits: "Horizon ",
	description: "Phát nhạc thông qua link YouTube, SoundCloud hoặc từ khoá tìm kiếm",
	commandCategory: "Youtube",
	usages: "song [Text]",
	cooldowns: 10,
	envConfig: {
		"YOUTUBE_API": "AIzaSyCe-hCIuTwonZ9fD2BG7dvU5eMoHWSaOGE",
		"SOUNDCLOUD_API": "M4TSyS6eV0AcMynXkA3qQASGcOFQTWub"
	}
};
const keyapi = "AIzaSyBkwMtNxv9H2EBhiTqrkOAZ_QC4Tb6h-b0";
module.exports.handleReply = async function({ api, event, handleReply }) {
	const ytdl = require("ytdl-core");
	if (isNaN(event.body)) return api.sendMessage("[⚜️]→ Hãy Nhập 1 con số ! , Hãy Bấm Lại !",event.threadID,event.messageID);
	const { createReadStream, createWriteStream, unlinkSync, statSync,readFileSync,writeFileSync } = require("fs-extra");
	 const { join } = require("path");
	const axios = require("axios"); 
	//var { data:Res } = await axios.get("http://localhost:1337/api/f-apis/3");
		// var x = await Res.data.attributes.Api;
	let datac = (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${handleReply.link[event.body - 1]}&key=${keyapi}`)).data;
	let title = datac.items[0].snippet.title;
    api.sendMessage(title,event.threadID);
	try {   
		await ytdl(handleReply.link[event.body - 1],{ filter: 'audioonly'})
			.pipe(createWriteStream(__dirname + `/cache/${handleReply.link[event.body - 1]}.m4a`))
			.on("close", () => {
				if (statSync(__dirname + `/cache/${handleReply.link[event.body - 1]}.m4a`).size > 26000000) return api.sendMessage('[⚜️]→ Bài quá dài vui lòng thử bài khác dưới 25mb', event.threadID, () => unlinkSync(__dirname + `/cache/${handleReply.link[event.body - 1]}.m4a`), event.messageID);
				else return api.sendMessage({body: `${title}`,attachment: createReadStream(__dirname + `/cache/${handleReply.link[event.body - 1]}.m4a`)}, event.threadID, event.messageID);
			})
			.on("error", (error) => api.sendMessage(`[⚜️]→ Lỗi : \n${error}`, event.threadID, event.messageID));
		}
	catch (e) {
		console.log(e)
		api.sendMessage("[⚜️]→ Không thể xử lý yêu cầu của bạn!", event.threadID, event.messageID);
	}
	return api.unsendMessage(handleReply.messageID);
};

module.exports.run = async function({ api, event, args,help }) {
		const { createReadStream, createWriteStream, unlinkSync, statSync,readFileSync,writeFileSync } = require("fs-extra");
	 const { join } = require("path");
	 const axios = require("axios");
	//var { data:Res } = await axios.get("http://localhost:1337/api/f-apis/3");
		//var x = await Res.data.attributes.Api;
	const ytdl = require("ytdl-core");
	const YouTubeAPI = require("simple-youtube-api");
	const youtube = new YouTubeAPI(global.configModule[this.config.name].YOUTUBE_API);
	
	if (args.length == 0 || !args) return api.sendMessage('[🔎]→ Phần tìm kiếm không được để trống!', event.threadID, event.messageID);
	const keywordSearch = args.join(" ");
	const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
	const urlValid = videoPattern.test(args[0]);
	
	if (urlValid) {
		try { 
			var id = args[0].split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
            (id[2] !== undefined) ? id = id[2].split(/[^0-9a-z_\-]/i)[0] : id = id[0];
			ytdl(args[0])
				.pipe(createWriteStream(__dirname + `/cache/${id}.m4a`))
				.on("close", () => {
					if (statSync(__dirname + `/cache/${id}.m4a`).size > 26214400) return api.sendMessage('[⚜️]→ Bài này quá dài xin vui lòng thử bài khác dưới 25mb', event.threadID, () => unlinkSync(__dirname + `/cache/${id}.m4a`), event.messageID);
					else{
						 api.sendMessage({attachment: createReadStream(__dirname + `/cache/${id}.m4a`)}, event.threadID, event.messageID)
							thisThread.listmusic.push(id);
								writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
					}
				})
				.on("error", (error) => api.sendMessage(`[⚜️]→ Đã xảy ra vấn đề khi đang xử lý yêu cầu, lỗi: \n${error}`, event.threadID, event.messageID));
		}
		catch (e) {
			console.log(e);
			api.sendMessage("[⚜️]→ Không thể xử lý yêu cầu của bạn!", event.threadID, event.messageID);
		}
	}
	else {
		try {
			var link = [], msg = "", num = 0;
			var results = await youtube.searchVideos(keywordSearch,7);	
			for (let value of results) {
				if (typeof value.id == 'undefined') return;
				link.push(value.id);
				 var linkd = "https://www.youtube.com/watch?v=" + value.id;
				 let datab = (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${value.id}&key=${keyapi}`)).data;
				 let gettime = datab.items[0].contentDetails.duration;
				 let time = (gettime.slice(2));
				 let time2 = ""
				 if (time.includes('H')) time2 = time.replace("H", " Giờ ")
				 var haha = time.replace("M", " Phút ");
				 var haha2 = haha.replace("S", " Giây ")
				 let datac = (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${value.id}&key=${keyapi}`)).data;
				 let channel = datac.items[0].snippet.channelTitle;
				msg += (`${num+=1}/ ${value.title}\n[⚜️]→ Thời Gian : ${haha2}\n[⚜️]→ Channel : ${channel}\n❖━━━━━━━━━━━━━━━━━━━━━❖\n`);
			}
			return api.sendMessage(`[⚜️]→ Tìm Kiến Thành Công , Có ${link.length} Video Trùng Tên <= [✤]\n❖━━━━━━━━━━━━━━━━━━━━━❖\n${msg}[⚜️]→ Hãy Trả Lời Tin Nhắn Bot Theo Số Thứ Tự`, event.threadID,(error, info) => global.client.handleReply.push({ name: this.config.name, messageID: info.messageID, author: event.senderID, link: link }), event.messageID);
		}
		catch (error) {
			api.sendMessage("[⚜️]→ Không thể xử lý request do dã phát sinh lỗi: " + error.message, event.threadID, event.messageID);
		}
	}
}