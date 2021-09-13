/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   window.Download ??= {};

   let indicator,selection,append,filecount,posts;
   let isActive = false;

   let files = [];

   let
      on_end_selection,
      on_move_selection,
      on_start_selection;

   let statuses = new Map;


   const { round } = Math;
   const { sendMessage } = chrome.runtime;


   /*
         HELPERS
   */

   const updateStatuses = () => {

      let ordered = new Map;

      (() => {

         for(const element of indicator.children){

            const { name } = element.dataset;

            if(statuses.has(name) && !ordered.has(name))
               ordered.set(name,element);
            else
               element.remove();
         }

      })();

      for(const [ name , status ] of statuses.entries()){

         if(!ordered.has(name)){

            const element = document.createElement('file');
            element.dataset.name = name;
            indicator.appendChild(element);
            ordered.set(name,element);

         }

         const element = ordered.get(name);

         let color = 'black';

         switch(status){
         case 'waiting':
            color = 'var(--font-light)';
            break;
         case 'inProgress':
            color = '#d8a549';
            break;
         case 'downloading':
            color = 'purple';
            break;
         case 'failed':
            color = '#ca3030';
            break;
         case 'complete':
            color = '#1a881a';
            break;
         }

         const { style } = element;

         style.backgroundColor = color;
         style.height = `${ 70 / statuses.size }px`;

      }


      (() => {

         const { style , children } = indicator;

         style.display = (children.length < 1) ? 'none' : 'flex';

      })();

   };



   const resetMarkings = () => selectAll('post').forEach((element) => {
      element.children[0].style.backgroundColor = '';
   });


   const queueFiles = () => {

      console.log(`Queuing files ${ files.length }`);

      sendMessage({
         action: 'download.append',
         data: {
            files: files.map(({ name , url }) => ({ name , url }))
         }
      },() => {});

      files = [];
      resetMarkings();
      append.style.display = 'none';

   };


   /*
         LISTENERS
   */

   (() => {

      let isSelecting = false;
      let x,y,width,height;


      const normalizedBounds = (X = x,Y = y,Width = width,Height = height) => {

         if(Width < 1)
            [ X , Width ] = [ X + Width , - Width ];

         if(Height < 1)
            [ Y , Height ] = [ Y + Height , - Height ];

         return [ X , Y , Width , Height ];

      };

      const updateSelection = () => {

         const { style } = selection;

         const [ x , y , width , height ] = normalizedBounds();

         style.left = `${ x }px`;
         style.top = `${ y }px`;
         style.width = `${ width }px`;
         style.height = `${ height }px`;

      };

      const selectedPosts = () => {

         const posts = selectAll('post');

         return posts.filter((post) => {

            const [ image ] = post.children;

            const { x , y , width , height } = image.getBoundingClientRect();
            const [ X , Y , Width , Height ] = normalizedBounds();


            const outside =
               (x > X + Width) ||
               (x + width < X) ||
               (y > Y + Height) ||
               (y + height < Y);

            return ! outside;

         });

      };

      const markSelected = (color) => files.forEach(({ element }) => {

         element.children[0].style.backgroundColor = color;

      });


      const selectPosts = () => {

         const selected = selectedPosts().map((element) => ({
            name: element.dataset.id,
            url: element.dataset.source,
            element: element
         }));


         if(selected.length > 0)
            append.style.display = 'flex';

         files = files.concat(selected);

         const unique = new Map;

         for(const file of files)
            unique.set(file.name,file);

         files = [...unique.values()];

         filecount.innerText = files.length;
      };



      /*
            START SELECTION
      */

      on_start_selection = (event) => {

         const { pageX , pageY , ctrlKey } = event;

         isSelecting = true;
         append.style.display = 'none';


         [ x , y ] = [ pageX , pageY ];

         [ width , height ] = [ 0 , 0 ];

         if(!ctrlKey)
            files = [];


         resetMarkings();
         updateSelection();
         selectPosts();
         markSelected('orange');

         window.addEventListener('mousemove',on_move_selection);
         window.addEventListener('mouseup',on_end_selection);
         posts.removeEventListener('mousedown',on_start_selection);

      };


      /*
            RESIZE SELECTION
      */

      on_move_selection = (event) => {

         event.stop();

         selection.style.display = 'block';

         const { pageX , pageY } = event;

         [ width , height ] = [ pageX - x , pageY - y ];

         updateSelection();
         resetMarkings();
         selectPosts();
         markSelected('orange');

      };


      /*
            END SELECTION
      */

      on_end_selection = (event) => {

         event.stop();

         isSelecting = false;
         selection.style.display = 'none';

         updateSelection();
         selectPosts();

         posts.addEventListener('mousedown',on_start_selection);
         window.removeEventListener('mousemove',on_move_selection);

      };

   })();


   /*
         SETUP PAGINATION
   */

   Download.init = () => {

      indicator = select('download > level');
      filecount = select('download > append > count');
      selection = select('download > selection');
      append = select('download > append');
      posts = select('posts');

      Settings.on('download_mode')((state) => {

         isActive = state;

         const { body } = document;

         body.classList[(state) ? 'add' : 'remove']('download');

         if(state){

            posts.addEventListener('mousedown',on_start_selection);

         } else {

            posts.removeEventListener('mousedown',on_start_selection);
            window.removeEventListener('mousemove',on_move_selection);
            window.removeEventListener('mouseup',on_end_selection);

            resetMarkings();

         }

      });


      const { connect } = chrome.runtime;

      const port = connect({ name: 'download' });

      port.onMessage.addListener((activities) => {

         activities.forEach(({ name , status }) => {

            statuses.set(name,status);

            updateStatuses();

            if([ 'complete' , 'failed' ].includes(status))
               setTimeout(() => {

                  statuses.delete(name);
                  updateStatuses();

               },2000);

         });

      });

      append.addEventListener('click',() => {

         event.stop();
         queueFiles();

      });

   };


   /*
         TOGGLE DOWNLOAD MODE
   */

   Download.toggle = () =>
      Settings.toggle('download_mode');


   /*
         IS ACTIVE
   */

   Download.isActive = () =>
      isActive;

})();
