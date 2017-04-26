
// 리사이즈 처리

(function($,window){

	function _ImageSlider2(){
		this.init();
		this.setupEvent();
		this.auto();
	}

	_ImageSlider2.prototype={
		init:function(){
			this.timer = null;
			this.curIndex = 0;
			this.nextIndex = 1;

			this.curImage = null;
			this.nextImage = null;

			this.$images = $(".sliderImg ul li");
		},

		auto:function(){
			var self = this;
			this.timer = setInterval(function(){
				self.move();
			},2000)
		},

		move:function(){
			if(this.curIndex > 3){
				this.curIndex = 0
			}
			if(this.nextIndex > 3){
				this.nextIndex = 0
			}

			$(".sliderIndex li").removeClass("active");
			$(".sliderIndex li").eq(this.curIndex).addClass("active");

			this.curImage = this.$images.eq(this.curIndex);
			this.nextImage = this.$images.eq(this.nextIndex);

			this.$images.css({'left' : 9999});
			this.curImage.css({'left' : 0});
			this.nextImage.css({'left' : 1140});

			this.curImage.animate({ 
				left: '-1140px'
			});

			this.nextImage.animate({ 
				left: 0
			});

			this.curIndex++;
			this.nextIndex++;
		}
	}

	window.ImageSlider2 = _ImageSlider2;

})($,window)