(function($, window){

	function _Accordian(){
		this.init();
	}

	_Accordian.prototype = {
		init:function(){
			this.$title = $(".que-title");
			this.idx = null;

			this.setEvent();
		},

		setEvent:function(){
			var self = this;
			this.$title.on("click", function(e){
				// console.log(e.currentTarget); 
				// que-title 선택자 잡힘

				self.idx = self.$title.index(e.currentTarget);

				var target = $(e.currentTarget);

				if(target.hasClass("active")){ 
					// console.log(self.$title);
					target.removeClass("active");
					target.children().slideUp(500);
					// target.children().show(2000, "linear");
				}else{
					target.addClass("active");
					target.children().slideDown(500);
					// target.children().hide(2000, "linear");
				}

				/*self.$title.eq(self.idx).addClass("active");*/
			})


		}
	}

	window.Accordian = _Accordian;

})($,window)