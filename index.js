require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

// ✧ Updated blacklist (swears, racist, homophobic, ableist, harmful phrases)
const blacklist = [
  // Swears
  "fuck","shit","bitch","bastard","damn","ass","asshole","dick","piss","cock","cunt","fag","faggot",
  "whore","slut","skank","prick","bollocks","twat","nigga","nigger","motherfucker","arse","wanker",
  // Homophobic/racist terms
  "dyke","tranny","coon","blackie","chink","gook","kike","spic","wetback","raghead","sandnigger",
  "klu klux klan","faggy","dykey",
  // Ableist / offensive
  "retard","moron","lamebrain","cripple","imbecile","mong",
  // Harmful phrases
  "kill yourself","die","go die","suicide"
  // Add more if needed
];

// ✧ Bot ready
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// ✧ Auto-moderation
client.on("messageCreate", async (message) => {
  if (message.author.bot) return; // Ignore bots

  const content = message.content.toLowerCase();
  const found = blacklist.find(word => content.includes(word));
  if (!found) return;

  // Delete offending message
  try {
    await message.delete();
  } catch (err) {
    console.log("Couldn't delete message:", err);
  }

  // Randomized warnings, pinging user
  const responses = [
    `Oh, my dear <@${message.author.id}>! Let's not use that language x`,
    `Very naughty of you <@${message.author.id}>!`,
    `Ah! Let's follow the rules <@${message.author.id}>`
  ];

  const randomResponse = responses[Math.floor(Math.random() * responses.length)];

  message.channel.send({ content: randomResponse });
});

client.login(process.env.TOKEN);
