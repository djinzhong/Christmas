var ChristmasA = function() {
	var dfd = $.Deferred();
	var $pageA = $(".page-a");
	var pageNewA = new pageA($pageA);
	pageNewA.run(dfd.resolve);
	return dfd;
}

function AGoB() {
	var dfd = $.Deferred();
	var $pageB = $(".page-b");
	var $pageA = $(".page-a");
	$pageA.addClass('effect-out');
	$pageB.transition({
		"transform": "translateY(-2rem)"
	}, 1000, "linear", function() {
		setTimeout(function() {
			dfd.resolve()
		}, 2000)
	})
	return dfd;
}

function BGoC() {
	var dfd = $.Deferred();
	var $parent = $(".container");
	var $pageC = $(".page-c");
	$pageC.addClass('effect-in');
	$parent.transition({
		"transform": "translateY(-2rem)"
	}, 1000, "linear", function() {
		dfd.resolve()
	})
	return dfd;
}
var ChristmasB = function() {
	var dfd = $.Deferred();
	var $pageB = $(".page-b");
	var pageNewB = new pageB($pageB);
	pageNewB.run(dfd.resolve)
	return dfd;
};

var ChristmasC = function() {
	//页面容器元素
	var $pageC = $(".page-c");
	//构建第三个场景页面对象
	new pageC($pageC);

}
var mp3 = {
	audio1: 'http://cdnringuc.shoujiduoduo.com/ringres/user/a24/441/34089441.aac',
	audio2: 'http://cdnringuc.shoujiduoduo.com/ringres/user/a24/407/25292407.aac',
	audio3: 'http://att.chinauui.com/day_181105/20181105_13417bb2c3bab6561208W4bfkBsKg48n.mp3'

}
$(function() {
	var audio1 = new Audio(mp3.audio1);
	var audio2, audio3;
	audio1.play();
	setTimeout(function() {
		ChristmasA()
			.then(function() {
				return AGoB();
			})
			.then(function() {
				audio1.pause();
				audio2 = new Audio(mp3.audio2);
				audio2.play();
			})
			.then(function() {
				return ChristmasB();
			})
			.then(function() {
				return BGoC();
			})
			.then(function() {
				audio2.pause();
				var audio3 = new Audio(mp3.audio3);
				audio3.play();
			})
			.then(function() {
				//页面容器元素
				var $pageC = $(".page-c");
				//构建第三个场景页面对象
				new pageC($pageC);
			})
	}, 5000)
})
