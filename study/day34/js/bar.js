      function createBar(data) {

        // 定义好每一个柱子的宽度及柱子的间隔宽度
        // 定义好柱子颜色， 轴的颜色
        // 定义好柱状图绘制区域的高度， 宽度， 轴的高度， 宽度
        let wrapper = document.querySelector("#svg-wrapper");
        wrapper.innerHTML = "";
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("id", "svg");
        svg.setAttribute("width", "400");
        svg.setAttribute("height", "300");
        let newData = [];


        // 拿到柱状图中的最大值Max
        // 根据Max和你用来绘制柱状图图像区域的高度， 进行一个数据和像素的折算比例
        function dealData(data) {
            let maxData = Math.max(...data);
            if (maxData > 360) {
                newData = data.map((item) => {
                    return item / 2;
                });
                dealData(newData);
            } else if (maxData < 180) {
                newData = data.map((item) => {
                    return item * 2;
                });
                dealData(newData);
            } else {
                newData = data;
            }
        }
        dealData(data);
        // console.log(newData);

        // 绘制横轴及纵轴
        let x = document.createElementNS("http://www.w3.org/2000/svg", "line");
        let y = document.createElementNS("http://www.w3.org/2000/svg", "line");
        x.setAttribute("x1", "40");
        x.setAttribute("y1", "380");
        x.setAttribute("x2", "580");
        x.setAttribute("y2", "380");
        x.style = "stroke:#000; stroke-width:1";
        svg.appendChild(x);

        y.setAttribute("x1", "40");
        y.setAttribute("y1", "380");
        y.setAttribute("x2", "40");
        y.setAttribute("y2", "40");
        y.style = "stroke:#000; stroke-width:1";
        svg.appendChild(y);

       

        // y轴标识
        for (let i = 1; i <= 3; i++) {
            let y_info_text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            y_info_text.setAttribute("x", 5);
            y_info_text.setAttribute("y", 100 * (4 - i));
            y_info_text.innerHTML = i * 100;
            y_info_text.setAttribute("style", "fill:#EA5D89;");

            svg.appendChild(y_info_text);


            let y_info_line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            y_info_line.setAttribute("x1", "40");
            y_info_line.setAttribute("y1", 100 * (4 - i));
            y_info_line.setAttribute("x2", "580");
            y_info_line.setAttribute("y2", 100 * (4 - i));
            y_info_line.style = "stroke:#EA5D89; stroke-width:2;opacity:0.3;";

            svg.appendChild(y_info_line);

        }



        // 遍历数据 {
        //     计算将要绘制柱子的高度和位置
        //     绘制每一个柱子
        // }
        for (let i = 0; i < newData.length; i++) {
            let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

            rect.setAttribute("x", 55 + 44 * i);
            rect.setAttribute("y", 380 - newData[i]);
            rect.setAttribute("width", "20");
            rect.setAttribute("height", newData[i]);
            rect.setAttribute("style", "fill:#ec81f8");
            svg.appendChild(rect);

            // x标识
            let x_info = document.createElementNS("http://www.w3.org/2000/svg", "text");
            x_info.setAttribute("x", 55 + 43 * i);
            x_info.setAttribute("y", 395);
            x_info.innerHTML = i + 1 + "月";
            x_info.setAttribute("style", "fill:#EA5D89;stroke-width:2;opacity:0.9;");

            svg.appendChild(x_info);

        }



        wrapper.appendChild(svg);
    }