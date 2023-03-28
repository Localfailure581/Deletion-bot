Discord.js Message Deletion Bot
This is a simple bot that deletes messages and sends a notification to the moderator who deleted the message and to the user who sent the deleted message. The bot uses Discord.js library for interacting with Discord API.

Requirements
Node.js version 16.6.0 or higher
A Discord bot token
Installation
Clone the repository to your local machine
Run npm install to install dependencies
Edit the prefix and modLogChannel variables in index.js file to match your desired bot prefix and mod log channel ID respectively.
Replace TOKEN with your bot's token in client.login('TOKEN') line in index.js file.
Run node index.js to start the bot.
Usage
The bot responds to one command:

!delete [message id] [reason]
Deletes the message with the provided message id and sends a notification to the moderator who deleted the message and to the user who sent the deleted message. The reason is required and will be included in the notification messages.

License
This project is licensed under the MIT License - see the LICENSE file for details.
