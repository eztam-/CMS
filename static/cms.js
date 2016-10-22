var cmsElemSelector = 'div[cms]';

tinymce.init({
    selector : cmsElemSelector,
    inline : true,
    menubar : false,
    plugins : 'code textcolor colorpicker link ',
    toolbar1 : 'formatselect bold italic underline | alignleft aligncenter alignright alignjustify | fontsizeselect',
    toolbar2 : 'undo redo | forecolor backcolor link unlink | bullist numlist outdent indent | code'
});

var saveContent = function(){
    var pageContent = {};
    var elements = document.querySelectorAll(cmsElemSelector);
    for (var i = 0; i < elements.length; i++) {
      var elem = elements[i];
      var contentId = elem.getAttribute("cms");
      pageContent[contentId] = elem.innerHTML ;
    }

    $.ajax({
        url: window.location.href,
        type: 'PUT',
        data: JSON.stringify(pageContent),
        contentType: 'application/json',
        success: function(result) {
            // TODO
        },
        error: function(jqXHR, textStatus, errorThrown) {
          alert("Error! Could not save content");
        }
     });

}
