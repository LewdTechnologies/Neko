// SPDX-License-Identifier: AGPL-3.0-or-later

(() => {

   window.Readify ??= {}

   const { floor } = Math


   Readify.postCount = ( count ) => {

      switch ( true ){
      case count < 1e3 :
         return `${ count }`
      case count < 1e6 :
         return `${ floor(count / 1e3) }k`
      default:
         return `${ floor(count / 1e6) }M`
      }
   }

})();
