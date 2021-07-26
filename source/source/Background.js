/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   const { runtime } = chrome;
   const { onMessage } = runtime;


   const requests = {};


   /*
         HELPER
   */

   const on = (request,processor) =>
      requests[request] = processor;

   const openTab = ({ url , active }) => (resolve) =>
      chrome.tabs.create({ url , active },resolve);


   /*
         LISTEN TO CONTENT SCRIPT
   */

   onMessage.addListener((args,sender,resolve) => {

      const { action } = args;

      if(!action)
         return;


      const tabId = sender?.tab?.id;

      args = { tabId , ...(args.data ?? {}) };

      requests[action]?.(args)(resolve);

      return true;
   });


   /*
         INPUT REQUESTS
   */

   on('extractHtml',(data) =>
      Extractor.process(data));

   on('user.logout',() =>
      User.logout);

   on('tabs.open',openTab);

})();


(() => {

   Version.check();

})();
