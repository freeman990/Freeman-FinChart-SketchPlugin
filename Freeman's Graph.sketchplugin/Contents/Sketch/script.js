var onRun = function(context) {
    log("=======================================================================");
    log("=======================================================================");
    log("======================       RUN THE GRAPH        =====================");
    log("=======================================================================");
    log("=======================================================================");
    var doc = context.document;
    var page = doc.currentPage();
    var artb = page.currentArtboard();  
    
    var drawArea1 = {w:1008, h:188};
    var color_rise = "#F64843";
    var color_fall = "#5C9F34";
    var color_grid = "#2d2d2d";
    var color_font = "#555";
    var color_v = "#6DC8EA"
    var vBarWidth = 2;
    var yPadding = 10;
    var gridHNum = 4;
    var labelNum = 4;
    var fontSize = 10;

    //=========== DATA ===================
    var dateAry = ["2016-12-1","2016-12-2","2016-12-5","2016-12-6","2016-12-7","2016-12-8","2016-12-9","2016-12-12","2016-12-13","2016-12-14","2016-12-15","2016-12-16","2016-12-19","2016-12-20","2016-12-21","2016-12-22","2016-12-23","2016-12-26","2016-12-27","2016-12-28","2016-12-29","2016-12-30","2017-1-3","2017-1-4","2017-1-5","2017-1-6","2017-1-9","2017-1-10","2017-1-11","2017-1-12","2017-1-13","2017-1-16","2017-1-17","2017-1-18","2017-1-19","2017-1-20","2017-1-23","2017-1-24","2017-1-25","2017-1-26","2017-2-3","2017-2-6","2017-2-7","2017-2-8","2017-2-9","2017-2-10","2017-2-13","2017-2-14","2017-2-15","2017-2-16","2017-2-17","2017-2-20","2017-2-21","2017-2-22","2017-2-23","2017-2-24","2017-2-27","2017-2-28","2017-3-1","2017-3-2","2017-3-3","2017-3-6","2017-3-7","2017-3-8","2017-3-9","2017-3-10","2017-3-13","2017-3-14","2017-3-15","2017-3-16","2017-3-17","2017-3-20","2017-3-21","2017-3-22","2017-3-23","2017-3-24","2017-3-27","2017-3-28","2017-3-29","2017-3-30","2017-3-31","2017-4-5","2017-4-6","2017-4-7","2017-4-10","2017-4-11","2017-4-12","2017-4-13","2017-4-14","2017-4-17"];
    var oAry = [19.82,19.9,19.38,18.94,18.62,18.85,18.53,18.8,18.45,18.34,17.96,18.08,18.03,17.85,18,18.15,18.1,17.69,18,18,17.98,17.87,17.92,18.19,18.41,18.37,18.13,18.23,18.05,17.85,17.67,17.81,18.06,18.05,18.12,18.13,18.45,18.37,18.37,18.42,18.47,18.23,18.1,17.97,18.21,18.24,18.34,18.52,18.39,18.31,18.49,18.3,18.59,18.8,18.79,18.47,18.43,18.19,18.15,18.2,18.06,18.03,18.16,18.12,18.1,17.96,17.75,17.86,17.82,17.82,18.09,17.82,17.65,17.3,16.91,17.01,17.05,17.07,17.03,16.8,16.85,16.81,17.16,17.19,17.19,17.03,17.13,17.26,17.21,17.01];
    var hAry = [20.01,19.92,19.4,19.03,18.83,18.87,19.05,18.83,18.55,18.35,18.18,18.16,18.04,17.93,18.42,18.18,18.1,18.07,18.28,18.13,18.08,17.99,18.29,18.5,18.54,18.41,18.25,18.24,18.12,17.97,17.96,18.24,18.16,18.27,18.27,18.5,18.68,18.49,18.46,18.6,18.52,18.23,18.11,18.33,18.42,18.45,18.62,18.63,18.54,18.49,18.88,18.53,19.04,18.89,18.94,18.58,18.52,18.29,18.25,18.43,18.11,18.19,18.18,18.18,18.11,18.05,17.89,17.93,17.82,18.12,18.13,17.84,17.68,17.3,17.13,17.21,17.22,17.18,17.09,16.91,16.89,17.2,17.3,17.25,17.27,17.11,17.57,17.41,17.28,17.25];
    var lAry = [19.73,19.31,18.79,18.62,18.51,18.48,18.5,18.12,18.24,17.99,17.88,17.95,17.86,17.69,17.98,18.01,17.7,17.58,17.93,17.95,17.86,17.67,17.92,18.16,18.32,18.07,18.07,17.99,17.8,17.72,17.66,17.65,17.85,17.93,18.05,18.1,18.36,18.22,18.24,18.39,18.13,18,17.83,17.82,18.18,18.02,18.3,18.35,18.28,18.2,18.29,18.15,18.56,18.67,18.34,18.35,18.15,18.05,18.07,18.05,17.91,17.93,17.98,18.03,17.86,17.74,17.58,17.76,17.7,17.8,17.74,17.55,17.3,16.8,16.8,16.83,17,16.93,16.8,16.63,16.71,16.81,17.13,17.01,17.02,16.76,17.1,17.18,16.92,16.8];
    var cAry = [19.9,19.58,18.93,18.67,18.81,18.52,18.9,18.48,18.35,18.05,18.06,18.07,17.91,17.9,18.19,18.07,17.8,18.02,18.04,18.04,17.87,17.86,18.19,18.44,18.35,18.15,18.15,18.04,17.83,17.74,17.88,18.16,18.06,18.13,18.17,18.45,18.4,18.36,18.4,18.47,18.15,18.1,17.97,18.27,18.24,18.32,18.5,18.4,18.31,18.38,18.3,18.52,18.86,18.86,18.45,18.48,18.18,18.15,18.13,18.1,18.01,18.16,18.1,18.11,18.03,17.78,17.87,17.82,17.76,18.08,17.8,17.64,17.38,16.91,16.97,17.02,17.02,17.02,16.82,16.81,16.81,17.19,17.18,17.18,17.04,17.04,17.39,17.27,17.11,17.14];
    var vAry = [33946477,51340043,62241605,37221350,27033979,28049538,64486370,71860509,26888074,24637532,34931627,22147979,16309176,25377491,50761859,15963772,22030421,32014973,20741155,14746418,17883565,25495431,32313226,35758846,23907977,24394716,23064790,18406550,22836120,18201907,21452796,60872340,17152057,18078088,17407300,28460289,18800933,20032071,11541737,16773706,17290774,22148830,18864260,30869293,29650255,46673453,60691621,25137269,32693249,33105928,72387155,47443354,77292693,27126046,45136737,26233301,34596840,24170099,26048529,44025880,24929304,22337688,17565909,19379747,25933666,25958765,23379282,14775789,16891378,44664473,28294596,30157199,43458662,53232885,28108049,43602031,31488748,28921017,27714670,26720975,17634526,42519157,28654621,29347956,22149971,28469617,70469690,21285376,24649781,32092600];

    //=========== MAIN ===================
    var xOffset;
    var barNum = dateAry.length;
    var barWidth;
    var barGap = 1;
    var stickWidth = 1;
    var kMaxY = getNum(hAry,"max", barNum);
    var kMinY = getNum(lAry,"min", barNum);
    var vMax = getNum(vAry,"max", barNum);
    var vMin = getNum(vAry,"min", barNum);

    //var labelK = drawLabelY(kMin, kMax, 4, drawArea1.h);
    //var labelV = drawLabelY(vMin, vMax, 3, drawArea2.h);

    xOffset = 0//Math.max(labelK.getBounds().width, labelV.getBounds().width) + 2;

    if(artb != undefined)
    {
        drawArea1 = {w:artb.frame().width(), h:artb.frame().height()}
    }


    var dialog = COSAlertWindow.alloc().init();
    dialog.setMessageText("创建K线图");
    dialog.setInformativeText("根据所选 Artboard 尺寸，按以下参数生成 K 线图。\n注意：为了像素对齐所以生成图表宽度可能不满或超过画布宽度。");

    //Main UI
    dialog.addTextLabelWithValue("柱间距(px): ");
    var barGapSetting = NSTextField.alloc().initWithFrame(NSMakeRect(0, 0, 100, 24));
    barGapSetting.setStringValue(barGap);
    barGapSetting.setPlaceholderString("默认 " + barGap);
    dialog.addAccessoryView(barGapSetting);

    dialog.addTextLabelWithValue("柱数量(最大 "+dateAry.length+"): ");
    var barNumSetting = NSTextField.alloc().initWithFrame(NSMakeRect(0, 0, 100, 24));
    barNumSetting.setStringValue(dateAry.length);
    barNumSetting.setPlaceholderString("最大 " + dateAry.length);
    dialog.addAccessoryView(barNumSetting);

    dialog.addButtonWithTitle("OK");
    dialog.addButtonWithTitle("Cancel");

    var responseCode = dialog.runModal();

    if (responseCode == "1000")
    {
        var newBarGap = parseFloat(barGapSetting.stringValue());
        var newBarNum = parseFloat(barNumSetting.stringValue());

        barGap = newBarGap;
        barNum = newBarNum;

        var graphK = drawGraphK(drawArea1);
    }

    log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    log("^^^^^^^^^^^^^^^^^^^^^^        END THE RUN         ^^^^^^^^^^^^^^^^^^^^^");
    log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");

    //=========== Draw the graph ===================
    function drawGraphK(size){
        size = size || {w:100, h:100};

        var dataDrawW = Math.round(size.w - xOffset);
        var dataDrawH = size.h - 0//fontSize;

        var graph_k = newGroup("GRAPH_CANDLE");
        var graph = newGroup("graph", graph_k);

        barWidth = Math.round((dataDrawW/barNum)-barGap);
        var valMax = kMaxY;
        var valMin = kMinY;

        var yScale = dataDrawH/(valMax - valMin);

        //DRAW GRAPH
        for(var i=0; i<barNum; i++){
            var newBY = Math.round(dataDrawH - (oAry[i] - valMin)*yScale);
            var newSY = Math.round(dataDrawH - (hAry[i] - valMin)*yScale);
            
            var newBX = Math.round(i*(barWidth + barGap));
            var newSX = Math.floor(barWidth/2) + newBX;
            
            var newBH = Math.round((cAry[i] - oAry[i])*yScale*-1);
            if(newBH == 0){
                newBH = 1;
            }
            var newSH = Math.round((hAry[i] - lAry[i])*yScale);

            var newColor = "";
            if(cAry[i] - oAry[i]>=0){
                newColor = color_rise;
                var bar = drawBox(newBX, newBY, barWidth, newBH, newColor, graph, 0, "bar_rise");
                var stick = drawBox(newSX, newSY, stickWidth, newSH, newColor, graph, 0, "stick_rise");
            }else{
                newColor = color_fall;
                var bar = drawBox(newBX, newBY, barWidth, newBH, newColor, graph, 0, "bar_fall");
                var stick = drawBox(newSX, newSY, stickWidth, newSH, newColor, graph, 0, "stick_fall");
            }

        }

        return graph_k;
    }

    //==============================================


    //========== Draw a Rect ==========
    function drawBox(x, y, width, height, bgColor, parent, radius, name) {
        parent = parent || "";
        radius = radius || 0;
        name = name || "Rectangle";

        var newRect = MSRectangleShape.new();
        newRect.frame = MSRect.rectWithRect(NSMakeRect(x, y, width, height));
        var rectLayer = MSShapeGroup.shapeWithPath(newRect);

        //newRect.cornerRadiusFloat = radius;
        rectLayer.setName(name);
        rectLayer.style().addStylePartOfType(0);
        rectLayer.style().fill().setColor(hexToMSColor(bgColor));

        parent.addLayers([rectLayer]);

        //Select the newly created layer to update group frame
        doc.currentPage().deselectAllLayers();
        rectLayer.setIsSelected(true);
        
        return(rectLayer);
    }

    function drawLine(x1,y1,x2,y2,bgColor,parent){
        
        var newRect = MSRectangleShape.new();
        newRect.frame = MSRect.rectWithRect(NSMakeRect(x, y, width, height));
        var rectGroup = MSShapeGroup.shapeWithPath(newRect);

        //var fillRect = rectGroup.style().addStylePartOfType(0);
        //fillRect.color = MSColor.colorWithSVGString(bgColor);

        //If there's no artboards create the rect in the page
        if (doc.currentPage().artboards().count() == 0) {
            doc.currentPage().addLayers([rectGroup]);
        } else {
            doc.currentPage().currentArtboard().addLayers([rectGroup]);
        }

        //Deselect all layers and select the new created
        doc.currentPage().deselectAllLayers();
        rectGroup.setIsSelected(true);
    }

    function drawLabelY(valMin, valMax, num, drawHeight){
        var labelContainer = new createjs.Container();

        var labelRange = valMax - valMin;
        for(var i=0; i<num; i++){		
            var newLabel = drawLabel(0, 0, (valMin+i*labelRange/num).toFixed(2));

            if(i == 0){
                newLabel.y = drawHeight - fontSize;
            }else{
                newLabel.y = drawHeight - i*(drawHeight/(num-1));
            }

            labelContainer.addChild(newLabel);
        }

        labelContainer.name = "labelY";	
        return labelContainer;
    }

    function drawGridH(size, hNum, color, yPadding){
        yPadding = yPadding || 0;

        var gridH = new createjs.Container();

        size.h = Math.round(size.h - yPadding*2);
        for(var i=0; i<hNum; i++){
            var newLine = drawLine(0.5, i*(size.h/(hNum-1))+0.5, size.w, i*(size.h/(hNum-1))+0.5, color_grid);

            gridH.addChild(newLine);
        }

        return gridH;
    }
    
    function newGroup(name, parent){
        name = name||"Group";
        if(artb == undefined)
        {
            parent = parent || "";    
        }
        else
        {
            parent = parent || artb;
        }
        
        
        var group = MSLayerGroup.new();
        group.setName(name);
        
        if(parent == ""){
            doc.currentPage().addLayers([group]);
        }else{
            parent.addLayers([group]);
        }
        
        
        return group;
    }

    //Get the max of min number (max by defalut) from an array in a given range (array length by defalut)
    function getNum(ary, direction, length){
        direction = direction || "max";
        length = length || ary.length;
        var op = ary[0];	

        if(direction == "min"){
            for(var i=0; i<length; i++){
                if(ary[i]<op){
                    op = ary[i]
                }
            }

            return op;
        }else{
            for(var i=0; i<length; i++){
                if(ary[i]>op){
                    op = ary[i]
                }
            }

            return op;
        }
    }

    function hexToMSColor(hexStr)
    {
        var cleanStr = hexStr.replace("#","");
        var r = parseInt(cleanStr.slice(0,2),16);
        var g = parseInt(cleanStr.slice(2,4),16);
        var b = parseInt(cleanStr.slice(4,6),16);

        var opMSColor = MSColor.colorWithRed_green_blue_alpha(r/255, g/255, b/255, 1);
        return opMSColor;
    }

};

