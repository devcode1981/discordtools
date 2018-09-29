# createGuild()

Create a guild.

## Example

```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Create a guild.
tools.createGuild({
    name: 'Guild name',
    region: 'us-central',
    icon: 'https://link-to-an-icon.com'
})
.then((Guild) => {
    console.log(Guild);
})
.catch((err) => {
    console.log(err);
});
```
