/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   window.Advanced ??= {};


   /*
         SETUP ADVANCED MODE
   */

   Advanced.init = () => {

      Settings.on('advanced_mode')((state) => {

         state = (state) ? 'add' : 'remove';

         selectAll('[advanced]')
         .map((element) => element.classList)
         .forEach((list) => list[state]('hasAdvanced'));

         selectAll('[advance]')
         .map((element) => element.classList)
         .forEach((list) => list[state]('show'));

      });

   };


   /*
         TOGGLE ADVANCED MODE
   */

   Advanced.toggle = () =>
      Settings.toggle('advanced_mode');

})();
