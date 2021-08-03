/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   window.SearchTagMode ??= {};

   let container;

   const borders = {
      negative: '#844a4a'
   };
   const modes = ['negative','2','3','4'];
   let mode = null;
   let style;


   /*
         HELPER
   */


   const mouseUpListener = () => {

      window.removeEventListener('mousemove',mouseUpListener);
      container.remove();

      let color = '';

      if(mode)
         color = borders[mode];

      style.setProperty('--tag-border',color);
      style.setProperty('--tag-border-invert',mode ? 'var(--blue-dim)' : '');
      style.setProperty('--tag-cursor',mode ? 'default' : 'var(--cursor-x)');

   }


   /*
         SET UP SEARCH TAG MODE
   */

   SearchTagMode.init = () => {

      style = document.documentElement.style;

      container = document.createElement('search-tag-modes');

      container.appendChild(document.createElement('border'));

      for(const type of modes){

         const button = document.createElement('mode');
         container.appendChild(button);

         button.addEventListener('mouseup',(event) => {

            mode = type;

         });

      }

   };


   /*
         OPEN
   */

   SearchTagMode.open = (event) => {

      window.addEventListener('mouseup',mouseUpListener);

      container.style.left = `${ event.pageX }px`;
      container.style.top = `${ event.pageY }px`;

      document.body.appendChild(container);

      mode = null;

   };


   /*
         MODE
   */

   SearchTagMode.mode = () =>
      mode;

})();
