# editGuild()

Edit a guild.

# Example

```js
const DiscordTools = require('discordtools');
const tools = require('discordtools');

// Edit a guild.
tools.editGuild('Guild ID', {
    name: 'Guild name',
    region: 'us-central', // Guild region
    verificationLevel: 3, // Guild verification level
    afkChannel: 'AFK channel ID',
    systemChannel: 'System channel ID',
    afkTimeout: 10000, // AFK timeout. (in milliseconds)
    icon: 'https://link-to-an-icon.com', // Guild icon.
    owner: 'Owner ID',
    splash: 'https://link-to-splash.com', // Splash URL.
    explicitContentFilter: 2, // Explicit content filter level.
});
```