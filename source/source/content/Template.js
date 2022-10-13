
(() => {

    const { clear , time } = console;
    

    clear();
    time('Page Load');


    const create = (type) =>
        document.createElement(type);

    const addToBody = (element) =>
        document.body.appendChild(element);

    const insertTemplate = () => {

        Blank = create('div');
        Blank.id = 'blank';
        Blank.innerHTML = Template;

        delete Template;

        addToBody(Blank);
    }


    /*
     *  Wait until the HTML is present.
     */

    document.documentElement.id = 'original';

    Void((check) => {

        if(document.body){
            insertTemplate();
            return;
        }
        
        return Timeout(check);
    })

})();
