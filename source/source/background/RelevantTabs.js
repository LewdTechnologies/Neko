
(() => {

    window.RelevantTabs ??= {};


    const tabs = new Set;
    
    const relevant = [
        
        //  Posts Page
        
        /^https\:\/\/e(621|926)\.net\/posts(\?[\S\s]*)?$/
    ]


    const test = (isKnown,{ url }) =>
        isKnown ^ relevant.some((pattern) => pattern.test(url));

    const act = (isKnown,tabId) =>
        isKnown 
            ? tabs.delete(tabId) 
            : tabs.add(tabId);


    const { onUpdated } = chrome.tabs;
    

    /*
     *  Check for relevant tabs.
     */

    onUpdated.addListener((tabId,info,tab) => {

        const isKnown = tabs.has(tabId);

        if(test(isKnown,tab))
            act(isKnown,tabId);

    });


    RelevantTabs.includes = (tabId) =>
        tabs.has(tabId);

})();
