/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   window.RelevantTabs ??= {};


   const { onUpdated } = chrome.tabs;

   const relevant = [
      /*    POSTS PAGE    */
      /^https\:\/\/e621\.net\/posts(\?[\S\s]*)?$/
   ];


   const tabs = new Set;


   /*
         HELPER
   */

   const test = (isKnown,{ url }) =>
      isKnown ^ relevant.some((pattern) => pattern.test(url));

   const act = (isKnown,tabId) =>
      isKnown ? tabs.delete(tabId) : tabs.add(tabId);


   /*
         CHECK FOR RELEVANT TABS
   */

   onUpdated.addListener((tabId,info,tab) => {

      const isKnown = tabs.has(tabId);

      if(test(isKnown,tab))
         act(isKnown,tabId);

   });


   RelevantTabs.includes = (tabId) =>
      tabs.has(tabId);

})();
