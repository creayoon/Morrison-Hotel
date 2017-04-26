(function($,window){

	function _ImageSlider(){
		// index.html, dining.html 둘다
		this.init($(".slider .imgWrapper"));
	}

	_ImageSlider.prototype = {
		init:function(selector){
			this.idx = 0;
			this.timerID = null;
			this.clickImgPos = null;
			this.leftMove = null;
			this.wrapper = selector;
			this.$images = this.wrapper.children('a');

			this.wrapper.css({
				transform : "translate(" + (-window.innerWidth/4) + "px, 0px)"
			});
			
			this.initImage();
			this.setupEvent();
			this.auto();
		},

		initImage:function(){
			// 가로
			this.browserW = window.innerWidth;
			this.imageW = this.browserW/2;
			this.firstImagePos = this.browserW/4;
			this.totalW = this.imageW * (this.$images.length-3); // 클론 갯수 빼줘야함

			// wrapper 크기, 위치
			this.$images.width(this.imageW);
			this.wrapper.width(this.imageW * this.$images.length); 
		},

		setupEvent:function(){
			var self = this;

			// 리사이즈
			$(window).resize(function(e){
				self.wrapper.css({
					transform : "translate(" + (-window.innerWidth/4) + "px, 0px)"
				});
				self.initImage();
				
				// console.log(self.browserW, self.imageW, self.firstImagePos, self.totalW);

			});


			// 마우스 들어왔을 때 stop, start
			this.$images.on('mouseenter', function(){
				clearInterval(self.timerID); 
			});

			this.$images.on('mouseleave', function(){

				// self.auto();
			});

			this.$images.on('click', function(e){
				var clickIdx = self.$images.index(e.currentTarget);

				if(clickIdx > self.idx){
					self.next();
				}else{
					self.prev();
				}
			});
		},

		auto:function(){
			var self = this;
			this.timerID = setInterval(function(){
				self.move();
			}, 1300);
		},

		move:function(){
			var self=this;
			// 다 돌았을때 transition 껐다 켜기
			if(this.idx > 6){
				this.idx = 0;

				this.wrapper.css({ 
					transition : 'none',
					transform : "translate("+(-this.firstImagePos)+"px, 0px)"
				});

				setTimeout(function(){
					self.wrapper.css({ 
						transition : '0.5s'
					});	
				}, 100); 
			}

			this.leftMove = (-this.imageW)*this.idx;

			this.wrapper.css({
				// 여기는 transition 일부러 안줌, 주면 앞으로 돌아감
				transform : "translate("+(-this.firstImagePos+this.leftMove)+"px, 0px)"
			});

			$(".sliderDot li").removeClass("active");
			$(".sliderDot li").eq(this.idx).addClass("active");

			this.idx++;

		},

		prev : function(){

			var self = this;
			if(this.idx <= 0){
				this.idx = 6; 

				this.wrapper.css({ 
					transition : 'none',
					transform : "translate("+((-this.firstImagePos)+(-this.imageW)*(this.$images.length-3))+"px, 0px)"
				});

				return;
			}

			// 바뀐 현재위치 업데이트 하려고
			this.leftMove = (-this.imageW)*this.idx;

			this.wrapper.css({
				transition : '0.5s',
				transform : "translate("+(-this.firstImagePos+this.leftMove+this.imageW)+"px, 0px)"
			});

			this.idx--;

			$(".sliderDot li").removeClass("active");
			$(".sliderDot li").eq(this.idx).addClass("active");
		},

		next : function(){
			var self = this;
			if(this.idx >= 6){
				this.idx = 0; 

				this.wrapper.css({ 
					transition : 'none',
					transform : "translate("+(-this.firstImagePos)+"px, 0px)"
				});

				return;
			}

			this.leftMove = (-this.imageW)*this.idx;
			
			this.wrapper.css({
				transition : '0.5s',
				transform : "translate("+(-this.firstImagePos+this.leftMove-this.imageW)+"px, 0px)"
			});

			$(".sliderDot li").removeClass("active");
			$(".sliderDot li").eq(this.idx-5).addClass("active"); // 첫번째 index 안나오는거 숫자 맞춰주려고

			this.idx++;

			
		}


	}


	window.ImageSlider = _ImageSlider;

})($,window);


