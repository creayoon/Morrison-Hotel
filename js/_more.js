(function($,window){

	function _More(){
		this.init();
	}

	_More.prototype = {
		init:function(){
			this.offset = 0;
			this.setupEvent();
		},

		setupEvent:function(){
			var self = this;
			$(".more").on("click", function(){
				self.more();
			})
		},

		more:function(){
			var self = this;
			$.ajax({
				url: "js/more.json",
				method: "GET",
				dataType: "json"
			}).done(function(json){
				json = json.slice(self.offset * 3, 3+(self.offset * 3));
				if(json.length < 3){
					$(".more").hide();
				}
				console.log(json);

				json.forEach(function(row, idx){
					console.log(idx);

					var li = $("<li>");
					if(idx == 2 ){
						li.addClass("third-room");
					};

					var img = $("<img>").attr("src", row.src);
					var title = $("<h3>").append($("<a>").text(row.title));
					var dscr1 = $("<span>").text(row.dscr1 + ' ');
					var price = $("<span>").text(row.price).addClass("room-price");
					dscr1.append(price);
					price.after(' per night');
					var more = $("<a>").text(row.moreView).addClass("view-room-details");

					li.append(img, title, dscr1, more);
					$(".room-arcv > ul").append(li);

				});

				self.offset++;
			});
		}
		
	}

	window.More = _More;

})($, window);


