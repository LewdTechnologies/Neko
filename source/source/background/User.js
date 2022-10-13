
(() => {

    window.User ??= {};

    const { remove , getAll } = chrome.cookies;



    const toDetails = ({ name , storeId }) => 
        ({ name , storeId , url: 'https://e621.net' });
        
    const queryCookies = () =>
        new Promise((resolve) => 
            getAll({ domain: 'e621.net' },resolve));

    const removeCookie = (cookie) =>
        new Promise((resolve) => 
            remove(toDetails(cookie),resolve));

    const removeCookies = (cookies) =>
        Promise.all(cookies.map(removeCookie));


    /*
     *  Clear User Data
     */

    User.logout = async (resolve) => {

        const cookies = await queryCookies();
        
        await removeCookies(cookies);
    }

})();
