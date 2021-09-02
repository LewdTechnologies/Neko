/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


class SearchURL {

   #search = {};
   #url;


   static fromPage(){

      return new this(window.location);

   }


   constructor(template){

      this.#url = new URL(template ?? 'https://e621.net/posts');

   }


   build(){

      const
         url = this.#url,
         search = this.#search,
         { searchParams } = url;

      if(search.page)
         searchParams.set('page',search.page);

      if(search.tags)
         searchParams.set('tags',search.tags);

      return url.href;

   }


   set page(page){

      this.#search.page = page;

   }

   set tags(tags){

      this.#search.tags = tags
         .map(({ id , negative }) => (negative ? '-' : '') + id)
         .map(encodeURIComponent)
         .join('+');

   }

   redirectTo(){

      window.location.href = this.build();

   }

}
