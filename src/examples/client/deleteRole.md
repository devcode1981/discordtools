# deleteRole()

Delete a guild role.

# Example

```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Delete a guild role.
tools.deleteRole('Guild ID', 'Role ID');
```