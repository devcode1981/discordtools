# addRole()

Add a guild role to a guild member.

## Example

```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Add a guild role to a guild member.
tools.addRole('Guild ID', 'Member ID', 'Role ID');
```
