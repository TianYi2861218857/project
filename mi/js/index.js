handleCart();
handleNvbcontent();
//购物车交互功能
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
	for(var i=0;i<aNvbtiem.length;i++){
		aNvbtiem[i].onmouseenter = function(){
			// oNvbContent.style.height = '200px';
			oNvbContent.style.borderTop='1px solid #ccc';
			animate3(oNvbContent,{height:200},true);
		}
		aNvbtiem[i].onmouseleave = function(){
			oNvbContent.style.borderTop='1px solid #ccc';
			animate3(oNvbContent,{height:200},true);
		}
	}
}
