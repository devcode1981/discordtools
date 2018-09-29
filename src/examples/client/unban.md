# unban()

Unban a user.

# Example

```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Unban a user.
tools.unban('Guild ID', 'Member ID');

// Unban a user with a reason.
tools.unban('Guild ID', 'User ID', 'Unban reason');
```
