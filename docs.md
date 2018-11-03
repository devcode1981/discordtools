# Docs

### Installation

```
$ npm i discordtools
```

{% hint style="info" %}
Install discordtools globally if you're using discordtools CLI.
{% endhint %}

```text
$ npm i -g discordtools [--default|--author]
```

Run `discordtools` inside the terminal to run discordtools CLI.

### Methods

#### addRole

```text
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Adds a guild role to a guild member.
tools.addRole('Guild ID', 'Member ID', 'Role ID');
```

#### ban

```text
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Bans a guild member.
tools.ban('Guild ID', 'Member ID');

// Bans a guild member with days and a reason.
tools.ban('Guild ID', 'Member ID', {
    days: 7,
    reason: 'Ban reason.'
});
```

#### bulkDelete

```text
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Bulks delete an amount of messages.
tools.bulkDelete('Channel ID', ['Message ID', 'Message ID', 'Message ID']);
```

#### createChannel

```text
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Creates a guild channel.
tools.createChannel('Guild ID', 'channel-name', 'voice', 'Channel Topic', false /* NSFW boolean */)
```

#### createEmoji

```text
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Creates a guild emoji using an image from a URL.
tools.createEmoji('Guild ID', 'https://link-to-an-image.com', 'Emoji name');

// Creates a guild emoji using an image from your storage.
tools.createEmoji('Guild ID', './path/to/emoji.png', 'Emoji name');
```

#### createGuild

```text
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Creates a guild.
tools.createGuild({
            name: 'Name here',
            region: 'Region',
            icon: 'Icon here'
        })
        .then((guild) => {
            return guild
        })
        .catch((err) => {
            console.log(err);
        });
```

#### createRole

```text
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Creates a guild role.
tools.createRole('Guild ID', {
    name: 'Role name',
});
// Creates a guild role with role color.
tools.createRole('Guild ID', {
    name: 'Role name',
    color: '#FF0000',
});
```

#### deleteChannel

```text
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Deltes a guil;d channel.
tools.deleteChannel('Channel ID');
```

#### deleteEmoji

```text
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Deletes a guild emoji.
tools.deleteEmoji('Guild ID', 'Emoji ID');
```

#### deleteGuild

```text
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Deletes a guild.
tools.deleteGuild('Guild ID');
```

#### deleteMessage

```text
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Deletes a message.
tools.deleteMessage('Channel ID', 'Message ID');
```

#### deleteRole

```text
const DiscordTools = requirte('discordtools');
const tools = n ew DiscordTools.Client('Client Token');

// Deletes a guild role.
tools.deleteRole('Guild ID', 'Role ID');
```

#### editChannel

```text
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Edits a guild channel.
tools.editChannel('Channel ID', {
    name: 'new-channel-name',
    topic: 'Channel topic',
    position: 5,
});
```

#### editEmoji

```text
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Edits a guild emoji.
tools.editEmoji('Guild ID', 'Emoji ID', { name: 'Emoji name' });
```

#### editGuild

```text
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Edits a guild.
tools.editGuild('Guild ID', {
    name: 'Guild name',
    region: 'us-central',
    verificationLevel: 3,
    afkChannel: 'AFK channel ID',
    systemChannel: 'System channel ID',
    afkTimeout: 10000,
    icon: 'https://link-to-an-icon.com',
    owner: 'Owner ID',
    splash: 'https://link-to-splash.com',
    explicitContentFilter: 2,
});
```

#### editMember

```text
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Edits a guild member.
tools.editMember('Guild ID', 'Member ID', {
    nick: 'Nickname',
    mute: true,
    deaf: false,
});
```

#### editRole

```text
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Edits a guild role.
tools.editRole('Guild ID', 'Role ID', {
    name: 'Role name',
    position: 5,
});
```

#### embed

```text
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

const embed = tools.embed({
    title: 'Embed title',
    description: 'Embed description',
    color: '#3CB371',
    author: 'Embed author',
    image: 'https://link-to-an-image.com',
    url: 'https://the-embed-url.com',
    timestamp: '2018-06-01T11:36:07.830Z',
    footer: 'Embed footer',
    thumbnail: 'https://link-to-an-image.com',
});

// Sending the embed using Discord.js
channel.send({
    embed: embed
});

// Sending the embed using Eris
client.createMessage('Channel ID', {
    embed: embed
});
```

#### fetchMember

```text
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Fetches a guild member.
tools.fetchMember('Guild ID', 'Member ID')
    .then((GuildMember) => {
        console.log(GuildMember)
    })
    .catch((err) => {
        console.log(err)
    });
```

#### kick

```text
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Kicks a guild member.
kick('Guild ID', 'Member ID');
// Kick a guild member with a reason.
kick('Guild ID', 'Member ID', 'Kick reason.');
```

#### pinMessage

```text
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Pins a message.
tools.pinMessage('Channel ID', 'Message ID');
```

#### removeRole

```text
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Removes a guild role.
tools.removeRole('Guild ID', 'Member ID', 'Role ID');
```

#### unban

```text
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Unbans a banned member.
tools.unban('Guild ID', 'Member ID');

// Unbans a banned member with a reason.
tools.unban('Guild ID', 'Member ID', 'Unban reason');
```

#### unpinMessage

```text
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

tools.unpinMessage('Channel ID', 'Message ID');
```

