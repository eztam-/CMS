




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
				// Add the lang param to all hrefs except anchor links on the current page
				if( href.search(CMS.currentPageName+'#') === -1 && 	href.search('lang=') === -1 ){
						var separator = (href.indexOf('?') != -1 ? "&" : "?");
						cms$(this).attr('href', href + separator + 'lang=' + CMS.language);
				}
		});
}
cms$(document).ready(addLanguageParamToHrefs);


/** Marks the language button of the currently selected language as active */
cms$(document).ready(function(){
		cms$( ".lang-button-" + CMS.language ).addClass( "lang-button-active" );
});


/**
 * Checks the current page for CMS markup errors and adds error messages to the DOM if errors exist.
 */
// TODO This method requires bootstrap.css since it is using bootstrap classes. It schould also work without bootstrap!
function checkCmsMarkupErrors(){
		// Check for nested cms elements
		var nestedCmsElems = cms$('[cms]').find('[cms]')
				.addClass( "alert alert-warning" )
				.before(createErrorMessage('<b>Error:</b> Nested elements with cms attributes are not allowed!'));

		// Check for nested lang elements
		var nestedLangElems = cms$('[lang]').find('[lang]')
				.addClass( "alert alert-warning" )
				.before(createErrorMessage('<b>Error:</b> Nested elements with lang attributes are not allowed!'));

		// Check for elements with cms attribute but without lang tag
		var cmsElemsWithoutLang = cms$('[cms]').not('[lang]')
				.addClass( "alert alert-warning")
				.before(createErrorMessage('<b>Error:</b> The element has a cms attribute but no lang attribute.'));

		// Check for elements with lang attribute within a cms element
		var langElemsInCms = cms$('[cms]').find('[lang]')
				.addClass( "alert alert-warning" )
				.before(createErrorMessage('<b>Error:</b> No elements with lang attribute are allowed within a cms element'));

		// Check for duplicate cms id's
		var duplicateCmsIdFound = false;
		var cmsElems = {};
		cms$('[cms]').each(function(){
		    var cmsId = cms$(this).attr('cms');
		    if(cmsId !== '' && cmsElems[cmsId]){
						cms$(this).addClass( "alert alert-warning" )
		    		.before(createErrorMessage('<b>Error:</b> Duplicate cms id ' + cmsId + ' !'));
						duplicateCmsIdFound = true;
		    }
		    cmsElems[cmsId] = true;
		});



		// If there are errors, add a generic error message at the beginning of the page
		if(nestedCmsElems.length >0 || cmsElemsWithoutLang.length > 0 || langElemsInCms.lengt >0 || nestedLangElems.length >0 || duplicateCmsIdFound ){
				var message= "There are CMS errors in the current page. The related elements are highlighted and annotated below.";
				cms$('body').prepend(createErrorMessage(message));
		}

		function createErrorMessage(errorMessage){
				return '<div class="alert alert-danger">'+errorMessage+'</div>'
		}
}
cms$(document).ready(checkCmsMarkupErrors);



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
