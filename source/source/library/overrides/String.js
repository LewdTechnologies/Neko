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
      String.prototype[name] = func;


   /*
         CAPITALIZE
   */

   override('capitalize')(function(type){
      return this[0]?.toUpperCase() + this.substring(1);
   });

})();
