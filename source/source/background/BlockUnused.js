/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   const { onBeforeRequest } = chrome.webRequest;

   const unused = [
      /*    JQUERY    */
      /^https:\/\/e621\.net\/vendor\/jquery-3\.5\.0\.min\.js$/,
      /*    FONTAWESOME CSS   */
      /^https:\/\/e621\.net\/vendor\/fontawesome\/css\/all\.min\.css$/,
      /*    APP JS    */
      /^https:\/\/e621\.net\/packs\/js\/application-[a-z0-9]+.js$/,
      /*    APP CSS    */
      /^https:\/\/e621\.net\/packs\/css\/application-[a-z0-9]+.css$/,
      /*    ADVERTISEMENT   */
      /^https:\/\/ads\.dragonfru\.it\/[\s\S]*$/,
      /^https:\/\/mc\.yandex\.ru\/[\s\S]*$/
   ];


   /*
         LISTEN FOR UNUSED REQUESTS
   */

   onBeforeRequest.addListener((request) => {

      const { url } = request;

      if(!RelevantTabs.includes(request.tabId))
         return;

      const cancel = unused.some((pattern) => pattern.test(url));

      return { cancel };

   },{ urls: [ '<all_urls>' ] },[ 'blocking' ]);

})();
