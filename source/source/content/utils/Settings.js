/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   window.Settings ??= {};

   const { connect } = chrome.runtime;

   const listeners = new Map;
   let settings;


   const port = connect({ name: 'settings' });

   let listener = (data = []) => {
      settings = new Map(data);

      listener = ([ type , value ]) =>
         update(type,value);
   };

   port.onMessage.addListener((...args) => listener(...args));


   /*
         HELPER
   */

   const update = (type,value) =>
      settings.set(type,value);

   const transmit = (type,value) =>
      port.postMessage([ type , value ]);


   /*
         SETTING STATE
   */

   Settings.is = (type) =>
      settings.get(type);

   Settings.not = (type) =>
      ! settings.get(type);


   /*
         SETTING UPDATE
   */

   Settings.set = (...args) => {

      update(...args);
      transmit(...args);

   };


   /*
         TOGGLE SETTING
   */

   Settings.toggle = (type) =>
      Settings.set(type,Settings.not(type));


   /*
         SETTING CHANGE
   */

   Settings.on = (type) => (resolve) => {

      if(!listeners.has(type))
         listeners.set(type,new Set);

      listeners
      .get(type)
      .add(resolve);

   };

})();
