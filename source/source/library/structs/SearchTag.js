/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   window.Search ??= {};

   class Tag {

      #negative = false;
      #id = '';


      constructor(id,negative){
         this.#id = id;
         this.#negative = negative;
      }


      get name(){


      }

      get id(){
         return this.#id;
      }

      get #prefix(){
         return this.#negative ? '-' : '';
      }

      get #encodedId(){
         return encodeURIComponent(this.#id);
      }

      get query(){
         return this.#prefix + this.#encodedId;
      }

   }


   Search.Tag = Tag;

})();
