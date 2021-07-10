/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   window.SearchSuggestion ??= {};

   let posts , input , search , container;

   let open = false;
   let last = '';


   /*
         SET UP SUGGESTIONS
   */

   SearchSuggestion.init = () => {

      container = select('suggestions');
      search = select('search');
      posts = select('posts');
      input = select('search > input');

   };


   /*
         OPEN SUGGESTIONS
   */

   SearchSuggestion.show = (string) => {

      if(open && last === string)
         return SearchSuggestion.hide();

      open = true;
      last = string;

      TagManager
      .search(string)
      .then((suggestions) => {

         while(container.children.length > 0)
            container.children[0].remove();

         for(const { id , name } of suggestions){

            const element = document.createElement('tag');
            element.innerText = TagName.from(name);
            container.appendChild(element);

            element.onclick = () => {

               SearchSuggestion.hide();
               input.dataset.id = id;
               input.dataset.tag = name;
               Search.changeTo(TagName.from(name));

            };

         };

         posts.classList.add('unfocused');
         search.classList.add('hasSuggestions');
         container.style.visibility = 'visible';
         
      });

   };


   /*
         CLOSE SUGGESTIONS
   */

   SearchSuggestion.hide = () => {

      search.classList.remove('hasSuggestions');
      posts.classList.remove('unfocused');
      container.style.visibility = 'hidden';

      Search.focus();

      open = false;

   };

})();
