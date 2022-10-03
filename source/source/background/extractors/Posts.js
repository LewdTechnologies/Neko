
(() => {
    
    const
        select_comments = '.desc > .post-score > .post-score-comments' ,
        select_posts = '#posts-container > article' ,
        select_tags = '#tag-box > ul > li' ;


    /*
     *  Extract Posts
     *  from a given document.
     */

    Extractor.postsExtractor = (doc) => (resolve) => {

        const info = {
            posts : [] ,
            tags : [] ,
            user : {}
        }


        /*
         *  Extract Tag Data
         */

        for(const element of selectAll(doc,select_tags))
            Extractor.tagExtractor(element)
                ((tagData) => info.tags.push(tagData));


        /*
         *  Extract Post Data
         */

        for(const element of selectAll(doc,select_posts))
            extractPost(element)
                ((postData) => info.posts.push(postData));


        /*
         *  Extract User Data
         */

        (() => {

            const [ id , name ] = [ 'id' , 'name' ]
                .map((type) => `current-user-${ type}`)
                .map((name) => findMeta(doc,name));

            const { user } = info;
            
            user.isAnon = (name === 'Anonymous');
            user.name = name;
            user.id = Number(id) ?? -1;

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
                    favorited : Boolean(dataset.isFavorited) ,
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
                        preview : dataset.previewFileUrl ,
                        large : dataset.largeFileUrl ,
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
