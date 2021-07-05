/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   const colors = [ 'gray' , '#FFCCCDAA' , 'gray' , '#FFCCCD' ]
      .map((color) => `color:${ color }`);

   const combine = (args = []) =>
      [`%c[%cNeko%c]: %c`,...args]
      .map((item) => String(item))
      .join('');

   const print = (type) => (...args) =>
      console[type](combine(args),...colors);


   window.log = print('log');

   window.warn = print('warn');

   window.error = print('error');

   window.debug = DEBUG ? print('log') : noOp;

})();
