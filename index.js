const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Your bot token from the Discord Developer Portal
const token = ""; // Replace with your bot token

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//RPS CF VARIABLES
const rps = ["rock", "paper", "scissors"];
const cf = ["heads", "tails"];

//meme generator
client.on("messageCreate", async (message) => {
  if (message.content === "/meme") {
    try {
      const memeUrl = await getRandomMeme();
      message.channel.send(memeUrl);
    } catch (error) {
      console.error(error);
      message.channel.send("Sorry, I couldn't fetch a meme. Please try again!");
    }
  }
  // Basic Commands
  switch (message.content) {
    case "/help":
      message.channel.send("/Meme | For a Random Meme");
      message.channel.send("/Help | For The Command List");
      message.channel.send("/RPS | Rock paper Scissors");
      message.channel.send("/CF | For a Coin Flip");
      message.channel.send("/HugMe | For a Hug");
      break;
    case "/RPS":
      message.channel.send(rps[Math.floor(Math.random() * 3)]);
      break;
    case "/CF":
      message.channel.send(cf[Math.floor(Math.random() * 2)]);
      break;
    case "/HugMe":
      message.channel.send(`Hugs ${message.author}`);
      message.channel.send(
        `https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXIwZTlyY2JyeWtoN3RrdDQ3MGdrbnV6ODUxcnhrZTkyMXhycHhicCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/GMFUrC8E8aWoo/giphy.gif`
      );
      break;
  }
});

// Function to fetch a random meme from the subreddit
async function getRandomMeme() {
  const response = await axios.get(
    "https://www.reddit.com/r/memes/random.json"
  );
  const meme = response.data[0].data.children[0].data;
  return meme.url;
}

// Log the bot in
client.login(token);
