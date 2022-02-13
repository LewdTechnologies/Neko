/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {


   /*
         HELPER
   */

   const override = (name) => (func) =>
      Event.prototype[name] = func;


   /*
         PREVENT DEFAULT & STOP IMMEDIATELY
   */

   override('stop')(function(){
      this.preventDefault();
      this.stopImmediatePropagation();
   });

})();
