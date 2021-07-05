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


      /*
            FURNISH TAGS
      */

      (() => {

         const tagList = select('taglist');

         const { length } = tags;
         const { children } = tagList;


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

            const parts = [];
            let combined = '';

            for(const part of tag.name.split(' ')){

               if((combined.length + part.length) > 12){
                  parts.push(combined);
                  combined = '';
               }

               combined += ' ' + part;
            }

            parts.push(combined);


            parts
            .map((string) => string.trim())
            .forEach((part) => {
               const bit = create('span');
               bit.innerText = part;
               name.appendChild(bit);
            });

            const link = create('a');

            link.href = `https://e621.net/posts?tags=${ tag.id }`;

            tagContainer.appendChild(link);

         });

      })();


      /*
            FURNISH POSTS
      */

      (() => {

         const postList = select('posts');
         const { children } = postList;


         if(children.length > posts.length)
            [...children].slice(posts.length).forEach((element) => element.remove());


         posts.forEach((post,index) => {

            if(!(index in children))
               return;

            const element = children[index];

            const [ image ] = element.children;

            image.src = post.urls.preview;

            image.onload = () => {

               const {
                  offsetWidth: width,
                  offsetHeight: height
               } = image;

               if(width >= height)
                  image.style = `width: 180px;height: auto`;
               else
                  image.style = `height: 180px;width: auto`;
            }

         });

      })();
   };


   Template = `
            <navigation>
               <a href='/'>E621</a>
               <a href='/session/new'>Login</a>
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
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                     <post>
                        <img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>
                     </post>
                  </posts>
               </middle>
               <right>

               </right>

   `;

})();
