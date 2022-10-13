
(() => {
    
    const 
        { defineProperty } = Object ,
        { prototype } = Element ;
    

    const override = (name) => (func) =>
        prototype[name] = func;

    const get = (name) => (get) =>
        defineProperty(prototype,name,{ get });

    const set = (name) => (set) =>
        defineProperty(prototype,name,{ set });


    /*
     *  List of sub-elements
     */

    get('items')(function(){
        return [ ...this.children ] })


    /*
     *  Add Class
     */

    override('addClass')(function(name){
        this.classList.add(name) })


    /*
     *  Remove Class
     */

    override('removeClass')(function(name){
        this.classList.remove(name) })

})();
