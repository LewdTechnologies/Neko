// SPDX-License-Identifier: AGPL-3.0-or-later

(() => {

   const
      known = new Set ,
      cache = new Map ,
      tags = new Map


   /**
    * Fetch tags for term
    */

   const fetch_tags = async ( term ) => {

      const url = new URL(
         '/tags/autocomplete.json' ,
         location.href
      )

      const params = url.searchParams
      params.set('search[name_matches]',term)
      params.set('expiry',7)

      const results = await fetch(url)
         .then(( response ) => response.json() )

      for ( const result of results ){
         tags.set(result.id,result)
         known.add(result.name)
      }

      const ids = results.map(({ id }) => id )

      cache.set(term,ids)
   }

   const tags_from = ( term ) => {

      const ids = cache.get(term)

      return tags
         .entries()
         .filter(([ id ]) => ids.includes(id) )
         .map(([ _ , data ]) => data )
   }


   /**
    * Tags for the search term
    */

   const search = async ( term ) => {

      if( ! cache.has(term) )
         await fetch_tags(term)

      return tags_from(term)
   }


   /**
    * Does the tag exist?
    */

   const is_valid = async ( tag ) => {

      if( ! known.has(tag) && tag.length > 2 )
         await search(tag)

      return known.has(tag)
   }


   window.Tag_Manager ??= {
      is_valid , search
   }

})()
