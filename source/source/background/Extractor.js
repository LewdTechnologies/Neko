
(() => {

    window.Extractor ??= {};


    const parser = new DOMParser;


    Extractor.process = ({ pageType , html }) => (resolve) => {

        html = `<html>${ html }</html>`;
        html = parser.parseFromString(html,'text/html');

        switch(pageType){
        
        case 'posts':
            Extractor.postsExtractor(html)(resolve);
            return;
            
        default:
            resolve({});
        
        }
    }

})();
