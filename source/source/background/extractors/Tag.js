
(() => {


    /*
     *  Extract Tags
     */

    Extractor.tagExtractor = (element) => (resolve) => {

        const { children , className } = element;

        try {

            const [ search , countElement ] = [ ... children ]
                .slice(-2);

            const categoryId = className
                .match(/category-(\d)/)
                ?.[1];

            if(!categoryId)
                return warn(`Missing category Id`,element);


            const 
                category = Extractor.idToCategory(Number(categoryId)) ,
                count = Number(countElement.dataset?.count) ,
                id = decodeURIComponent(search.href.match(/=([\s\S]+)$/)?.[1]) ;

            const name = TagName.from(id);

            resolve({ id , name , count , category });

        } catch (error) { console.log(error); }
    }

})();
