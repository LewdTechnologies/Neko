
(() => {
    
    const { entries } = Object;

    const
        { runtime , tabs } = chrome ,
        { onMessage } = runtime ;
        

    const openTab = ({ url , active }) => (resolve) =>
        tabs.create({ url , active },resolve);

    
    /*
     * Input Requests
     */
    
    const requests = {
        
        'download.append' : Download.append ,
        
        'extractHtml' : Extractor.process ,
        
        'user.logout' : User.logout ,
        
        'tabs.open' : openTab
        
    }
    

    /*
     *  Listen To Content Script
     */

    onMessage.addListener((args,sender,resolve) => {

        const { action } = args;

        if(!action)
            return false;

        const { data = [] } = args;

        const tabId = sender?.tab?.id;

        const result = requests[action]
            ?.({ tabId , ... data });

        if(typeof result === 'function'){
            result(resolve);
            return true;
        }

        resolve();
        return false;
    })
})();


(() => {

    Version.check();

})();
