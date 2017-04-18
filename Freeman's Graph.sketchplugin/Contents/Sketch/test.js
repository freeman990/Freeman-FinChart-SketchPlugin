
onRun=function(context)
{
	var doc = context.document;
    log("=======================================================================");
    log("=======================================================================");
    log("======================         I AM TEST          =====================");
    log("=======================================================================");
    log("=======================================================================");


    function drawLine(dotAry, color)
    {
    	color = color || MSColor.colorWithRed_green_blue_alpha(0.5,0.5,0.5,1);
    	var linePath = NSBezierPath.bezierPath();
    	linePath.moveToPoint(CGPointMake(dotAry[0].x, dotAry[0].y));
    	for(var i=1; i<dotAry.length; i++)
    	{
    		linePath.lineToPoint(CGPointMake(dotAry[i].x, dotAry[i].y))
    	}

    	var lineLayer = MSShapeGroup.shapeWithBezierPath(linePath);
    	lineLayer.setName("line");
    	var layerStyle = lineLayer.style().addStylePartOfType(1);
    	layerStyle.setColor(color);
    	layerStyle.setThickness(1);
    	layerStyle.setPosition(0);

    	doc.currentPage().currentArtboard().addLayers([lineLayer]);
    }

    var dotAry = [{x:0, y:0},{x:100, y:20},{x:30, y:45}];
    drawLine(dotAry)

}