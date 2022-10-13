(() => {

    window.TagName ??= {};


    const trim = (string) =>
        string.trim();

    const capitalize = (string) =>
        `${ string.charAt(0).toUpperCase() }${ string.substring(1) }`;


    /*
     *  Tag Id ⟶ Name
     */

    TagName.from = (string) => 
        string
        .trim()
        .replaceAll(/\w\(/g,(match) => match[0] + ' (')
        .replaceAll(/ +/g,' ')
        .split(/ |_/)
        .map(trim)
        .map(capitalize)
        .join(' ');

})();
