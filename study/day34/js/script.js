let checkboxList = {
    region: ["华东", "华南", "华北"],
    product: ["手机", "笔记本", "智能音箱"]
};

function createCheckBox(checkboxList, attribute) {
    let container = checkboxList[attribute];
    let radioID = attribute + "-radio-wrapper";
    let content = '';
    let radioWrapper = document.getElementById(radioID);
    for (let i in container) {
        content += '<label><input class="child" type="checkbox" name="' + attribute + '" value="' + container[i] + '" >' + container[i] + '</label>';
    }
    content += '<label><input class="all" type="checkbox" name="' + attribute + '" value="全选" >全选</label>';
    radioWrapper.innerHTML = content;

    radioWrapper.onchange = function (e) {
        if (e.target && e.target.type == "checkbox") {
            let checkedNum = 0;
            let oCheckbox = radioWrapper.querySelectorAll("input");
            let oCheckboxAll = oCheckbox[oCheckbox.length - 1];
            if (e.target.className == "all") {
                if (e.target.checked == true) {
                    for (let i = 0; i < oCheckbox.length; i++) {
                        oCheckbox[i].checked = oCheckbox[oCheckbox.length - 1].checked;
                    }
                } else if (e.target.checked == false) {
                    e.target.checked = true;
                }
            } else if (e.target.className == "child") {
                for (let i = 0; i < oCheckbox.length - 1; i++) {
                    if (oCheckbox[i].checked == true) {
                        checkedNum++;
                    }
                }
                if (checkedNum < 1) {
                    e.target.checked = true;
                }
                if (checkedNum === 3) {
                    oCheckboxAll.checked = true;
                }
                if (checkedNum < 3) {
                    oCheckboxAll.checked = false;
                }
            }
        }
        renderTable(getData());
    };
    radioWrapper.childNodes[0].click();
}

function getData() {
    let radioCheckbox = document.querySelectorAll('input:checked');
    let data = [];
    let list = [];
    for (let i = 0; i < radioCheckbox.length; i++) {
        if (radioCheckbox[i].value != "全选") {
            data.push(radioCheckbox[i].value);
        }
    }
    // console.log(data)
    for (let i = 0; i < sourceData.length; i++) {
        if (data.indexOf(sourceData[i].region) !== -1 && data.indexOf(sourceData[i].product) !== -1) {
            list.push(sourceData[i]);
        }
    }
    // console.log(list)
    return list;
}
let wrapper = document.querySelector("#table-wrapper");
let table = document.createElement("table");
table.setAttribute("id", "table");

function renderTable(list) {
    table.innerHTML = "";
    let tr = document.createElement("tr");
    tr.innerHTML = `
        <th>商品</th>
        <th>地区</th>
        <th>1月</th>
        <th>2月</th>
        <th>3月</th>
        <th>4月</th>
        <th>5月</th>
        <th>6月</th>
        <th>7月</th>
        <th>8月</th>
        <th>9月</th>
        <th>10月</th>
        <th>12月</th>
        <th>12月</th>
    `;
    table.appendChild(tr);
    wrapper.appendChild(table);
    for (let i = 0; i < list.length; i++) {
        let tr = document.createElement("tr");
        for (let j in list[i]) {
            if (!Array.isArray(list[i][j])) {
                let td = document.createElement("td");
                td.innerHTML = list[i][j];
                tr.appendChild(td);
            } else {
                for (let k = 0; k < list[i][j].length; k++) {
                    let td = document.createElement("td");
                    td.innerHTML = list[i][j][k];
                    tr.appendChild(td);
                }
            }
        }
        table.appendChild(tr);
    }
    wrapper.appendChild(table);
    changeTd();
    mergeCell(1, 0);
}


function changeTd() {
    let td1 = document.getElementById("region-radio-wrapper").querySelectorAll("input[type=checkbox]:checked");
    let td2 = document.getElementById("product-radio-wrapper").querySelectorAll("input[type=checkbox]:checked");
    let table = document.querySelector("#table");
    if (td1.length == 1 && td2.length != 1) {
        for (let i = 0; i < table.rows.length; i++) {
            let temp = table.rows[i].cells[0].innerHTML;
            table.rows[i].cells[0].innerHTML = table.rows[i].cells[1].innerHTML;
            table.rows[i].cells[1].innerHTML = temp;
        }
    }
}

function mergeCell(startrow, col) {
    let tab = document.querySelector("#table");
    for (let i = startrow; i < tab.rows.length - 1; i++) {
        if (tab.rows[startrow].cells[col].innerHTML === tab.rows[i + 1].cells[col].innerHTML) {
            tab.rows[i + 1].cells[col].style.display = "none";
            tab.rows[startrow].cells[col].rowSpan += 1;
        } else {
            mergeCell(i + 1, 0)
        }
    }
}

createCheckBox(checkboxList, 'region');
createCheckBox(checkboxList, 'product');