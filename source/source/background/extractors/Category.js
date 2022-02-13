/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   const categories = {
      0: 'general',
      1: 'artist',
      3: 'copyright',
      4: 'character',
      5: 'species',
      6: 'invalid',
      7: 'meta',
      8: 'lore'
   };


   /*
         ID TO CATEGORY
   */

   Extractor.idToCategory = (id = 0) =>
      categories[id] ?? 'unknown';

})();
