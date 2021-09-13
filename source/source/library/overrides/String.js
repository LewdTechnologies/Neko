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
      return this
         .charAt(0)
         .toUpperCase()
      + this.substring(1);
   });


   /*
         TO WORDS
   */

   override('toWords')(function(){
      return this
      .split(/ +/);
   });


   /*
         USES START
   */

   override('usesStart')(function(sequence){
      return (this.startsWith(sequence))
      ? [ this.slice(sequence.length) , true ]
      : [ this , false ];
   });


   /*
         REMOVE
   */

   override('remove')(function(regex){
      return this.replaceAll(regex,'');
   });

})();
