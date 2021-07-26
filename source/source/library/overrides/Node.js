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
      Node.prototype[name] = func;

   const get = (name) => (get) =>
      Object.defineProperty(Node,name,{ get });

   const set = (name) => (set) =>
      Object.defineProperty(Node,name,{ set });


   /*
         NODES
   */

   get('nodes')(function(){
      return [ ...this.childNodes ];
   });

})();
