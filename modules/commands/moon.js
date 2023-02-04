class Module {
    constructor(_) {
        this.config = _;
    };
    run(o) {
        const
        axios = require('axios'),
        fs = require('fs');

        let
        send = msg=>o.api.sendMessage(msg, o.event.threadID, o.event.messageID),
        input = o.args.join(' ').split('|');

        if (input.length != 4)return send(`Vui lòng nhập đúng định dạng: tên|ngày|tháng|năm`);

        axios.get(`https://api-jrt.suaries1204.repl.co/api/moon?apikey=JRT&name=${encodeURI(input[0])}&ngay=${input[1]}&thang=${input[2]}&nam=${input[3]}`, {
            responseType: 'arraybuffer'
        })
        .then(success=> {
            let
            path = `${__dirname}/cache/moon.png`;

            fs.writeFileSync(path, success.data),
            send({
                attachment: fs.createReadStream(path)
            });
        })
        .catch(err=>send(err.message));
    };
};

module.exports = new Module({
    name: 'moon',
    version: '2.0.5',
    hasPermssion: 0,
    credits: 'Công Nam',
    description: 'moon',
    commandCategory: 'Tạo ảnh',
    uages: '[]',
    cooldowns: 3
});
