
(() => {
    
    const { entries } = Object;

    const
        { runtime , tabs } = chrome ,
        { onMessage } = runtime ;
        

    const openTab = ({ url , active }) => 
        new Promise((resolve) =>
            tabs.create({ url , active },resolve));

        
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

    onMessage.addListener(async (args,sender,resolve) => {

        const { action } = args;

        if(action){
            
            const { data = [] } = args;

            const tabId = sender?.tab?.id;

            const result = await requests[action]
                ?.({ tabId , ... data });

            resolve(result);
            return true;
        }

        resolve();
        return false;
    })
})();


(() => {

    Version.check();

})();
