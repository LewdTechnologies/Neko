
(() => {


    /*
     *  Extract Tags
     */

    Extractor.tagExtractor = 
        ( element ) => 
        ( resolve ) => 
    {

        try {

            const 
                category = element.dataset.category ,
                count = Number( element.dataset.count ) ,
                id = decodeURIComponent( element.dataset.name )

            const name = TagName.from(id)

            resolve({ id , name , count , category })

        } catch ( error ) { 
            console.log(error)
        }
    }

})();
