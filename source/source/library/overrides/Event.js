// SPDX-License-Identifier: AGPL-3.0-or-later

(() => {

    const override = (name) => (method) =>
        Event.prototype[name] = method;


    /**
     *  Prevent default event & stop the current propagation.
     */

    override('stop')(function(){
        this.preventDefault();
        this.stopImmediatePropagation();
    });

})();
