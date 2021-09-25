const axios = require("axios");
const { Client, Intents } = require("discord.js");

// Environmental Variables
if (process.env.NODE_ENV == "dev") {
  require("dotenv").config({ path: `${__dirname}/.env` });
}

const client = new Client({ intents: Intents.FLAGS.GUILDS });

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);

  setInterval(async () => {
    const response = await axios.get(
      "https://api.pancakeswap.info/api/v2/tokens/0x31471e0791fcdbe82fbf4c44943255e923f1b794"
    );

    const cleanData = Number(response.data.data.price).toFixed(4);

    client.user.setActivity(`$${cleanData}`);
  }, 7000);
});

client.login(process.env.TOKEN);
