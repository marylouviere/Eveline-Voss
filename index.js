require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

// ✧ Blacklisted words
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
  console.log(`Logged in as ${client.user.tag}`);
});

// ✧ Blacklist detection
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();
  const found = blacklist.find(word => content.includes(word));

  if (!found) return;

  try {
    await message.delete();
  } catch (err) {
    console.log("Couldn't delete message.");
  }

  const responses = [
    `Oh, my dear ${message.author.username}! Let's not use that language x`,
    `Very naughty of you ${message.author.username}!`,
    `Ah! Let's follow the rules ${message.author.username}`
  ];

  const randomResponse = responses[Math.floor(Math.random() * responses.length)];

  message.channel.send(randomResponse);
});

client.login(process.env.TOKEN);
