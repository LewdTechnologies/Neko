// SPDX-License-Identifier: AGPL-3.0-or-later

(() => {

   const
      { runtime , tabs } = chrome ,
      { onMessage } = runtime


   const openTab = ({ url , active }) =>
      new Promise(( resolve ) =>
         tabs.create({ url , active },resolve))


   /* Input Requests */

   const requests = {
      'download.append' : Download.append ,
      'extractHtml' : Extractor.process ,
      'user.logout' : User.logout ,
      'tabs.open' : openTab
   }


   /* Listen To Content Script */

   onMessage.addListener(( args , sender , respond ) => {

      const { action } = args

      if( action ){

         const { data = [] } = args

         const tabId = sender?.tab?.id

         const handler = requests[ action ]

         if( handler ){
            handler({ tabId , ... data }).then(respond)
            return true
         }
      }

      respond(null)
      return false
   })

})();


(() => {

    Version.check()

})();
