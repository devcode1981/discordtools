const querystring = require('querystring');
const Util = require('../util/Util');
const Constants = require('../util/Constants');
const Endpoints = require('../util/Constants').Endpoints;

class APIMethods {
  constructor(apiManager) {
    this.manager = apiManager;
    this.client = apiManager.client;
  }

  CreateGuild(data) {
    data.icon = Util.resolveBase64(data.icon) || null;
    data.region = data.region || 'us-central';
    return new Promise((resolve, reject) => {
      this.manager.request('post', Endpoints.guilds, true, data)
        .then((response) => {
          resolve(response.text);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  DeleteGuild(guild_id) {
    return this.manager.request('delete', Endpoints.Guild(guild_id), true);
  }

  EditGuild(guild_id, data) {
    return this.manager.request('patch', Endpoints.Guild(guild_id), true, data);
  }

  kickGuildMember(guild_id, member_id, reason) {
    return this.manager.request('delete', Endpoints.Guild(guild_id).Member(member_id), true, undefined, undefined, reason)
  }

  banGuildMember(guild_id, member_id, data) {
    const banURL = `${Endpoints.Guild(guild_id).bans}/${member_id}?${querystring.stringify(data)}`;
    return this.manager.request('put', banURL, true);
  }

  unbanUser(guild_id, user_id, reason) {
    return this.manager.request('delete', `${Endpoints.Guild(guild_id).bans}/${user_id}`, true, undefined, undefined, reason);
  }

  deleteChannelMessage(channel_id, message_id) {
    return this.manager.request('delete', Endpoints.Channel(channel_id).Message(message_id), true);
  }

  bulkDeleteMessages(channel_id, messages_id) {
    return this.manager.request('post', Endpoints.Channel(channel_id).messages.bulkDelete, true, {
      messages: messages_id
    });
  }

  addGuildMemberRole(guild_id, member_id, role_id) {
    return this.manager.request('put', Endpoints.Guild(guild_id).Member(member_id).Role(role_id), true);
  }

  removeGuildMemberRole(guild_id, member_id, role_id) {
    return this.manager.request('delete', Endpoints.Guild(guild_id).Member(member_id).Role(role_id), true);
  }

  createGuildRole(guild_id, data) {
    if (data.color) data.color = Util.resolveColor(data.color);
    if (data.permissions) data.permissions = Util.resolvePermission(data.permissions);
    return this.manager.request('post', Endpoints.Guild(guild_id).roles, true, data);
  }

  deleteGuildRole(guild_id, role_id) {
    return this.manager.request('delete', Endpoints.Guild(guild_id).Role(role_id), true);
  }

  editGuildRole(guild_id, role_id, _data) {
    const data = {};
    data.name = _data.name;
    data.position = _data.position;
    data.color = Util.resolveColor(_data.color);
    data.hoist = _data.hoist;
    data.mentionable = _data.mentionable;
    if (_data.permissions) data.permissions = Util.resolvePermission(_data.permissions);
    return this.manager.request('patch', Endpoints.Guild(guild_id).Role(role_id), true, data);
  }

  createGuildChannel(guild_id, channel_name, channel_type, channel_topic, nsfw) {
    return this.manager.request('post', Endpoints.Guild(guild_id).channels, true, {
      name: channel_name,
      type: channel_type ? Constants.ChannelTypes[channel_type.toUpperCase()] : 'text',
      topic: channel_topic,
      nsfw: nsfw,
    });
  }

  deleteGuildChannel(channel_id) {
    return this.manager.request('delete', Endpoints.Channel(channel_id), true);
  }

  editGuildChannel(channel_id, _data) {
    const data = {};
    data.name = _data.name.trim();
    data.topic = _data.topic;
    data.position = _data.position;
    data.bitrate = _data.bitrate
    data.user_limit = _data.userLimit;
    data.parent_id = _data.parentID;
    return this.rest.makeRequest('patch', Endpoints.Channel(channel_id), true, data);
  }

  createGuildEmoji(guild_id, image, name) {
    const data = {
      image,
      name
    };
    return this.manager.request('post', Endpoints.Guild(guild_id).emojis, true, data);
  }

  deleteGuildEmoji(guild_id, emoji_id) {
    return this.manager.request('delete', Endpoints.Guild(guild_id).Emoji(emoji_id), true);
  }

  editGuildEmoji(guild_id, emoji_id, data) {
    return this.manager.request('patch', Endpoints.Guild(guild_id).Emoji(emoji_id), true, data);
  }

  fetchGuildMember(guild_id, member_id) {
    return new Promise((resolve, reject) => {
      this.manager.request('get', Endpoints.Guild(guild_id).Member(member_id), true)
        .then((response) => {
          resolve(JSON.parse(response.text));
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  editGuildMember(guild_id, member_id, data) {
    return this.manager.request('patch', Endpoints.Guild(guild_id).Member(member_id), true, data);
  }

  pinMessage(channel_id, message_id) {
    return this.manager.request('post', Endpoints.Channel(channel_id).Pin(message_id), true)
      .then(() => message);
  }

  unpinMessage(channel_id, message_id) {
    return this.manager.request('delete', Endpoints.Channel(channel_id).Pin(message_id), true)
      .then(() => message);
  }

  /*
  sendMessage(channel_id, content, { embed } = {}) {
    if (content !== undefined) {
      if (typeof content !== 'object' || content === null) {
        content = {
          content: '' + content
        };
      } else if (content.content !== undefined && typeof content.content !== 'string') {
        content.content = '' + content.content;
      } else if (content.content === undefined && !content.embed) {
        return Promise.reject(throw new Error('No content or embed is provided.'));
      }
    }
    return this.manager.request('post', Endpoints.Channel(channel_id).messages, true, { content, embed });
  }
  */
}

module.exports = APIMethods;