
(() => {

    const override = (name) => (method) =>
        EventTarget.prototype[name] = method;


    /*
     *  Prevent Default Action
     */

    override('preventDefaultAction')(function(type){
        this.addEventListener(type,(event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
        });
    });

})();
