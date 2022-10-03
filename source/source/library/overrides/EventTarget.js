
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
