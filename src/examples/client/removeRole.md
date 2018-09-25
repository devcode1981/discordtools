# removeRole()

Remove a guild role from a guild member.

# Example

```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Remove a guild role from a guild member.
tools.removeRole('Guild ID', 'Member ID', 'Role ID');
```