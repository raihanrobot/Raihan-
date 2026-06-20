const fs = require("fs-extra");
const path = require("path");
const request = require("request");

module.exports.config = {
  name: "prefix",
  version: "1.0.1", 
  hasPermssion: 0,
  credits: "🔰𝐑𝐀𝐇𝐀𝐓 𝐈𝐒𝐋𝐀𝐌🔰",
  description: "Display the bot's prefix and owner info with GIF",
  commandCategory: "Information",
  usages: "",
  cooldowns: 5
};

module.exports.handleEvent = async ({ event, api, Threads }) => {
  const { threadID, messageID, body } = event;
  if (!body) return;

  const dataThread = await Threads.getData(threadID);
  const data = dataThread.data || {};
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const prefix = threadSetting.PREFIX || global.config.PREFIX;
  const groupName = dataThread.threadInfo?.threadName || "Unnamed Group";

  const triggerWords = [
    "prefix", "mprefix", "mpre", "bot prefix", "what is the prefix", "bot name",
    "how to use bot", "bot not working", "bot is offline", "prefx", "prfix",
    "perfix", "bot not talking", "where is bot", "bot dead", "bots dead",
    "dấu lệnh", "daulenh", "what prefix", "freefix", "what is bot", "what prefix bot",
    "how use bot", "where are the bots", "where prefix"
  ];

  const lowerBody = body.toLowerCase();
  if (triggerWords.includes(lowerBody)) {

    //🔰
    const gifs = [
     "https://i.imgur.com/GZsIMDD.gif",
      "https://i.imgur.com/TeCvnYx.gif",
      "https://i.imgur.com/61hTdN3.gif",
      "https://i.imgur.com/oYpzLg0.gif",
      "https://i.imgur.com/MOuHXRh.gif",
      "https://i.imgur.com/NWrwi30.gif",
      "https://i.imgur.com/QklhKzM.gif",
      "https://i.imgur.com/TeCvnYx.gif",
      "https://i.imgur.com/YUKbZeN.gif",
      "https://i.imgur.com/GPd6rdT.gif",
      "https://i.imgur.com/DT4rWmV.gif",
      "https://i.imgur.com/L8C6OKO.gif",
      "https://i.imgur.com/EJC0nN5.gif",
      "https://i.imgur.com/1TT7J4s.gif",
      "https://i.imgur.com/aHExnbz.gif",
      "https://i.imgur.com/T4nc1dC.gif",
      "https://i.imgur.com/wtS2oC0.gif",
      "https://i.imgur.com/ZplnzRl.gif",
      "https://i.imgur.com/Kj9cK5G.gif",
      "https://i.imgur.com/lbaSgl2.gif"
    ];

    //🔰
    const gifUrl = gifs[Math.floor(Math.random() * gifs.length)];
    const gifPath = path.join(__dirname, 'prefix_info.gif');

    const messageBody = 
`🌐 𝗦𝘆𝘀𝘁𝗲𝗺 𝗽𝗿𝗲𝗳𝗶𝘅:   ${prefix}  \n🛸 𝗬𝗼𝘂𝗿 𝗯𝗼𝘅 𝗰𝗵𝗮𝘁 𝗽𝗿𝗲𝗳𝗶𝘅:   ${prefix}
 `;

    // 🌐 GIF ডাউনলোড করা
    request(encodeURI(gifUrl))
      .pipe(fs.createWriteStream(gifPath))
      .on("close", () => {
        //🔰
        api.sendMessage(
          {
            body: messageBody,
            attachment: fs.createReadStream(gifPath)
          },
          threadID,
          () => fs.unlinkSync(gifPath)
        );
      });
  }
};

module.exports.run = async ({ event, api }) => {
  return api.sendMessage("Type 'prefix' or similar to get the bot info with GIF ✨", event.threadID);
};
