

(() => {

    const override = (name) => (method) =>
        Event.prototype[name] = method;


    /*
     *  Prevent default event & stop the current propagation.
     */

    override('stop')(function(){
        this.preventDefault();
        this.stopImmediatePropagation();
    });

})();
