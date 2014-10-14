$(document).ready(function() {
    $('tr').click(function() {
        $(this).toggleClass("tdclick");
        $('.text').text($('.tdclick > td').text());
    });
});
