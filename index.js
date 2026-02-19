require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// 🕯️ Blacklisted Words / Phrases
const blacklist = [
  "nigger",
  "faggot",
  "kill yourself",
  "dyke",
  "tranny",
  "klu klux klan",
  "coon",
  "blackie",
  "retard",
  "fuck",
  "shit",
  "bitch",
  "skank",
  "whore"
];

client.once("ready", () => {
  console.log(`Eveline Voss is watching...`);
});

// 🌹 Blacklist Detection
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();

  const found = blacklist.find(word => content.includes(word));

  if (found) {
    try {
      await message.delete();
    } catch (err) {
      console.log("Couldn't delete message:", err);
    }

    const responses = [
      `Oh, my dear ${message.author.username}… such language is not tolerated here.`,
      `Very naughty of you, ${message.author.username}. Mind your tongue.`,
      `Ah— ah. We follow the rules in this village, ${message.author.username}.`, 
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    message.channel.send(randomResponse);
  }
});

client.login(process.env.TOKEN);
