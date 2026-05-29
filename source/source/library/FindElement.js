

(() => {

   find = ( parent , type , method ) =>
      ( ( type && parent ) ?? document )[ method ]( type ?? parent )

   findClasses = ( parent , className ) =>
      [ ... find(parent,className,'getElementsByClassName') ]

   findTags = ( parent , tag ) =>
      [ ... find(parent,tag,'getElementsByTagName') ]

   findClass = ( parent , className ) =>
      findClasses(parent,className)?.[ 0 ]

   findTag = ( parent , tag ) =>
      findTags(parent,tag)?.[ 0 ]

   findId = ( document , id ) =>
      find(document,id,'getElementById')

   select = ( document , selector ) =>
      find(document,selector,'querySelector')

   selectAll = ( document , selector ) =>
      [ ... find(document,selector,'querySelectorAll') ]

   findMeta = ( document , name ) =>
      select(document,`[ name = '${ name }' ]`)?.content

})();
