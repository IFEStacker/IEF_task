/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */

var aqiData = {};
var warnCity=document.getElementById('warnCity');
var warnAqi=document.getElementById('warnAqi');
var oTbody=document.getElementById('aqi-table');

var rows='<tr>'+'<td>'+'城市'+'</td>'+'<td>'+'空气质量'+'</td>'+'<td>'+'操作'+'</td>'+'</tr>';

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */

function addAqiData() {
	var sCity=document.getElementById("aqi-city-input").value.trim();
	var nValue=document.getElementById("aqi-value-input").value.trim();
	
	var re1=/^[a-zA-Z\u4E00-\u9FA5]+$/;
	var re2=/^\d+$/;

		if(!re1.test(sCity)){
			if(!sCity){
				warnCity.innerHTML='城市名称不能为空';
			}else{
				warnCity.innerHTML='城市名称只支持中英文';	
			}					
		}else{
			warnCity.innerHTML='';
		}

		if(!re2.test(nValue)){
			if(!nValue){
				warnAqi.innerHTML='质量指数不能为空';
			}else{
				warnAqi.innerHTML='质量指数只支持数字';
			}						
		}else{
			warnAqi.innerHTML='';
		}
		
		if(re1.test(sCity) && re2.test(nValue)){
			aqiData[sCity]=nValue*1;
			document.getElementById("aqi-city-input").value='';
			document.getElementById("aqi-value-input").value='';
		}
		console.log(aqiData);
};

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
		for(var key in aqiData){
			rows += '<tr>'+'<td>'+key+'</td>'+'<td>'+aqiData[key]+'</td>'+'<td>'+'<button onclick="delBtnHandle(this)">删除</button>'+'</td>'+'</tr>';
			oTbody.innerHTML=rows;
			console.log(oTbody.nodeName);
		}
		aqiData = {};
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	addAqiData();
	renderAqiList();
}


 // 点击各个删除按钮的时候的处理逻辑
 // 获取哪个城市数据被删，删除数据，更新表格显示
 
/* */
function delBtnHandle(obj) {
	oTbody.removeChild(obj.parentElement.parentElement);
	rows=oTbody.innerHTML;
	if(oTbody.getElementsByTagName('button').length == 0){
		oTbody.innerHTML='';
	}
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	document.getElementById('add-btn').onclick=function(){addBtnHandle()};

}
init();

