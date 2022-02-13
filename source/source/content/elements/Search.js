/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   window.Search ??= {};

   let bar,tags,input,search,timeout;


   /*
         REGEX
   */

   const
      spaces = / +/g,
      underscores = /_+/g;


   /*
         HELPER
   */

   const create = (type) =>
      document.createElement(type);

   const onKey = (element,resolve) =>
      element.addEventListener('keydown',resolve);

   const changeTo = (string) =>
      input.value = refactorInput(string);

   const buildQuery = async () => {

      await pushTag();

      const { children } = tags;

      return new Search.Url({
         rating: SearchRating.current,
         tags: [...tags.children].map(({ dataset , classList }) =>
            new Search.Tag(dataset.id,classList.contains('negative')))
      });
   };

   const refactorInput = (string) => string
      .toWords()
      .capitalize()
      .toSentence();

   const tagFromName = (tagName) => tagName
      .trim()
      .replaceAll(spaces,'_')
      .replaceAll(underscores,'_')
      .toLowerCase();

   const append = (char) => {

      const { dataset } = input;

      delete dataset.tag;
      delete dataset.id;

      clearTimeout(timeout);

      if(Settings.is('search.automatic_suggestions'))
         timeout = Timeout(500,suggestTags);

   }

   const backtrack = () => {

      const { dataset } = input;

      delete dataset.tag;
      delete dataset.id;

      clearTimeout(timeout);

      if(Settings.is('search.automatic_suggestions'))
         timeout = Timeout(500,suggestTags);

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

   const suggestTags = () => {

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
      'Enter': [ true , () => buildQuery().then((url) => url.redirectTo()) ],
      'ControlLeft': [ false , () =>
         Settings.not('search.automatic_suggestions') && suggestTags()],
      'ControlRight': [ false , () =>
         Settings.not('search.automatic_suggestions') && suggestTags()]
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

         e.stop();
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
