
(() => {

    window.Pagination ??= {};

    let pages , pagination;


    const page = parseInt(new URL(window.location).searchParams.get('page') ?? 1) ?? 1;


    const goto = (page) => {

        const url = Search.Url.fromPage();
        url.page = page;
        url.redirectTo();
    }


    /*
     *  Setup Pagination
     */

    Pagination.init = () => {

        pagination = select('pagination');
        pages = selectAll('pagination > page');

        const
            previous = select('pagination > previous') ,
            next = select('pagination > next') ;


        previous.addEventListener('click',() => goto(page - 1));
        previous.addEventListener('contextmenu',() => goto(1));

        next.addEventListener('click',() => goto(page + 1));
        next.addEventListener('contextmenu',() => goto(750));


        let middle = page;

        if(page < 4){
            previous.remove();
            middle = 4;
        }

        if(page > 747){
            next.remove();
            middle = 747;
        }


        pages.forEach((button,offset) => {

            const position = middle + offset - 3;

            button.innerText = position;

            if(position === page)
                button.classList.add('current');

            button.addEventListener('click',() => {

                const url = Search.Url.fromPage();
                url.page = position;
                url.redirectTo();
            })
        })
    }

})()
