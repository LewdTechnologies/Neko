
(() => {

    const { prototype } = String;


    const override = (name) => (method) =>
        prototype[name] = method;


    /*
     *  Capitalize
     */

    override('capitalize')(function(type){
        return `${ this.charAt(0).toUpperCase() }${ this.substring(1) }` })


    /*
     *  To Words
     */

    override('toWords')(function(){
        return this.split(/ +/) })


    /*
     *  Uses Start
     */

    override('usesStart')(function(sequence){
        return (this.startsWith(sequence))
            ? [ this.slice(sequence.length) , true ]
            : [ this , false ] ;
    })


    /*
     *  Remove Matches
     */

    override('remove')(function(regex){
        return this.replaceAll(regex,'') })

})();
