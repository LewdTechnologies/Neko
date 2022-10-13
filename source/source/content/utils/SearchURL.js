
(() => {

    window.Search ??= {};


    const urlParameterStumps = /(^&)|(&$)/g;


    class Url {

        #parameter = {};


        static fromPage(){

            const { searchParams } = new URL(window.location);

            const page = parseInt(searchParams.get('page') ?? 1);

            let rating;

            let tags = searchParams
                .get('tags')
                ?.split(' ') ?? [];

            tags = tags.filter((tag) => {

                if(tag.startsWith('rating:')){
                    
                    tag = tag.slice(7);

                    if(['safe','questionable','explicit'].includes(tag))
                        rating = tag;

                    return false;
                }

                return true;
            }).map((tag) => {
                const [ id , negative ] = tag.usesStart('-');
                return new Search.Tag(id,negative);
            });

            return new this({ page , tags , rating });
        }


        constructor(parameter){

            parameter.page ??= 1;
            parameter.tags ??= [];

            this.#parameter = parameter;
        }


        build(){

            let url = `https://e621.net/posts`;

            const { tags , page , rating } = this.#parameter;

            console.log(tags,page,rating)

            if(rating)
            tags.push(new Search.Tag(`rating:${ rating }`));

            const args = [];

            const tagString = tags.map((tag) => tag.query).toQuery();

            if(tagString.length > 0)
            args.push(`tags=${ tagString }`);

            if(page > 1)
            args.push(`page=${ page }`);

            const parameter = args
            .join('&')
            .remove(urlParameterStumps);

            if(parameter.length > 0)
            url += '?';

            return url + parameter;

        }


        set page(page){
            this.#parameter.page = page }
            
        set rating(rating){
            this.#parameter.rating = rating }

        set tags(tags){
            this.#parameter.tags = tags
                .map(({ id , negative }) => (negative ? '-' : '') + id);
        }
        

        redirectTo(){
            window.location.href = this.build(); }
    }


    Search.Url = Url;

})();
