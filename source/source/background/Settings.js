
(() => {

    const
        { fromEntries , entries } = Object ,
        { storage , runtime } = chrome ,
        { onConnect } = runtime ,
        { local } = storage ;


    const recipients = new Set;
    let settings;


    const others = (Port) => [ ... recipients ]
        .filter((port) => port !== Port);

    const doNothing = () => {};

    const save = () =>
        local.set({ settings : fromEntries([ ... settings ]) });

    const update = (type,value) => {
        settings.set(type,value);
        save();
    }

    const loadData = (key) => new Promise((resolve) => {
        local.get([key],(data) => {
            resolve(data[key]);
        });
    });
        

    const load = () => 
        loadData('settings');


    /*
     *  Load Settings
     */

    load().then((data = {}) => {

        data['search.automatic_suggestions'] ??= true;
        data['minimized_mode'] ??= false;
        data['advanced_mode'] ??= true;
        data['search.rating'] ??= null;

        settings = new Map(entries(data));
    });


    /*
     *  Listen for new recipients.
     */

    onConnect.addListener((port) => {

        if(port.name !== 'settings')
            return;

        recipients.add(port);

        port.postMessage([ ... settings ],doNothing);

        port.onDisconnect.addListener(() => 
            recipients.delete(port));

        port.onMessage.addListener(([ type , value ]) => {

            update(type,value);

            others(port).forEach((port) =>
                port.postMessage([ type , value ],doNothing));
        });
    });
})();
