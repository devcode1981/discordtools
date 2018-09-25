# Usage

**embed()** - Create a RichEmbed.
```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Token Here');

const embed = tools.embed({
    title: 'Embed Title',
    description: 'Embed Description',
    color: '#3CB371',
    author: 'Embed Author',
    image: 'https://linktoimage.com',
    url: 'https://www.npmjs.com/package/discordtools',
    timestamp: '2018-06-01T11:36:07.830Z',
    footer: 'Embed Footer',
    thumbnail: 'https://linktoimage.com'
});

// Send embed using Discord.js
channel.send({ embed: embed });
```

**createGuild()** - Create a guild.
```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Token Here');

// Create a guild.
tools.createGuild({
        name: 'Guild Name',
        region: 'us-central',
        icon: 'https://link-to-an-image.com',
    })
    .then((Guild) => {
        console.log(Guild);
    })
    .catch((err) => {
        console.log(err);
    });
```

**deleteGuild()** - Delete a guild.
```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Token Here');

// Delete a guild.
tools.deleteGuild('Guild ID');
```

**editGuild()** - Modify a guild.
```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Token Here');

// Edit a guild.
tools.editGuild('Guild ID', {
    name: 'New Guild Name',
    region: 'us-central', // Guild region
    verificationLevel: 3, // Guild verification level
    afkChannel: 'AFK Channel ID',
    systemChannel: 'System Channel ID',
    afkTimeout: 10000, // AFK timeout. (in milliseconds)
    icon: 'https://linktoicon.com',
    owner: 'New owner ID',
    splash: 'https://linktosplash.com', // Splash URL.
    explicitContentFilter: 2, // Explicit content filter level.
});
```

**createChannel()** - Create a guild channel.
```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Token Here');

// Create a guild channel.
tools.createChannel('Guild ID', 'channel-name', 'voice', /* Channel type: text, voice, category, dm, group_dm*/ 'Channel Topic', false /* NSFW boolean */ );
```

**deleteChannel()** - Delete a guild channel.
```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Token Here');

// Delete a guild channel.
tools.deleteChannel('Channel ID');
```

**editChannel()** - Edit a guild channel.
```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Token Here');

// Edit a guild channel.
editChannel('Channel ID', {
    name: 'new-channel-name',
    topic: 'Development support channel.', // Channel topic.
    position: 5, // Channel position.
});
```

**fetchMember()** - Fetch/Get a guild member.
```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Token Here');

// Fetch a guild member.
tools.fetchMember('Guild ID', 'Member ID')
    .then((GuildMember) => {
        console.log(GuildMember);
    })
    .catch((err) => {
        console.log(err);
    });
```

**editMember()** - Edit a guild member.
```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Token Here');

// Edit a guild member.
tools.editMember('Guild ID', 'Member ID', {
    nick: 'New nickname',
    mute: true,
    deaf: false,
});
```

**bulkDelete()** - Bulk delete a specified amount of messages inside a guild channel. [Limit: 2-100]
```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Token Here');

// Bulk delete a specified amount of messages inside a guild channel.
tools.bulkDelete('Channel ID', ['Message ID', 'Message ID', 'Message ID', 'Message ID', 'Message ID'] /* Array of messages IDs to delete. */);
```

**kick()** - Kick a guild member.
```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Token Here');

// Kick a guild member.
tools.kick('Guild ID', 'Member ID');

// Kick a guild member with a reason.
tools.kick('Guild ID', 'Member ID', 'Kick reason');
```

**ban()** - Ban a guild member.
```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Token Here');

// Ban a guild member
tools.ban('Guild ID', 'Member ID');

// Ban a guild member with days and a reason.
tools.ban('Guild ID', 'Member ID', {
    days: 7, /* Delete the member's messages from amount of day(s). */
    reason: 'Ban reason'
});
```

**unban()** - Unban a user.
```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Token Here');

// Unban a user.
tools.unban('Guild ID', 'User ID');

// Unban a user with a reason.
tools.unban('Guild ID', 'User ID', 'Unban reason');
```

**addRole()** - Add a guild role to a guild member.
```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Token Here');

// Add a guild role to a guild member.
tools.addRole('Guild ID', 'Member ID', 'Role ID');
```

**removeRole()** - Remove a guild role from a guild member.
```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Token Here');

// Remove a guild role from a guild member.
tools.removeRole('Guild ID', 'Member ID', 'Role ID');
```

**createRole** = Create a guild role.
```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Token Here');

// Create a guild role.
tools.createRole('Guild ID', {
    name: 'Contributor',
});

// Create a guild role with a role color.
tools.createRole('Guild ID', {
    name: 'Contributor',
    color: '#FF0000'
});
```

**deleteRole** - Delete a guild role.
```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Token Here');

// Delete a guild role.
deleteRole('Guild ID', 'Role ID');
```

**createEmoji** - Create a guild emoji.
```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Token Here');

// Create a guild emoji using an image from an URL.
createEmoji('Guild ID', 'https://linktoimage.com', 'Emoji name');

// Create a guild emoji using an image from your storage.
createEmoji('Guild ID', '../images/emoji.png', 'Emoji name');
```

**deleteEmoji** - Delete a guild emoji.
```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Token Here');

// Delete a guild emoji.
deleteEmoji('Guild ID', 'Emoji ID');
```