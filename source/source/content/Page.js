// SPDX-License-Identifier: AGPL-3.0-or-later

(() => {

   window.Page ??= {}


   const { search , host } = window.location

   const query = new URLSearchParams(search)


   Page.rating = null

   Page.page = Number( query.get('page') ?? 0 )

   Page.host = host.split('.')[0]

   Page.isNSFW = Page.host === 'e621'

   Page.url = `https://${ Page.host }.net`

   Page.tags = ( query.get('tags') ?? '' )
      .toLowerCase()
      .split(' ')
      .map(extractTagState)
      .filter(isGenericTag)


   function extractTagState ( tag ){
      return (tag.startsWith('-'))
         ? [ tag.substring(1) , true ]
         : [ tag , false ];
   }

   function isGenericTag ([ tag ]){

      switch ( tag ){
      case 'rating:questionable' :
      case 'rating:explicit' :
      case 'rating:safe' :
         Page.rating = tag.substring(7)
         return false
      case '' :
            return false
      }

      return true
   }

})()
