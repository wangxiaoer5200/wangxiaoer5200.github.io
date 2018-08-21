function chooseData() {
    let tdList = table.getElementsByTagName("td");
    for (let i = 2; i < tdList.length; i++) {
        tdList[i].onmouseover = function () {
            let data = [];
            let arr = [];
            arr = this.parentNode.getElementsByTagName('td');
            for (let k = 2; k < arr.length; k++) {
                data.push(arr[k].innerHTML);
            }
            // console.log(data);
            createBar(data);
            createLine(data);
            chooseData();
        }
    }
}
setInterval("chooseData()",100);
// chooseData();