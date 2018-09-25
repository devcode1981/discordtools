# has()

Checks whether the database has a key(s) or not.

## Example
```js
const DiscordTools = require('discordtools');
const db = new DiscordTools.Database();

// Checks whether the database has a key.
db.has('key');

// Checks whether the database have keys.
db.has(['Key name', 'key Name', 'Key Name', 'key name'], 'array');
```