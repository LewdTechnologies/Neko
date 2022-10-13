
(() => {

    window.Settings ??= {};

    const { connect } = chrome.runtime;


    const
        listeners = new Map ,
        settings = new Map ;


    const port = connect({ name: 'settings' });


    const update = (type,value) => {

        settings.set(type,value);

        listeners
        .get(type)
        ?.forEach((listener) => listener(value));
    }

    const transmit = (type,value) =>
        port.postMessage([ type , value ]);


    /*
     *  Listener
     */

    let listener = (data = []) => {

        data.forEach(([ type , value ]) =>
            update(type,value));

        listener = ([ type , value ]) =>
            update(type,value);
    };

    port.onMessage.addListener(listener);


    /*
     *  Query Setting
     */

    Settings.is = (type) =>
        settings.get(type);

    Settings.not = (type) =>
        ! settings.get(type);


    /*
     *  Update Setting
     */

    Settings.set = (...args) => {
        update(...args);
        transmit(...args);
    }


    /*
     *  Toggle Setting
     */

    Settings.toggle = (type) =>
        Settings.set(type,Settings.not(type));


    /*
     *  Settings Change Event
     */

    Settings.on = (type) => (resolve) => {

        if(!listeners.has(type))
            listeners.set(type,new Set);

        listeners
        .get(type)
        .add(resolve);

        if(settings.has(type))
            resolve(settings.get(type));
    }

})();
