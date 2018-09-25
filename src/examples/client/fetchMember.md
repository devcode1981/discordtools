# fetchMember()

Fetch a guild member.

# Example

```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Fetch a guild member.
tools.fetchMember('Guild ID', 'Member ID')
  .then(GuildMember => {
    console.log(GuildMember);
  })
  .catch(err => {
    console.log(err);
  });
```
