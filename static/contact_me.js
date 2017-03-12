$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            
            var subject = "Anfrage von "+name;
            
            $("#sendBtn").button('loading');
            
            $.ajax({
                url: "/sendmail",
                type: "POST",
                data: {
                    subject: subject,
                    message: "Name: "+name+"\nMail: "+email+"\nPhone: "+phone+"\n\n"+message
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                    $("#sendBtn").button('reset');
                },
                error: function() {
                	
                	var messageHtml = message+"%0D%0A%0D%0AName: "+name+"%0D%0AMail: "+email+"%0D%0APhone: "+phone;
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append('<strong>Es tut uns leid ' + firstName + ', Ihre Nachricht konnte leider nicht zugestellt werden. Schreiben Sie uns doch eine E-Mail an <a href="mailto:info@medicus-webicus.de?subject='+subject+'&body='+messageHtml+'">info@medicus-webicus.de</a> oder versuchen Sie es später noch einmal.');
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                    $("#sendBtn").button('reset');
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
