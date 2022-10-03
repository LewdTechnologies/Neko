

(() => {

   window.TagManager ??= {};

   const
      searches = new Map,
      valid = new Set,
      tags = new Map;


   /*
         HELPER
   */

   const endpoint = () =>
      `${ Page.url }tags/autocomplete.json`;

   const requestTags = async (term) => {

      const response = await fetch(`${ endpoint() }?search[name_matches]=${ term }&expiry=7`);

      const json = await response.json();

      for(const data of json){
         tags.set(data.id,data);
         valid.add(data.name);
      }

      const ids = json.map(({ id }) => id);

      searches.set(term,ids);

   };

   const tagsFrom = (term) => {

      const ids = searches.get(term);

      const tagData = [];

      for(const [ id , data ] of tags.entries())
         if(ids.includes(id))
            tagData.push(data);

      return tagData;

   };


   /*
         SUGGEST TAGS
   */

   TagManager.search = async (term) => {

      if(!searches.has(term))
         await requestTags(term);

      return tagsFrom(term);

   };


   /*
         DOES TAG EXIST
   */

   TagManager.isValid = async (tag) => {

      if(!valid.has(tag) && tag.length > 2){
         await TagManager.search(tag);
      }

      return valid.has(tag);

   }

})();
