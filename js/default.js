// hide impressum for international users
if(navigator.language != 'de' && navigator.language.indexOf('de-') != 0) {
	var el = document.querySelector('#impressum');
	if(el) {
		el.parentNode.removeChild(el);
	}
}
