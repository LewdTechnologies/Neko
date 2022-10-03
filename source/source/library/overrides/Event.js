

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
