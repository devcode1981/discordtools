# createRole()

Create a guild role.

## Example

```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Create a guild role.
createRole('Guild ID', {
    name: 'Role name',
});

// Create a guild role with a role color.
createRole('Guild ID', {
    name: 'Role name',
    color: '#FF0000',
});
```