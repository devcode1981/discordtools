# fetchAll()

Fetch all database keys.

## Example
```js
const DiscordTools = require('discordtools');
const db = new DiscordTools.Database();

db.fetchAll()
    .then((db) => {
        console.log(db);
    })
    .catch((err) => {
        throw err;
    });
```