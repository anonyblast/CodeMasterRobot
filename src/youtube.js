const YouTube = require('youtube-node');

const config = require('./yt-config.json')

const youTube = new YouTube();

youTube.setKey(config.key);

function searchVideoURL(message, queryText) {
    return new Promise((resolve, reject) => {
        youTube.search(`Curso de ${queryText}`, 3, function (error, result) {
            if(!error) {
                const videoIds = result.items.map((item) => item.id.videoId).filter(item => item);
                console.log(videoIds)
                const youtubeLinks = videoIds.map(videoId => `https://www.youtube.com/watch?v=${videoId}`);
                console.log(youtubeLinks)
                resolve(`${message} \n ${youtubeLinks.join('\n')}`);
            } else {
                reject(error);
            }
        });
    })
};

module.exports.searchVideoURL = searchVideoURL;
