function createLine(data) {
    let canvas = document.getElementById("canvas");
    let wrapper=document.getElementById("canvas-wrapper");
    wrapper.innerHTML = "";
    canvas.height=canvas.height;//清空画布
    // 绘制横轴及纵轴
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(40, 20);
    ctx.lineTo(40, 370);
    ctx.lineTo(550, 370);
    ctx.strokeStyle = "#000";
    ctx.stroke();

    let newData = [];

    // 拿到折线图中的最大值Max
    // 根据Max和你用来绘制折线图图像区域的高度， 进行一个数据和像素的折算比例
    function dealData(data) {
        let maxData = Math.max(...data);
        if (maxData > 360) {
            newData = data.map((item) => {
                return item / 2;
            });
            dealData(newData);
        } else if (maxData < 170) {
            newData = data.map((item) => {
                return item * 2;
            });
            dealData(newData);
        } else {
            newData = data;
        }
    }
    dealData(data);
    // y轴标识
    for (let i = 1; i <= 3; i++) {

        let y_info_line = canvas.getContext("2d");
        y_info_line.beginPath();
        y_info_line.moveTo(40, i * 100);
        y_info_line.lineTo(550, i * 100);
        y_info_line.strokeStyle = "rgba(16,31,218,0.5)";
        y_info_line.stroke();


        let y_info_text = canvas.getContext("2d");
        y_info_line.strokeStyle = "RGB(16,31,218)";
        y_info_text.font = "18px times";
        y_info_text.beginPath();
        y_info_text.strokeText(i * 100, 0, (4 - i) * 100);

        y_info_text.stroke();

    }
    // x轴标识
    for (var i = 0; i < 12; i++) {
        let x_info = canvas.getContext("2d");

        x_info.beginPath();
        x_info.strokeText(i + 1 + "月", 45 + 43 * i, 390);
        x_info.font = "16px times";
        x_info.stroke();
    }

    // 定义好每一个数据点的直径， 颜色， 线的颜色， 宽度
    for (var i = 0; i < newData.length; i++) {
        var circle = canvas.getContext("2d");
        circle.beginPath();
        circle.arc(60 + 43 * i, 380 - newData[i], 2, 0, 2 * Math.PI);
        circle.fill();
        circle.stroke();
    }
    // 定义好没两个数据点之间的横向间隔距离

    var line = canvas.getContext("2d");
    line.beginPath();
    for (var i = 0; i < newData.length; i++) {
        line.lineTo(60 + 43 * i, 380 - newData[i]);
    }

    line.lineWidth = 2;
    line.stroke();
    wrapper.appendChild(canvas);
}