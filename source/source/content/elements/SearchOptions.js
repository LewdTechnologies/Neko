/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   window.SearchOptions ??= {};


   let menu;
   let closed = true;

   const options = [
      [ 'a' , 'search.automatic_suggestions' , 'Automatic Suggestions' ]
   ];

   const buttons = {};


   /*
         HELPERS
   */

   const toggle = (type) =>
      Settings.toggle(type);

   const open = () => {

      closed = false;
      Search.hide();
      menu.style.visibility = 'visible';
      menu.focus();

   };

   const close = () => {

      menu.style.visibility = 'hidden';
      Search.focus();
      closed = true;

   };


   /*
         SETUP OPTIONS MENU
   */

   SearchOptions.init = () => {

      menu = select('search > options');

      for(const [ key , id , txt ] of options){

         const element = document.createElement('setting');
         element.innerText = txt;

         const update = () =>
            element.style.color = `var(--font-${ Settings.is(id) })`;

         element.onclick = (e) => {

            e.preventDefault();
            toggle(id);
            update();
            menu.focus();

         }

         update();

         menu.appendChild(element);

         buttons[key] = element;

      }

      menu.addEventListener('keydown',(e) => {


         const { key , code } = e;

         switch(code){
         case '':
            if(key !== 'Unidentified')
               break;
         case 'Escape':
         case 'Tab':
            close();
            break;
         default:
            if(key in buttons){
               buttons[key].click();
               break;
            }

            return;
         }

         e.stopImmediatePropagation();
         e.preventDefault();

      });

   };


   /*
         TOGGLE OPTIONS MENU
   */

   SearchOptions.toggle = () =>
      closed ? open() : close();

})();
