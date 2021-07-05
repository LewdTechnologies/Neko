/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   window.TagName ??= {};


   /*
         HELPER
   */

   const trim = (string) =>
      string.trim();

   const capitalize = (string) =>
      (string[0]?.toUpperCase() ?? '') + string.substring(1);


   /*
         TAG ID -> NAME
   */

   TagName.from = (string) => {

      string = string
         .trim()
         .replace(/\w\(/,(match) => match[0] + ' (')
         .replace(/ +/,' ')
         .split(/ |_/)
         .map(trim)
         .map(capitalize)
         .join(' ');

      return string;
   };

})();
