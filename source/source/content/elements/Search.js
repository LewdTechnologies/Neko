/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   window.Search ??= {};

   let bar, tags, input, search, timeout;


   /*
         HELPER
   */

   const create = (type) =>
      document.createElement(type);

   const redirectTo = (url) =>
      window.location.href = url;

   const toSearch = (query) =>
      `https://e621.net/posts?tags=${ query }`;

   const onKey = (element,resolve) =>
      element.addEventListener('keydown',resolve);

   const changeTo = (string) =>
      input.value = refactorInput(string);

   const buildQuery = async () => {

      await pushTag();

      const query = [...tags.children]
         .map(({ dataset , classList }) => ({
            id: dataset.id,
            negative: classList.contains('negative')
         }))
         .map(({ id , negative }) => {

            negative = (negative) ? '-' : '';

            return negative + id;

         });

      const { current } = SearchRating;

      if(current)
         query.push(`rating:${ current }`);

      const encoded = query
         .map(encodeURIComponent)
         .join('+');

      return toSearch(encoded);
   };

   const refactorInput = (string) => string
      .split(/ +/)
      .map((string) => string.capitalize())
      .join(' ');

   const tagFromName = (tagName) => tagName
      .trim()
      .replaceAll(/ +/g,'_')
      .replaceAll(/_+/g,'_')
      .toLowerCase();

   const append = (char) => {

      delete input.dataset.tag;
      delete input.dataset.id;

      clearTimeout(timeout);

      if(Settings.is('search.automatic_suggestions')){

         timeout = setTimeout(() => {
            suggest();
         },500);
      }

   }

   const backtrack = () => {

      delete input.dataset.tag;
      delete input.dataset.id;

      clearTimeout(timeout);

      if(Settings.is('search.automatic_suggestions')){

         timeout = setTimeout(() => {
            suggest();
         },500);
      }

   }


   /*
         CREATE TAG LIST ITEM
   */

   const createTag = (id,name,negative) => {

      const container = create('tag');

      container.dataset.id = id;
      container.innerText = name;

      if(negative)
         container.classList.add('negative');

      container.addEventListener('click',(event) => {

         event.stop();

         switch(SearchTagMode.mode()){
         case 'negative':

            const { classList } = container;

            classList.toggle('negative');

            break;
         default:

            container.remove();

            if(!tags.children.length)
               search.classList.remove('hasTags');

         }

      });

      tags.appendChild(container);
      search.classList.add('hasTags');

   };


   /*
         PUSH TAG ONTO TAG LIST
   */

   const pushTag = async () => {

      SearchSuggestion.hide();

      const tag = input.value.trim();

      const tagid = tagFromName(tag);
      const { dataset } = input;

      const valid = await TagManager.isValid(dataset.tag ?? tagid);

      if(!valid)
         return;

      input.value = '';

      if(tag.length < 1)
         return;


      const
         id = dataset.tag ?? tagid,
         name = TagName.from(dataset.tag ?? tagid);

      createTag(id,name);

      delete dataset.tag;
      delete dataset.id;

   };


   /*
         REMOVE ALL TAGS
   */

   const clearTags = () => {

      search.clearNodes();

      input.value = '';
      search.removeClass('hasTags');

   };


   /*
         SUGGEST TAGS FOR INPUT
   */

   const suggest = () => {

      const string = tagFromName(input.value);

      if(string.length < 3)
         return;

      SearchSuggestion.show(string);

   };


   const keys = {
      'Escape': [ true , () => SearchSuggestion.hide() ],
      'Backspace': [ false , backtrack ],
      'Tab': [ true , pushTag ],
      'Delete': [ false , ({ shiftKey }) =>
         shiftKey && clearTags()],
      'Enter': [ true , () =>
         buildQuery()
         .then(redirectTo)],
      'ControlLeft': [ false , () =>
         Settings.not('search.automatic_suggestions') && suggest()],
      'ControlRight': [ false , () =>
         Settings.not('search.automatic_suggestions') && suggest()]
   };


   /*
         UPDATE SEARCH TAG
   */

   Search.changeTo = changeTo;

   Search.focus = () => {

      input.show();
      input.focus();

   }

   Search.hide = () => {

      SearchSuggestion.hide();
      input.hide();

   };


   /*
         SETUP SEARCH BAR
   */

   Search.init = () => {

      search = select('search');
      bar = select('search > primary > bar');
      tags = select('search > primary > bar > tags');
      input = select('search > primary > bar > input');

      bar.addEventListener('mousedown',(event) => {

         if(event.button === 2)
            SearchTagMode.open(event);
         else
            input.focus()

      });

      bar.onclick = () =>
         input.focus();

      onKey(window,handleFocus);
      onKey(bar,handleInput);

      const settingsbutton = select('search > primary > settings > img');
      settingsbutton.addEventListener('click',(e) => {

         e.preventDefault();
         e.stopImmediatePropagation();

         SearchOptions.toggle();

      });

      Page.tags.forEach(([ tag , negative ]) => {

         createTag(tag,TagName.from(tag),negative);

      });
   };


   /*
         HANDLE INPUT
   */

   function handleInput(event){

      const { key , code , shiftKey } = event;

      if(code in keys){

         const [ cancel , action ] = keys[code];

         if(cancel)
            event.stop();

         action(event);

         return;

      }

      if(/^[A-z0-9_ -]$/.test(key)){

         append(key);
         setTimeout(() => {
            input.value = refactorInput(input.value);
         },10);

      }
   };


   /*
         HANDLE FOCUS
   */

   function handleFocus(e){

      if(!['Tab','F1'].includes(e.code))
         return;

      e.stopImmediatePropagation();
      e.preventDefault();

      switch(e.code){
      case 'Tab':
         input.focus();
         return;
      case 'F1':
         Advanced.toggle();
         return;
      }

   };

})();
