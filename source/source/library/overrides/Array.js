

(() => {


    const override = (name) => (method) =>
        Array.prototype[name] = method;
    
    const capitalize = (string) => 
        string.capitalize();


    /*
     *  Capitalize
     */

    override('capitalize')(function(){
        return this.map(capitalize) })


    /*
     * To Sentence
     */

    override('toSentence')(function(){
        return this.join(' ') })
        

    /*
     * To Query
     */

    override('toQuery')(function(){
        return this.join('+') })


    /*
     * To Encoded URI Components
     */

    override('toEncodedURIComponents',function(){
        return this.map(toEncodedURIComponent) })


    /*
     *  Is Empty
     */

    override('isEmpty',function(){
        return this.length < 1 })

})();
