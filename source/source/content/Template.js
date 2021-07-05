/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   console.time('Page Load');


   /*
         HELPER
   */

   const create = (type) =>
      document.createElement(type);

   const addToBody = (element) =>
      document.body.appendChild(element);

   const insertTemplate = () => {

      Blank = create('div');
      Blank.id = 'blank';
      Blank.innerHTML = Template;

      delete Template;

      addToBody(Blank);

   };


   /*
         WAIT UNTIL HTML IS PRESENT
   */

   document.documentElement.id = 'original';

   Void((check) => {

      if(!document.body)
         return Timeout(check);

      insertTemplate();

   });

})();
