
(() => {

    const 
        { defineProperty } = Object ,
        { prototype } = Node ;


    const override = (name) => (func) =>
        prototype[name] = func;

    const get = (name) => (get) =>
        defineProperty(prototype,name,{ get });

    const set = (name) => (set) =>
        defineProperty(prototype,name,{ set });


    /*
     *  List Sub-nodes
     */

    get('nodes')(function(){
        return [ ...this.childNodes ] })


    /*
     *  Clear Sub-nodes
     */

    override('clearNodes')(function(){
        while(this.lastChild)
            this.removeChild(this.lastChild);
    });

})();
