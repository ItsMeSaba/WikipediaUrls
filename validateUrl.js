function isUrlValidWikipediaPage(url) {
    if(!url) return false;

    if(!url.includes('/wiki/')) return false;

    if(url.includes('File:')) return false;

    if(url.includes('https://')) return false;
    
    if(url.includes('Wikipedia:')) return false;

    if(url[0] === '#') return false;

    return true;
}


module.exports = isUrlValidWikipediaPage;