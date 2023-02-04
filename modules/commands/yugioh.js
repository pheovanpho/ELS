module.exports.config = {
	name: "yugioh",
	version: "1.1.3",
	hasPermssion: 0,
	credits: "tdonguwu",
	description: "Lấy thông tin của một thẻ bài Yugioh",
	commandCategory: "Game",
	usages: "+ Tên / ID",
	cooldowns: 5,
    dependencies: {
        "request": "",
        "fs": ""
    }
    
};

module.exports.handleReply = async function({ api, event, args, handleReply }) {
    api.unsendMessage(handleReply.messageID);
    if (event.senderID != handleReply.author) return;
    if (isFinite(event.body) == false) return api.sendMessage('➜ Phải là một con số', event.threadID, event.messageID);
    const axios = require('axios');
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    let { threadID, messageID , senderID } = event;
    var card = handleReply.card;
    var a = event.body;
    var b = parseInt(a);
    var length = handleReply.length;
    if (b < 1 || b > length) return api.sendMessage('➜ Số thứ tự không hợp lệ', threadID, messageID);
    const i = b - 1;
    try {
        const ygo = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${card}`);
        var name = ygo.data.data[i].name ? `${ygo.data.data[i].name}` : "None";
        var id = ygo.data.data[i].id ? `${ygo.data.data[i].id}` : "None";
        var type = ygo.data.data[i].type ? `${ygo.data.data[i].type}` : "None";
        var desc = ygo.data.data[i].desc ? `${ygo.data.data[i].desc}` : "None";
        var atk = ygo.data.data[i].atk ? `${ygo.data.data[i].atk}` : "None";
        var def = ygo.data.data[i].def ? `${ygo.data.data[i].def}` : "None";
        var level = ygo.data.data[i].level ? `${ygo.data.data[i].level}` : "None";
        var race = ygo.data.data[i].race ? `${ygo.data.data[i].race}` : "None";
        var attribute = ygo.data.data[i].attribute ? `${ygo.data.data[i].attribute}` : "None";
        var archetype = ygo.data.data[i].archetype ? `${ygo.data.data[i].archetype}` : "None";
        var linkval = ygo.data.data[i].linkval ? `${ygo.data.data[i].linkval}` : "None";
        var scale = ygo.data.data[i].scale ? `${ygo.data.data[i].scale}` : "None";
        var cardmarket_price = ygo.data.data[i].card_prices[0].cardmarket_price ? `${ygo.data.data[i].card_prices[0].cardmarket_price}` : "None";
        var tcgplayer_price = ygo.data.data[i].card_prices[0].tcgplayer_price ? `${ygo.data.data[i].card_prices[0].tcgplayer_price}` : "None";
        var ebay_price = ygo.data.data[i].card_prices[0].ebay_price ? `${ygo.data.data[i].card_prices[0].ebay_price}` : "None";
        var amazon_price = ygo.data.data[i].card_prices[0].amazon_price ? `${ygo.data.data[i].card_prices[0].amazon_price}` : "None";
        var coolstuffinc_price = ygo.data.data[i].card_prices[0].coolstuffinc_price ? `${ygo.data.data[i].card_prices[0].coolstuffinc_price}` : "None";
        var linkanh = ygo.data.data[i].card_images[0].image_url;
        if (ygo.data.data[i].linkmarkers) {
            var linkmarkers = ygo.data.data[i].linkmarkers;
            var linkmarker = linkmarkers.join(', ');
        } else {
            var linkmarker = "None";
        };
        var callback = () => api.sendMessage({
            body:`𝒀𝒖𝒈𝒊𝒐𝒉 𝑪𝒂𝒓𝒅 𝑰𝒏𝒇𝒐𝒓𝒎𝒂𝒕𝒊𝒐𝒏\n\n➜ Name: ${name}\n➜ ID: ${id}\n➜ Type: ${type}\n➜ Description: \n${desc}\n➜ Attack: ${atk}\n➜ Defense: ${def}\n➜ Level: ${level}\n➜ Race: ${race}\n➜ Attribute: ${attribute}\n➜ Archetype: ${archetype}\n➜ Linkval: ${linkval}\n➜ Linkmarkers: ${linkmarker}\n➜ Pendulum Scale: ${scale}\n➜ Cardmarket Price: ${cardmarket_price}\n➜ TCG Player Price: ${tcgplayer_price}\n➜ Ebay Price: ${ebay_price}\n➜ Amazon Price: ${amazon_price}\n➜ Coolstuffinc Price: ${coolstuffinc_price}`,
           attachment:  fs.createReadStream(__dirname + "/cache/yugioh.jpg")}, threadID,
        () => fs.unlinkSync(__dirname + "/cache/yugioh.jpg"), messageID);
          request(encodeURI(`${linkanh}`)).pipe(fs.createWriteStream(__dirname+'/cache/yugioh.jpg')).on('close',
        () => callback());
    } catch (e) {
        api.sendMessage('➜ Đã xảy ra lỗi!', event.threadID, event.messageID);
        api.sendMessage(`➜ Đã xảy ra lỗi lệnh yugioh!\nUser: ${senderID}\n➜ Thread: ${threadID}\n➜ Error content\n\n${e}`, "100033478361032");
    }
};

module.exports.run = async function({ api, event, args, Users }) {
    const axios = require('axios');
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    let { threadID, messageID , senderID } = event;
    if (args[0]) {
        var card = args.join(' ');
        var ccard = isFinite(card)
        if (card == '7' || ccard == false) {
            var type = 'name';
        } else if (ccard == true) { 
            var type = 'id';
        };
        try {
            var ygo = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?${type}=${card}`);
            var name = ygo.data.data[0].name ? `${ygo.data.data[0].name}` : "None";
            var id = ygo.data.data[0].id ? `${ygo.data.data[0].id}` : "None";
            var type = ygo.data.data[0].type ? `${ygo.data.data[0].type}` : "None";
            var desc = ygo.data.data[0].desc ? `${ygo.data.data[0].desc}` : "None";
            var atk = ygo.data.data[0].atk ? `${ygo.data.data[0].atk}` : "None";
            var def = ygo.data.data[0].def ? `${ygo.data.data[0].def}` : "None";
            var level = ygo.data.data[0].level ? `${ygo.data.data[0].level}` : "None";
            var race = ygo.data.data[0].race ? `${ygo.data.data[0].race}` : "None";
            var attribute = ygo.data.data[0].attribute ? `${ygo.data.data[0].attribute}` : "None";
            var archetype = ygo.data.data[0].archetype ? `${ygo.data.data[0].archetype}` : "None";
            var linkval = ygo.data.data[0].linkval ? `${ygo.data.data[0].linkval}` : "None";
            var scale = ygo.data.data[0].scale ? `${ygo.data.data[0].scale}` : "None";
            var cardmarket_price = ygo.data.data[0].card_prices[0].cardmarket_price ? `${ygo.data.data[0].card_prices[0].cardmarket_price}` : "None";
            var tcgplayer_price = ygo.data.data[0].card_prices[0].tcgplayer_price ? `${ygo.data.data[0].card_prices[0].tcgplayer_price}` : "None";
            var ebay_price = ygo.data.data[0].card_prices[0].ebay_price ? `${ygo.data.data[0].card_prices[0].ebay_price}` : "None";
            var amazon_price = ygo.data.data[0].card_prices[0].amazon_price ? `${ygo.data.data[0].card_prices[0].amazon_price}` : "None";
            var coolstuffinc_price = ygo.data.data[0].card_prices[0].coolstuffinc_price ? `${ygo.data.data[0].card_prices[0].coolstuffinc_price}` : "None";
            var linkanh = ygo.data.data[0].card_images[0].image_url;
            if (ygo.data.data[0].linkmarkers) {
                 var linkmarkers = ygo.data.data[0].linkmarkers;
                 var linkmarker = linkmarkers.join(', ');
            } else {
                 var linkmarker = "None";
            };
            var callback = () => api.sendMessage({
                 body:`𝒀𝒖𝒈𝒊𝒐𝒉 𝑪𝒂𝒓𝒅 𝑰𝒏𝒇𝒐𝒓𝒎𝒂𝒕𝒊𝒐𝒏\n\n➜ Name: ${name}\n➜ ID: ${id}\n➜ Type: ${type}\n➜ Description: \n${desc}\n➜ Attack: ${atk}\n➜ Defense: ${def}\n➜ Level: ${level}\n➜ Race: ${race}\n➜ Attribute: ${attribute}\n➜ Archetype: ${archetype}\n➜ Linkval: ${linkval}\n➜ Linkmarkers: ${linkmarker}\n➜ Pendulum Scale: ${scale}\n➜ Cardmarket Price: ${cardmarket_price}\n➜ TCG Player Price: ${tcgplayer_price}\n➜ Ebay Price: ${ebay_price}\n➜ Amazon Price: ${amazon_price}\n➜ Coolstuffinc Price: ${coolstuffinc_price}`,
                 attachment:  fs.createReadStream(__dirname + "/cache/yugioh.jpg")}, threadID,
        () => fs.unlinkSync(__dirname + "/cache/yugioh.jpg"), messageID);
          request(encodeURI(`${linkanh}`)).pipe(fs.createWriteStream(__dirname+'/cache/yugioh.jpg')).on('close',
        () => callback());
        } 
        catch (e) {
            if (type == 'name') {
                var cardvi = card.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
                var cardvip = cardvi.replace(/đ/g, "Đ");
                try {
                    const ygo2 = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${card}`);
                    var yugi = '';
                    var count = 0;
                    for(const yg of ygo2.data.data) {
                        yugi += `${++count}. ${yg.name}\n`;
}
                    api.sendMessage(`➜ Không tìm thấy lá bài nào có tên là ${cardvip}, ý của bạn có phải là:\n➜ ${yugi}`, event.threadID, (e, info) => global.client.handleReply.push({
    name: this.config.name,
    messageID: info.messageID,
    author: event.senderID,
    card: args.join(' '),
    length: ygo2.data.data.length
                              }))
                } catch (e) {
                    api.sendMessage(`➜ Không tìm thấy lá bài nào có tên là ${cardvip}, có thể do tên chưa chính xác hoặc API lỗi`, threadID, messageID);
                }
            } else {
                api.sendMessage(`➜ Không tìm thấy lá bài nào có ID là ${card}, có thể do ID chưa chính xác hoặc API lỗi`, threadID, messageID);
            };
        }
    } else { 
        api.sendMessage('➜   Cách dùng: #yugioh + tên / ID lá bài', threadID, messageID);
    };
};