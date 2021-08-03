/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   window.SearchOptions ??= {};


   let
      menu,
      closed = true;

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
      menu.show();
      menu.focus();

   };

   const close = () => {

      menu.hide();
      Search.focus();
      closed = true;

   };


   /*
         SETUP OPTIONS MENU
   */

   SearchOptions.init = () => {

      menu = select('search > primary > bar > options');

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

      menu.addEventListener('keydown',(event) => {


         const { key , code } = event;

         switch(code){
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

         event.stop();

      });

   };


   /*
         TOGGLE OPTIONS MENU
   */

   SearchOptions.toggle = () =>
      closed ? open() : close();

})();
