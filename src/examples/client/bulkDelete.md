# bulkDelete()

Bulk delete a specified amount of messages inside a guild channel. [Limit: 2-100]

## Example

```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Bulk delete a specified amount of messages inside a guild channel.
tools.bulkDelete('Channel ID', ['Message ID', 'Message ID', 'Message ID', 'Message ID']);
```