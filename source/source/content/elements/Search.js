/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   window.Search ??= {};

   let search , input , tags;


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

   const buildQuery = () => {

      pushTag();

      const query = [...tags.children]
         .map((element) => element.dataset)
         .map((data) => data.id)
         .map(encodeURIComponent)
         .join('+');

      return toSearch(query);
   };

   const capitalize = (string) =>
      (string[0]?.toUpperCase() ?? '') + string.substring(1);

   const refactorInput = (string) => string
      .split(/ +/)
      .map(capitalize)
      .join(' ');

   const tagFromName = (tagName) => tagName
      .trim()
      .replace(/ +/,'_')
      .replace(/_+/,'_')
      .toLowerCase();

   const append = (char) => {
      changeTo(input.value + char);
      delete input.dataset.tag;
      delete input.dataset.id;
   }

   const backtrack = () => {
      changeTo(input.value.slice(0,-1));
      delete input.dataset.tag;
      delete input.dataset.id;
   }

   const pushTag = async () => {

      SearchSuggestion.hide();

      const tag = input.value.trim();

      const tagid = tagFromName(tag);

      const valid = await TagManager.isValid(input.dataset.tag ?? tagid);

      if(!valid)
         return;

      input.value = '';

      if(tag.length < 1)
         return;


      const container = create('tag');

      container.dataset.id = input.dataset.tag ?? tagid;
      container.innerText = TagName.from(input.dataset.tag ?? tagid);

      delete input.dataset.tag;
      delete input.dataset.id;

      tags.appendChild(container);

      search.classList.add('hasTags');

   };

   const clearTags = () => {

      for(const element of search.children)
         element.remove();

      input.value = '';

   };

   const suggest = () => {

      const string = tagFromName(input.value);

      if(string.length < 3)
         return;

      SearchSuggestion.toggle(string);

   };




   /*
         UPDATE SEARCH TAG
   */

   Search.changeTo = changeTo;


   /*
         SETUP SEARCH BAR
   */

   Search.init = () => {

      search = select('search');
      tags = select('search > tags');

      input = create('input');
      input.setAttribute('spellcheck',false);
      search.appendChild(input);

      search.onclick = () =>
         input.focus();

      onKey(window,handleFocus);
      onKey(search,handleInput);

   };


   /*
         HANDLE INPUT
   */

   function handleInput(e){

      const action = actionFromInput(e);

      if(!action)
         return;

      e.stopImmediatePropagation();
      e.preventDefault();
      action();

   };


   /*
         ACTION FROM INPUT
   */

   function actionFromInput({ key , code , shiftKey }){

      switch(code){
      case 'Delete':
         return shiftKey && (() => clearTags());
      case 'Enter':
         return () => redirectTo(buildQuery());
      case 'Tab':
         return () => pushTag();
      case 'Backspace':
         return () => backtrack();
      case 'ControlLeft':
      case 'ControlRight':
         return () => suggest();
      default:
         if(/^[A-z0-9_ -]$/.test(key))
            return () => append(key);
      }

   };


   /*
         HANDLE FOCUS
   */

   function handleFocus(e){

      if(e.code !== 'Tab')
         return;

      e.stopImmediatePropagation();
      e.preventDefault();

      input.focus();

   };

})();
