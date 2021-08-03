/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   window.Page ??= {};


   const { search } = window.location;

   const parameter = new URLSearchParams(search);

   Page.rating = null;

   Page.page = Number(parameter.get('page') ?? 0);

   Page.tags = (parameter.get('tags') ?? '')
      .toLowerCase()
      .split(' ')
      .map((tag) => {
         return (tag.startsWith('-'))
         ? [ tag.substring(1) , true ]
         : [ tag , false ];
      })
      .filter(([ tag ]) => {
         switch(tag){
         case '':
            return false;
         case 'rating:safe':
         case 'rating:explicit':
         case 'rating:questionable':
            Page.rating = tag.substring(7);
            return false;
         default:
            return true;
         }
      });

})();
