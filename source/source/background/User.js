
/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   window.User ??= {};

   const { remove , getAll } = chrome.cookies;


   /*
         HELPER
   */

   const toDetails = ({ name , storeId }) => ({
      name , storeId , url: 'https://e621.net'
   });

   const removeCookie = (cookie) =>
      new Promise((resolve) => {
         remove(toDetails(cookie),resolve);
      });

   const removeCookies = (cookies) =>
      Promise.all(cookies.map(removeCookie));


   /*
         CLEAR USER DATA
   */

   User.logout = (resolve) => {

      getAll({ domain: 'e621.net' },(cookies) => {

          console.log(cookies);

          removeCookies(cookies)
          .then(resolve);

      });
      
   };

})();
