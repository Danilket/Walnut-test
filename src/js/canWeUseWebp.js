// canWeUseWebp

function canUseWebp() {
	let elem = document.createElement('canvas');
	if (!!(elem.getContext && elem.getContext('2d'))) {
		return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
	}
	return false;
}

window.onload = function () {
	let images = document.querySelectorAll('[data-bg]');
	for (let i = 0; i < images.length; i++) {
		let image = images[i].getAttribute('data-bg');
		images[i].style.backgroundImage = 'url(' + image + ')';
	}

	let isitFirefox = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./);
	let firefoxVer = isitFirefox ? parseInt(isitFirefox[1]) : 0;

	if (canUseWebp() || firefoxVer >= 65) {
		let imagesWebp = document.querySelectorAll('[data-bg-webp]');
		for (let i = 0; i < imagesWebp.length; i++) {
			let imageWebp = imagesWebp[i].getAttribute('data-bg-webp');
			imagesWebp[i].style.backgroundImage = 'url(' + imageWebp + ')';
		}
	}
};