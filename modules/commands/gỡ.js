module.exports.config = {
	name: "gỡ",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "Gỡ tin nhắn của bot",
	commandCategory: "Công cụ",
	usages: "unsend",
	cooldowns: 0
};

module.exports.languages = {
	"vi": {
		"returnCant": "[⚜️]➜ Vui lòng reply tin nhắn bot hoặc thả icon 😤 vào tin nhắn bot để được gỡ!!!",
		"missingReply": "[⚜️]➜ Vui lòng reply tin nhắn bot hoặc thả icon 😤 vào tin nhắn bot để được gỡ!!!"
	},
	"en": {
		"returnCant": "[⚜️]➜ Vui lòng reply tin nhắn bot hoặc thả icon 😤 vào tin nhắn bot để được gỡ!!!",
		"missingReply": "[⚜️]➜ Vui lòng reply tin nhắn bot hoặc thả icon 😤 vào tin nhắn bot để được gỡ!!!"
	}
}

module.exports.run = function({ api, event, getText }) {
	if (event.messageReply.senderID != api.getCurrentUserID()) return api.sendMessage(getText("returnCant"), event.threadID, event.messageID);
	if (event.type != "message_reply") return api.sendMessage(getText("missingReply"), event.threadID, event.messageID);
	return api.unsendMessage(event.messageReply.messageID);
}