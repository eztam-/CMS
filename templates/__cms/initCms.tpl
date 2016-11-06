


{% if isAuth %}
   <script src="tinymce/tinymce.min.js"></script>
   <script src="__cms/cms.js"></script>
   <link rel="stylesheet" href="__cms/cms.css">
{% endif %}

<script>

    // Set the current pages menu entry to active
    window.onload =  function() {
        // jquery alternative: $('.{{currentPage}}').addClass('active')
        var fileName = '{{currentPage}}' // alternatively use: window.location.pathname.split('/').pop();
        var cols = document.getElementsByClassName(fileName);
        for(i=0; i<cols.length; i++) {
            cols[i].classList.add('active');
        }
    }
</script>
