	var demo2 = {
			changeColor : function (index) {
				for (var i = 0; i < jobArr.length; i++) {
						jobArr[i].setAttribute('class', '');
					}
				jobArr[index].setAttribute('class', 'active');
			},
			paging : function (oDiv, pageSize, dataCount,curPage, callback) {
				var startIndex,endIndex;
				if (curPage  <= 6) {
					startIndex = 1;
					endIndex = startIndex + pageSize - 1;
					if (endIndex > dataCount) {
						endIndex = dataCount;	
					}
				}else if (curPage > 6 && curPage <= dataCount) {
					startIndex = curPage - 5;
					endIndex = startIndex + pageSize - 1;
					if (endIndex > dataCount) {
						endIndex = dataCount;
					}
				}else if (curPage == dataCount) {
					startIndex = curPage - 5;
					endIndex = curPage;
				}
				callback(curPage, dataCount);
				oDiv.innerHTML = '';//清楚页面

				var oFirst = document.createElement("a");
				oFirst.innerText = "首页";
				oFirst.href = "#";
				oDiv.appendChild(oFirst);

				oFirst.onclick = function () {
					demo2.paging (oDiv, 10,dataCount,1,demo2.doPage);
				}
				if (curPage > 1) {
					var oLast = document.createElement("a");
					oLast.innerText = "上一页";
					oLast.href = "#";
					oDiv.appendChild(oLast);
					oLast.onclick = function () {
						demo2.paging (oDiv, 10,dataCount,curPage - 1,demo2.doPage);
					}
				}
				for (var i = startIndex; i <= endIndex; i++) {
					(function () {	
						var oA = document.createElement("a");
						oA.innerText = i;
						oA.href = "#";
						if (curPage === i) {
							oA.style.color = '#fff';
							oA.style.backgroundColor = '#494e7b';
							oDiv.appendChild(oA);
						}else {
							oDiv.appendChild(oA);
						}
						var cur = i;
						oA.onclick = function () {
							demo2.paging(oDiv, 10,dataCount,cur,demo2.doPage);
						}
					}());
				}
				if (curPage < dataCount) {
					var oNext = document.createElement("a");
					oNext.innerText = "下一页";
					oNext.href = "#";
					oDiv.appendChild(oNext);
					oNext.onclick = function () {
						demo2.paging (oDiv, 10,dataCount,curPage + 1,demo2.doPage);
					}
				}
				var oEnd = document.createElement("a");
				oEnd.innerText = "尾页";
				oEnd.href = "#";
				oDiv.appendChild(oEnd);
				oEnd.onclick = function () {
					demo2.paging (oDiv, 10,dataCount,dataCount,demo2.doPage);
				}
			},
			ajax : function (method, url, flag, data, callback) {
				var xhr = null;
				if (window.XMLHttpRequest) {
					xhr = new XMLHttpRequest();
				}else {
					xhr = new ActiveXObject('Microsoft.XMLHTTP');
				}
				method = method.toUpperCase();
				if (method === 'GET') {
					xhr.open('get', url, flag);
				}else if (method === 'POST') {
					xhr.open('post', url, flag);
				}

				xhr.onreadystatechange = function () {
					if (xhr.readyState === 4 && xhr.status === 200) {
						callback (xhr.responseText);
					}
				}
				//写在后面是为了保证   不会因为网速过快发出去的消息马上就收到回应以至于不会走到监听部分
				if (method === 'GET') {
					xhr.send();
				}else if (method === 'POST') {
					xhr.setRequestHeader ('content-type', 'application/x-www-form-urle');
					xhr.send(data);
				}
			},
			doPage : function (curPage,dataCount) {
				oList.innerHTML = '';
				var oUl = document.createElement('ul');
				oUl.className = 'list-title';
				var txtArr = ['职位名称','工作地点','薪资','工作经验','最低学历','发布时间'];
				for (var j = 0; j < 6; j++) {
					var oLi = document.createElement('li');
					oLi.className = 'l' + (j + 1);
					oLi.innerText = txtArr[j];
					oUl.appendChild(oLi);
				}
				oList.appendChild(oUl);
				var startNum = ((curPage - 1) * 10);
				if ( ((curPage - 1) * 10 + 10) < len ) {
					for (var k = startNum; k < startNum + 10; k++) {
						var oUl = document.createElement('ul');
						for (var j = 0; j < 6; j++) {
							var oLi = document.createElement('li');
							oLi.className = 'l' + (j + 1);
							oUl.appendChild(oLi);
						}
						var oLiArray = oUl.getElementsByTagName('li');
						for (var i = 0; i < 6; i++) {
							oLiArray[i].innerText = allObj[name][k][i];
						}
						oList.appendChild(oUl);
					}
				}else {
					for (var k = startNum; k < len; k++) {
						var oUl = document.createElement('ul');
						for (var j = 0; j < 6; j++) {
							var oLi = document.createElement('li');
							oLi.className = 'l' + (j + 1);
							oUl.appendChild(oLi);
						}
						var oLiArray = oUl.getElementsByTagName('li');
						for (var i = 0; i < 6; i++) {
							oLiArray[i].innerText = allObj[name][k][i];
						}
						oList.appendChild(oUl);
					}	 
				}
			},
			init : function () {
				demo2.ajax('get', 'http://localhost:8080/src/data/work.txt', true, '', demo2.doJson);
				for (var i = 0; i < jobArr.length; i++) {
					(function (n) {
						jobArr[n].onclick = function () {
							demo2.changeColor(n);
							name = jobTextArr[n];
							demo2.ajax('get', 'http://localhost:8080/src/data/work.txt', true, '', demo2.doJson);
							return false;
						}
					}(i))
				}
			},
			doJson : function (data) {
				allObj = JSON.parse(data);
				len = allObj[name].length;
				var dataCount = Math.ceil(len / 10);
				demo2.paging(oDiv, 10, dataCount, 1, demo2.doPage);
			}
		}

		module.exports = demo2;