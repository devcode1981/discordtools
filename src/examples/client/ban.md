# ban()

Ban a guild member.

## Example

```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Ban a guild member.
tools.ban('Guild ID', 'Member ID');

// Ban a guild member with days and a reason.
tools.ban('Guild ID', 'Member ID', {
    days: 7,
    reason: 'Ban reason.'
});
```