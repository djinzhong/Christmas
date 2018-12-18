// 第一幅场景页面
function pageA(element) {
	//根元素
	this.$root = element;
	this.$boy = element.find(".chs-boy");
	//窗户
	this.$window = element.find(".window");
	this.$leftWin = this.$window.find(".window-left");
	this.$rightWin = this.$window.find(".window-right");
	//运行动画
	this.run();
}

// 运行下一个动画
pageA.prototype.next = function(options) {
	var dfd = $.Deferred();
	this.$boy.transition(options.style, options.time, "linear", function() {
		dfd.resolve()
	});
	return dfd;
}

//开窗
pageA.prototype.openWindow = function(callback) {
	var count = 1;
	var complete = function() {
		++count;
		if (count === 2) {
			callback && callback();
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
	bind(this.$leftWin.addClass("window-transition").addClass("hover"))
	bind(this.$rightWin.addClass("window-transition").addClass("hover"))
}

pageA.prototype.run = function(callback) {
	var that = this;
	var next = function() {
		return this.next.apply(this, arguments)
	}.bind(this)

	next({})
		.then(function() {
			that.openWindow(function() {
				alert("窗户已打开")
			})
		})
}
