
(() => {

    const unused = [
        
        //  JQuery
        
        /^https:\/\/e(621|926)\.net\/vendor\/jquery-[0-9.]*.min\.js$/ ,
        
        //  FontAwesome CSS
        
        /^https:\/\/e(621|926)\.net\/vendor\/fontawesome\/css\/all\.min\.css$/ ,

        //  Application JS
        
        /^https:\/\/e(621|926)\.net\/packs\/js\/application-[a-z0-9]+.js$/ ,

        //  Application CSS
        
        /^https:\/\/e(621|926)\.net\/packs\/css\/application-[a-z0-9]+.css$/ ,

        //  Tracking / Advertisements
        
        /^https:\/\/ads\.dragonfru\.it\/[\s\S]*$/ ,
        /^https:\/\/mc\.yandex\.ru\/[\s\S]*$/
    ]


    const { onBeforeRequest } = chrome.webRequest;
    

    /*
     *  Listen for unused requets.
     */

    onBeforeRequest.addListener((request) => {

        const { tabId } = request;

        if(!RelevantTabs.includes(tabId))
            return;
            
        const { url } = request;
        
        const cancel = unused
            .some((pattern) => pattern.test(url));

        return { cancel };

    },{ urls: [ '<all_urls>' ] },[ 'blocking' ]);

})();
