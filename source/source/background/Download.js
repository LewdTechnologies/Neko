
/*
      COPYRIGHT 2021 @ LewdTechnologies

      CONTACT:
      # Email: LewdTechnologies@gmail
      # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   window.Download ??= {};

   const { create , remove , executeScript , onUpdated } = chrome.tabs;
   const { onConnect } = chrome.runtime;
   const { onChanged } = chrome.downloads;

   let queue = [];
   let state = false;

   let workspace;
   let connection;

   const recipients = new Map;
   const completed = new Set;

   let item;

   const minimumWaitTime = 2000;

   const { floor , random } = Math;


   /*
         HELPER
   */

   const randomInt = (min,max) =>
      floor(random() * (max - min + 1)) + min;

   const waitTime = () => {

      const time = floor(
         minimumWaitTime +
         randomInt(0,1000) +
         randomInt(0,600) +
         randomInt(0,200) +
         randomInt(0,80)
      );


      console.log('Waiting',time);

      return time;

   }

   const updateStatus = (activities) => {

      for(const port of recipients.values())
         port.postMessage(activities);

   };

   const startQueue = () => {

      console.log('Starting Queue');

      state = 'starting';

      create({
         url: 'https://e621.net/',
         pinned: true,
         active: false
      },(tab) => {

         workspace = tab;

         executeScript(workspace.id,{
            runAt: 'document_start',
            code: `

               const { connect } = chrome.runtime;

               const port = connect({ name: 'downloader' });

               port.onMessage.addListener(({ name , url }) => {

                  try {

                     window.location = url;

                  } catch (error) {

                     port.postMessage({ type: 'failed' , name , error });

                  }

               });

            `
         },() => {

            status = 'injecting';

         });

      });

   };

   const stopQueue = () => {

      console.log('Stopping Queue');

      state = 'stopping';
      connection = null;

      remove(workspace.id,() => {


         if(queue.length > 0)
            return startQueue();

         state = false;

      });

   };

   const nextItem = (delay = true) => {

      console.log(`Items left: ${ queue.length }`);

      if(queue.length < 1)
         return stopQueue();

      if(delay)
         return setTimeout(() => nextItem(false),waitTime());


      item = queue.shift();

      const { url , name } = item;

      state = 'busy';

      console.log('Next Item',name,url);

      updateStatus([{ name , status: 'inProgress' }]);

      connection.postMessage({ name , url });

   };


   /*
         APPEND NEW QUEUE ENTRY
   */

   Download.append = ({ files }) => {

      setTimeout(() => {

         const add = files.filter((file) => !completed.has(file.name));

         if(add.length < 1)
            return;

         queue = queue.concat(add);

         updateStatus(queue.map(({ name }) => ({ name , status: 'waiting' })));

         if(state)
            return;

         startQueue();

      },0);

      return false;

   };


   /*
         LISTEN FOR DOWNLOAD TAB REQUESTS
   */

   onConnect.addListener((port) => {

      switch(port.name){
      case 'download':

         port.onDisconnect.addListener((port) => {

            const { tabId } = port.sender.tab;
            recipients.delete(tabId);

         });

         return;
      case 'downloader':

         const newInstance = ! connection;

         connection = port;

         port.onMessage.addListener((msg) => {

            const { name , type } = msg;

            switch(type){
            case 'failed':

               console.error(msg.error);
               updateStatus([{ name , status: 'failed' }]);
               nextItem();

               return;
            case 'complete':

               updateStatus([{ name , status: 'downloading' }]);

               return;
            default:
               console.warn(msg);
            }


         });

         state = 'ready';

         if(newInstance)
            nextItem(false);

         return;
      }

   });


   /*
         DOWNLOADER INJECTION
   */

   onUpdated.addListener((tabId,info,tab) => {

      if(workspace?.id != tabId)
         return;

      const { status , url } = info;

      if(status !== 'loading' || url !== item?.url)
         return;


      const { name } = item;

      let type = url.split(/\./g).pop();

      if(type === 'jpeg' || type === 'jpg')
         type = 'png';

      item.type = type;

      executeScript(tabId,{
         runAt: 'document_start',
         code: `

            (() => {

               console.log('Startin up');

               const { connect } = chrome.runtime;

               const port = connect({ name: 'downloader' });

               try {

                  console.log('name','${ name }');
                  console.log('type','${ type }');
                  console.log('url','${ url }');

                  const link = document.createElement('a');
                  link.href = '${ url }';
                  link.setAttribute('download','${ name }.${ type }');
                  link.click();

                  port.postMessage({ type: 'complete' , name: '${ name }' });

                  port.onMessage.addListener(({ name , url }) => {

                     try {

                        window.location = url;

                     } catch (error) {

                        port.postMessage({ type: 'failed' , name , error });

                     }

                  });

               } catch (error) {

                  console.error(error);
                  port.postMessage({ type: 'failed' , name , error });

               }

            })();

         `
      },() => {

         state = 'injecting';

      });

   });


   onChanged.addListener((delta) => {

      const { id , state , filename } = delta;

      if(!item)
         return;

      if(item.downloadId === id){
         if(state?.current === 'complete' && state?.previous === 'in_progress'){
            updateStatus([{ name: item.name , status: 'complete' }]);
            completed.add(name);
            item = null;
            nextItem();
         }

      } else {

         const name = filename?.current;

         if(new RegExp(`${ item.name }( \\(\\d+\\))?\\.${ item.type }$`).test(name))
            item.downloadId = id;
      }

   });

})();
