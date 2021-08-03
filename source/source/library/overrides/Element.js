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
      Element.prototype[name] = func;

   const get = (name) => (get) =>
      Object.defineProperty(Element.prototype,name,{ get });

   const set = (name) => (set) =>
      Object.defineProperty(Element.prototype,name,{ set });


   /*
         ITEMS
   */

   get('items')(function(){
      return [ ...this.children ];
   });


   /*
         ADD CLASS
   */

   override('addClass')(function(Class){
      this.classList.add(Class);
   });


   /*
         REMOVE CLASS
   */

   override('removeClass')(function(Class){
      this.classList.remove(Class);
   });


})();
