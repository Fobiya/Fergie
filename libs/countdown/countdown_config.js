jQuery(document).ready(function() {
    
    $('#countdown_dashboard').countDown({
					targetDate: {
						'day': 		01,
						'month': 	07,
						'year': 	2016,
						'hour': 	00,
						'min': 		00,
						'sec': 		00,
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