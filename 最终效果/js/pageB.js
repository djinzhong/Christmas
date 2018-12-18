// 第二幅场景画面
function pageB(element, pageComplete) {
	var $boy = element.find(".christmas-boy");
	//女孩
	var $girl = element.find(".girl");

	var animationEnd = "animationend webkitAnimationEnd";

	// 小男孩动作
	var boyAction = {
		//走路
		walk: function() {
			var dfd = $.Deferred();
			$boy.transition({
				"right": "4.5rem"
			}, 4000, "linear", function() {
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

	/**
	 * 小女孩动作
	 * @return {[type]} [description]
	 */
	var girlAction = {
		//小女起立
		standUp: function() {
			var dfd = $.Deferred();
			//起立
			setTimeout(function() {
				$girl.addClass("girl-standUp");
			}, 200)
			//抛书
			setTimeout(function() {
				$girl.addClass("girl-throwBook");
				dfd.resolve()
			}, 500)
			return dfd;
		},
		//走路
		walk: function(callback) {
			var dfd = $.Deferred();
			$girl.addClass("girl-walk");
			$girl.transition({
				"left": "4.5rem"
			}, 4000, "linear", function() {
				dfd.resolve()
			});
			return dfd;
		},
		//停止走路
		stopWalk: function() {
			$girl.addClass("walk-stop")
				.removeClass("girl-standUp")
				.removeClass("girl-walk")
				.removeClass("girl-throwBook")
				.addClass("girl-stand")
		},
		//选择3d
		choose: function(callback) {
			$girl.addClass("girl-choose")
				.removeClass("walk-stop");
			$girl.one(animationEnd, function() {
				callback();
			})
		},
		//泪奔
		weepWalk: function(callback) {
			$girl.addClass("girl-weep");
			$girl.transition({
				"left": "7rem"
			}, 1000, "linear", function() {
				$girl.addClass("walk-stop").removeClass("girl-weep")
				callback();
			})
		},
		//拥抱
		hug: function() {
			$girl.addClass("girl-hug").addClass("walk-run")
		}
	}
	/*3D显示*/
	function show() {
		var dfd = $.Deferred();
		var revolve = $('#carousel')
		setTimeout(function() {
			revolve.show();
		}, 1000)
		setTimeout(function() {
			revolve.transition({
				"transform": "scale(8) translateY(-.65rem)"
			}, 1000, "linear")
		}, 2000)
		setTimeout(function() {
			dfd.resolve()
		}, 3000)
		return dfd;
	}

	function rotateY(angle) {
		$("#spinner")
			.css({
				"transform": "rotateY(-" + angle + "deg)",
				"transition": "1s"
			})
			.css({
				"-moz-transform": "rotateY(-" + angle + "deg)",
				"-moz-transition": "1s"
			})
	}
	/*中间3D旋转动画*/
	function revolve() {
		var dfd = $.Deferred();
		var revolve = $('#carousel')
		var count = 0;
		var rotate = 120
		var angle;
		setTimeout(function() {
			angle = (count++) * rotate + 360;
			rotateY(angle);
		}, 1000)
		setTimeout(function() {
			angle = (count++) * rotate + 360;
			rotateY(angle);
		}, 3000)
		setTimeout(function() {
			angle = (count++) * rotate + 360;
			rotateY(angle);
		}, 5000)
		setTimeout(function() {
			revolve.transition({
				"transform": "scale(1)"
			}, 500, "linear")
		}, 7000)
		setTimeout(function() {
			revolve.hide();
			dfd.resolve()
		}, 8000)
		return dfd;
	}

	pageB.prototype.run = function(pageComplete) {
		boyAction.walk()
			.then(function() {
				//停止走路
				boyAction.stopWalk();
				//女孩开始走路
				girlAction.standUp();
			})
			.then(function() {
				//女孩停止走路
				return girlAction.stopWalk();
			})
			.then(function() {
				//女孩走路
				return girlAction.walk();
			})
			.then(function() {
				//女孩停止走路
				return girlAction.stopWalk();
			})
			.then(function() {
				return boyAction.unwrapp();
			})
			.then(function() {
				boyAction.strip(1);
			})
			.then(function() {
				return show();
			})
			.then(function() {
				boyAction.strip(2)
			})
			.then(function() {
				return revolve();
			})
			.then(function() {
				//选择
				boyAction.strip(3)
				girlAction.choose(function() {
					//继续走路		
					girlAction.weepWalk(function() {
						//拥抱
						boyAction.hug();
						girlAction.hug();
						setTimeout(function() {
							pageComplete();
						}, 2000)	
					})
				})
			})
	}


}
