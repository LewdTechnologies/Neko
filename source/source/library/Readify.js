

(() => {

   window.Readify ??= {};

   const { floor } = Math;


   Readify.postCount = (count) => {

      if(count < 1e3)
         return String(count);

      count = floor(count / 1e3);

      if(count < 1e3)
         return `${ count }k`;

      count = floor(count / 1e2);

      return `${ count / 10 }M`;
   };

})();
