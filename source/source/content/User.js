
(() => {

    window.User ??= {};

    const { sendMessage } = chrome.runtime;


    const logout = () =>
        new Promise((resolve) =>
            sendMessage({ action: 'user.logout' },resolve));

    const redirectTo = (url) =>
        window.location.href = url;


    /*
     *  Clear & Logout
     */

    User.logout = async () => {
        
        await logout();
        
        window.localStorage?.clear();

        redirectTo(`https://e621.net/session/sign_out`);
    }

})();
