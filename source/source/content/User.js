/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   window.User ??= {};

   const { sendMessage } = chrome.runtime;


   /*
         HELPER
   */

   const logout = (resolve) =>
      sendMessage({ action: 'user.logout' },resolve);

   const redirectTo = (url) =>
      window.location.href = url;


   /*
         CLEAR & LOGOUT
   */

   User.logout = () => {

      logout(() => {

         window.localStorage?.clear();

         redirectTo(`https://e621.net/session/sign_out`);

      });

   };

})();
