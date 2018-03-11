(function($){
	var headerGutter;
	window.mainNavFlag = false;
	$(document).ready(function(){
			/*  Navigation click animate  */
		$headerGutter = $('.navigation-tab').height()-1;
		$('.navigation-panel').each(function(){
			var $this = $(this);
			var html ='<div class="clearfix"></div><select class="responsive_nav">'+'<option value="">Go To...</option>';
				$this.find('a').each(function(){
					html += '<option value="'+$(this).attr('href')+'">';
					var $parent = $(this);
					while(!$parent.hasClass('navigation-panel')){
						if($parent.get(0).tagName == 'ul'){
							html += '&nbsp;&nbsp;';
						}
						$parent=$parent.parent();
					}
					html += $(this).html()+'</option>';
				});
				html += '</select>';
				$(html).insertAfter($this);
			});
		$('.responsive_nav').change(function(){
			window.location.href = $(this).val();
		});
		var $textHeight = $(this).find('.image-text').outerHeight();
		$(this).find('.image-text').css({'bottom' : - $textHeight});
		chronos_sticky();
	});

	$(document).on('click', '.navigation-tab a', function(e){
		var target = this.hash;
		var $target = $(target);
			if(target != '' && $target.length != 0) {
				window.mainNavFlag = true;
				var $mainWrapper = $('.main-body-wrap');
				var $topScroll = $target.offset().top - $mainWrapper.offset().top + $mainWrapper.scrollTop();
				$('html, body').stop(true).animate({'scrollTop' : $topScroll-$headerGutter}, 1000, 'easeInOutQuart');	
			}
	});

	$(window).load(function(){
		$headerGutter = $('.navigation-tab').height()-1;
		var target = window.location.hash;
		var $target = $(target);
		if($('.main-body-wrap').length > 0){
			if(target != '' && $target.length != 0) {
				window.mainNavFlag = true;
				var $mainWrapper = $('.main-body-wrap');
				var $topScroll = $target.offset().top - $mainWrapper.offset().top + $mainWrapper.scrollTop();
				$('html, body').stop(true).animate({'scrollTop' : $topScroll-$headerGutter}, 1000, 'easeInOutQuart');	
			}
		}
		chronos_sticky();
	});
	$(window).resize(function(){
		chronos_sticky();
		chronos_gallery();
	});
	
	$(window).scroll(function(){
		chronos_sticky();
		window.mainNavFlag = true;
	});

function chronos_sticky(){
	var wind_scr = $(window).scrollTop();
	var endIndex = $('#index').height();
	if($(window).width() > 1140){
		if(wind_scr > endIndex) $('.navigation-tab').addClass('sticky');
		else $('.navigation-tab').removeClass('sticky');
	}
	else{
		$('.navigation-tab').removeClass('sticky');
	}
	var $windScr = $(window).scrollTop();
	var $windowHeight = $(window).height();
	if($('.main-body-wrap').length > 0){
		$('.navigation-panel a').each(function(){
			if (window.mainNavFlag == true) {
				if($(this).attr('href').indexOf('#') >= 0){
					var $offsetElement = $($(this).attr('href').substr($(this).attr('href').indexOf('#')));
					var $offsetTop = $offsetElement.offset().top;
					if(($offsetTop >= $windScr && $offsetTop <= $windScr + 1/2 * $windowHeight) || ($offsetTop+$offsetElement.height() >= $windScr + 1/2 * $windowHeight && $offsetTop+$offsetElement.height() <= $windScr + $windowHeight)){
						$('.navigation-panel li').removeClass('active');
						$(this).parent().addClass('active');
					}
					
				}
			}
		});
	}
}
$(document).on('mouseenter', '.navigation-panel li', function(){
	var $elementHeight = $(this).find('.navigation-sub-pane li:first').height();
	var $elementCount = $(this).find('.navigation-sub-pane li').length;
	if($elementCount > 0) {
		var $submenuHeight = $elementHeight*$elementCount;
		$(this).find('.navigation-sub-pane').stop(true).animate({height : $submenuHeight}, 500);
	}
});
$(document).on('mouseleave', '.navigation-panel li', function(){
	var $elementCount = $(this).find('.navigation-sub-pane li').length;
	if($elementCount > 0) $(this).find('.navigation-sub-pane').stop(true).animate({height : 0}, 70*$elementCount);
});
function chronos_gallery(){
		var $textHeight = $('.image-text').height() + 48;
		$('.image-text').css({'bottom' : - $textHeight});
}
})(jQuery);