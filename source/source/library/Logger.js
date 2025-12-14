
(() => {

    const parts = [
        [ '[' , 'gray' ] ,
        [ 'Neko' , '#FFCCCDAA' ] ,
        [ ']: ' , 'gray' ] ,
        [ '%s' , '#FFCCCD' ]
    ]

    const pattern = parts
        .map(([ text ]) => `%c${ text }`)
        .join('')

    const colors = parts
        .map(([ _ , color ]) => `color:${ color }` )

    const print = ( type ) => console[ type ]
        .bind(console,pattern,...colors)

    window.debug = print('debug')
    window.error = print('error')
    window.warn = print('warn')
    window.log = print('log')

})();
