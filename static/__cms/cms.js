




// Set the current pages menu entry to active
window.onload  =  function() {
		cms$('.' + CMS.currentPageName).addClass('active');
}


/**
 * Adds language request parameters to all hrefs on the page.
 */
function addLanguageParamToHrefs() {
		if(CMS.language == CMS.defaultLanguage){
				return;
		}
		cms$('a[href]').each(function() {
				var href = cms$(this).attr('href');
				// TODO The whole if block and the expression itself should be reconsidered
				if( href.search('lang=') === -1){
						var separator = (href.indexOf('?') != -1 ? "&" : "?");
						cms$(this).attr('href',href + separator + 'lang=' + CMS.language);
				}
		});
}
cms$(document).ready(addLanguageParamToHrefs);






/**
 * This block is just executed when the user is authenticated
 */
if(CMS.isAuthenticated){
		// this css selector defines, which elements might be edited.
		var cmsElemSelector = '[cms]';

		tinymce.init({
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

				cms$.ajax({
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
}
