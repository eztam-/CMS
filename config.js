"use strict";
/**
 *  The CMS configuration. All configuration settings are optional and will override the default config if the are set.
 */
module.exports = {
  defaultLanguage:   'de',
  supportedLanguages:['de','en'],
  users: [
    // Example entry for an user with name "a" and password "a"
    {name: "a", password: "$2a$08$Bo8ImxqyJh5cPNv6hgpEj.V8TP/5zRaD5eduHdwiKBYPl5l6KOkSm",  email: "a@mail.com" },
  ]
};
