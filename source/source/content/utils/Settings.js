/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   window.Settings ??= {};

   const { connect } = chrome.runtime;

   const
      settings = new Map,
      listeners = new Map;


   const port = connect({ name: 'settings' });


   /*
         HELPER
   */

   const update = (type,value) => {

      settings.set(type,value);

      listeners
      .get(type)
      ?.forEach((listener) => listener(value));

   };

   const transmit = (type,value) =>
      port.postMessage([ type , value ]);


   /*
         LISTENER
   */

   let listener = (data = []) => {

      data.forEach(([ type , value ]) =>
         update(type,value));

      listener = ([ type , value ]) =>
         update(type,value);
   };

   port.onMessage.addListener((...args) => listener(...args));


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

      if(settings.has(type))
         resolve(settings.get(type));

   };

})();
