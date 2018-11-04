exports.Package = require('../../package.json');

exports.Errors = {
    // Client Errors
    MISSING_PARAM: 'Missing required parameter.',
    EMPTY_TOKEN: 'Request is rejected due to "token was inaccessible to the client."',
    INVALID_TOKEN: 'Invalid token was provided.',
    UNKNOWN_PERMISSION: 'Unknown permission string or number is supplied.',
    INVALID_CLIENT_OPTION: 'Invalid client option.',
    UNKNOWN_RATE_LIMIT_METHOD: 'Unknown rate limit method.',

    // Database Errors
    UNKNOWN_METHOD: 'Unknown method was supplied',
    INVALID_METHOD: 'Invalid method was supplied.',

    /**
     * @param {string} missing
     * @param {string} property
     */
    CUSTOM: (missing, property) => {
        return `${missing} must be a ${property}.`;
    }
};

/**
 * @typedef {Object} ClientOptions Client options.
 * @property {string} [apiRequestMethod='sequential'] API request method.
 * @property {boolean} [userAccount=false] User account.
 * @property {number} [restTimeOffset=500] Rest time offset.
 * @property {HTTPOptions} [http] HTTP options.
 */
exports.DefaultOptions = {
    apiRequestMethod: 'sequential',
    userAccount: false,
    restTimeOffset: 500,

    /**
     * HTTP options.
     * @typedef {Object} HTTPOptions HTTP options.
     * @property {number} [version=7] API version.
     * @property {string} [api='https://discordapp.com/api'] API base URL.
     * @property {string} [cdn='https://cdn.discordapp.com'] CDN base URL.
     * @property {string} [invite='https://discord.gg'] Invite base URL.
     */
    http: {
        version: 7,
        host: 'https://discordapp.com',
        cdn: 'https://cdn.discordapp.com',
    },
};

/**
 * @typedef {Object} DatabaseOptions Database options.
 * @property {boolean} [name='dtdb.json']
 */
exports.DatabaseOptions = {
    name: 'dtdb.json',
};

exports.BuiltInModules = [
    'assert',
    'buffer',
    'child_process',
    'cluster',
    'console',
    'constants',
    'crypto',
    'dgram',
    'dns',
    'domain',
    'events',
    'fs',
    'http',
    'https',
    'module',
    'net',
    'os',
    'path',
    'punycode',
    'querystring',
    'readline',
    'repl',
    'stream',
    'string_decoder',
    'sys',
    'timers',
    'tls',
    'tty',
    'url',
    'util',
    'vm',
    'zlib'
];

exports.ChannelTypes = {
    TEXT: 0,
    DM: 1,
    VOICE: 2,
    GROUP_DM: 3,
    CATEGORY: 4,
};

/**
Activity type.
 * @typedef {string} ActivityType
 */
exports.ActivityTypes = [
    'PLAYING',
    'STREAMING',
    'LISTENING',
    'WATCHING',
];

const Endpoints = exports.Endpoints = {
        guilds: '/guilds',
        Guild: (guildID) => {
            if (guildID.id) guildID = guildID.id;
            const base = `/guilds/${guildID}`;
            return {
                toString: () => base,
                prune: `${base}/prune`,
                embed: `${base}/embed`,
                bans: `${base}/bans`,
                integrations: `${base}/integrations`,
                members: `${base}/members`,
                channels: `${base}/channels`,
                invites: `${base}/invites`,
                roles: `${base}/roles`,
                emojis: `${base}/emojis`,
                search: `${base}/messages/search`,
                voiceRegions: `${base}/regions`,
                webhooks: `${base}/webhooks`,
                ack: `${base}/ack`,
                settings: `${base}/settings`,
                auditLogs: `${base}/audit-logs`,
                Emoji: (emojiID) => `${base}/emojis/${emojiID}`,
                Icon: (root, hash) => Endpoints.CDN(root).Icon(guildID, hash),
                Splash: (root, hash) => Endpoints.CDN(root).Splash(guildID, hash),
                Role: (roleID) => `${base}/roles/${roleID}`,
                Member: (memberID) => {
                    if (memberID.id) memberID = memberID.id;
                    const mbase = `${base}/members/${memberID}`;
                    return {
                        toString: () => mbase,
                        Role: roleID => `${mbase}/roles/${roleID}`,
                        nickname: `${base}/members/@me/nick`,
                    };
                },
            };
        },
        channels: '/channels',
        Channel: (channelID) => {
            if (channelID.id) channelID = channelID.id;
            const base = `/channels/${channelID}`;
            return {
                toString: () => base,
                messages: {
                    toString: () => `${base}/messages`,
                    bulkDelete: `${base}/messages/bulk-delete`,
                },
                invites: `${base}/invites`,
                typing: `${base}/typing`,
                permissions: `${base}/permissions`,
                webhooks: `${base}/webhooks`,
                search: `${base}/messages/search`,
                pins: `${base}/pins`,
                Icon: (root, hash) => Endpoints.CDN(root).GDMIcon(channelID, hash),
                Pin: (messageID) => `${base}/pins/${messageID}`,
                Recipient: (recipientID) => `${base}/recipients/${recipientID}`,
                Message: (messageID) => {
                    if (messageID.id) messageID = messageID.id;
                    const mbase = `${base}/messages/${messageID}`;
                    return {
                        toString: () => mbase,
                        reactions: `${mbase}/reactions`,
                        ack: `${mbase}/ack`,
                        Reaction: (emoji) => {
                            const rbase = `${mbase}/reactions/${emoji}`;
                            return {
                                toString: () => rbase,
                                User: userID => `${rbase}/${userID}`,
                            };
                        },
                    };
                },
            };
        },
        User: (userID) => {
                if (userID.id) userID = userID.id;
                const base = `/users/${userID}`;
                return {
                    toString: () => base,
                    channels: `${base}/channels`,
                    profile: `${base}/profile`,
                    relationships: `${base}/relationships`,
                    settings: `${base}/settings`,
                    Relationship: uID => `${base}/relationships/${uID}`,
                    Guild: guildID => ({
                        toString: () => `${base}/guilds/${guildID}`,
                        settings: `${base}/guilds/${guildID}/settings`,
                    }),
                    Note: id => `${base}/notes/${id}`,
                    Mentions: (limit, roles, everyone, guildID) =>
                        `${base}/mentions?limit=${limit}&roles=${roles}&everyone=${everyone}${guildID ? `&guild_id=${guildID}` : ''}`,
            Avatar: (root, hash) => {
                if (userID === '1') return hash;
                return Endpoints.CDN(root).Avatar(userID, hash);
            },
        };
    },
    CDN(root) {
        return {
            Emoji: (emojiID, format = 'png') => `${root}/emojis/${emojiID}.${format}`,
            Asset: (name) => `${root}/assets/${name}`,
            Avatar: (userID, hash) => `${root}/avatars/${userID}/${hash}.${hash.startsWith('a_') ? 'gif' : 'png?size=2048'}`,
            Icon: (guildID, hash) => `${root}/icons/${guildID}/${hash}.jpg`,
            GDMIcon: (channelID, hash) => `${root}/channel-icons/${channelID}/${hash}.jpg?size=2048`,
            Splash: (guildID, hash) => `${root}/splashes/${guildID}/${hash}.jpg`,
        };
    },
    OAUTH2: {
        Application: (appID) => {
            const base = `/oauth2/applications/${appID}`;
            return {
                toString: () => base,
                resetSecret: `${base}/reset`,
                resetToken: `${base}/bot/reset`,
            };
        },
        App: (clientID) => `/oauth2/authorize?client_id=${clientID}`,
    },
    login: '/auth/login',
    logout: '/auth/logout',
    voiceRegions: '/voice/regions',
    gateway: {
        toString: () => '/gateway',
        bot: '/gateway/bot',
    },

    Invite: (inviteCode) => `/invite/${inviteCode}?with_counts=true`,
    inviteLink: (code) => `https://discord.gg/${code}`,
    Webhook: (webhookID, webhookToken) => `/webhooks/${webhookID}${webhookToken ? `/${webhookToken}` : ''}`,
};

exports.Permissions = {
    CREATE_INSTANT_INVITE: 1 << 0,
    KICK_MEMBERS: 1 << 1,
    BAN_MEMBERS: 1 << 2,
    ADMINISTRATOR: 1 << 3,
    MANAGE_CHANNELS: 1 << 4,
    MANAGE_GUILD: 1 << 5,
    ADD_REACTIONS: 1 << 6,
    VIEW_AUDIT_LOG: 1 << 7,
    VIEW_CHANNEL: 1 << 10,
    READ_MESSAGES: 1 << 10,
    SEND_MESSAGES: 1 << 11,
    SEND_TTS_MESSAGES: 1 << 12,
    MANAGE_MESSAGES: 1 << 13,
    EMBED_LINKS: 1 << 14,
    ATTACH_FILES: 1 << 15,
    READ_MESSAGE_HISTORY: 1 << 16,
    MENTION_EVERYONE: 1 << 17,
    EXTERNAL_EMOJIS: 1 << 18,
    USE_EXTERNAL_EMOJIS: 1 << 18,
    CONNECT: 1 << 20,
    SPEAK: 1 << 21,
    MUTE_MEMBERS: 1 << 22,
    DEAFEN_MEMBERS: 1 << 23,
    MOVE_MEMBERS: 1 << 24,
    USE_VAD: 1 << 25,
    CHANGE_NICKNAME: 1 << 26,
    MANAGE_NICKNAMES: 1 << 27,
    MANAGE_ROLES: 1 << 28,
    MANAGE_ROLES_OR_PERMISSIONS: 1 << 28,
    MANAGE_WEBHOOKS: 1 << 29,
    MANAGE_EMOJIS: 1 << 30,
};

exports.Colors = {
    DEFAULT: 0x000000,
    AQUA: 0x1ABC9C,
    GREEN: 0x2ECC71,
    BLUE: 0x3498DB,
    PURPLE: 0x9B59B6,
    GOLD: 0xF1C40F,
    ORANGE: 0xE67E22,
    RED: 0xE74C3C,
    GREY: 0x95A5A6,
    NAVY: 0x34495E,
    DARK_AQUA: 0x11806A,
    DARK_GREEN: 0x1F8B4C,
    DARK_BLUE: 0x206694,
    DARK_PURPLE: 0x71368A,
    DARK_GOLD: 0xC27C0E,
    DARK_ORANGE: 0xA84300,
    DARK_RED: 0x992D22,
    DARK_GREY: 0x979C9F,
    DARKER_GREY: 0x7F8C8D,
    LIGHT_GREY: 0xBCC0C0,
    DARK_NAVY: 0x2C3E50,
    BLURPLE: 0x7289DA,
    GREYPLE: 0x99AAB5,
    DARK_BUT_NOT_BLACK: 0x2C2F33,
    NOT_QUITE_BLACK: 0x23272A,
};