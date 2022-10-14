
(() => {

    window.Minimize ??= {};


    /*
     *  Setup Minimize Mode
     */

    Minimize.init = () => {

        Settings.on('minimized_mode')((state) => {

            state = (state) 
                ? 'add' 
                : 'remove' ;

            document.body.classList[state]('minimize');
        })
    }


    /*
     *  Toggle Minimize Mode
     */

    Minimize.toggle = () =>
        Settings.toggle('minimized_mode');

})()
