require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

// ✧ Blacklisted words (all lowercase)
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

// ✧ Bot ready
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// ✧ Auto-moderation
client.on("messageCreate", async (message) => {
  if (message.author.bot) return; // Ignore other bots

  const content = message.content.toLowerCase();
  const found = blacklist.find(word => content.includes(word));
  if (!found) return; // No bad word found

  // Try to delete the offending message
  try {
    await message.delete();
  } catch (err) {
    console.log("Couldn't delete message:", err);
  }

  // Random warning messages, now pinging the user
  const responses = [
    `Oh, my dear <@${message.author.id}>! Let's not use that language x`,
    `Very naughty of you <@${message.author.id}>!`,
    `Ah! Let's follow the rules <@${message.author.id}>`
  ];

  const randomResponse = responses[Math.floor(Math.random() * responses.length)];

  // Send the warning
  message.channel.send({ content: randomResponse });
});

// ✧ Log in using token from .env
client.login(process.env.TOKEN);
