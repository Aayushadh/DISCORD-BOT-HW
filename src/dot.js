require("dotenv").config();

const {
    Client
} = require("discord.js");
const client = new Client();
const PREFIX = "$";

client.on("ready", () => {
    console.log(`Bot logged in ${client.user.username}`);
});
client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
        const [CMD, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);

        if (CMD === "kick") {
            if (args.length === 0) return message.reply("Please provide an ID");
            const member = message.guild.members.cache.get(args[0]);
            if (member) {
                member
                    .kick()
                    .then((member) => {
                        message.channel.send(`${member} was kicked`);
                    })
                    .catch((err) => message.channel.send("you don't have permission :('"));
            } else {
                message.channel.send("Member Not found");
            }

        } else if (CMD === "ban") {
            if (args.length === 0) return message.reply("Please provide an ID");
            try {
                const user = await message.guild.members.ban(args[0])
                message.channel.send(`${user} was banned Success fully`);

            } catch (e) {
                console.log(e);
                message.channel.send(`you can't ban`);

            }


        }

    }



});
client.login(process.env.DISCORD_BOT);