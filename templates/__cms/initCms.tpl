
{% if isAuth %}
   <script src="cms_internal_libs/tinymce/tinymce.min.js"></script>
   <script src="__cms/cms.js"></script>
   <link rel="stylesheet" href="__cms/cms.css">
{% endif %}

<script>

    // Set the current pages menu entry to active
    window.onload =  function() {
        // jquery alternative: $('.{{currentPage}}').addClass('active')
        var fileName = '{{currentPage}}' // alternatively use: window.location.pathname.split('/').pop();
        var menuItems = document.getElementsByClassName(fileName);
        for(i=0; i<menuItems.length; i++) {
            menuItems[i].classList.add('active');
        }
    }
</script>
