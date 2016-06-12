$(function() {
    $('#login').submit(function(e){
        e.preventDefault();

        $.post('/login', $(this).serialize())
            .done(function() {
                $('#myModal').modal('hide');
                $('.signin').toggleClass('hidden');
                $('.signout').toggleClass('hidden');
            })
            .fail(function() {
                $('.signin-error').toggleClass('hidden');
            });
    });
})