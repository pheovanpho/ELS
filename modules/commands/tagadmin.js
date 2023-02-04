module.exports.config = {
	name: "tagadmin",
	version: "1.0.0",
	hasPermssion: 3,
	credits: "ZyrosGenZ, ManhG Fix", //đụ thêm vào by hanaku -_-
	description: "Bot sẽ rep ng tag admin hoặc rep ng tagbot ", // và chuyển về cho admin hoặc người được tag -_-
	commandCategory: "Hệ thống admin-bot",
	usages: "[on/off]",
	cooldowns: 3
}
module.exports.handleEvent = async function({
	api,
	Users,
	event
}) {
	try {
		const {
			senderID,
			threadID,
			messageID,
			mentions,
			body
		} = event;
		const thread = global.data.threadData.get(threadID) || {};
		const moment = require('moment-timezone');
		const gio = moment.tz('Asia/Ho_Chi_Minh').format('HH:mm:ss');
		if (typeof thread["tagadmin"] !== "undefined" && thread["tagadmin"] == false) return;
		let threadInfo = await api.getThreadInfo(event.threadID);
		const z = (await Users.getData(senderID)).name || "không thể lấy tên"
		const listAdmin = global.config.ADMINBOT;
		const mention = Object.keys(mentions);
		if (listAdmin.includes(`${mention}`)) {
			var msg = [
				"đang làm triết",
				"đang đi làm",
				"đang ngủ",
				"đang không cầm điện thoại",
				"đang chơi game",
				"đang đi ỉa",
				"đang đi chơi",
				"đang xem phim",
				"đang tự kỉ"
			]; // khúc này tự điền text vào ai rãnh đâu làm chi tiết
			api.sendMessage({
				body: `[⚜️]=== 『 𝑻𝑯𝑶̂𝑵𝑮 𝑩𝑨́𝑶 𝑻𝑨𝑮 』 ===[⚜️]\n\n『Status』: Admin đang rất bận ❗\n『Reason』: ${msg[Math.floor(Math.random() * msg.length)]}\n『Contact』: https://www.facebook.com/nguyenhieutb11\n『Noti』: Đã thông báo về admin\n『Time』: ${gio}`
			}, threadID, messageID);
			api.sendMessage(`=== 𝑁𝑂𝑇𝐼𝐹𝐼𝐶𝐴𝑇𝐼𝑂𝑁 ===\n\n[⚜️]➜ Tên nhóm: ${threadInfo.threadName}\n[⚜️]➜ ID Box: ${threadID}\n[⚜️]➜ Thành viên tag: ${z}\n[⚜️]➜ UID: ${senderID}\n[⚜️]➜ Nội dung: ${body}\n[⚜️]➜ Lúc: ${gio}`, mention) //dòng này để gửi inb về admin muốn đụ thêm cái gì thì chỉnh ở trong ``
		}
	} catch (e) {}
};

module.exports.languages = {
  "vi": { "on": "[⚜️]➜ Bật", "off": "[⚜️]➜ Tắt", "successText": "tagadmin thành công", },
  "en": { "on": "[⚜️]➜ On", "off": "[⚜️]➜ Off", "successText": "success!", }
}

module.exports.run = async function ({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
  if (typeof data["tagadmin"] == "undefined" || data["tagadmin"] == false) data["tagadmin"] = true;
  else data["tagadmin"] = false;
  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["tagadmin"] == true) ? getText("on") : getText("off")} ${getText("successText")}`, threadID, messageID);
}