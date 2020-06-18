/*
    [ Discord.fm ]
    By Hayden Brown (htbrown.com)
    Licensed under the MIT License.
 */

const config = require('./config'), 
    DiscordRPC = require('discord-rpc'), 
    LastFmNode = require('lastfm').LastFmNode, 
    Journl = require('journl');

const rpc = new DiscordRPC.Client({ transport: 'ipc' });

const l = new LastFmNode({
    api_key: config.lastfm.key,
    secret: config.lastfm.secret
});
const stream = l.stream(config.lastfm.username);

const log = new Journl();

stream.on('nowPlaying', (track) => {
    rpc.setActivity({
        details: `💿 ${track.name}`,
        state: `👤 ${track.artist['#text']}`,
        largeImageKey: config.icons.logo,
        largeImageText: `🎵 ${track.album['#text']}`,
        smallImageKey: config.icons.user,
        smallImageText: `Discord.fm v${require('./package.json').version}`
    })
    log.info(`Now Playing: ${track.name} - ${track.artist['#text']}`);
});

stream.on('stoppedPlaying', (track) => {
    rpc.clearActivity().then(r => log.info('Stopped.'));
})

stream.on('error', (error) => {
    log.error(error.message);
})

rpc.on('ready', () => {
    log.info('Listening for music.');
    stream.start();
})

rpc.login({ clientId: config.discord.clientId }).catch(log.error);
