#CMS

## Basic concept
 TODO

## Template inheritance

## Variables
### How to access variables
The CMS provides some variables that can be used on the server side in the templates via nunjucks or on the client side via Javascript. On the server side the variables could be used in the typically nunjucks style like:
```javascript
    {% if isAuthenticated %}
        <a href="/logout">Logout</a>
    {% else %}
        <a href="/login">Login</a>
    {% endif %}
```

On the client side all variables are accessible via the globally defined `CMS` object like this:
```javascript
    console.log("The current page is: " + CMS.currentPageName);
```
### List of variables
**_language_**

The currently selected language code. If no language is selected, then the value is equal to the `defaultLanguage`. For further information read section *i18n*.

**_defaultLanguage_**

The default language can be configured in the cms/conf/conf.js. For further information read section *i18n*.

**_isAuthenticated_**

Is true if the user is authenticated. Otherwise false. For further information read section *Authentication*.

**_currentPageName_**

This variable contains the name of the current page, that would be `home` e.g for a page with the URL http://YOUR_DOMAIN/home.
The variable `currentPageName` can also be used as a CSS class. This is useful if you want to highlight the currently active navigation menu entry with a special CSS style. The CMS is adding automatically an additional class `active` to all elements that have a class matching the `currentPageName`. In the following code example of a navigation bar the menu entry of the current page will get the class `active`.

```html
      <ul class="nav navbar-nav">
        <li class="home"><a href="/">Home</a></li><!-- Notice! The page root is always redirected to /home-->
        <li class="info"><a href="info">Info</a></li>
      </ul>
```

## Authentication

TODO this needs to be documented in detail

```javascript
    {% if isAuthenticated %}
        <a href="/logout">Logout</a>
    {% else %}
        <a href="/login">Login</a>
    {% endif %}
```

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

The language of a specific page could simply be changed via attaching the GET parameter ?lang=de to the URL. CMS is automatically adding this param to all `<a href="">` elements in the document so if the language is once selected it will not change when the user klicks on a link. CMS is not adding the parameter to anchor links on the same page nor to the language toggle buttons which are indicated by a class *lang-button-[language code]*. 
Adding toggle buttons for changing the language to your page could simply be done like this:

```html
    <a class="lang-button-de" href="/?lang=de">DE</a>
    <a class="lang-button-en" href="/?lang=en">EN</a>
```

**Note!** Don't add the lang parameter manually to links referencing an anchor on the same page like in the following example since it will cause the page to reload in most browsers.
```html
    <!-- Don't do this! -->
    <a lang="de" href="#contact?lang=de">Kontakt</a>
    <a lang="en" href="#contact?lang=en">Contact</a>
```

The i18n concept underlies some rules described in the following. If one of this rules is violated at any location within a HTML document, then the related document is annotated with an error message that is shown directly in the website.

#### Rules:
* Nested elements with cms attributes are not allowed
* Nested elements with lang attributes are not allowed
* Elements with cms attribute but without lang attribute are not allowed
* Elements with a lang attribute are not allowed within a cms element
