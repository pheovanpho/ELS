module.exports.config = {
	name: "ping",
	version: "1.0.4",
	hasPermssion: 1,
	credits: "Mirai Team",
	description: "tag toàn bộ thành viên",
	commandCategory: "nhóm",
	usages: "[Text]",
	cooldowns: 0
};

module.exports.run = async function({ api, event, args }) {
	try {
		const botID = api.getCurrentUserID();
		const listUserID = event.participantIDs.filter(ID => ID != botID && ID != event.senderID);
		var body = (args.length != 0) ? args.join(" ") : "QTV đẹp trai xinh gái đang gọi bạn kìa", mentions = [], index = 0;
		
		for(const idUser of listUserID) {
			body = "‎" + body;
			mentions.push({ id: idUser, tag: "‎", fromIndex: index - 1 });
			index -= 1;
		}

		return api.sendMessage({ body, mentions }, event.threadID, event.messageID);

	}
	catch (e) { return console.log(e); }
}