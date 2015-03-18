$( document ).ready(function() {
  // hide impressum for international users
  if(navigator.language != 'de' && navigator.language.indexOf('de-') != 0)
  	$('#impressum').remove();

  // inject linkedin placeholder
  $("#linkedin-placeholder").html('<script src="//platform.linkedin.com/in.js" type="text/javascript">lang: en_US</script><script type="IN/Share" data-url="http://eonmatrix.com" data-counter="top"></script>');
});
