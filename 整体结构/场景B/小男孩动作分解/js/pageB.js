// 第二幅场景画面
function pageB(element, pageComplete) {
	var $boy = element.find(".christmas-boy");

	var animationEnd = "animationend webkitAnimationEnd";

	// 小男孩动作
	var boyAction = {
		//走路
		walk: function() {
			var dfd = $.Deferred();
			$boy.transition({
				"right": "4.5rem"
			}, 4000, "linear", function() {
				console.log("123")
				dfd.resolve()
			});
			return dfd;
		},
		//停止走路
		stopWalk: function() {
			$boy.removeClass("boy-walk");
			$boy.addClass("boy-stand");
		},
		//继续走路
		runWalk: function() {
			$boy.addClass("walk-run");
		},
		//解开包裹
		unwrapp: function() {
			var dfd = $.Deferred();
			$boy.addClass("boy-unwrapp");
			$boy.removeClass("boy-stand");
			$boy.one(animationEnd, function() {
				dfd.resolve();
			})
			return dfd;
		},
		//换衣服 1-3
		strip: function(count) {
			$boy.addClass("boy-strip-" + count).removeClass("boy-unwrapp");
		},

		//人物用拥抱
		//重叠问题处理
		hug: function() {
			$boy.addClass("boy-hug").one(animationEnd, function() {
				$(".christmas-boy-head").show()
			})
		}
	}
	boyAction.walk()
		.then(function() {
			//停止走路
			boyAction.stopWalk();
		})
		.then(function() {
			return boyAction.unwrapp();
		})
		.then(function() {
			setTimeout(function() {
				boyAction.strip(1)
			},1000)
			setTimeout(function() {
				boyAction.strip(2)
			},2000)
			setTimeout(function() {
				boyAction.strip(3)
			},3000)
			setTimeout(function() {
				boyAction.hug();
			},4000)
		})
}
