
(() => {

    window.Download ??= {};


    let 
        indicator ,
        selection ,
        filecount ,
        append ,
        posts ;

    let 
        selectionMode = true ,
        statuses = new Map ,
        isActive = false ,
        files = [] ;
    
    let
        on_selection_action ,
        on_start_selection ,
        on_move_selection ,
        on_end_selection ;


    const { sendMessage } = chrome.runtime;
    const { entries } = Object;
    const { round } = Math;

    const mapFrom = (object) =>
        new Map(entries(object));

    const indicatorColors = mapFrom({
        downloading : 'purple' ,
        inProgress : '#d8a549' ,
        complete : '#1a881a' ,
        waiting : 'var(--font-light)' ,
        failed : '#ca3030'
    })


    const indicatorColor = (status) =>
        indicatorColors.get(status) ?? 'black';



    const updateStatuses = () => {

        let ordered = new Map;


        /*
         *  Syncronize Status Indicator
         */

        (() => {

            for(const element of indicator.children){

                const { name } = element.dataset;

                if(statuses.has(name) && !ordered.has(name))
                    ordered.set(name,element);
                else
                    element.remove();
            }
        })()


        /*
         *  Update Indicators
         */

        (() => {

            for(const [ name , status ] of statuses.entries()){

                if(!ordered.has(name)){
                    const element = document.createElement('file');
                    element.dataset.name = name;
                    indicator.appendChild(element);
                    ordered.set(name,element);
                }


                const { style } = ordered.get(name);

                style.backgroundColor = indicatorColor(status);;
                style.height = `${ 70 / statuses.size }px`;
            }
        })()


        /*
         *  Hide if not relevant.
         */

        (() => {

            const { style , children } = indicator;

            style.display = [...children].isEmpty() 
                ? 'none' 
                : 'flex' ;

        })()
    }



    const resetMarking = (element) =>
        element.children[0].style.backgroundColor = '';
    
    const resetMarkings = () => selectAll('post')
        .forEach(resetMarking);
    

    const queueFiles = () => {

        console.log(`Queuing files ${ files.length }`);

        sendMessage({
            action : 'download.append' ,
            data : {
                files : files.map(({ name , url }) => ({ name , url }))
            }
        },() => {});

        files = [];
        resetMarkings();
        append.style.display = 'none';
    }

    const updateSelectionMode = () => {

        const { style } = document.documentElement;

        const cursor = selectionMode
            ? 'var(--cursor-selector-green)'
            : 'var(--cursor-selector-red)' ;

        style.setProperty('--selector-cursor',cursor);
    }


    /*
     * Listeners
     */

    (() => {

        let x , y , width , height ;
        let isSelecting = false;


        const normalizedBounds = (...args) => {

            let [ X = x , Y = y , Width = width , Height = height ] = args;

            if(Width < 1)
                [ X , Width ] = [ X + Width , - Width ];

            if(Height < 1)
                [ Y , Height ] = [ Y + Height , - Height ];

            return [ X , Y , Width , Height ];
        }

        const updateSelection = () => {

            const { style } = selection;

            const [ x , y , width , height ] = 
                normalizedBounds();

            style.height = `${ height }px`;
            style.width = `${ width }px`;
            style.left = `${ x }px`;
            style.top = `${ y }px`;
        }

        const selectedPosts = () => {

            const posts = selectAll('post');

            return posts.filter((post) => {

                const [ image ] = post.children;

                const { x , y , width , height } = 
                    image.getBoundingClientRect();
                
                const [ X , Y , Width , Height ] = 
                    normalizedBounds();


                const outside =
                    (x > X + Width) ||
                    (x + width < X) ||
                    (y > Y + Height) ||
                    (y + height < Y);

                return ! outside;
            })
        }


        const markElement = (element,color) =>
            element.children[0].style.backgroundColor = color;

        const markSelected = (color) => files
            .forEach(({ element }) => markElement(element,color));


        const selectPosts = () => {

            const selected = selectedPosts()
                .map((element) => ({
                    element : element ,
                    name : element.dataset.id ,
                    url : element.dataset.source
                }));


            if(selected.length > 0)
                append.style.display = 'flex';


            if(selectionMode)
                files = files.concat(selected);
            else {
                files = files.filter((file) => {
                    
                    for(const post of selected)
                        if(post.name === file.name)
                            return false;

                    return true;
                });
            }


            const unique = new Map;

            for(const file of files)
                unique.set(file.name,file);

            files = [...unique.values()];

            filecount.innerText = files.length;
        }


        /*
         *  Selection Actions
         */

        on_selection_action = (event) => {

            const { button } = event;

            switch(button){
            case 0 : return on_start_selection(event);
            case 2 :

                selectionMode = ! selectionMode;
                updateSelectionMode();

                return;
            }
        }


        /*
         *  Start Selection
         */

        on_start_selection = (event) => {

            const { pageX , pageY , button } = event;

            isSelecting = true;
            append.style.display = 'none';

            [ x , y ] = [ pageX , pageY ];
            [ width , height ] = [ 0 , 0 ];

            resetMarkings();
            updateSelection();
            selectPosts();
            markSelected('orange');

            window.addEventListener('mousemove',on_move_selection);
            window.addEventListener('mouseup',on_end_selection);
            posts.removeEventListener('mousedown',on_start_selection);
        }


        /*
         *  Resize Selection
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
        }


        /*
         *  End Selection
         */

        on_end_selection = (event) => {

            event.stop();

            isSelecting = false;
            selection.style.display = 'none';

            updateSelection();
            selectPosts();

            posts.addEventListener('mousedown',on_start_selection);
            window.removeEventListener('mousemove',on_move_selection);
        }

    })();


    /*
     *  Setup Download Interface
     */

    Download.init = () => {

        filecount = select('download > append > count');
        selection = select('download > selection');
        indicator = select('download > level');
        append = select('download > append');
        posts = select('posts');


        Settings.on('download_mode')((state) => {

            isActive = state;

            const { body } = document;

            body.classList[(state) ? 'add' : 'remove']('download');

            updateSelectionMode();

            if(state)
                posts.addEventListener('mousedown',on_selection_action);
            else {

                posts.removeEventListener('mousedown',on_start_selection);
                window.removeEventListener('mousemove',on_move_selection);
                window.removeEventListener('mouseup',on_end_selection);

                resetMarkings();
            }
        })


        const { connect } = chrome.runtime;

        const port = connect({ name : 'download' });

        port.onMessage.addListener((activities) => {

            activities.forEach(({ name , status }) => {

                statuses.set(name,status);

                updateStatuses();

                if([ 'complete' , 'failed' ].includes(status))
                    setTimeout(() => {

                        statuses.delete(name);
                        updateStatuses();

                    },2000);

            })
        })


        append.addEventListener('click',(event) => {
            event.stop();
            queueFiles();
        })
    }


    /*
     *  Toggle download mode.
     */

    Download.toggle = () =>
        Settings.toggle('download_mode');


    /*
     * Is currently downloading.
     */

    Download.isActive = () =>
        isActive;

})();
