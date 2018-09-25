# fetch()

Fetch a database key. 

## Example
```js
const DiscordTools = require('discordtools');
const db = new DiscordTools.Database();

// Fetches a database key.
db.fetch('key')
    .then((value) => {
        console.log(value);
    })
    .catch((err) => {
        throw err;
    });
```