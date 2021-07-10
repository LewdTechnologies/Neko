/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   const
      { storage , runtime } = chrome,
      { onConnect } = runtime,
      { local } = storage;

   const recipients = new Set;
   let settings;


   /*
         HELPER
   */

   const others = (port) =>
      [...recipients]
      .filter((p) => p !== port);


   const save = () =>
      local.set({ settings: Object.fromEntries([...settings]) });

   const update = (type,value) => {

      settings.set(type,value);
      save();

   }

   const load = () =>
      new Promise((resolve) =>
         local.get([ 'settings' ],(data) =>
            resolve(data[ 'settings' ])));


   /*
         LOAD SETTINGS
   */

   load().then((data = {}) => {

      data['search.automatic_suggestions'] ??= true;

      settings = new Map(Object.entries(data));

   });


   /*
         LISTEN FOR NEW RECIPIENTS
   */

   onConnect.addListener((port) => {

      recipients.add(port);

      port.postMessage([...settings],() => {});

      port.onDisconnect.addListener(() => {

         recipients.delete(port);

      });

      port.onMessage.addListener(([ type , value ]) => {

         update(type,value);

         others(port).forEach((port) => {
            port.postMessage([ type , value ],() => {});
         });

      });

   });

})();
