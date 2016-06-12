$(function() {
    $('#login').submit(function(e){
        e.preventDefault();
        var form = $(this);

        $.post('/login', form.serialize())
            .done(function() {
                $('#myModal').modal('hide');
                $('.signin').toggleClass('hidden');
                $('.signout').toggleClass('hidden');
            })
            .fail(function() {
                $('.signin-error').toggleClass('hidden');
                form.find('input').val('');
            });
    });
})