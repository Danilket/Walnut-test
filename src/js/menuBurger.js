
function burgerMenu(selector) {
	let menu = $(selector);
	let button = $('.menu__button');
	let buttonClose = menu.find('.menu__button--close');
	let list = $('.menu-mobile');
	let overlay = $('.menu__overlay');

	button.on('click', (e) => {
		e.preventDefault();
		toggleMenu()
	})

	buttonClose.on('click', (e) => {
		e.preventDefault();
		toggleMenu()
	})

	overlay.on('click', () => toggleMenu());

	function toggleMenu() {
		list.toggleClass('active');
		overlay.toggleClass('overlay-active');

		if (list.hasClass('active')) {
			$('body').css('overflow', 'hidden');
		} else {
			$('body').css('overflow', 'visible');
		}
	}
}

burgerMenu('.menu-mobile')