
(() => {


   /*
         HELPER
   */

   const override = (name) => (func) =>
      Node.prototype[name] = func;

   const get = (name) => (get) =>
      Object.defineProperty(Node.prototype,name,{ get });

   const set = (name) => (set) =>
      Object.defineProperty(Node.prototype,name,{ set });


   /*
         NODES
   */

   get('nodes')(function(){
      return [ ...this.childNodes ];
   });


   /*
         CLEAR NODES
   */

   override('clearNodes')(function(){
      while(this.lastChild)
         this.removeChild(this.lastChild);
   });

})();
