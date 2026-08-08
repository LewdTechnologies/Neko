// SPDX-License-Identifier: AGPL-3.0-or-later

(() => {

   noOP = () => {}

   Void = ( resolve ) => {
      const ⵃ = () => resolve(ⵃ)
      ⵃ()
   }

   Timeout = ( delay , resolve ) =>
      setTimeout(
         resolve ?? delay ,
         resolve ? delay : 0
      )

})();
