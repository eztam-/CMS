#CMS

## Basic concept
 TODO

## Authentication
  TODO

## i18n


Enabling multiple language support can easily be done by adjusting the configuration file cms/conf/conf.js like in the following example:

```javascript
    module.exports = {
      // ...
      defaultLanguage:  'de',
      supportedLanguages:['de','en']
    };
```

Translated elements needs to be annotated with the HTML lang attribute whereby the special attribute value lang="all" causes an element to be visible anyway, regardless which language is currently selected by the user.  

```html
    <!--This element is only visible if the currently selected language is de -->
    <h4 lang="de" cms="1">Sehr geehrte Patientinnen und Patienten,</h4>
    <!--This element is only visible if the currently selected language is en -->
    <h4 lang="en" cms="2">Dear patients,</h4>
    <!--This element always visible -->
    <h3 lang="all" cms="3">Dr. Fu Bar</h3>
```

The language of a specific page could simply be changed via attaching the GET param ?lang=de to the URL. CMS is automatically adding this param to all `<a href="">` elements in the document so if the language is once selected it will not change when the user klicks on a link. Adding toggle buttons for changing the language to your page could simply be done like this:

```html
    <a class="lang-button-de" href="/?lang=de">DE</a>
    <a class="lang-button-en" href="/?lang=en">EN</a>
```

The i18n concept underlies some rules described in the following. If one of this rules is violated at any location within a HTML document, then the related document is annotated with an error message that is shown directly in the website.

####Rules:
* Nested elements with cms attributes are not allowed
* Nested elements with lang attributes are not allowed
* Elements with cms attribute but without lang attribute are not allowed
* Elements with a lang attribute are not allowed within a cms element
