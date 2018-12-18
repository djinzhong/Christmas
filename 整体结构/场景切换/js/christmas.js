function changePage(element, effect, callback) {
	element
		.addClass(effect)
		.one("animationend webkitAnimationEnd", function() {
			callback && callback();
		})
}

var Christmas = function() {
	var $pageA = $(".page-a");
	var $pageB = $(".page-b");
	var $pageC = $(".page-c");
	//观察者
	var observer = new Observer();
	//A场景页面
	new pageA(function() {
		observer.publish("completeA");
	})
	//进入B场景
	observer.subscribe("pageB", function() {
		new pageB(function() {
			observer.publish("completeB");
		})
	})
	//进入C场景
	observer.subscribe("pageC", function() {
		new pageC()
	})
	//页面A-B场景切换
	observer.subscribe("completeA", function() {
		changePage($pageA, "effect-out", function() {
			observer.publish("pageB");
		})
	})
	//页面B-C场景切换
	observer.subscribe("completeB", function() {
		changePage($pageC, "effect-in", function() {
			observer.publish("pageC")
		})
	})

};
 
 $(function() {
 	//圣诞主题效果，开始
	var audio = new Audio('http://m10.music.126.net/20181214172214/d092b95b00cbc5763a8185191cf5729a/ymusic/e7ec/e2fb/0cab/a64960cb6e31c1ac28c24588d3bf029a.mp3');
 	$('button:first').click(function() {
		audio.autoplay = true;
		audio.loop = true;
		audio.play();
	})
	$('.stop').click(function() {
		 audio.pause();// 这个就是暂停
		 
	})
	$('.change').click(function() {
		audio.pause();
		audio = new Audio('http://m10.music.126.net/20181214172733/2c9e49a6f15b2749c0685630c8d9a2f8/ymusic/ec9a/2853/5fec/168d02eeaa3a6e0499e5e7bbdf982ee3.mp3');
		audio.autoplay = true;
		audio.loop = true;
		audio.play();
		console.log(audio)
	})
})
