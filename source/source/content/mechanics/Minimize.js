
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
