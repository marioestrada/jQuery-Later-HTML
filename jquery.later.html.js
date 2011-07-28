/**
 * jQuery Later HTML
 *
 * @url		http://github.com/marioestrada/jquery-later-html
 * @author	Mario Estrada <me@mario.ec>
 * @version	1.0
 */
(function($)
{

var inview = [];
var inview_count;

getViewportDimensions = function()
{
	var height = window.innerHeight;
	var width = window.innerWidth;
	var mode = document.compatMode;
	
	if(mode || !$.support.boxModel)
	{
		width = (mode == 'CSS1Compat') ? document.documentElement.clientWidth : document.body.clientWidth;
		height = (mode == 'CSS1Compat') ? document.documentElement.clientHeight : document.body.clientHeight;
	}

	return { height: height, width: width };
}

elementInView = function(el) {
	var width = $(el).width();
	var height = $(el).height();
	var offset = $(el).offset();
	
	var vp_dimensions = getViewportDimensions();
	var y_offset = (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
	var x_offset = (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
	
	return(
		offset.top < (y_offset + vp_dimensions.height) &&
		offset.left < (x_offset + vp_dimensions.width) &&
		(offset.top + height) > y_offset &&
		(offset.left + width) > x_offset
	);
}

replaceLaterHtml = function(el)
{
	var elem = $(el);
	var content = elem.html();
	var delay = elem.data('delay') || 1;
		
	content = content.replace(/<l:script/g, '<script');
	content = content.replace(/<\/[\s]*l:script>/g, '</script>');
	
	setTimeout(function()
		{
			removeWrapper(elem).replaceWith(content);
		}, delay);
}

removeWrapper = function(el)
{
	var elem = $(el);
	var wrapper = elem.parent('.x_later_html');
	if(wrapper.length)
	{
		elem.unwrap().siblings('.x_later_html_remove').remove();
	}
	return elem;
}

$.fn.laterHtml = function()
{
	var res = this.each(function()
	{
		var elem = $(this);
		if(elem.data('inview'))
		{
			var width, height;
			
			elem.wrap('<div class="x_later_html" />');
			var wrapper = elem.parent('.x_later_html');
			
			if(width = elem.data('placeholder-width'))
				wrapper.width(width);
			if(height = elem.data('placeholder-height'))
				wrapper.height(height);
			
			if(!elementInView(wrapper[0]))
			{
				wrapper.prepend('<span class="x_later_html_remove">&nbsp;</span>');
				inview.push(elem);
			}else
				replaceLaterHtml(elem);
		}else{
			replaceLaterHtml(this);
		}
	});
	
	if(inview.length)
	{
		inview_count = inview.length;
		$(window).bind('scroll.xLaterHtml', function()
		{
			var elem, wrapper;
			for(i = 0; i < inview.length; i++)
			{
				elem = inview[i][0];
				wrapper = $(elem).parent('.x_later_html');
				
				if(wrapper.length && elementInView(wrapper[0]))
				{
					replaceLaterHtml(elem);
					inview[i][0] = null;
					inview_count--;
				}
			}
			
			if(inview_count <= 0)
			{
				$(window).unbind('.xLaterHtml');
				inview = [];
			}
		});
	}
	
	return res;
}

$(function()
{
	$('script[type="text/x-later-html"]').laterHtml();
});
	
})(jQuery);