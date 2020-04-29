# Discord.fm
Discord rich presence for Last.fm.

## Setup
Discord.fm is relatively easy to set up. Follow the steps below.

1. If you haven't already, [create a Last.fm account](https://last.fm).
    * Configure your music streaming service to send data to Last.fm, more information is available [here](https://www.last.fm/about/trackmymusic)
2. [Aquire a key and secret from Last.fm](https://last.fm/api). You only need to fill in the name and description. I recommend saving these keys in a file somewhere - you will not be able to get them back if you lose them.
3. [Create a Discord application](https://discordapp.com/developers) and enable rich presence.
4. (optional) Add two images to the resources section on the rich presence page. These can be configured later in the configuration file.
5. Clone the git repository.
6. Create a file in the root of the repository called `config.js`. Add the contents shown below this setup section.
7. Open a terminal window in the root of the repository on your computer.
8. Run `node .`.

***You can use [PM2](https://npmjs.com/pm2) to keep the program running in the background.***

### config.js
```js
module.exports = {
    lastfm: {
        key: 'LASTFM_KEY',
        secret: 'LASTFM_SECRET',
        username: 'LASTFM_USERNAME'
    },
    discord: {
        clientId: 'DISCORD_CLIENT_ID'
    },
    icons: {
        // Replace with the names of the images you added on the Discord dashboard (logo is largeImage, user is smallImage).
        logo: '',
        user: ''
    }
}
```
