const request = require('request');
const cheerio = require('cheerio');

const isUrlValidWikipediaPage = require('./validateUrl')
const Links = require('./models/links');


let count = 0;
let alreadyVisited = {};


function loopLinks(url, depth, prevHeader = false) {
    request(url, (error, response, html) => {
        if(error) return console.error(error)

        $ = cheerio.load(html);

        const header = $('#firstHeading').text();
        
        
        if(alreadyVisited[header] || depth < 0 || count > 1000) {
            return; 
        }
        
        if(prevHeader) {
            Links.findOne({ header, prevHeader }, function (err, doc) {
                if (err) return console.log(err)

                if(doc) return; // Do not upload duplicate documents
                
                uploadUrl(url, header, prevHeader);
            });  
        }

        alreadyVisited[header] = true;
        
        const p = $('p a');
        
        for(let i = 0; i < p.length; i++) {
            let foundUrl = $(p[i]).attr('href');
            
            if(!isUrlValidWikipediaPage(foundUrl)) {
                continue;
            };
        
            count++;
            loopLinks('https://en.wikipedia.org/' + foundUrl, depth-1, header)
        }
    })
}


function uploadUrl(url, header, prevHeader) {
    Links.create({
        link : url,
        header,
        prevHeader
    }, (err, data) => {
        if(err) return console.log(err);

        console.log('uploaded')
    })
}

module.exports = loopLinks;