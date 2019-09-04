//匀速动画
function animate(obj,attr,target){
    clearInterval(obj.timer);
    var iSpeed =0;
    obj.timer=setInterval(function(){
        var current = parseFloat(getComputedStyle(obj,false)[attr]);
        //将字符串转为浮点型
        if (attr == 'opacity') {
            current = current*100;
        }
        if (current< target) {
            iSpeed = 5;
        }else{
            iSpeed = -5;
        }
        if(Math.abs(target-current)<Math.abs(iSpeed)){
            if (attr == 'opacity') {
                obj.style[attr] = target/100;
            }else{ 
                obj.style[attr] = target;
            } 
            //[]是将字符串转化       
            clearInterval(obj.timer);
        }else{
            if (attr == 'opacity') {
                obj.style[attr] = (current+iSpeed)/100;
            }else{
                obj.style[attr] = current+iSpeed +'px';
            }     
        }
    },30)
}

//减速动画
function animate1(obj,attr,target){
    clearInterval(obj.timer);
    var iSpeed = 0;
    obj.timer=setInterval(function(){
        var current = parseFloat(getComputedStyle(obj,false)[attr]);
        if (attr == 'opacity') {
            current = Math.round(current*100);    
        }
        iSpeed = (target - current)/10;
        iSpeed = iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
        if(!iSpeed){
            clearInterval(obj.timer);
        }else{
            if (attr == 'opacity') {
                obj.style[attr] = (current + iSpeed)/100;    
            }else{
                obj.style[attr] = current + iSpeed + 'px';
            }
        }
        console.log(current,iSpeed)
    },30)
}

/*说明
    obj 表示要修改的是那个DOM对象
    attr 表示要修改的是哪个属性
    target 表示目标值(就是将属性值修改到多少)
    isLinear 表示动画是匀速还是减速执行(默认是匀速,true是匀速,false是减速)
*/
//综合动画(匀速动画和减速动画最大的区别就是速度和结束条件不同)
function animate2(obj,attr,target,isLinear){
    //让动画默认就是匀速执行
    if(typeof isLinear == undefined){
        isLinear = true;
    }
    //防止开启多个定时器
    clearInterval(obj.timer);
    var iSpeed = 0;//定义速度（如果定义在定时器里边的话，每次都会定义一个变量，在这里只用定义一次）
    obj.timer = setInterval(function(){//开启定时器
        var isStop = false;//用来判断是否要关闭定时器
        var current  = parseFloat(getComputedStyle(obj,false)[attr]);//当前值
        if(attr == 'opacity'){//如果是透明度的话，要乘以100，方便计算
            current = Math.round(current *100);
        }
        if(isLinear){//执行匀速动画
            //匀速动画速度
            if(current < target){
                iSpeed = 7;
            }else{
                iSpeed = -7;
            }
            //匀速动画的结束条件
            if(Math.abs(target - current) < Math.abs(iSpeed)){
                if(attr == 'opacity'){//把匀速动画的结果直接调到目标值(只有匀速才有)
                    obj.style[attr] = target/100;
                }else{
                    obj.style[attr] = target + 'px';
                }
                isStop = true;//通过此变量决定是否停止动画
            }
        }else{//减速动画
            //减速动画速度
            iSpeed = (target - current)/10;
            iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            //减速动画的结束条件
            if(!iSpeed){
                isStop = true;//通过此变量决定是否停止动画
            }
        }
        if(isStop){//判断此变量，决定是否关闭定时器
            clearInterval(obj.timer);//关闭定时器
        }else{//不停止动画，继续执行
            if(attr == 'opacity'){
                obj.style[attr] = (current + iSpeed)/100;
            }else{
                obj.style[attr] = current + iSpeed +'px';
            }
        }
    },30)
}

/*说明
    obj 表示要修改的是那个DOM对象
    options 表示属性和值的对象
    isLinear 表示动画是匀速还是减速执行(默认是匀速,true是匀速,false是减速)
    fnEnd 表示结束时的回调函数
*/
//综合动画(多值)(匀速动画和减速动画最大的区别就是速度和结束条件不同)
function animate3(obj,options,isLinear,fnEnd){
    //让动画默认就是匀速执行
    if(typeof isLinear == undefined){
        isLinear = true;
    }
    //防止开启多个定时器
    clearInterval(obj.timer);
    var iSpeed = 0;//定义速度（如果定义在定时器里边的话，每次都会定义一个变量，在这里只用定义一次）
    obj.timer = setInterval(function(){//开启定时器
        var isStopAll = true;//当这个值为真是，关闭定时器，停止所有动画
        for(var attr in options){
            var current  = parseFloat(getComputedStyle(obj,false)[attr]);//当前值
            if(attr == 'opacity'){//如果是透明度的话，要乘以100，方便计算
                current = Math.round(current *100);
            }
            if(isLinear){//执行匀速动画
                //匀速动画速度
                if(current < options[attr]){
                    iSpeed = 7;
                }else{
                    iSpeed = -7;
                }
                //匀速动画的结束条件
                if(Math.abs(options[attr] - current) < Math.abs(iSpeed)){
                    if(attr == 'opacity'){//把匀速动画的结果直接调到目标值(只有匀速才有)
                        obj.style[attr] = options[attr]/100;
                    }else{
                        obj.style[attr] = options[attr] + 'px';
                    }
                }else{
                    isStopAll = false;//只要有一个值没有变化完毕，动画就不能停止（定时器就不能关闭）
                }
            }else{//减速动画
                //减速动画速度
                iSpeed = (options[attr] - current)/10;
                iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                //减速动画的结束条件
                if(iSpeed){
                    isStopAll = false;//只要有一个值没有变化完毕，动画就不能停止（定时器就不能关闭）
                }
            }
            if(isStopAll){//判断此变量，决定是否关闭定时器
                clearInterval(obj.timer);//关闭定时器
                typeof fnEnd == 'function' && fnEnd();//如果有传入函数的话，执行否则不执行
            }else{//不停止动画，继续执行
                if(attr == 'opacity'){
                    obj.style[attr] = (current + iSpeed)/100;
                }else{
                    obj.style[attr] = current + iSpeed +'px';
                }
            }
        }
        
    },30)
}

//滚动垂直距离
function getScrollTop(){     
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
}
function getScrollLeft(){     
    return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
}
function getRandom(min,max){
    return min+(max-min)*Math.random();
}
var aLi = document.querySelectorAll('.ul1 li');
var aDian = document.querySelectorAll('.lun-dian li');
var oLeftBtn = document.querySelector('.lun-icon-left');
var oRightBtn = document.querySelector('.lun-icon-right');
var oCarousel= document.querySelector('.lun-con');
// console.log(aLi)
// console.log(aDian)
// console.log(oLeftBtn)
// console.log(oRightBtn)
var now = 0;
var timer = 0;
//封装函数(提取公共代码)
function tab(){
   for(i=0;i<aLi.length;i++){
        aLi[i].style.zIndex = '0';
        aDian[i].className = '';
        aLi[i].style.opacity = '0';
    }
    aLi[now].style.zIndex = '99';
    aDian[now].className = 'active';
    aLi[now].style.opacity = '1'; 
}
//设置事件(下一张)
oRightBtn.onclick =function(){
    now++;
    if(now>=aLi.length){
        now = 0;
    }
    tab();
}
//设置事件(上一张)
oLeftBtn.onclick =function(){
    now--;
    if(now<0){
        now = aLi.length-1;
    }
    tab();
}
//设置点状跳转
for(i=0;i<aDian.length;i++){
    aDian[i].idx = i;
    aDian[i].onclick = function(){
        now = this.idx;
        tab();
    }
}
timer = setInterval( oRightBtn.onclick,5000)
oCarousel.onmouseover = function(){
    clearInterval(timer)
}
oCarousel.onmouseout = function(){
    timer = setInterval( oRightBtn.onclick,5000)
}
