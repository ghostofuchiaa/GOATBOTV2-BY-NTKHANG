const fs = require('fs-extra');
const axios = require('axios');

module.exports = {
  config: {
    name: "gist",
    aliases: "git",
    version: "6.9.0",
    author: "dipto",
    countDown: 15,
    role: 0,
    shortDescription: "code",
    longDescription: "code",
    category: "chat",
    guide: {
      en: "{pn} [file name]"
    }
  },
  onStart: async function ({api,event,args}) {
  const admin = "100089550064027";
  const na = this.config.author;
  const nam = "Dipto.js";
    if (!admin.includes(event.senderID)) {
      api.sendMessage("⚠️ | No have no permission to use this command🐤", event.threadID, event.messageID);
      return;
    }
  const fileName = args[0];
  const path = `scripts/cmds/${fileName}.js`;
  const code = await fs.promises.readFile(path, 'utf-8');
  const response = await axios.get(`https://gist-api-dipto.onrender.com/${na}?code=${encodeURIComponent(code)}&nam=${nam}`);
  const diptoUrl = response.data.data;
  return api.sendMessage(diptoUrl,event.threadID,event.messageID);
}
}
