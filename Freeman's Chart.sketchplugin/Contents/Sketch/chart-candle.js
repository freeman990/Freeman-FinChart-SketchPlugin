@import "share.js";
@import "data.js";

var onRun = function(context) {
    log("=======================================================================");
    log("=======================================================================");
    log("======================       RUN THE CHART        =====================");
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
    var color_ma5 = "#FFDE26";
    var color_ma10 = "#3AACE8";
    var color_ma30 = "#EFB7B9";
    var vBarWidth = 2;
    var yPadding = 10;
    var gridHNum = 4;
    var labelNum = 4;
    var fontSize = 10;

    //=========== MAIN ===================
    var xOffset;
    var barNum = data.length;
    var barWidth;
    var barGap = 1;
    var stickWidth = 1;
    var dataStartID = 0;
    var drawAverageLine = true;


    xOffset = 0//Math.max(labelK.getBounds().width, labelV.getBounds().width) + 2;

    if(artb != undefined)
    {
        drawArea1 = {w:artb.frame().width(), h:artb.frame().height()}
    }


    var dialog = COSAlertWindow.alloc().init();
    iconImage = NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("test.png").path());
    dialog.setIcon(iconImage);
    dialog.setMessageText("创建K线图");
    dialog.setInformativeText("根据所选 Artboard 尺寸，按以下参数生成 K 线图。\n注意：为了像素对齐所以生成图表宽度可能不满或超过画布宽度。");

    //Main UI
    dialog.addTextLabelWithValue("柱间距(px): ");
    var barGapSetting = NSTextField.alloc().initWithFrame(NSMakeRect(0, 0, 100, 24));
    barGapSetting.setStringValue(barGap);
    barGapSetting.setPlaceholderString("默认 " + barGap);
    dialog.addAccessoryView(barGapSetting);

    dialog.addTextLabelWithValue("柱数量(最大 "+(data.length-30)+"): ");
    var barNumSetting = NSTextField.alloc().initWithFrame(NSMakeRect(0, 0, 100, 24));
    barNumSetting.setStringValue(data.length-30);
    barNumSetting.setPlaceholderString("最大 " + (data.length-30));
    dialog.addAccessoryView(barNumSetting);

    var averageLineCheck = NSButton.alloc().initWithFrame(NSMakeRect(0,0,100,24));
    averageLineCheck.state = NSOnState;
    averageLineCheck.title = "绘制均线"
    averageLineCheck.setButtonType(NSSwitchButton);
    averageLineCheck.setBezelStyle(0);
    dialog.addAccessoryView(averageLineCheck);

    dialog.addButtonWithTitle("OK");
    dialog.addButtonWithTitle("Cancel");

    var responseCode = dialog.runModal();

    if (responseCode == "1000"){

        var newBarGap = parseFloat(barGapSetting.stringValue());
        var newBarNum = parseFloat(barNumSetting.stringValue());

        barGap = newBarGap;
        barNum = newBarNum;

        var CHART_wrapper = addGroup("K线图", context.document.currentPage().currentArtboard());
        var CHART = addGroup("图表", CHART_wrapper);
        var part_rise = addGroup("上涨", CHART);
        var part_fall = addGroup("下跌", CHART);
        var stick_rise = addGroup("线", part_rise);
        var stick_fall = addGroup("线", part_fall);
        var bar_rise = addGroup("块", part_rise);
        var bar_fall= addGroup("块", part_fall);

        if(barNum >= data.length){
            dataStartID = 0;
        }
        else{
            dataStartID = data.length - barNum;
        }

        var valueBoundaryTestAry = [];

        for(var i=dataStartID; i<data.length; i++)
        {
            valueBoundaryTestAry.push(data[i][indexHigh]);
            valueBoundaryTestAry.push(data[i][indexLow]);
        }
        var priceMax = getMaxNum(valueBoundaryTestAry, "max");
        var priceMin = getMaxNum(valueBoundaryTestAry, "min");

        //Build the chart
        var CHARTK = buildCandlesChart(drawArea1);

        //Build the average line
        if(averageLineCheck.state())
        {
            var ma5 = buildAverageLine(drawArea1, 5, hexToMSColor(color_ma5), CHART_wrapper, "MA5");
            var ma10 = buildAverageLine(drawArea1, 10, hexToMSColor(color_ma10), CHART_wrapper, "MA10");
            var ma30 = buildAverageLine(drawArea1, 30, hexToMSColor(color_ma30), CHART_wrapper, "MA30");
        }
    }

    log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    log("^^^^^^^^^^^^^^^^^^^^^^        END THE RUN         ^^^^^^^^^^^^^^^^^^^^^");
    log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");

    //=========== Draw the CHART ===================
    function buildCandlesChart(size){
        size = size || {w:100, h:100};
        var dataDrawW = Math.round(size.w - xOffset);
        var dataDrawH = size.h - 0//fontSize;

        var yScale = dataDrawH/(priceMax - priceMin);

        barWidth = Math.round((dataDrawW/barNum)-barGap);

        //DRAW CHART
        for(var i=dataStartID; i<data.length; i++)
        {
            var dataItem = data[i];
            var order = i-dataStartID;

            var newBY = Math.round(dataDrawH - (dataItem[indexOpen] - priceMin) * yScale);
            var newSY = Math.round(dataDrawH - (dataItem[indexHigh] - priceMin) * yScale);

            var newBX = Math.round(order * (barWidth+barGap));
            var newSX = Math.floor(barWidth/2) + newBX;

            var newBH = Math.round((dataItem[indexClose] - dataItem[indexOpen]) * yScale*-1);
            if(newBH == 0){
                newBH = 1;
            }

            var newSH = Math.round((dataItem[indexHigh] - dataItem[indexLow]) * yScale);

            if(dataItem[indexClose] - dataItem[indexOpen]>=0){
                var newColor = color_rise;
                var bar = drawBox(newBX, newBY, barWidth, newBH, newColor, bar_rise, 0, "bar_rise");
                var stick = drawBox(newSX, newSY, stickWidth, newSH, newColor, stick_rise, 0, "stick_rise");
            }else{
                var newColor = color_fall;
                var bar = drawBox(newBX, newBY, barWidth, newBH, newColor, bar_fall, 0, "bar_fall");
                var stick = drawBox(newSX, newSY, stickWidth, newSH, newColor, stick_fall, 0, "stick_fall");
            }
        }
    }

    function buildAverageLine(size, days, color, parent, name)
    {
        size = size || {w:100, h:100};
        var dataDrawW = Math.round(size.w - xOffset);
        var dataDrawH = size.h - 0//fontSize;
        var yScale = dataDrawH/(priceMax - priceMin);

        var avgLineAry = [];
        for(var i=dataStartID; i<data.length; i++)
        {
            var dataItem = data[i];
            var order = i-dataStartID;

            var newPX = Math.floor(barWidth/2) + Math.round(order * (barWidth+barGap));
            var calc = 0;
            if(dataStartID - days >= 0){
                for(var k=0; k<days; k++)
                {
                    calc += data[i-k][indexClose];
                }
                var newPY = Math.round(dataDrawH - (calc/days - priceMin) * yScale);
            }

            log(newPY)
            avgLineAry.push({x:newPX, y:newPY})
        }

        drawLine(avgLineAry, color, parent, name)
    }

    //==============================================



    /*
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
    */

};
