@import "share.js";
@import "data-timeline.js";

onRun = function(context)
{
	log("=======================================================================");
    log("=======================================================================");
    log("===================     RUN THE TIMELINE CHART     ====================");
    log("=======================================================================");
    log("=======================================================================");
	
    var doc = context.document;
    var page = doc.currentPage();
    var artb = page.currentArtboard();

	var drawArea = {w:100, h:100};
    if(artb != undefined)
    {
        drawArea = {w:artb.frame().width(), h:artb.frame().height()};
    }

    var tradeMinutes = 240;

    var priceBoundaryTestArray = [];
    for(i in data_timeline)
    {
    	var priceOffset = Math.abs(data_timeline[i][indexPrice]-data_timeline_open);
    	priceBoundaryTestArray.push(priceOffset);
    }

    var OffsetMax = getMaxNum(priceBoundaryTestArray, "max");
    var boundaryMax = data_timeline_open + OffsetMax;
    var boundaryMin = data_timeline_open - OffsetMax;

    log(OffsetMax);log(boundaryMax);log(boundaryMin); 
    var yScale = drawArea.h / (boundaryMax - boundaryMin);

    var timelinePointAry = [];
    for(k in data_timeline)
    {
    	var pX;
    	var pY;

    	pX = Math.floor(k * (drawArea.w / tradeMinutes));

    	if(k<tradeMinutes)
    	{
    		pY = Math.round(drawArea.h - (data_timeline[k][indexPrice] - boundaryMin) * yScale);
    		timelinePointAry.push({x:pX, y:pY});
    	}

    }

    drawLine(timelinePointAry, hexToMSColor("#667788"), artb, "分时曲线");

}