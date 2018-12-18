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

	$('#choose').on("change", function(e) {
		var pageName = e.target.value;
		switch (pageName) {
			case "page-b":
			    console.log('123')
				changePage($pageA, "effect-out", function() {
					new pageB()
				})
				break;
			case "page-c":
			    changePage($pageC, "effect-in", function() {
					new pageC()
				})
				break;
		}
	})
};

$(function() {
	//圣诞主题效果，开始
	Christmas()
})
