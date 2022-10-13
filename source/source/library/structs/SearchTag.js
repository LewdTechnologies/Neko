

(() => {

    window.Search ??= {};

    class Tag {

        #negative = false;
        #id = '';


        constructor(id,negative){
            this.#negative = negative;
            this.#id = id;
        }


        get name(){}

        get id(){
            return this.#id;
        }
        
        get query(){
            return this.#prefix + this.#encodedId;
        }
        

        get #prefix(){
            return this.#negative 
                ? '-' 
                : '' ;
        }

        get #encodedId(){
            return encodeURIComponent(this.id);
        }
    }


    Search.Tag = Tag;

})();
