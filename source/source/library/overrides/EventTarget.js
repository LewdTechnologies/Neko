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
      EventTarget.prototype[name] = func;


   /*
         PREVENT DEFAULT ACTION
   */

   override('preventDefaultAction')(function(type){
      this.addEventListener(type,(event) => {
         event.preventDefault();
         event.stopImmediatePropagation();
      });
   });

})();
