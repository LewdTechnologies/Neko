/*
    COPYRIGHT 2021 @ LewdTechnologies

    CONTACT:
    # Email: LewdTechnologies@gmail
    # Website: Github.com/LewdTechnologies/Neko
*/


(() => {

   window.Page ??= {};


   const { search } = window.location;

   const parameter = new URLSearchParams(search);

   Page.page = parameter.get('page') ?? 0;

})();
