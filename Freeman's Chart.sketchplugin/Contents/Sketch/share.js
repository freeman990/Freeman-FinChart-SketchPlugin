//===============================================
//==========    Create a new group    ===========
//===============================================
function addGroup(name, parent){
    name = name||"Group";

    var group = MSLayerGroup.new();
    group.setName(name);

    parent.addLayers([group]);
    return group;
}

function addArtboard(width, height, page){
    var artboard = MSArtboardGroup.alloc().initWithFrame_(NSMakeRect(page.originForNewArtboard().x, page.originForNewArtboard().y, width, height));

    page.addLayers([artboard]);
    return artboard;
}


//===============================================
//=====     Draw Rectangle with x,y,w,h     =====
//===============================================
function drawBox(x, y, width, height, color, parent, radius, name) {
    color = color || MSColor.colorWithRed_green_blue_alpha(0.5,0.5,0.5,1);
    parent = parent || "";
    radius = radius || 0;
    name = name || "Rectangle";

    var newRect = MSRectangleShape.new();
    newRect.frame = MSRect.rectWithRect(NSMakeRect(x, y, width, height));
    var rectLayer = MSShapeGroup.shapeWithPath(newRect);

    //newRect.cornerRadiusFloat = radius;
    rectLayer.setName(name);
    rectLayer.style().addStylePartOfType(0);
    rectLayer.style().fills()[0].setColor(hexToMSColor(color));

    parent.addLayers([rectLayer]);
    rectLayer.resizeToFitChildrenWithOption(0);

    //Add the newly created layer to selection to update frame & make next draw pos right
    //doc.currentPage().deselectAllLayers();
    //rectLayer.setIsSelected(true);

    return rectLayer;
}

//===============================================
//======    Draw Line with point array    =======
//===============================================
function drawLine(dotAry, color, parent, name)
{
    color = color || MSColor.colorWithRed_green_blue_alpha(0.5,0.5,0.5,1);
    parent = parent || "";
    name = name || "line";

    var linePath = NSBezierPath.bezierPath();
    linePath.moveToPoint(CGPointMake(dotAry[0].x, dotAry[0].y));
    for(var i=1; i<dotAry.length; i++)
    {
        linePath.lineToPoint(CGPointMake(dotAry[i].x, dotAry[i].y))
    }

    var lineLayer = MSShapeGroup.shapeWithBezierPath(linePath);
    lineLayer.setName(name);
    var layerStyle = lineLayer.style().addStylePartOfType(1);
    layerStyle.setColor(color);
    layerStyle.setThickness(1);
    layerStyle.setPosition(0);

    parent.addLayers([lineLayer]);
    lineLayer.resizeToFitChildrenWithOption(0);

    return lineLayer;
}

//===============================================
//====    Get Max/Min Number from array     =====
//===============================================
//Get the max of min number (max by defalut) from an array in a given range (array length by defalut)
function getMaxNum(ary, direction, length){
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

//===========================================================
//==    Translate string like "#FFFFFF" to MSColor Object  ==
//===========================================================
function hexToMSColor(hexStr)
{
    var cleanStr = hexStr.replace("#","");
    var r = parseInt(cleanStr.slice(0,2),16);
    var g = parseInt(cleanStr.slice(2,4),16);
    var b = parseInt(cleanStr.slice(4,6),16);

    var opMSColor = MSColor.colorWithRed_green_blue_alpha(r/255, g/255, b/255, 1);
    return opMSColor;
}

function getAvgNum(ary, index, avg)
{
    var calc = 0;
    if(index - avg >= 0){
        for(var i=0; i<avg; i++)
        {
            calc += ary[index-i];
        }

        return Math.round(calc/avg);
    }else{
        return 0;
    }
}

function valueToPosY(value, vMax, vMin, height){
    var posY;

    posY = height - ( ( value - vMin ) / ( vMax - vMin ) * height );

    return Math.round(posY);
}
