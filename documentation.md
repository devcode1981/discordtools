# Docs

## Installation

```
$ npm i discordtools
```

### Methods

* addRole
* ban
* bulkDelete
* createChannel
* createEmoji
* createGuild
* createRole
* deleteChannel
* deleteEmoji
* deleteGuild
* deleteMessage
* deleteRole 
* editChannel 
* editEmoji 
* editGuild 
* editMember 
* editRole 
* embed 
* fetchMember 
* kick 
* pinMessage 
* removeRole 
* unban 
* unpinMessage

### Examples

#### addRole\(\)

```text
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

tools.addRole('Guild ID', 'Role ID', 'Member ID')
```

