
(() => {
    
    const { defineProperty } = Object;
    

    const override = (name) => (func) =>
        Element.prototype[name] = func;

    const get = (name) => (get) =>
        defineProperty(Element.prototype,name,{ get });

    const set = (name) => (set) =>
        defineProperty(Element.prototype,name,{ set });


    /*
     *  List of sub-elements
     */

    get('items')(function(){
        return [ ...this.children ] })


    /*
     *  Add Class
     */

    override('addClass')(function(Class){
        this.classList.add(Class) })


    /*
     * Remove Class
     */

    override('removeClass')(function(name){
        this.classList.remove(name) })

})();
