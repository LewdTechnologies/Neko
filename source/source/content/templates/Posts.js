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
         `https://e621.net/posts/${ postId }`;

      const toSearch = (query) =>
         `https://e621.net/posts?tags=${ query }`;

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


      for(const Mechanic of [
         Search , SearchSuggestion , SearchOptions , SearchRating ,
         SearchTagMode , Advanced , Minimize , Pagination , Download
      ]) Mechanic.init();


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


   Template = `
            <navigation minimizable>
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
            <content>
               <main>
                  <left minimizable>
                     <taglist>
                        <tag class='dummy'>
                           <name>IIIIIIIIIIIIIIIIII</name>
                           <count>100</count>
                        </tag>
                        <tag class='dummy'>
                           <name>IIIIIIIIIIIIIIIIII</name>
                           <count>100</count>
                        </tag>
                        <tag class='dummy'>
                           <name>IIIIIIIIIIIIIIIIII</name>
                           <count>100</count>
                        </tag>
                        <tag class='dummy'>
                           <name>IIIIIIIIIIIIIIIIII</name>
                           <count>100</count>
                        </tag>
                        <tag class='dummy'>
                           <name>IIIIIIIIIIIIIIIIII</name>
                           <count>100</count>
                        </tag>
                        <tag class='dummy'>
                           <name>IIIIIIIIIIIIIIIIII</name>
                           <count>100</count>
                        </tag>
                        <tag class='dummy'>
                           <name>IIIIIIIIIIIIIIIIII</name>
                           <count>100</count>
                        </tag>
                        <tag class='dummy'>
                           <name>IIIIIIIIIIIIIIIIII</name>
                           <count>100</count>
                        </tag>
                        <tag class='dummy'>
                           <name>IIIIIIIIIIIIIIIIII</name>
                           <count>100</count>
                        </tag>
                        <tag class='dummy'>
                           <name>IIIIIIIIIIIIIIIIII</name>
                           <count>100</count>
                        </tag>
                        <tag class='dummy'>
                           <name>IIIIIIIIIIIIIIIIII</name>
                           <count>100</count>
                        </tag>
                        <tag class='dummy'>
                           <name>IIIIIIIIIIIIIIIIII</name>
                           <count>100</count>
                        </tag>
                        <tag class='dummy'>
                           <name>IIIIIIIIIIIIIIIIII</name>
                           <count>100</count>
                        </tag>
                        <tag class='dummy'>
                           <name>IIIIIIIIIIIIIIIIII</name>
                           <count>100</count>
                        </tag>
                        <tag class='dummy'>
                           <name>IIIIIIIIIIIIIIIIII</name>
                           <count>100</count>
                        </tag>
                        <tag class='dummy'>
                           <name>IIIIIIIIIIIIIIIIII</name>
                           <count>100</count>
                        </tag>
                        <tag class='dummy'>
                           <name>IIIIIIIIIIIIIIIIII</name>
                           <count>100</count>
                        </tag>
                        <tag class='dummy'>
                           <name>IIIIIIIIIIIIIIIIII</name>
                           <count>100</count>
                        </tag>
                        <tag class='dummy'>
                           <name>IIIIIIIIIIIIIIIIII</name>
                           <count>100</count>
                        </tag>
                        <tag class='dummy'>
                           <name>IIIIIIIIIIIIIIIIII</name>
                           <count>100</count>
                        </tag>
                        <tag class='dummy'>
                           <name>IIIIIIIIIIIIIIIIII</name>
                           <count>100</count>
                        </tag>
                        <tag class='dummy'>
                           <name>IIIIIIIIIIIIIIIIII</name>
                           <count>100</count>
                        </tag>
                        <tag class='dummy'>
                           <name>IIIIIIIIIIIIIIIIII</name>
                           <count>100</count>
                        </tag>
                        <tag class='dummy'>
                           <name>IIIIIIIIIIIIIIIIII</name>
                           <count>100</count>
                        </tag>
                        <tag class='dummy'>
                           <name>IIIIIIIIIIIIIIIIII</name>
                           <count>100</count>
                        </tag>
                     </taglist>
                  </left>
                  <middle>
                     <search advanced minimizable>
                        <presets advance>
                           <rating>
                              <explicit>
                                 <img src='chrome-extension://${ chrome.runtime.id }/resource/icons/NVTR1LKIZD.png'>
                              </explicit>
                              <questionable>
                                 <img src='chrome-extension://${ chrome.runtime.id }/resource/icons/3QKCEKJD04.png'>
                              </questionable>
                              <safe>
                                 <img src='chrome-extension://${ chrome.runtime.id }/resource/icons/MNM1T9UJLX.png'>
                              </safe>
                           </rating>
                        </presets>
                        <primary>
                           <settings advance>
                              <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAE+klEQVR4Xu2aWcxdUxTHf38xiyFIiSFqTF9ESEUlPGlJEw8EiaKUqgdD4kFQiTkxvkiUB5RSU1LCg0RD+0SiIjTipaExxBAaxBBDEEtWs4+cnu/cc/bZ+9z79eu9+/HeNf7P2muvvdYWY7405v4zAWASAWOOwGQLjHkATJLgyLeAmc0BLgP2qUTfD8Djkr4cZVSOFAAz2wv4HDhwgJMfA3Mk2ahAGDUAc4H3Wpw7WNJ3OyoApwAbWpw7TNLXEwBGhED2FjCzfYF7gKOBByWtH2S7mZ0GvNXi25GSPE/ULjO7ArgW+BC4XtLPOVhlAWBm+wFvACcHI/4GFkl6uWqUmR0CrAIWtBj8gjso6ccaGTcC95d+93xypqSfUkFIBqDG+cKGbUAwM9/31wEXALtGGvoH8BLwmKS3ncfMqs4XorJASAIghP2bpS9f9esf4DXgCODESKcHkW0GvgfmNchxEOZL+qWrrlQAngKWdFU2ZPpHJV3TVUcqAB/08GW72tpGv1bSwjai6v+pAHgmXtlV2RDpPe8sbDqBBulOAqAlKQ3Rz1rRA0+eGEOSAdhOQPBke2HdsRvjvNNkARBAeKclQ8fakkL3qqRzUxgLnj4A+AQ4pqMRvwLvAl8EPj8uvV7Yu6OcjZJO6sizDXkWAJGlbVnhp8DtXuRI+rP8h5ntFoqlO4GjOjg1T5KDmbRyAXgGWByp+XlgmaTfm+jNbE9vjAAXRcp9TtIlkbRTyJIBMLP9ga+APSKUu/OLJf0bQetl707A6kgQ/gL8AvVNjOwqTRQAZuZ0s4Cdg4Bdwg1wUYRSD/vj2758VU6IhI8it4OX5XcBfiT68tNhk6Tf2uxrBcDMDgfWAce1CRvwv3/5Z1N4zcxD2yMhZfn94XRJm5qYYwBwZG9NsQDwbD+rmvBiZZnZ7sCWhNOhUHGfpOW5ADwCXB1rdIVunaS2+3+jaDPz8J6fqL/1ghQTATkArJR0ZaLxW9nM7AlgaaKMCQBtV+RhR8AOsQXuBW5ODMHpToJ3S7otNwn6KMs7uYOmOW3Y5ByDXmV6tZmyfMrkbbLGUVvrFgiJyEdaDkS5EHJkYzL8KAoh7yTfUimEtsSM2KIAqIM/tLk/i+z0DrMU9g6yT5OmtNFjwiYZgBAZXuFdHKMIGNZlaLWkSyNtmEKWC0DMrK+s1LfDHcCamuuwV33nA12vw17ubp0dpKwsAEIUpHSI+2qIbJZ0bIrjBU8fALwCnJNjRAbvBkmnZvDn9QTN7DzgxdLpkGNLKu9Nkh5IZU6OgOC8Hz/eG5julQxCEgBmdgbw+nbifAH+UklPdv0SqQCsBc7qqmzI9Ekd4lQAcq7Iw8JhlaTLuwpPBcCfuHmbrHgYUafX3wL5/aHrzKAqa2OYH5zdkGx9PL4g5bVIEgDh/K++Dikb/n9SCrODq0KRE9NBdjne6V0DPFz0/BuS7ugfSBSeDnglUpuRQxt9hT+haQlTb4EtqWtz14CQ5bzbkRwBJRD8kdRDwAnAiqZMbGazAb9ANa3G0jacQDcAXlYvT3kVUlaeDUCXpGNmh4ZhShNb1qiriz29REAXhRMAzA4Cvm0Bba6k97sAm0M76i3g+nxSM2jK5NOc2TEjrRynpy0HhOPTR23LgAMqTvgTt6fbRll9OV7IGWkE9G18H/ImAPSB4kyWMYmAmfz1+rB9EgF9oDiTZYx9BPwH/aq4UIOlmvQAAAAASUVORK5CYII='>
                           </settings>
                           <bar>
                              <options style='visibility: hidden' tabindex='-1'></options>
                              <suggestions style='visibility: hidden'></suggestions>
                              <tags></tags>
                              <input spellcheck='false'>
                           </bar>
                        </primary>
                     </search>
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
                     <pagination>
                        <previous>
                           <svg width='64' height='64' version='1.1' viewBox='0 0 16.933 16.933' xmlns='http://www.w3.org/2000/svg'><path d='m8.4667 16.404v-15.875m-6.35 5.8208 6.35-5.8208 6.35 5.8208' fill='none' stroke='#fff' stroke-dashoffset='10' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='2' stroke-width='1.0583' style='paint-order:markers stroke fill'/></svg>
                        </previous>
                        <page></page>
                        <page></page>
                        <page></page>
                        <page></page>
                        <page></page>
                        <page></page>
                        <page></page>
                        <next>
                           <svg width='64' height='64' version='1.1' viewBox='0 0 16.933 16.933' xmlns='http://www.w3.org/2000/svg'><path d='m8.4667 0.52917v15.875m6.35-5.8208-6.35 5.8208-6.35-5.8208' fill='none' stroke='#fff' stroke-dashoffset='10' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='2' stroke-width='1.0583' style='paint-order:markers stroke fill'/></svg>
                        </next>
                     </pagination>
                     <download>
                        <level>
                           <indicator></indicator>
                        </level>
                        <append>
                           <count>0</count>
                           <symbol>▼</symbol>
                        </append>
                        <selection></selection>
                     </download>
                  </right>
               </main>
            </content>
         </body>
      </html>
   `;

})();
