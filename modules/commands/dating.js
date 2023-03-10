const { join } = require('path');
const { writeFileSync, existsSync, createReadStream } = require('fs-extra');
const moment = require("moment-timezone");
const axios = require('axios')
module.exports.config = {
    name: "dating",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "HαΊΉn hΓ² qua messenger",
    commandCategory: "TΓ¬nh yΓͺu",
    usages: "[shop/info/breakup/daily]",
    cooldowns: 0
};
module.exports.onLoad = function() {
    const path = join(__dirname, 'cache', 'dating.json');
    if (!existsSync(path)) {
        writeFileSync(path, JSON.stringify([], null, 4));
    }
    const dataDating = require('./cache/dating.json');
    const get_day_of_time = (d1, d2) => {
        let ms1 = d1.getTime();
        let ms2 = d2.getTime();
        return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
    };
    setInterval(function() {
        for (let i of dataDating) {
            if(dataDating.length == 0) continue
            let dayStart = new Date(i.data.timestamp);
            let today = new Date();
            let time = get_day_of_time(dayStart, today);
            i.data.countDays = time
            writeFileSync(path, JSON.stringify(dataDating, null, 4));
        }
    }, 1000);
}

function msgBreakup() {
    var msg = ['π»ππΜ£Μπ ππΜΜ£ 2 πππΜπΜΜπ πππΜππ πππΜΜ ππΜπ ππΜππ ΔπΜπΜΜ£π πππ?', 'πͺπΜΜ πππΜ ππΜ£Μπ ππΜ πππΜππ πππ ππππ?', 'π²ππΜππ Δππ πππ? πͺπΜ πππΜΜ? π½πΜ£Μπ πππ ππΜπ πππΜΜπ πππΜππ?', 'π½πΜ ππΜ£Μπ ππΜ ππ ππΜπ ΔπΜ... 2 πππΜπΜΜπ ππΜ πππΜΜ ππΜΜ ππΜΜππ ΔπΜπΜΜ£π πππΜππ? ^^', 'π»πΜππ ππΜπ ππΜ πππ πππ πππΜπΜΜπ ππππ ππΜπ, πππΜπ ππΜπ ππΜΜπ ππππ. π©πΜπ πππΜΜ ππΜ 2 ππΜ£π ΔπΜ πππΜΜπ ΔππΜΜπ ππΜ ΔπΜ ππΜπ ππ, 2 ππΜ£π ππΜ πππΜΜ ππππ ππΜΜ ππΜπ ππππ ΔπΜπΜΜ£π πππΜππ', 'π?ππΜ£Μπ ΔπΜΜ πππΜΜπ ππΜπ ππππ ππππΜΜπ ππΜπ πππΜπ πππΜππ, ππΜ 2 ππΜπ ππΜππ πππΜ ππΜ πππ πππΜ£Μπ ππππ ππΜΜπ πππΜΜπ ΔπΜΜπ πππΜπΜππ πππΜππ πππΜΜ ππΜΜππ ππππΜΜπ ππππ']
    return msg[Math.floor(Math.random() * msg.length)];
}

function getMsg() {
    return `[βοΈ]β ππ¨Μ£π’ π§π π?Μπ¨ΜΜπ’ ππ?Μπ§π  π­π¨ΜΜπ’ ππ‘π?Μπ π¦π?ΜΜπ§π  π‘πΜ£π§π‘ π©π‘π?Μπ ππ‘π¨ π π§π π?Μπ¨ΜΜπ’ π§πΜπ² π§πΜπ¨ π₯°\n\ππ?Μπ? πΜ:\n- ππΜ π ππΜ£π§ π¬πΜ π€π‘π¨Μπ§π  π­π‘πΜΜ ππ‘π’π π­ππ² π­π«π¨π§π  π―π¨Μπ§π  π π§π πΜπ² π€πΜΜ π­π?ΜΜ π€π‘π’ π²πΜπ? π§π‘ππ?\n- ππ?π¨ΜΜπ’ ππ?Μπ§π  ππ‘π?Μπ ππΜ π ππΜ£π§ ππ¨Μ π§π‘π’πΜΜπ? π§π’πΜΜπ¦ π‘πΜ£π§π‘ π©π‘π?Μπ π€π‘π’ π¨ΜΜ ππΜπ§ π§π‘ππ?, ππΜπ¦ π¨Μπ§ π―π’Μ π­π’π§ π­π?Μπ¨ΜΜπ§π  π―πΜ π¬π?ΜΜ ππ?Μ£π§π  ππ¨π­ ππ?Μπ π¦π’Μπ§π‘\n- ππ²Μ π­πΜπ§: ΓΓΈΚβΏΙ¬ΙΎΚβΏΟΙΎΓΈΙ¬ΡΙΚβΏβΆ β€οΈ`
}
module.exports.run = async function({ api, event,args, Users, Currencies }) {
    const { threadID, messageID, senderID } = event;
    const dataDating = require('./cache/dating.json');
    const type = (args[0] || 'false').toLowerCase();
    const input = type.replace('nα»―', 1).replace('gΓ‘i', 1).replace('nam', 2).replace('trai', 2).replace('breakup', 3).replace('chiatay', 3).replace('ct', 3).replace('info', 4).replace('-i', 4).replace('shop', 5).replace('-s', 5).replace('daily', 6).replace('diemdanh', 6).replace('top', 7).replace('rank', 7);
    const dataUser = await Users.getData(senderID)
    const author = dataDating.find(i => i.ID_one == senderID || i.ID_two == senderID);
    switch (input) {
        case '1': {
            if (author == undefined) break
            if (author.status == true) return api.sendMessage(`[βοΈ]β ππ?π¨ΜΜπ§ ππΜΜπ¦ π¬π?ΜΜπ§π  π§π π?Μπ¨ΜΜπ’ π­π π‘ππ² π¬ππ¨ ?, π‘πΜπ² π₯πΜπ¦ π¦π¨Μ£Μπ­ ππ¨π§ π§π π?Μπ¨ΜΜπ’ ππ¨Μ π­π«πΜππ‘ π§π‘π’πΜ£Μπ¦ π§πΜπ¨. ππΜ£π§ π‘π’πΜ£Μπ§ π¨ΜΜ π­π«oπ§π  π­π‘πΜπ’ πππ­π’π§π  π«π¨ΜΜπ’ ππ¨Μπ§ π¦π?π¨ΜΜπ§ π€π’πΜΜπ¦ π­π‘πΜπ¦ π§π π?Μπ¨ΜΜπ’ π€π‘πΜπ πΜ π`, threadID, messageID);
            break;
        }
        case '2': {
            if (author == undefined) break
            if (author.status == true) return api.sendMessage(`[βοΈ]β ππ?π¨ΜΜπ§ ππΜΜπ¦ π¬π?ΜΜπ§π  π§π π?Μπ¨ΜΜπ’ π­π π‘ππ² π¬ππ¨ ?, π‘πΜπ² π₯πΜπ¦ π¦π¨Μ£Μπ­ ππ¨π§ π§π π?Μπ¨ΜΜπ’ ππ¨Μ π­π«πΜππ‘ π§π‘π’πΜ£Μπ¦ π§πΜπ¨. ππΜ£π§ π‘π’πΜ£Μπ§ π¨ΜΜ π­π«oπ§π  π­π‘πΜπ’ πππ­π’π§π  π«π¨ΜΜπ’ ππ¨Μπ§ π¦π?π¨ΜΜπ§ π€π’πΜΜπ¦ π­π‘πΜπ¦ π§π π?Μπ¨ΜΜπ’ π€π‘πΜπ πΜ π`, threadID, messageID);
            break;
        }
        case '3': {
            if (author == undefined || author.status == false) return api.sendMessage(`ππΜ£π§ ππ‘π?Μπ π‘πΜ£π§ π‘π¨Μ π―π¨ΜΜπ’ ππ’ π­π‘π’Μ ππ‘π’π π­ππ² ππΜπ’ π π’Μ ?`, threadID, messageID);
            if (author.data.countDays < 0) return api.sendMessage(`ππ¨Μπ§ ππ‘π?Μπ π­π¨ΜΜπ’ 3 π§π πΜπ² π¦πΜ π¦π?π¨ΜΜπ§ ππ‘π’π π­ππ² π₯πΜ π¬ππ¨? π₯Ί\n\n${msgBreakup()}\n\nππΜπ² ππ?ΜΜ ππ’Μπ§π‘ π­π’Μπ§π‘ π¬π?π² π§π π‘π’Μ, ππ‘π¨ π¦π¨Μ£π’ ππ‘π?π²πΜ£Μπ§ ππΜΜπ§ π₯πΜΜπ§π  π±π?π¨ΜΜπ§π  π«π¨ΜΜπ’ π π’πΜπ’ πͺπ?π²πΜΜπ­ ππ?Μπ§π  π§π‘ππ? π§π‘πΜ π―π’Μ π­π’Μπ§π‘ π²πΜπ? π€π‘π¨Μπ§π  π©π‘πΜπ’ ππ’ ππ?Μπ§π  π¦ππ² π¦πΜΜπ§ π­π’Μπ¦ π­π‘πΜΜπ² π§π‘ππ? π¦πΜ ^^`, threadID, messageID);
            return api.sendMessage(`ππΜ π π§π π?Μπ¨ΜΜπ’ π­π‘πΜ£Μπ­ π¬π?ΜΜ£ π€π‘π¨Μπ§π  π­π‘πΜΜ π­π’πΜΜπ© π­π?Μ£π π§π?ΜΜπ π‘ππ² π¬ππ¨ ?\nππ‘π¨ ππ¨π­ π±π’π§ π©π‘πΜπ© π±ππ§ π―πΜπ¨ π¦π¨Μ£Μπ­ ππ‘π?Μπ­ π§π‘πΜ:\n\n${msgBreakup()}\n\nππΜΜπ? ππ¨Μ π±ππ¦ π­π‘πΜΜπ² ππ¨Μπ§π  π­π’π§ π§π‘πΜΜπ§ π§πΜπ², π‘πΜπ² ππ?ΜΜ ππ‘π¨ π¦π¨Μ£π’ ππ‘π?π²πΜ£Μπ§ π₯πΜΜπ§π  π±π?π¨ΜΜπ§π ...ππΜπ§ π₯πΜ£Μπ§π  π¦π¨Μ£Μπ­ ππ‘π?Μπ­, π¬π?π² π§π π‘π’Μ ππ‘π¨ π€π’Μ π§πΜπ¨...\nππ¨Μ π§π‘π’πΜΜπ? π­π‘π?ΜΜ...ππ¨Μ£Μπ­ π€π‘π’ π¦πΜΜπ­ Δπ’ π­π‘π’Μ π¬πΜ π€π‘π¨Μπ§π  π­π‘πΜΜ π­π’Μπ¦ π₯πΜ£π’ π§π?ΜΜπ. ^^\n\nππ¨Μπ§ π§πΜΜπ?...ππΜΜπ§ π€π‘π¨Μπ§π  π­π‘πΜΜ     π’πΜΜπ© π­π?Μ£π ππ?Μπ§π  π§π‘ππ? π§π?ΜΜπ...ππΜ π π§π π?Μπ¨ΜΜπ’ π‘πΜπ² π­π‘πΜ ππΜπ¦ π±π?Μπ π―πΜπ¨ π­π’π§ π§π‘πΜΜπ§ π§πΜπ² π§π‘πΜ !`, threadID, (error, info) => {
                global.client.handleReaction.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    senderID: senderID,
                    type: input,
                    data: {
                        ID_one: author.ID_one,
                        accept_one: false,
                        ID_two: author.ID_two,
                        accept_two: false
                    }
                });
            }, messageID);
            break
        }
        case '4': {
            if (author == undefined || author.status == false) return api.sendMessage(`[βοΈ]β ππΜ£π§ π.π π¬π¦π₯ π«π π¦πΜ π±ππ¦ π’π§ππ¨ ππΜπ’ π π’Μ π³πΜ£Μπ² π‘π?ΜΜ ?`, threadID, messageID);
            var msg = 
            `π==γ ππππ§ ππ¨π ππ­π‘ππ« γ==π\n\n` + 
            `[β€οΈ]β π§π²Μπ» π°πΜπ? π―π?Μ£π»: ${(author.ID_one == senderID) ? author.name_one : author.name_two}\n` + 
            `[π€]β π§π²Μπ» π°πΜπ? π»π΄πΜπΌΜΜπΆ π?ΜΜπ: ${(author.ID_two == senderID) ? author.name_one : author.name_two}\n` + 
            `[π]β ππ²Μ£π» π΅πΌΜ ππ?ΜπΌ πΉπΜπ°: \n${author.data.days}\n` + 
            `[π]β π¬π²Μπ π»π΅π?π: ${author.data.countDays} π§π πΜπ²\n` + 
            `[π]β Δπ’πΜΜπ¦ π­π‘πΜπ§ π­π‘π’πΜΜπ­: ${author.data.point} Δiα»m\n` + 
            `[π]β ππΜΜπ© π‘πΜ£π§π : ${getRank(senderID)}\n` + 
            `[π]β π»ππΜΜπ ππππ: ${new Date(author.data.timestamp).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })} - ${moment.tz("Asia/Ho_Chi_minh").format("DD/MM/YYYY")}`
            return api.sendMessage({ body: msg, attachment: await this.canvas(author.ID_one, author.ID_two, 1) }, threadID, messageID);
            break
        }
        case '5': {
            if (author == undefined || author.status == false) return api.sendMessage(`[βοΈ]β ππΜ£π§ π.π π¬π¦π₯ π«π π¦πΜ π¦π?π ππΜπ’ π π’Μ π³πΜ£Μπ² π‘π?ΜΜ ?`, threadID, messageID);
            var shop = [
                { name: 'Hoa', point: 10000, money: 10000000 }, 
                { name: 'NhαΊ΅n', point: 25000, money: 600000000 }, 
                { name: 'Socola', point: 37000, money: 2500000 }, 
                { name: 'Mα»Ή phαΊ©m', point: 49000, money: 5000000 }
            ]
            return api.sendMessage({
                body: "[βοΈ]β BαΊ‘n muα»n mua vαΊ­t phαΊ©m nΓ o!\n1. Hoa\n2. NhαΊ΅n\n3. Socola\n4. Mα»Ή phαΊ©m\nReply Δα» lα»±a chα»n", 
                attachment: await this.image('https://hanoispiritofplace.com/wp-content/uploads/2015/12/cau-noi-hay-ve-tinh-yeu-18.jpg')}, 
                threadID, (error, info) => global.client.handleReply.push({
                    type: input,
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    shop,
                    data: author
            }), messageID);
            break
        }
        case '6': {
            if (author == undefined || author.status == false) return api.sendMessage(`[βοΈ]β FA mΓ  ΔΓ²i Δiα»m danh?`, threadID, messageID);
            if(author.data.daily != null && Date.now() - author.data.daily < 86400000) 
                return api.sendMessage(`[βοΈ]β Mα»i lαΊ§n Δiα»m danh cΓ‘ch nhau 24 tiαΊΏng`, threadID, messageID)
            return api.sendMessage(`[βοΈ]β CαΊ£ 2 cΓΉng thαΊ£ cαΊ£m xΓΊc β€ vΓ o tin nhαΊ―n nΓ y Δα» Δiα»m danh!`, threadID, (error, info) => {
                global.client.handleReaction.push({
                    name: this.config.name,
                    type: input,
                    messageID: info.messageID,
                    senderID: senderID,
                    author: author,
                    data: {
                        ID_one: author.ID_one,
                        accept_one: false,
                        ID_two: author.ID_two,
                        accept_two: false
                    }
                })
            }, messageID);
            break
        }
        case '7': {
            if (dataDating.length == 0) return api.sendMessage('[βοΈ]β ChΖ°a cΓ³ cαΊ·p ΔΓ΄i nΓ o trong dα»― liα»u cα»§a bot', threadID, messageID);
            dataDating.sort(function(a, b) { return b.data.point - a.data.point });
            var msg = '===[βοΈ] TOP CΓC CαΊΆP ΔΓI ΔIα»M THΓN THIαΊΎT CAO NHαΊ€T [βοΈ]===\n'
            for (let i = 0; i <= 10; i++) {
                if (dataDating[i] == undefined) continue
                msg += `${i+1}. ${dataDating[i].name_one} - ${dataDating[i].name_two}\n[βοΈ]β Sα» Δiα»m: ${dataDating[i].data.point}\n[βοΈ]β Sα» ngΓ y: ${dataDating[i].data.countDays}\n\n`
            }
            return api.sendMessage(msg, threadID, messageID)
            break
        }
        default:
            return api.sendMessage(`[βοΈ]β ππΜ£π§ ππΜΜπ§ π§π‘πΜ£Μπ© π π’π¨ΜΜπ’ π­π’Μπ§π‘ ππ?Μπ π§π π?Μπ¨ΜΜπ’ π¦πΜ ππΜ£π§ π¦π?π¨ΜΜπ§ πππ­π’π§π  [π§ππ¦/π§π?ΜΜ]`, threadID, messageID);
    }
    var { money } = await Currencies.getData(senderID);
    if (money < 1380000000) return api.sendMessage(`[βοΈ]β ππΜ£π§ ππΜΜπ§ 1.380.000.000 πππ ππ‘π¨ π¦π¨Μ£Μπ­ ππΜπ’ πππ­π’π§π  π―π¨ΜΜπ’ π¦π¨Μ£Μπ­ π§π π?Μπ¨ΜΜπ’ πΈ`, threadID, messageID);
    return api.sendMessage(`[βοΈ]β ππΜ£π§ π¬πΜ ππ’Μ£ π­π«π?ΜΜ 1.380.000.000 πππ π­π’πΜΜπ§ π©π‘π’Μ π¦ππ’ π¦π¨ΜΜπ’\n[βοΈ]β ππ¨ΜΜ π­π’πΜΜπ§ π§πΜπ² π¬πΜ π€π‘π¨Μπ§π  π‘π¨πΜπ§ π­π«πΜ π§πΜΜπ? π π­π«π¨π§π  π π§π π?Μπ¨ΜΜπ’ π€π‘π¨Μπ§π  ππ‘πΜΜπ© π§π‘πΜ£Μπ§ π­π’πΜΜπ§ π―πΜπ¨ π­π«πΜ£π§π  π­π‘πΜπ’ πππ­π’π§π  π€\n\n[βοΈ]β ππ‘πΜ ππΜπ¦ π±π?Μπ π―πΜπ¨ π­π’π§ π§π‘πΜΜπ§ π§πΜπ² π§πΜΜπ? ππ‘πΜΜπ© π§π‘πΜ£Μπ§ π­π’Μπ¦ π€π’πΜΜπ¦ π¦π¨Μ£Μπ­ π§π π?Μπ¨ΜΜπ’.`, threadID, (error, info) => {
        global.client.handleReaction.push({
            name: this.config.name,
            type: input,
            messageID: info.messageID,
            senderID: senderID,
            author: dataUser
        })
    }, messageID);
}
function getRank(senderID) {
    var dataDating = require('./cache/dating.json');
    dataDating.sort(function(a, b) { return b.data.point - a.data.point })
    var rank = dataDating.findIndex(i => i.ID_one == senderID || i.ID_two == senderID);
    return rank + 1
}
module.exports.handleReply = async function({ api, event, handleReply, utils, Currencies }) {
    const { threadID, messageID, body, senderID } = event;
    if (handleReply.author != senderID) return
    var { money } = await Currencies.getData(senderID);
    if (money < handleReply.shop[parseInt(body) - 1].money) return api.sendMessage(`[βοΈ]β BαΊ‘n khΓ΄ng Δα»§ ${handleReply.shop[parseInt(body) - 1].money} Δα» mua vαΊ­t phαΊ©m`, threadID, messageID);
    await Currencies.setData(senderID, { money: money - handleReply.shop[parseInt(body) - 1].money });
    const dataDating = require('./cache/dating.json');
    var path = join(__dirname, 'cache', 'dating.json');
    handleReply.data.data.point = handleReply.data.data.point + handleReply.shop[parseInt(body) - 1].point
    writeFileSync(path, JSON.stringify(dataDating, null, 4));
    api.unsendMessage(handleReply.messageID)
    return api.sendMessage(`[βοΈ]β Mua thΓ nh cΓ΄ng! Δiα»m thΓ’n thiαΊΏt cα»§a bαΊ‘n bαΊ‘n ΔΓ£ ΔΖ°α»£c tΔng ${handleReply.shop[parseInt(body) - 1].point}, tα»ng: ${handleReply.data.data.point}`, threadID)
}
module.exports.handleReaction = async function({ api, event, Threads, Users, Currencies, handleReaction }) {
    var { threadID, reaction, messageID, userID } = event;
    var { type, senderID, author, love, data } = handleReaction;
    var dataDating = require('./cache/dating.json');
    var path = join(__dirname, 'cache', 'dating.json');
    var { money } = await Currencies.getData(senderID);
    switch (type) {
        case '1': {
            if (senderID != userID) return;
            api.unsendMessage(handleReaction.messageID)
            var dataGroup = (await Threads.getInfo(threadID)).userInfo;
            await Currencies.setData(senderID, { money: money - 1380000000 });
            var genderFilter = [];
            for (var i of dataGroup) {
                if (i.gender == 'FEMALE') {
                    var a = dataDating.some(i => i.ID_one == i.id || i.ID_two == i.id);
                    if (a != true) {
                        genderFilter.push({
                            ID: i.id,
                            name: i.name
                        })
                    }
                }
            }
            if (genderFilter.length == 0) return api.sendMessage(`[βοΈ]β ππΜΜπ­ π­π’πΜΜπ, π€π‘π¨Μπ§π  ππ¨Μ π§π π?Μπ¨ΜΜπ’ π¦πΜ ππΜ£π§ ππΜΜπ§ π­π’Μπ¦ π‘π¨πΜ£Μπ π‘π¨Μ£ ππ¨Μ π‘πΜ£π§ π‘π¨Μ π―π¨ΜΜπ’ π§π π?Μπ¨ΜΜπ’ π€π‘πΜπ π¦πΜΜπ­ π«π¨ΜΜπ’ ^^`, threadID);
            var random = genderFilter[Math.floor(Math.random() * genderFilter.length)];
            var msg = {
                body: `[π] ${author.name} - ππ π?Μπ¨ΜΜπ’ π¦πΜ π‘πΜ£Μ π­π‘π¨ΜΜπ§π  ππ‘π¨Μ£π§ ππ‘π¨ ππΜ£π§ π₯πΜ: ${random.name}\n[π] ππ‘π?Μ ππ¨ΜΜ£π©: ${Math.floor(Math.random() * (80 - 30) + 30)}%\n\n[βοΈ]β ππΜΜπ? ππΜ π π§π π?Μπ¨ΜΜπ’ ππ‘πΜΜπ© π§π‘πΜ£Μπ§ πππ­π’π§π , π‘πΜπ² ππ?Μπ§π  π§π‘ππ? π­π‘πΜ ππΜπ¦ π±π?Μπ π­π«πΜπ’ π­π’π¦ [β€] π―πΜπ¨ π­π’π§ π§π‘πΜΜπ§ π§πΜπ² π―πΜ ππ‘π’Μπ§π‘ π­π‘π?ΜΜπ π­π«πΜ£π§π  π­π‘πΜπ’ πππ­π’π§π  π―π¨ΜΜπ’ π§π‘ππ? `,
                mentions: [{ tag: random.name, id: random.ID }, {tag: author.name, id: senderID }]
            }
            return api.sendMessage(msg, threadID, (error, info) => {
                global.client.handleReaction.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    senderID: senderID,
                    type: "8",
                    author: {
                        ID: senderID,
                        name: author.name,
                        accept: false
                    },
                    love: {
                        ID: random.ID,
                        name: random.name,
                        accept: false
                    }
                });
            });
            break;
        }
        case '2': {
            if (senderID != userID) return;
            api.unsendMessage(handleReaction.messageID)
            var dataGroup = (await Threads.getInfo(threadID)).userInfo;
            await Currencies.setData(senderID, { money: money - 2000 });
            var genderFilter = [];
            for (var i of dataGroup) {
                if (i.gender == 'MALE') {
                    var a = dataDating.some(i => i.ID_one == i.id || i.ID_two == i.id);
                    if (a != true) {
                        genderFilter.push({
                            ID: i.id,
                            name: i.name
                        })
                    }
                }
            }
            if (genderFilter.length == 0) return api.sendMessage(`[βοΈ]β ππΜΜπ­ π­π’πΜΜπ, π€π‘π¨Μπ§π  ππ¨Μ π§π π?Μπ¨ΜΜπ’ π¦πΜ ππΜ£π§ ππΜΜπ§ π­π’Μπ¦ π‘π¨πΜ£Μπ π‘π¨Μ£ ππ¨Μ π‘πΜ£π§ π‘π¨Μ π―π¨ΜΜπ’ π§π π?Μπ¨ΜΜπ’ π€π‘πΜπ π¦πΜΜπ­ π«π¨ΜΜπ’ ^^`, threadID);
            var random = genderFilter[Math.floor(Math.random() * genderFilter.length)];
            var msg = {
                body: `[π] ${author.name} - ππ π?Μπ¨ΜΜπ’ π¦πΜ π‘πΜ£Μ π­π‘π¨ΜΜπ§π  ππ‘π¨Μ£π§ ππ‘π¨ ππΜ£π§ π₯πΜ: ${random.name}\n[π] ππ‘π?Μ ππ¨ΜΜ£π©: ${Math.floor(Math.random() * (80 - 30) + 30)}%\n\n[βοΈ]β ππΜΜπ? ππΜ π π§π π?Μπ¨ΜΜπ’ ππ‘πΜΜπ© π§π‘πΜ£Μπ§ πππ­π’π§π , π‘πΜπ² ππ?Μπ§π  π§π‘ππ? π­π‘πΜ ππΜπ¦ π±π?Μπ π­π«πΜπ’ π­π’π¦ [β€] π―πΜπ¨ π­π’π§ π§π‘πΜΜπ§ π§πΜπ² π―πΜ ππ‘π’Μπ§π‘ π­π‘π?ΜΜπ π­π«πΜ£π§π  π­π‘πΜπ’ πππ­π’π§π  π―π¨ΜΜπ’ π§π‘ππ? `,
                mentions: [{ tag: random.name, id: random.ID }, {tag: author.name, id: senderID }]
            }
            return api.sendMessage(msg, threadID, (error, info) => {
                global.client.handleReaction.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    senderID: senderID,
                    type: "8",
                    author: {
                        ID: senderID,
                        name: author.name,
                        accept: false
                    },
                    love: {
                        ID: random.ID,
                        name: random.name,
                        accept: false
                    }
                });
            });
            break;
        }
        case '3': {
            if (userID == data.ID_one) data.accept_one = true;
            if (userID == data.ID_two) data.accept_two = true;
            var findIndex = dataDating.find(i => i.ID_one == userID || i.ID_two == userID);
            if (data.accept_one == true && data.accept_two == true) {
                dataDating.splice(findIndex, 1);
                writeFileSync(path, JSON.stringify(dataDating, null, 4));
                var msg = { body: 'ππΜπ§ π§π‘ππ? π―πΜπ¨ π§π‘π?ΜΜπ§π  π₯π?Μπ π π’π¨Μπ§π  ππΜπ¨, π§π‘π?Μπ§π  π₯πΜ£π’ ππ‘πΜΜπ§π  π­π‘πΜΜ ππ¨Μ π§π‘ππ? π―πΜπ¨ π₯π?Μπ π¦π?Μπ π­ππ§ π\nππΜπ² π―π?π’ π₯πΜπ§ π§π‘πΜ, ππ¨Μ π§π‘π?ΜΜπ§π  π₯π?Μπ π‘π¨ΜΜ£π© π«π¨ΜΜπ’ π₯πΜ£π’ π­ππ§ π¦π¨ΜΜπ’ π€π‘π’πΜΜπ§ ππΜπ§ π­π‘πΜπ§ π¦π’Μπ§π‘ π¦πΜ£π§π‘ π¦πΜ π‘π¨Μπ§ π§π?ΜΜπ ππ‘π?ΜΜ', attachment: await this.canvas(data.ID_one, data.ID_two, 0) }
                return api.sendMessage(msg, threadID, messageID)
            }
            break
        }
        case '8': {
            if (reaction != 'β€') return;
            if (userID == author.ID) author.accept = true;
            if (userID == love.ID) love.accept = true;
            if (author.accept == true && love.accept == true) {
                api.unsendMessage(handleReaction.messageID);
                const dataUser = await Users.getData(love.ID);
                var userTwo = {
                    name_one: dataUser.name,
                    ID_one: love.ID,
                    name_two: author.name,
                    ID_two: author.ID,
                    status: true,
                    data: {
                        days: moment.tz("Asia/Ho_Chi_minh").format("hh:mm:ss DD/MM/YYYY"),
                        countDays: 0,
                        point: 0,
                        daily: null,
                        timestamp: Date.now()
                    }
                }
                dataDating.push(userTwo)
                writeFileSync(path, JSON.stringify(dataDating, null, 4));
                return api.sendMessage(`[βοΈ]β ππΜ π π§π π?Μπ¨ΜΜπ’ π―π?ΜΜπ ππ?Μπ§π  π§π‘ππ? π­π‘πΜ ππΜπ¦ π±π?Μπ, π§π π‘π’Μπ π₯πΜ ππΜ π π§π π?Μπ¨ΜΜπ’ ππ‘πΜΜπ© π§π‘πΜ£Μπ§ π­π’πΜΜπ§ π­π¨ΜΜπ’ π‘πΜ£π§ π‘π¨Μ π`, threadID, async (error, info) => {
                    api.sendMessage(getMsg(), threadID);
                });
            }
            break;
        }
        case '6': {
            if (reaction != 'β€') return;
            if (userID == data.ID_one) data.accept_one = true;
            if (userID == data.ID_two) data.accept_two = true;
            if (data.accept_one && data.accept_two) {
                api.unsendMessage(handleReaction.messageID);
                author.data.point = author.data.point + 5000
                author.data.daily = Date.now()
                writeFileSync(path, JSON.stringify(dataDating, null, 4));
                return api.sendMessage(`[βοΈ]β Δiα»m danh thΓ nh cΓ΄ng! Δiα»m thΓ’n thiαΊΏt cα»§a bαΊ‘n bαΊ‘n ΔΓ£ ΔΖ°α»£c tΔng 5000 Δiα»m\n[βοΈ]β tα»ng: ${author.data.point}`, threadID)
            }
        }
    }
}
module.exports.image = async function(link) {
    var images = [];
    let download = (await axios.get(link, { responseType: "arraybuffer" } )).data; 
        writeFileSync( __dirname + `/cache/heodenroi.png`, Buffer.from(download, "utf-8"));
        images.push(createReadStream(__dirname + `/cache/heodenroi.png`));
    return images
}
module.exports.circle = async (image) => {
    const jimp = require('jimp')
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
}
module.exports.canvas = async function(idOne, idTwo, type) {
    const { loadImage, createCanvas } = require("canvas");
    let path = __dirname + "/cache/ghep.png";
    let pathAvata = __dirname + `/cache/avtghep2.png`;
    let pathAvataa = __dirname + `/cache/avtghep.png`;
    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${idOne}/picture?height=250&width=250&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${idTwo}/picture?height=250&width=250&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    let bg = (await axios.get(type == 0 ? `https://i.imgur.com/fq4kzXk.jpg` : 'https://i.imgur.com/dfuCwFS.jpg', { responseType: "arraybuffer" })).data;
    writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
    writeFileSync(pathAvataa, Buffer.from(getAvatarTwo, 'utf-8'));
    writeFileSync(path, Buffer.from(bg, "utf-8"));
    avataruser = await this.circle(pathAvata);
    avataruser2 = await this.circle(pathAvataa);
    let imgB = await loadImage(path);
    let baseAvata = await loadImage(avataruser);
    let baseAvataa = await loadImage(avataruser2);
    let canvas = createCanvas(imgB.width, imgB.height);
    let ctx = canvas.getContext("2d");
    ctx.drawImage(imgB, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseAvata, type == 0 ? 91 : 82, type == 0 ? 82 : 95, type == 0 ? 166 : 129, type == 0 ? 166 : 129);
    ctx.drawImage(baseAvataa, type == 0 ? 519 : 443, type == 0 ? 81 : 95, type == 0 ? 166 : 129, type == 0 ? 166 : 129);
    ctx.beginPath();
    const imageBuffer = canvas.toBuffer();
    writeFileSync(path, imageBuffer);
    return createReadStream(path)
};