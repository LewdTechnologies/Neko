
(() => {

   window.SearchRating ??= {};


   let list , rating , default_rating;


   /*
         HELPER
   */

   const update = (mode) => {

      list.classList.remove(rating);
      rating = mode;

      if(rating)
         list.classList.add(rating);

   };

   const updateDefault = (mode) => {

      list.classList.remove(`default_${ default_rating }`);
      default_rating = mode;

      if(default_rating)
         list.classList.add(`default_${ default_rating }`);

   };

   let updateDefaultInitial = (mode) => {

      update(Page.rating ?? mode);

      (updateDefaultInitial = updateDefault)(mode);

   };


   SearchRating.init = () => {

      list = select('search > presets > rating');

      list.items.forEach((element) => {

         element.preventDefaultAction('contextmenu');

         element.addEventListener('mousedown',(event) => {

            event.preventDefault();
            event.stopImmediatePropagation();

            const { button , target } = event;

            let mode = target.localName;

            switch(button){
            case 0:

               if(mode === rating)
                  mode = null;

               update(mode);

               break;
            case 2:

               if(mode === default_rating)
                  mode = null;

               if(mode)
                  update(mode);

               Settings.set('search.rating',mode);

               break;
            }
         });
      });


      Settings.on('search.rating')((mode) => updateDefaultInitial(mode));

   };

   Object.defineProperty(SearchRating,'current',{
      get: () => rating
   });

   Object.defineProperty(SearchRating,'default',{
      get: () => default_rating
   });

})();
