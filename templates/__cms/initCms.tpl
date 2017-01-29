
<script src="cms_internal_libs/jquery/dist/jquery.min.js"></script>
<script>
    // Include JQuery with different variable than $ in order to avoud conflicts with other JQuery versions
    // included by the web site
    var cms$ = $.noConflict(true);
</script>


<!-- Style for showing the selected language elements only -->
<style>
  {% for l in supportedLanguages %}
      {% if l !== language  %}
          :lang({{language}}) {
              display: none !important;
          }
      {% endif %}
  {% endfor %}
</style>

<!-- Initialization of the global CMS constants -->
<script>
    var CMS = {
        language : '{{language}}',
        defaultLanguage : '{{defaultLanguage}}',
        currentPageName : '{{currentPage}}',
        isAuthenticated : {{isAuth}}
    }
</script>

{% if isAuth %}
   <script src="cms_internal_libs/tinymce/tinymce.min.js"></script>
   <link rel="stylesheet" href="__cms/cms.css">
{% endif %}

<script src="__cms/cms.js"></script>
