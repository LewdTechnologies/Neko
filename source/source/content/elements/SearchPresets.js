
(() => {

   window.SearchPresets ??= {};


   SearchPresets.init = () => {

      const list = select('search > presets');

      const { style , children } = list;

      const check = () =>
         style.display = (children.length < 1) ? 'none' : '';


      const observer = new MutationObserver(check);

      observer.observe(list,{ childList: true });
      check();

   };

})();
