// SPDX-License-Identifier: AGPL-3.0-or-later

(() => {

   const capitalized = ( value ) =>
      value.charAt(0).toUpperCase() +
      value.substring(1)

   const trimmed = ( value ) =>
      value.trim()


   /**
    *  Tag Id ⟶ Name
    */

   const WhiteSpaces = / +/g

   const Separator = / |_/

   const Brackets = /(?<=\w)\(/g

   const from = ( value ) => value
      .trim()
      .replaceAll(Brackets,' (')
      .replaceAll(WhiteSpaces,' ')
      .split(Separator)
      .map(trimmed)
      .map(capitalized)
      .join(' ')


   window.Tag_Name ??= {
      from
   }

})()
