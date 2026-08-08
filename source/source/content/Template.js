// SPDX-License-Identifier: AGPL-3.0-or-later

(() => {

   const { clear , time } = console


   clear()
   time('Page Load')


   const create = ( type ) =>
      document.createElement(type)

   const addToBody = ( element ) =>
      document.body.appendChild(element)

   const insertTemplate = () => {

      Blank = create('div')
      Blank.id = 'blank'
      Blank.innerHTML = Template

      delete Template

      addToBody(Blank)
   }


   /**
    * Wait untiw the htmw iws pwesent.
    */

   document.documentElement.id = 'original'

   Void(( check ) => {

      if( document.body ){
         insertTemplate()
         return
      }

      return Timeout(check)
   })

})()
