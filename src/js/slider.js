import 'slick-slider'



$(function () {
	$('.slider').slick({
		arrows: false,
		asNavFor: '.nature__dots',
	});
	$('.nature__dots').slick({
		slidesToShow: 3,
		asNavFor: '.slider',
		focusOnSelect: true
	});
});