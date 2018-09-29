# createChannel()

Create a guild channel.

## Example

```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Create a guild channel.
tools.createChannel('Guild ID', 'channel-name', 'voice', /*  Channel type: 'text', 'voice', 'category', 'dm','group_dm' */ 'Channel Topic', false /* NSFW boolean */);
```
