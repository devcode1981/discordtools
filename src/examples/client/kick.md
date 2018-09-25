# kick()

Kick a guild member.

# Example

```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Kick a guild member.
tools.kick('Guild ID', 'Member ID');

// Kick a guild member with a reason.
tools.kick('Guild ID', 'Member ID', 'Kick reason.');
```