// 第一幅场景页面
function pageA(element) {
	this.$root = element;
	this.$boy = element.find(".chs-boy");
	//窗户
	this.$window = element.find(".window");
	this.$leftWin = this.$window.find(".window-left");
	this.$rightWin = this.$window.find(".window-right");
}

// 运行下一个动画
pageA.prototype.next = function(options) {
	var dfd = $.Deferred();
	this.$boy.transition(options.style, options.time, "linear", function() {
		dfd.resolve()
	});
	return dfd;
}

// 停止走路
pageA.prototype.stopWalk = function() {
	this.$boy.removeClass("chs-boy-deer")
}

//开窗
pageA.prototype.openWindow = function() {
	var dfd = $.Deferred();
	var count = 1;
	var complete = function() {
		++count;
		if (count === 2) {
			dfd.resolve();
		}
	}
	var bind = function(data) {
		// transitionend 事件在 CSS 完成过渡后触发。
		// 在WebKit引擎的浏览器中，当CSS 3的transition动画执行结束时，触发webkitTransitionEnd事件。
		data.one("transitionend wenkitTransitionEnd", function(event) {
			data.removeClass("window-transition")
			complete()
		})
	}
	bind(this.$leftWin.addClass("window-transition").addClass("hover"));
	bind(this.$rightWin.addClass("window-transition").addClass("hover"));
	return dfd;
}

// 路径
pageA.prototype.run = function(callback) {
	var that = this;
	var next = function() {
		return this.next.apply(this, arguments)
	}.bind(this)
	next({
			"time": 10000,
			"style": {
				"top": "4rem",
				"right": "16rem",
				"scale": "1.2"
			}
		})
		.then(function() {
			that.$root.transition({
				"transform": "translateY(-2rem)"
			}, 500, "linear")
		})
		.then(function() {
			return next({
				"time": 500,
				"style": {
					"rotateY": "-180",
					"scale": "1.5"
				}
			})
		})
		.then(function() {
			return next({
				"time": 7000,
				"style": {
					"top": "7.8rem",
					"right": "1.2rem"
				}
			})
		})
		.then(function() {
			that.stopWalk();
		})
		.then(function() {
			return that.openWindow()
		})
		.then(function() {
			return callback();
		})
}
