import Inputmask from "inputmask";
import 'jquery-validation'
import "@fancyapps/fancybox"

$('[data-fancybox]').fancybox({
	autoFocus: false,
});


$("#number").inputmask({
	mask: '+7 (999) 999-99-99',
	showMaskOnHover: false,
});

$('.callback__form').validate({
	groups: {
		username: "tel name checkbox"
	},
	rules: {
		tel: {
			required: true
		},
		name: {
			required: true,
			minlength: 2
		},
		checkbox: {
			required: true
		}
	},
	messages: {
		tel: {
			required: 'Пожалуйста заполните все поля, отмеченные звездочкой'
		},
		name: {
			required: 'Пожалуйста заполните все поля, отмеченные звездочкой',
			minlength: 'Длина должна быть больше 2 символов'
		},
		checkbox: {
			required: 'Пожалуйста заполните все поля, отмеченные звездочкой'
		}
	},
	errorPlacement: function (error, element) {
		if (element.attr("name") == "tel" || element.attr("name") == "name" || element.attr("name") == "checkbox") {
			error.insertAfter(".callback__data");
		} else {
			error.insertAfter(element);
		}
		console.log(error);
	},
	submitHandler: function () {
		$.fancybox.close();
		$.fancybox.open($('#modal-thanks'));
	}
})