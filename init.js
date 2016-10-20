
function lazzyLoadTinyMce(onSuccess) {
    var scriptTag = document.createElement('script'); 
    scriptTag.onload = onSuccess;
    scriptTag.src = "tinymce/tinymce.min.js"; 
    scriptTag.async = false;
    var headTag = document.getElementsByTagName('head')[0];
    headTag.appendChild(scriptTag);
    
}


function runCmsDemo(showMessageElementId) {
	showBubble(true, showMessageElementId);
	
		lazzyLoadTinyMce( function(){
			tinymce.init({
				selector : 'div[cms]',
				inline : true,
				menubar : false,
				plugins : 'code textcolor colorpicker link',
				toolbar1 : 'formatselect bold italic underline | alignleft aligncenter alignright alignjustify | code ',
				toolbar2 : 'undo redo | forecolor backcolor link unlink | bullist numlist outdent indent ',
				setup : function(ed) {
					ed.on('focus', function(e) {
						showBubble(false, showMessageElementId);
					});
				}
			});
			setTimeout(function(){	
				$( "div[cms]" ).addClass('cmsHighLight');
			}, 0);	
			
		}	
	);	
	
	

}

function initTinyMce(){
	
	
}

var exitCmsDemoMode = function() {
	showBubble(false);
	showExitDemoButton(false);
	tinymce.EditorManager.editors = [];
}

/**
 * Shows and hides the CMS demo bubble
 */
var timer;
function showBubble(show, showMessageElementId) {
	var bubble = $("#cms-demo-bubble");
	if (!show) {
		bubble.removeClass("animate-bubble");
		bubble.css("display", "none");
		window.clearInterval(timer);
		showExitDemoButton(true);
		return;
	}

	bubble.css("display", "block");
	var demoBubblePos = $("#"+showMessageElementId);
	var offset = demoBubblePos.offset();
	var height = demoBubblePos.outerHeight();
	var width = demoBubblePos.outerWidth();
	var demoCenterPos = offset.left + width / 2;
	bubble.offset({
		top : offset.top + height + 19,
		left : demoCenterPos - 125
	})

	timer = window.setInterval(animateBubble, 2500);
	bubble.addClass("animate-bubble");

	function animateBubble() {
		bubble.toggleClass("animate-bubble");
	}

}

var exitBtnTimer = null;
function showExitDemoButton(show) {

	var button = $("#exit-demo-button");
	if (!show) {
		button.css("display", "none");
		button.removeClass("animate-bubble");
		button.css("display", "none");
		//window.clearInterval(exitBtnTimer);
		exitBtnTimer = null;
		return;
	}

	if (exitBtnTimer != null) {
		return;
	}

	button.css("display", "block");
	exitBtnTimer = window.setInterval(animateBtn, 1500);
	button.addClass("animate-bubble");

	function animateBtn() {
		button.toggleClass("animate-bubble");
	}

}