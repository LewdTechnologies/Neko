// SPDX-License-Identifier: AGPL-3.0-or-later

(() => {

   const
      select_comments = `.desc > .post-score > .post-score-comments` ,
      select_posts = `#posts article` ,
      select_tags = `#tag-box > ul > li`


   /**
    *  Extract Posts
    *  from a given document.
    */

    Extractor.postsExtractor =
      ( document ) =>
      ( resolve ) => {

         const info = {
            posts : [] ,
            tags : [] ,
            user : {}
         }


         /**
          *  Extract Tag Data
          */

         selectAll(document,select_tags).forEach(( element ) => {
            Extractor.tagExtractor(element)(( tag ) =>
               info.tags.push(tag)
            )
         })


        /*
         *  Extract Post Data
         */

        selectAll(document,select_posts).forEach(( element ) => {
            extractPost(element)(( post ) =>
                info.posts.push(post))
        })


        /*
         *  Extract User Data
         */

        ;(() => {

            const [ id , name ] = [ 'id' , 'name' ]
                .map((type) => `current-user-${ type }`)
                .map((name) => findMeta(document,name));

            const { user } = info;

            user.isAnon = ( name === 'Anonymous' )
            user.name = name
            user.id = Number(id) ?? -1

        })();


        resolve(info);
    };


    function extractPost(element){
        return (resolve) => {
            try {

                const { dataset } = element;

                const info = {
                    favorites : Number(dataset.favCount) ,
                    extension : dataset.fileExt ,
                    favorited : dataset.isFavorited === 'true' ,
                    comments : Number(select(element,select_comments)?.innerText.substring(1) ?? -1) ,
                    rating : dataset.rating ,
                    score : Number(dataset.score) ,
                    flags : new Set ,
                    tags : dataset.tags.split(' ') ,
                    id : dataset.id ,

                    uploader : {
                        name : dataset.uploader ,
                        id : Number(dataset.uploaderId)
                    },

                    urls : {
                        preview : dataset.previewUrl ,
                        sample : dataset.sampleUrl ,
                        file : dataset.fileUrl
                    }
                }


                if(dataset.flags !== '')
                    info.flags.add(dataset.flags);

                if(dataset.hasSound !== '')
                    info.flags.add('sound');

                resolve(info);

            } catch (error) { console.log(error); }
        }
    }

})();
