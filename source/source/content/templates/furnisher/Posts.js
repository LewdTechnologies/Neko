/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   FurnishTemplate = (info) => {

      const
         { floor } = Math,
         { tags , posts } = info;


      /*
            HELPER
      */

      const preventEvent = (e) =>
         e.preventDefault();

      const create = (type) =>
         document.createElement(type);

      const redirectTo = (url) =>
         window.location.href = url;

      const toPostUrl = (postId) =>
         `${ Page.url }/posts/${ postId }`;

      const toSearch = (query) =>
         `${ Page.url }/posts?tags=${ query }`;

      const gotoPost = (postId) =>
         redirectTo(toPostUrl(postId));

      const openPost = (postId) =>
         chrome.runtime.sendMessage({
            action: 'tabs.open',
            data: {
               url: toPostUrl(postId),
               active: false
            }
         },() => {});

      const tagToDisplay = (tagName) => {

         const parts = [];
         let combined = '';

         tagName
         .split(' ')
         .forEach((part) => {

            if((combined.length + part.length) > 12){
               parts.push(combined);
               combined = '';
            }

            combined += ' ' + part;

         });

         parts.push(combined);

         return parts
            .map((string) => string.trim());

      };



      /*
            FURNISH TAGS
      */

      (() => {

         const tagList = select('taglist');

         const
            { length } = tags,
            { children } = tagList;


         /*
               HELPER
         */

         const newContainer = () => {

            const
               container = create('tag'),
               count = create('count'),
               name = create('name');

            container.appendChild(name);
            container.appendChild(count);

            tagList.appendChild(container);

            return container;

         };


         if(children.length > length)
            [...children]
            .slice(length)
            .forEach((element) => element.remove());


         tags.forEach((tag,index) => {

            const tagContainer = children[index] ?? newContainer();
            const [ name , count ] = tagContainer.children;

            count.innerText = Readify.postCount(tag.count);
            name.innerHTML = '';

            const parts = tagToDisplay(tag.name);

            parts.forEach((part) => {

               if(part.length > 12)
                  part = part.substring(0,10) + '...';

               const bit = create('span');
               bit.innerText = part;
               name.appendChild(bit);

            });


            const link = create('a');
            link.href = toSearch(tag.id);
            tagContainer.appendChild(link);

            tagContainer.classList.remove('dummy');
            tagContainer.dataset.category = tag.category;

         });

      })();


      /*
            FURNISH POSTS
      */

      (() => {

         const postList = select('posts');
         const
            { length } = posts,
            { children } = postList;


         if(children.length > length)
            [...children]
            .slice(length)
            .forEach((element) => element.remove());

         posts
         .filter((_,index) => index in children)
         .forEach((post,index) => {

            const element = children[index];

            element.dataset.id = post.id;
            element.dataset.source = post.urls.file;


            const [ image ] = element.children;

            const { classList } = image;

            image.src = post.urls.preview;

            image.preventDefaultAction('contextmenu');

            image.addEventListener('mousedown',(event) => {

               if(Download.isActive())
                  return;

               event.stop();

            });

            image.addEventListener('mouseup',(event) => {

               if(Download.isActive())
                  return;

               event.stop();

               ((event.button === 0)
               ? gotoPost
               : openPost)(post.id);

             });

            image.onload = () =>
               classList.remove('dummy');

         });

      })();


      /*
            FURNISH LOG-IO
      */

      (() => {

         const { isAnon } = info.user;

         const button = findClass('logIO');

         const [ txt , color , action ] = isAnon
         ? [ 'Login' , 'red' , () => redirectTo(`/session/new`) ]
         : [ 'Logout' , 'var(--font-gray)' , () => User.logout() ];

         button.innerText = txt;
         button.onclick = action;
         button.style.color = color;

      })();


      window.addEventListener('contextmenu',(event) => {
         if(event.target.localName === 'a')
            return;

         event.stop();
      });


      const mechanics = Page.isNSFW ? [
         Search , SearchSuggestion , SearchOptions , SearchRating , SearchPresets ,
         SearchTagMode , Advanced , Minimize , Pagination , Download
      ] : [
         Search , SearchSuggestion , SearchOptions , SearchPresets ,
         SearchTagMode , Advanced , Minimize , Pagination , Download
      ];

      for(const Mechanic of mechanics)
         Mechanic.init();


      window.scrollTo(0,0);

      select('posts').addEventListener('scroll',(event) =>
         select('left')
         .scrollTo(0,event.target.scrollTop));

      window.addEventListener('keydown',(event) => {
         switch(event.code){
         case 'F2':
            event.stop();
            Minimize.toggle();
            return;
         case 'F4':
            event.stop();
            Download.toggle();
            return;
         }
      });
   };

})();
