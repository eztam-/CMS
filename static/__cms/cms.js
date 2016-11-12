// this css selector defines, which elements might be edited.
// for experimenting you can visit:
// http://www.w3schools.com/css/tryit.asp?filename=trycss_sel_attribute_value
var cmsElemSelector = '[cms]';
// var cmsElemSelector = 'div[cms]'; // if you want to select only div elements
tinymce
		.init({
			selector : cmsElemSelector,
			inline : true,
			menubar : false,
			plugins : 'code textcolor colorpicker link ',
			toolbar1 : 'formatselect bold italic underline | alignleft aligncenter alignright alignjustify | fontsizeselect',
			toolbar2 : 'undo redo | forecolor backcolor link unlink | bullist numlist outdent indent | code',
			force_br_newlines : false,
			force_p_newlines : false,
			forced_root_block : '',
		});

var saveContent = function() {
	var pageContent = {};
	var elements = document.querySelectorAll(cmsElemSelector);
	for (var i = 0; i < elements.length; i++) {
		var elem = elements[i];
		var contentId = elem.getAttribute("cms");
		pageContent[contentId] = elem.innerHTML;
	}
	console.log(pageContent);

	$.ajax({
		url : window.location.href,
		type : 'PUT',
		data : JSON.stringify(pageContent),
		contentType : 'application/json',
		success : function(result) {
			// TODO
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("Error! Could not save content");
		}
	});

}
