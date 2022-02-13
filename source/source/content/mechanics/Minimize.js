/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   window.Minimize ??= {};


   /*
         SETUP MINIMIZE MODE
   */

   Minimize.init = () => {

      Settings.on('minimized_mode')((state) => {

         state = (state) ? 'add' : 'remove';

         document.body.classList[state]('minimize');

      });

   };


   /*
         TOGGLE MINIMIZE MODE
   */

   Minimize.toggle = () =>
      Settings.toggle('minimized_mode');

})();
