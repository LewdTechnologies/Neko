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
      HTMLElement.prototype[name] = func;

   const get = (name) => (get) =>
      Object.defineProperty(HTMLElement.prototype,name,{ get });

   const set = (name) => (set) =>
      Object.defineProperty(HTMLElement.prototype,name,{ set });


   /*
         ITEMS
   */

   set('visible')(function(state){
      this.style.visibility = state ? 'visible' : 'hidden';
   });


   /*
         SHOW
   */

   override('show')(function(){
      this.visible = true;
   });


   /*
         HIDE
   */

   override('hide')(function(){
      this.visible = false;
   });


})();
