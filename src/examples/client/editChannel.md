# editChannel()

Edit a guild channel.

# Example

```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Edit a guild channel.
tools.editChannel('Channel ID', {
    name: 'new-channel-name',
    topic: 'Channel topic',
    position: 5,
});
```