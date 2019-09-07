
handleCart();
handleNvbcontent();
handleCarousel();
handleCate();
handleTimeDown();

//购物车交互功能 loader
function handleCart(){
	//1.获取元素
	var oCart = document.querySelector('.top .top-cart');
	var oCartBox = document.querySelector('.top .top-cart a');
	var oCartContent = document.querySelector('.top .top-cart .cart-js');
	var oLoader = document.querySelector('.loader');
	var oSpan = document.querySelector('.top .top-cart .cart-js span');
	//2.绑定事件
	oCart.onmouseenter = function(){
		oLoader.style.display = 'block';
		oCartBox.style.backgroundColor = '#fff';
		oCartBox.style.color = '#ff6700';
		// oCartContent.style.height = 100+'px';
		animate3(oCartContent,{height:100},true,function(){
			oLoader.style.display = 'none';
			oSpan.style.display = 'block';
		});
	}
	oCart.onmouseleave = function(){
		oCartBox.style.backgroundColor = '#424242';
		oCartBox.style.color = '#b0b0b0';
		animate3(oCartContent,{height:0},true,function(){
			oLoader.style.display = 'none';
			oSpan.style.display = 'none';
		});
	}
}

//下拉菜单交互功能
function handleNvbcontent(){
	//1.获取元素
	var aNvbtiem = document.querySelectorAll('.header .header-nvb li');
	var oNvbContent = document.querySelector('.header .header-nvb-content');
	var oNvbContentBox = oNvbContent.querySelector('.container')
	var hideTimer =0,loadTimer =0;
	for(var i=0;i<aNvbtiem.length-2;i++){
		aNvbtiem[i].index = i;
		aNvbtiem[i].onmouseenter = function(){
			oNvbContentBox.innerHTML = '<div class="loader"></div>';
			clearTimeout(hideTimer);
			oNvbContent.style.borderTop='1px solid #ccc';
			animation(oNvbContent,{height:200},true);
			//加载数据
			var index = this.index;
			clearTimeout(loadTimer);
			loadTimer = setTimeout(function(){
				loadData(index);
			},800)
		}
		aNvbtiem[i].onmouseleave = function(){
			handleHide();
		}
	}
	oNvbContent.onmouseenter = function(){
		clearTimeout(hideTimer);
	}
	oNvbContent.onmouseleave = function(){
		handleHide();
	}
	//收起菜单+延时定时器
	function handleHide(){
		hideTimer = setTimeout(function(){
			oNvbContent.style.borderTop='1px solid #ccc';
			animation(oNvbContent,{height:0},true,function(){
				console.log('asdfaf')
				oNvbContent.style.borderTop = '';
			});
		},500)
	}
	//加载数据函数
	function loadData(index){
		// console.log(index)
		var data  = aNvbContentData[index];
		var html = '<ul>';
		for(var i= 0;i<data.length;i++){
			html += '<li>';
			html +=	'	<div class="img-box">';
			html +=	'		<a href="'+data[i].url+'"><img src="'+data[i].img+'" alt=""></a>';
			html +=	'	</div>';
			html +=	'	<p class="product-name">'+data[i].name+'</p>';
			html +=	'	<p class="product-price">'+data[i].price+'元</p>';
			html +=	'</li>';
		}

		html += '</ul>'
		oNvbContentBox.innerHTML = html;
	}
}

//实现轮播图
function handleCarousel(){
	//创建对象
	new Carousel({
		id:'carousel',
		aImg:['images/carousel1.jpg','images/carousel2.jpg','images/carousel3.jpg','images/carousel4.jpg'],
		width:1226,
		height:450,
		autoPlayTime:4000
	})
}

//分类列表交互
function handleCate(){
	var aCateItem = document.querySelectorAll('.home .lun .cate .cate-item');
	var oCateContent = document.querySelector('.home .cate-box .cate-content');
	var oCartBox = document.querySelector('.home .cate-box');
	for(var i=0;i<aCateItem.length;i++){
		aCateItem[i].index = i;
		aCateItem[i].onmouseenter = function(){
			for(var j=0;j<aCateItem.length;j++){
				aCateItem[j].className = 'cate-item';
			}
			this.className = 'cate-item active';
			oCateContent.style.display = 'block';
			//加载数据
			loadData(this.index);
		}
	}
	oCartBox.onmouseleave = function(){
		oCateContent.style.display = 'none'
		for(var j=0;j<aCateItem.length;j++){
			aCateItem[j].className = 'cate-item';
		}
	}
	function loadData(index){
		//通过下标获取对应的数据
		var data = aCateContentData[index];
		var html = '<ul>';
		for(var i=0;i<data.length;i++){
			html += '<li>';
			html += '	<a href="'+data[i].url+'">';
			html += '		<img src="'+data[i].img+'">';
			html += '		<span>'+data[i].name+'</span>';
			html += '	</a>';
			html += '</li>';
		}
		    html += '</ul>';
		oCateContent.innerHTML = html;
	}
}

//实现倒计时
function handleTimeDown(){
	function to2Str(num){
		return num < 10 ? '0' + num : ''+num;
	}
	var aTimeDown =document.querySelectorAll('.shooping .sh-bottom .team');
	var timer=0;
	var endDate = new Date('2019-09-07 14:00:00');
	var endTime = endDate.getTime();
	function handleTime(){
		var allTime = parseInt((endTime-Date.now())/1000);
		if (allTime<0) {
			allTime = 0;
			clearTimeout(timer)
		}
		var iHour = parseInt(allTime/3600);
		var iMinite = parseInt((allTime%3600)/60);
		var iSecond = parseInt((allTime%3600)%60);
		aTimeDown[0].innerHTML = to2Str(iHour);
		aTimeDown[1].innerHTML = to2Str(iMinite);
		aTimeDown[2].innerHTML = to2Str(iSecond);
	}
	timer = setInterval(handleTime,500);
	handleTime();
}