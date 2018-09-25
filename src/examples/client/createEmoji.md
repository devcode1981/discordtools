# createEmoji()

Create a guild emoji.

## Example

```js
const DiscordTools = require('discordtools');
const tools = new DiscordTools.Client('Client Token');

// Create a guild emoji using an image from a URL.
createEmoji('Guild ID', 'https://link-to-an-image.com', 'Emoji name');

// Create a guild emoji using an image from your local storage.
createEmoji('Guild ID', './path/to/emoji.png', 'Emoji name');
```