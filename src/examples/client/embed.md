# embed()

Create a embed.

# Example

```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Token Here');

const embed = tools.embed({
    title: 'Embed title',
    description: 'Embed description',
    color: '#3CB371',
    author: 'Embed author',
    image: 'https://link-to-an-image.com',
    url: 'https://the-embed-url.com',
    timestamp: '2018-06-01T11:36:07.830Z',
    footer: 'Embed footer',
    thumbnail: 'https://link-to-an-image.com',
});

// Send the embed using Discord.js.
channel.send({ embed: embed });

// Send the embed using Eris.
client.createMessage('Channel ID', { embed: embed });
```