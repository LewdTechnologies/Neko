
(() => {

    window.Advanced ??= {};


    /*
     *  Setup Advanced Mode
     */

    Advanced.init = () => {

        Settings.on('advanced_mode')((state) => {

            state = (state) 
                ? 'add' 
                : 'remove' ;

            selectAll('[advanced]')
                .map((element) => element.classList)
                .forEach((list) => list[state]('hasAdvanced'));

            selectAll('[advance]')
                .map((element) => element.classList)
                .forEach((list) => list[state]('show'));
        })
    }


    /*
     *  Toggle Advanced Mode
     */

    Advanced.toggle = () =>
        Settings.toggle('advanced_mode');

})()
