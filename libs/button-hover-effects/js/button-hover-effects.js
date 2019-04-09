$(function() {
	/* $('[class^="btn-"')
	 .on('mouseenter', function(e) {
	 $(this).removeClass('hovered');
	 })
	 .on('mouseout', function(e) {
	 $(this).addClass('hovered');
	 });*/

	$('.btn-6')
		.on('mouseenter', function(e) {
			var parentOffset = $(this).offset(),
				relX = e.pageX - parentOffset.left,
				relY = e.pageY - parentOffset.top;
			$(this).find('span').css({top:relY, left:relX})
		})
		.on('mouseout', function(e) {
			var parentOffset = $(this).offset(),
				relX = e.pageX - parentOffset.left,
				relY = e.pageY - parentOffset.top;
			$(this).find('span').css({top:relY, left:relX})
		});
	$('[href=#]').click(function(){return false});
});