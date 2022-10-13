

(() => {
    
    const 
        { defineProperty } = Object ,
        { prototype } = HTMLElement ;


    const override = (name) => (method) =>
        prototype[name] = method;

    const get = (name) => (get) =>
        defineProperty(prototype,name,{ get });

    const set = (name) => (set) =>
        defineProperty(prototype,name,{ set });


    /*
     *  Set Visibility
     */

    set('visible')(function(state){
        this.style.visibility = state 
            ? 'visible' 
            : 'hidden' 
    })


    /*
     *  SHOW
     */

    override('show')(function(){
        this.visible = true })


    /*
     *  HIDE
     */

    override('hide')(function(){
        this.visible = false })


})();
