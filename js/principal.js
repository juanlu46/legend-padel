$(document).foundation();
$('.top-bar').on('sticky.zf.stuckto:top', function(){
    $(this).addClass('shrink');
}).on('sticky.zf.unstuckfrom:top', function(){
    $(this).removeClass('shrink');
});
$.backstretch([
    "img/imgBG/img_bg_1.jpg",
    "img/imgBG/img_bg_2.jpg",
    "img/imgBG/img_bg_3.jpg"
], {
    fade: 700,
    duration: 5000
});