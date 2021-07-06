/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {


   /*
         FURNISH TEMPLATE
   */

   FurnishTemplate = (info) => {

      const
         { tags , posts } = info,
         { floor } = Math;


      /*
            HELPER
      */

      const create = (type) =>
         document.createElement(type);

      const readify = (count) =>
         count < 1000 ? count : count < 1000000 ? `${ floor(count / 1000) }k` : `${ floor(count / 100000) / 10 }M`;

      const redirectTo = (url) =>
         window.location.href = url;

      const gotoPost = (postId) =>
         redirectTo(`https://e621.net/posts/${ post.id }`);

      const toSearch = (tag) =>
         `https://e621.net/posts?tags=${ tag }`;

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

            link.appendChild(name);
            link.appendChild(count);

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

            count.innerText = readify(tag.count);
            name.innerHTML = '';

            const parts = tagToDisplay(tag.name);

            parts.forEach((part) => {

               const bit = create('span');
               bit.innerText = part;
               name.appendChild(bit);

            });


            const link = create('a');
            link.href = toSearch(tag.id);
            tagContainer.appendChild(link);

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

            const
               element = children[index],
               [ image ] = element.children;

            const { classList } = image;

            image.src = post.urls.preview;

            image.onclick = () =>
               gotoPost(post.id);

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
   };


   Template = `
            <navigation>
               <div class='logIO'></div>
               <a href='/'>E621</a>
               <a href='/posts'>Posts</a>
               <a href='/comments?group_by=post'>Comments</a>
               <a href='/artists'>Artists</a>
               <a href='/tags'>Tags</a>
               <a href='/blips'>Blips</a>
               <a href='/pools/gallery'>Pools</a>
               <a href='/post_sets'>Sets</a>
               <a href='/wiki_pages?title=help%3Ahome'>Wiki</a>
               <a href='/forum_topics'>Forum</a>
               <a href='/help'>Help</a>
               <a href='/static/site_map'>...</a>
            </navigation>
            <main>
               <left>
                  <taglist>
                     <tag>
                        <name>IIIIIIIIIII</name>
                        <count>100</count>
                     </tag>
                     <tag>
                        <name>IIIIIIIIIII</name>
                        <count>100</count>
                     </tag>
                     <tag>
                        <name>IIIIIIIIIII</name>
                        <count>100</count>
                     </tag>
                     <tag>
                        <name>IIIIIIIIIII</name>
                        <count>100</count>
                     </tag>
                     <tag>
                        <name>IIIIIIIIIII</name>
                        <count>100</count>
                     </tag>
                     <tag>
                        <name>IIIIIIIIIII</name>
                        <count>100</count>
                     </tag>
                     <tag>
                        <name>IIIIIIIIIII</name>
                        <count>100</count>
                     </tag>
                     <tag>
                        <name>IIIIIIIIIII</name>
                        <count>100</count>
                     </tag>
                     <tag>
                        <name>IIIIIIIIIII</name>
                        <count>100</count>
                     </tag>
                     <tag>
                        <name>IIIIIIIIIII</name>
                        <count>100</count>
                     </tag>
                     <tag>
                        <name>IIIIIIIIIII</name>
                        <count>100</count>
                     </tag>
                     <tag>
                        <name>IIIIIIIIIII</name>
                        <count>100</count>
                     </tag>
                     <tag>
                        <name>IIIIIIIIIII</name>
                        <count>100</count>
                     </tag>
                     <tag>
                        <name>IIIIIIIIIII</name>
                        <count>100</count>
                     </tag>
                     <tag>
                        <name>IIIIIIIIIII</name>
                        <count>100</count>
                     </tag>
                     <tag>
                        <name>IIIIIIIIIII</name>
                        <count>100</count>
                     </tag>
                     <tag>
                        <name>IIIIIIIIIII</name>
                        <count>100</count>
                     </tag>
                     <tag>
                        <name>IIIIIIIIIII</name>
                        <count>100</count>
                     </tag>
                     <tag>
                        <name>IIIIIIIIIII</name>
                        <count>100</count>
                     </tag>
                     <tag>
                        <name>IIIIIIIIIII</name>
                        <count>100</count>
                     </tag>
                     <tag>
                        <name>IIIIIIIIIII</name>
                        <count>100</count>
                     </tag>
                     <tag>
                        <name>IIIIIIIIIII</name>
                        <count>100</count>
                     </tag>
                     <tag>
                        <name>IIIIIIIIIII</name>
                        <count>100</count>
                     </tag>
                     <tag>
                        <name>IIIIIIIIIII</name>
                        <count>100</count>
                     </tag>
                     <tag>
                        <name>IIIIIIIIIII</name>
                        <count>100</count>
                     </tag>
                  </taglist>
               </left>
               <middle>
                  <posts>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img class='dummy' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                  </posts>
               </middle>
               <right>

               </right>

   `;

})();
