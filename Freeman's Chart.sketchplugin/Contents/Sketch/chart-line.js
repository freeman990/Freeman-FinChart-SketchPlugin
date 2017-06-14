@import "share.js";
@import "data-timeline.js";

var artb;
var drawArea = {w:0, h:0};
var tradeMinutes = 240;
/*----- var for Price Line -----*/
var priceDataAry = [];
var priceBorderTestAry = [];
var priceOffsetMax;
var priceBorderMax;
var priceBorderMin;
/*----- var for Average Price Line -----*/
var avgStep = 10;
/*----- var for Volume Line -----*/
var volDataAry = [];
var volMax;
var volMin;

onRun = function(context)
{
	log("=======================================================================");
    log("=======================================================================");
    log("===================     RUN THE TIMELINE CHART     ====================");
    log("=======================================================================");
    log("=======================================================================");

    artb = context.document.currentPage().currentArtboard();
    if(artb == undefined)
    {
		//No artboard selected, giving defalut size
		drawArea = {w:800, h:600};
    }else {
		//Artboard selected, use as drawArea
        drawArea = {w:artb.frame().width(), h:artb.frame().height()};
    }

	/*----- get DataArray -----*/
	for(i in data_timeline)
	{
		priceDataAry.push(data_timeline[i][indexPrice])
		volDataAry.push(data_timeline[i][indexVolume])
	}

	/*----- get Price -----*/
    for(i in priceDataAry)
    {
    	var priceOffset = Math.abs(priceDataAry[i]-data_timeline_open);
    	priceBorderTestAry.push(priceOffset);
    }
    priceOffsetMax = getMaxNum(priceBorderTestAry, "max");
    priceBorderMax = data_timeline_open + priceOffsetMax;
    priceBorderMin = data_timeline_open - priceOffsetMax;
	volMax = getMaxNum(volDataAry, "max");
	volMin = getMaxNum(volDataAry, "min");

	buildLineChart();
}

function getPriceChartPoints(dataAry, valMax, valMin, drawArea){
	var pntAry = [];

	for(i in dataAry){
		var pX = Math.floor(i * (drawArea.w / dataAry.length));
		var pY = valueToPosY(dataAry[i], valMax, valMin, drawArea.h);
		pntAry.push({x:pX, y:pY});
	}

	return pntAry;
}

function getAverageChartPoints(dataAry, valMax, valMin, drawArea, avgStep){
	var pntAry = [];

	for(i=avgStep; i<dataAry.length; i += avgStep){
		var pX = Math.floor(i * (drawArea.w / dataAry.length));
		var avgVal = 0;
		for(k=0; k<avgStep; k++){
			avgVal += dataAry[i-k];
		}
		avgVal /= avgStep;
		var pY = valueToPosY(avgVal, valMax, valMin, drawArea.h);

		pntAry.push({x:pX, y:pY});
	}

	return pntAry;
}

function darwVolChart(dataAry, valMax, valMin, drawArea, priceData, groupAry){
	for(i in dataAry){
		var pX = Math.floor(i * (drawArea.w / dataAry.length));
		var pY = valueToPosY(dataAry[i], volMax, volMin, drawArea.h/4);
		var pntAry = [
				{x:pX, y:drawArea.h},
				{x:pX, y:pY + drawArea.h*0.75}];

		if(priceData[i]-priceData[i-1] > 0){
			drawLine(pntAry, hexToMSColor("#F64843"), groupAry[0], "vol");
		}else {
			drawLine(pntAry, hexToMSColor("#5C9F34"), groupAry[1], "vol");
		}

	}
}

function buildLineChart(){
	var root = addGroup("LineChart", artb);
	var volFolder = addGroup("Vol", root);
	var volRise = addGroup("rise", volFolder);
	var volFall = addGroup("fall", volFolder);

	var pricePnts = getPriceChartPoints(priceDataAry, priceBorderMax, priceBorderMin, drawArea);
	var avgPnts = getAverageChartPoints(priceDataAry, priceBorderMax, priceBorderMin, drawArea, 10);

	var priceAreaPnts = pricePnts.slice();
	priceAreaPnts.push({x:priceAreaPnts[priceAreaPnts.length-1].x, y:drawArea.h});
	priceAreaPnts.push({x:0, y:drawArea.h});

	var a = drawLine(priceAreaPnts, hexToMSColor("#667788"), root, "分时曲线_area");
	var b = drawLine(pricePnts, hexToMSColor("#667788"), root, "分时曲线_line");
	var c = drawLine(avgPnts, hexToMSColor("#ff8833"), root, "均线_line");
	darwVolChart(volDataAry, volMax, volMin, drawArea, priceDataAry, [volRise, volFall]);

	a.setIsClosed(true);
	a.style().borders()[0].setIsEnabled(false);
	var fill = a.style().addStylePartOfType(0);
	fill.color = hexToMSColor("#667788");
	fill.setOpacity(0.2);

	volFall.resizeToFitChildrenWithOption(0);
	volRise.resizeToFitChildrenWithOption(0);
	volFolder.resizeToFitChildrenWithOption(0);
	root.resizeToFitChildrenWithOption(0);
}
