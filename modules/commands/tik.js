module.exports.config = {
    name: "tik",
    version: "1.1.12",
    hasPermssion: 0,
    credits: "JRT",
    description: "Lấy video trên tiktok",
    commandCategory: "Phương tiện",
    usages: "tik url",
    cooldowns: 5,
    dependencies: {"axios": ""}
};
module.exports.run = async function ({ event, api, args, Users }) {
  try{
    const axios = global.nodemodule["axios"];
  const res = await axios.post('https://www.tikwm.com/api/', {
                url: args[0],
                count: 12,
                cursor: 0,
                hd: 1
        });
        if(res.status == 200){
            // test for status you want, etc
            console.log(res.status);
          const k = res.data  
             const t = (await axios.get(`${k.data.play}`, { responseType: "stream" })).data;
    return api.sendMessage({ 
      body: `[⚜️]=== 『 𝑻𝑰𝑲𝑻𝑶𝑲 𝑽𝑰𝑫𝑬𝑶 』 ===[⚜️]\n\◆━━━━━━━━━━━━━◆\n\n[⚜️]➜ Tiêu đề: ${k.data.title}\n[⚜️]➜ Tên kênh: ${k.data.author.nickname} \n[⚜️]➜ Tim: ${k.data.digg_count}\n[⚜️]➜ View: ${k.data.play_count}`,
      attachment: t
    }, event.threadID)
  }
  }
    catch (err) {
        console.log(err)
        return api.sendMessage("Đã xảy ra lỗi từ api", event.threadID);
}        
}
