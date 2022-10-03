
(() => {


   /*
         EXTRACT POSTS
   */

   Extractor.postsExtractor = (doc) => (resolve) => {

      const info = {
         posts: [],
         tags: [],
         user: {}
      };


      /*
            EXTRACT TAG DATA
      */

      for(const element of selectAll(doc,'#tag-box > ul > li'))
         Extractor.tagExtractor(element)((tagData) => {
            info.tags.push(tagData);
         });


      /*
            EXTRACT POST DATA
      */

      for(const element of selectAll(doc,'#posts-container > article'))
         extractPost(element)((postData) => {
            info.posts.push(postData);
         });


      /*
            EXTRACT USER DATA
      */

      (() => {

         const [ id , name ] = [ 'id' , 'name' ]
            .map((type) => `current-user-${ type}`)
            .map((name) => findMeta(doc,name));

         info.user.name = name;
         info.user.id = Number(id) ?? -1;
         info.user.isAnon = (name === 'Anonymous');

      })();


      resolve(info);
   };


   function extractPost(element){
      return (resolve) => {

         try {
            const { dataset } = element;

            const info = {
               id: dataset.id,
               comments: Number(select(element,'.desc > .post-score > .post-score-comments')?.innerText.substring(1) ?? -1),
               favorites: Number(dataset.favCount),
               extension: dataset.fileExt,
               favorited: Boolean(dataset.isFavorited),
               rating: dataset.rating,
               score: Number(dataset.score),
               flags: new Set(),
               tags: dataset.tags.split(' '),
               uploader: {
                  id: Number(dataset.uploaderId),
                  name: dataset.uploader
               },
               urls: {
                  preview: dataset.previewFileUrl,
                  large: dataset.largeFileUrl,
                  file: dataset.fileUrl
               }
            };


            if(dataset.flags !== '')
               info.flags.add(dataset.flags);

            if(dataset.hasSound !== '')
               info.flags.add('sound');

            resolve(info);
         } catch (e) {
            console.log(e);
         }
      };
   };

})();
