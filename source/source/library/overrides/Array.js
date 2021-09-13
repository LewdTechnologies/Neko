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
      Array.prototype[name] = func;


   /*
         CAPITALIZE
   */

   override('capitalize')(function(){
      return this
      .map((string) => string.capitalize());
   });


   /*
         TO SENTENCE
   */

   override('toSentence')(function(){
      return this.join(' ');
   });


   /*
         TO QUERY
   */

   override('toQuery')(function(){
      return this
      .join('+');
   });


   /*
         TO ENCODED URI COMPONENTS
   */

   override('toEncodedURIComponents',function(){
      return this
      .map(toEncodedURIComponent);
   });

})();
