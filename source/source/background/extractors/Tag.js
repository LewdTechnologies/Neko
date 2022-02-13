/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {


   /*
         EXTRACT TAGS
   */

   Extractor.tagExtractor = (element) => (resolve) => {

      try {

         const [ search , countElement ] = [...element.children]
            .slice(-2);

         const categoryId = element.className
            .match(/category-(\d)/)
            ?.[1];

         if(!categoryId)
            return warn(`Missing category Id`,element);

         const category = Extractor.idToCategory(Number(categoryId));


         const count = Number(countElement.dataset?.count);

         const id = decodeURIComponent(search.href
            .match(/=([\s\S]+)$/)
            ?.[1]);

         const name = TagName.from(id);

         resolve({ id , name , count , category });

      } catch (e) {
         console.log(e);
      }

   };

})();
