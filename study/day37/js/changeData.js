let flag = 0;

function changeData() {
    let tdList = table.getElementsByTagName("td");
    // console.log(tdList[2]);
    for (let i = 1; i < tdList.length; i++) {
        tdList[i].onmouseover = function () {
            if (!isNaN(tdList[i].innerHTML)) {
                // console.log(tdList[i].innerHTML)
                if (flag == 0) {
                    let editor = document.createElement("a");
                    editor.id = "editor";
                    editor.innerHTML = "编辑";
                    this.appendChild(editor);
                    flag = 1;
                    editor.onclick = function () {
                        let editor = document.getElementById("editor");
                        this.parentNode.removeChild(editor);
                        var tdvalue = tdList[i].innerHTML;
                        let input = document.createElement("input");
                        input.type = "text";
                        input.value = tdvalue;
                        input.style = "width:60px;";

                        tdList[i].innerHTML = "";
                        tdList[i].appendChild(input);
                        input.focus();

                        let btn1 = document.createElement("button");
                        let btn2 = document.createElement("button");
                        btn1.className = "editorbtn";
                        btn2.className = "editorbtn";
                        btn1.innerHTML = "确定";
                        btn2.innerHTML = "取消";
                        tdList[i].appendChild(btn1);
                        tdList[i].appendChild(btn2);

                        document.onkeydown = function (e) {

                            var e = e || window.event;
                            if (e.keyCode == 27) { // 按 Esc
                                tdList[i].innerHTML = "";
                                tdList[i].innerHTML = tdvalue;
                                flag = 0;
                            } else if (e.keyCode == 13) { // enter 键
                                tdList[i].innerHTML = "";
                                tdList[i].innerHTML = input.value;
                                flag = 0;
                                chooseData();
                            }
                        };
                        setTimeout(function () {
                            btn1.onmousedown = function () {
                                tdList[i].innerHTML = "";
                                tdList[i].innerHTML = input.value;
                                flag = 0;
                            }
                        }, 400);
                        setTimeout(function () {
                            btn2.onmousedown = function () {
                                tdList[i].innerHTML = "";
                                tdList[i].innerHTML = tdvalue;
                                flag = 0;
                                chooseData();
                            }
                        }, 400);
                    }
                }
            }

        }
        tdList[i].onmouseleave = function () {
            if (flag == 1) {
                let editor = document.getElementById("editor");
                if (editor && this.hasChildNodes(editor)) {
                    this.removeChild(editor);
                }
                flag = 0;
            }
        }
    }
}
setInterval("changeData()", 100);