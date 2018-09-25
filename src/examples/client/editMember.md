# editMember

Edit a guild member.

# Example

```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Edit a guild member.
tools.editMember('Guild ID', 'Member ID', {
    nick: 'Nickname',
    mute: true, // Mutes member in guild voice channels if true.
    deaf: false, // Deafen member in guild voice channels if true.
});
```