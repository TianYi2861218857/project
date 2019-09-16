handleNvbcontent();

// top区域
	var oBtn1=document.getElementById('btn1')
	var oBtn2=document.getElementById('btn2')
	var oBtn3=document.getElementById('btn3')
	var oBtn4=document.getElementById('btn4')
	var oBox1=document.getElementById('box1')
	var oBox2=document.getElementById('box2')
	var oBox3=document.getElementById('box3')
	var oBox4=document.getElementById('box4')
	oBtn.onclick= function(){
		if (oBox.style.display == 'none') {
			oBox.style.display = 'block';
		}else{
			oBox.style.display = 'none';
		}
	}
//header区域
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
			},500)
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