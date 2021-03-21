/*
    [ Discord.fm ]
    By Hayden Brown (htbrown.com)
    Licensed under the MIT License.
 */

const defaultIcons = {
  logo: "logo",
  user: "htbrown",
};

const config = require("./config"),
  DiscordRPC = require("discord-rpc"),
  LastFmNode = require("lastfm").LastFmNode,
  Journl = require("journl");

// Create an RPC client
const rpc = new DiscordRPC.Client({ transport: "ipc" });

// Create a LastFM client
const l = new LastFmNode({
  api_key: config.lastfm.key,
  secret: config.lastfm.secret,
});
const stream = l.stream(config.lastfm.username);

// Logger
const log = new Journl();

// LastFM stream events
stream.on("nowPlaying", (track) => {
  rpc.setActivity({
    details: `💿 ${track.name}`,
    state: `👤 ${track.artist["#text"]}`,
    largeImageKey: (config.icons || defaultIcons).logo,
    largeImageText: `🎵 ${track.album["#text"]}`,
    smallImageKey: (config.icons || defaultIcons).user,
    smallImageText: `Discord.fm v${require("./package.json").version}`,
    startTimestamp: Date.now(),
  });
  log.info(`Now Playing: ${track.name} - ${track.artist["#text"]}`);
});

stream.on("stoppedPlaying", () => {
  rpc.clearActivity().then(() => log.info("Stopped."));
});

stream.on("error", (error) => {
  log.error(error.message);
});

// RPC events
rpc.on("ready", () => {
  log.info("Listening for music.");
  stream.start();
});

// RPC login
rpc.login({ clientId: config.discord.clientId }).catch(log.error);
