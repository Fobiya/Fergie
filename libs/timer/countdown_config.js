jQuery(document).ready(function() {
    
    $('#countdown_dashboard').countDown({
					targetDate: {
						'day': 		10,
						'month': 	06,
						'year': 	2016,
						'hour': 	23,
						'min': 		59,
						'sec': 		59,
						'utc':      true,
						},
					omitWeeks: true
				});
    //
	// $('#countdown_dashboard').countDown({
	// 		targetOffset: {
	// 	'day':      3,
	// 	'month':    0,
	// 	'year':     0,
	// 	'hour':     0,
	// 	'min':      0,
	// 	'sec':      0
	// },
	// onComplete function
	// 	onComplete: function() { $('#complete_info_message').slideDown() }
	// });


});