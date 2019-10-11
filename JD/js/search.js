;(function($){
	function Dropdown($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.$searchBtn = $elem.find('.search-btn')
		this.$searchInput = $elem.find('.search-input')
		//2.初始化
		this.init();
	}
	Dropdown.prototype = {
		constructor:Dropdown,
		init:function(){
			
		},
		
	}

	Dropdown.DEFAULTS = {
		
	}



	$.fn.extend({
		dropdown:function(options){

			return this.each(function(){
				var $elem = $(this);
				var dropdown  = $elem.data('dropdown');
				if(!dropdown){
					options = $.extend({},Dropdown.DEFAULTS,options);
					dropdown = new Dropdown($elem,options);
					$elem.data('dropdown',dropdown)
				}
				if(typeof dropdown[options] == 'function'){
					dropdown[options]();
				}

			})
		}
	})





})(jQuery);