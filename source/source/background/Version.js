
(() => {

   window.Version ??= {};


   let outdated = false;

   const version_url = 'https://raw.githubusercontent.com/LewdTechnologies/Neko/Version/Version.txt';
   const version = Manifest
      .version()
      .split('.')
      .map((string) => Number(string));


   const failedToRequest = () =>
      warn(`Failed to request version info.`);

   const extractInfo = (response) => response
      .text()
      .then((content) => content.trim())
      .then((string) => string.split('.'))
      .then((strings) => strings.map(Number))
      .then(([ major = 0 , minor = 0 , build = 0 ]) => [ major , minor , build ])
      .then((numbers) => numbers.some((number,index) => number > version[index]))
      .then((state) => {
         if(outdated = state)
            promptUpdate();
         else
            logUpToDate();
      });

   const promptUpdate = () =>
      warn(`Please update!`);

   const logUpToDate = () =>
      log(`Neko is up to date [ ${ Version.string() } ] ${ Math.random() }`);



   Version.check = () => {
      fetch(version_url)
      .catch(failedToRequest)
      .then(extractInfo);
   };

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
