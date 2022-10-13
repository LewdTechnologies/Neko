
(() => {

    window.Version ??= {};


    let outdated = false;

    const version_url = 'https://raw.githubusercontent.com/LewdTechnologies/Neko/Version/Version.txt';
    
    const version = Manifest
        .version()
        .split('.')
        .map((string) => Number(string));
    
    const isOutdated = (latest) =>
        latest.some((number,index) => number > version[index]);
        


    const failedToRequest = () =>
        warn(`Failed to request version info.`);

    const extractInfo = async (response) => {
    
        const string = await response.text();
        
        const parts = string
            .trim()
            .split('.')
            .map(Number);
        
        const [ major = 0 , minor = 0 , build = 0 ] = parts;
        
        if(isOutdated([ major , minor , build ]))
            promptUpdate();
        else
            logUpToDate();
    }

    const promptUpdate = () =>
        warn(`Please update!`);

    const logUpToDate = () =>
        log(`Neko is up to date [ ${ Version.string() } ] ${ Math.random() }`);


    Version.check = () =>
        fetch(version_url)
        .catch(failedToRequest)
        .then(extractInfo);

    Version.isOutdated = () =>
        outdated;

    Version.major = () =>
        version[0];

    Version.minor = () =>
        version[1];

    Version.build = () =>
        version[2];

    Version.string = () =>
        version.join('.');

})();
