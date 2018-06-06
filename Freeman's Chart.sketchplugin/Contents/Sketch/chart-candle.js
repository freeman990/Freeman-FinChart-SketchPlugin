@import "MochaJSDelegate.js";
@import "share.js";
@import "data.js";

var onRun = function(context) {
    log("=======================================================================");
    log("======================       RUN THE CHART        =====================");
    log("=======================================================================");

    var doc = updateContext().document;
    var userDefaults = NSUserDefaults.standardUserDefaults();
    var page = doc.currentPage();

    //=========== COLOR ===================
    var chartTheme = {}
        chartTheme.rise = "#F64843";
        chartTheme.fall = "#5C9F34";
        chartTheme.grid = "#2d2d2d";
        chartTheme.font = "#555";
        chartTheme.v = "#6DC8EA"
        chartTheme.ma5 = "#FFDE26";
        chartTheme.ma10 = "#3AACE8";
        chartTheme.ma30 = "#EFB7B9";

    //=========== MAIN ===================
    var xOffset = 0;
    var maxAverage = 30;
    var stickWidth = 1;
    var dataStartID = 0;
    var drawAverageLine = true;

    //=========== DATA ===================
    var chartData = jsData;
    var dataLength = chartData.length - maxAverage;

    if (context.selection.count() > 0 && context.selection[0].class() == 'MSArtboardGroup'){
        //Artboard Selected
        var drawArea = {
            w:context.selection[0].frame().width()+xOffset,
            h:context.selection[0].frame().height()
        }
        openUI(context, drawArea, chartData, dataLength, chartTheme)
    }else{
        alert('Please Select an Artboard')
    }


    log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    log("^^^^^^^^^^^^^^^^^^^^^^        END THE RUN         ^^^^^^^^^^^^^^^^^^^^^");
    log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");

};


//=========== Draw the CHART ===================

function drawCandleChart(artboard, drawArea, barNum, barWidth, barGap, chartData, chartTheme){
    var stickWidth = 1;
    barNum = (barNum > chartData.length) ? chartData.length : barNum
    log(barNum)
    //Init layerGroup structure
    var CANDLE_group = addGroup("CandleStick Chart", artboard);
        var CHART_group = addGroup("ChartItem", CANDLE_group);
            var rise_group = addGroup("RISE", CHART_group);
                var rise_bar = addGroup("Bar", rise_group);
                var rise_stick = addGroup("Stick", rise_group);
            var fall_group = addGroup("FALL", CHART_group);
                var fall_bar = addGroup("Bar", fall_group);
                var fall_stick = addGroup("Stick", fall_group);

    //Define price boundary
    var valueBoundaryTestAry = [];
    for(var j = chartData.length - barNum; j<chartData.length; j++)
    {
        valueBoundaryTestAry.push(chartData[j][indexHigh]);
        valueBoundaryTestAry.push(chartData[j][indexLow]);
    }
    var priceMax = getMaxNum(valueBoundaryTestAry, "max");
    var priceMin = getMaxNum(valueBoundaryTestAry, "min");
    var yScale = drawArea.h/(priceMax - priceMin);
    var startID = chartData.length - barNum

    //Draw each candleStick
    for(var i=startID; i<chartData.length; i++)
    {
        var dataItem = chartData[i];

        var newBY = Math.round(drawArea.h - (dataItem[indexOpen] - priceMin) * yScale);
        var newSY = Math.round(drawArea.h - (dataItem[indexHigh] - priceMin) * yScale);

        var xOrder = i - startID;
        var newBX = Math.round(xOrder * (barWidth+barGap));
        var newSX = Math.floor(barWidth/2) + newBX;
        var newBH = Math.round((dataItem[indexClose] - dataItem[indexOpen]) * yScale*-1);
        if(newBH == 0){
            newBH = 1;
        }

        var newSH = Math.round((dataItem[indexHigh] - dataItem[indexLow]) * yScale);

        if(dataItem[indexClose] - dataItem[indexOpen]>=0){
            var newColor = chartTheme.rise;
            var bar = drawBox(newBX, newBY, barWidth, newBH, newColor, rise_bar, 0, "bar_rise");
            var stick = drawBox(newSX, newSY, stickWidth, newSH, newColor, rise_stick, 0, "stick_rise");
        }else{
            var newColor = chartTheme.fall;
            var bar = drawBox(newBX, newBY, barWidth, newBH, newColor, fall_bar, 0, "bar_fall");
            var stick = drawBox(newSX, newSY, stickWidth, newSH, newColor, fall_stick, 0, "stick_fall");
        }
    }
    rise_group.resizeToFitChildrenWithOption(0)
    rise_bar.resizeToFitChildrenWithOption(0)

    fall_bar.resizeToFitChildrenWithOption(0)
    fall_stick.resizeToFitChildrenWithOption(0)

    rise_stick.resizeToFitChildrenWithOption(0)
    fall_group.resizeToFitChildrenWithOption(0)

    CANDLE_group.resizeToFitChildrenWithOption(0)
    CHART_group.resizeToFitChildrenWithOption(0)

    log("haha")
}

function buildAverageLine(drawArea, days, color, parent, name)
{
    var yScale = drawArea.h/(priceMax - priceMin);

    var avgLineAry = [];
    for(var i=dataStartID; i<chartData.length; i++)
    {
        var dataItem = chartData[i];
        var order = i-dataStartID;

        var newPX = Math.floor(barWidth/2) + Math.round(order * (barWidth+barGap));
        var calc = 0;
        if(dataStartID - days >= 0){
            for(var k=0; k<days; k++)
            {
                calc += chartData[i-k][indexClose];
            }
            var newPY = Math.round(drawArea.h - (calc/days - priceMin) * yScale);
        }
        avgLineAry.push({x:newPX, y:newPY})
    }

    drawLine(avgLineAry, color, parent, name)
}


//From HTML Webview Template
function updateContext() {
    var doc = NSDocumentController.sharedDocumentController().currentDocument();

    return {
        document: doc
    }
}

function parseHash(aURL) {
    aURL = aURL;
    var vars = {};
    var hashes = aURL.slice(aURL.indexOf('#') + 1).split('&');

    for(var i = 0; i < hashes.length; i++) {
        var hash = hashes[i].split('=');

        if(hash.length > 1) {
            vars[hash[0].toString()] = hash[1];
        } else {
            vars[hash[0].toString()] = null;
        }
    }

    return vars;
}


function alert(message) {
    var alert = NSAlert.alloc().init()
    alert.setMessageText(message)
    alert.runModal();
}

function parseHashBoolean(str){
    if(str == 'true'){
        return true
    }else{
        return false
    }
}

function openUI(context, drawArea, chartData, dataLength, chartTheme){
    //================
    // HTML WEB VIEW TEMPLATE by jacopocolo /Thanks guys, this template really helps.
    //================
    var title = "Generate Candlestick Chart";
    var identifier = "com.jacopocolo.webviewtemplate";
    var threadDictionary = NSThread.mainThread().threadDictionary();

    if (threadDictionary[identifier]) {
          return;
    }

    var windowWidth =  448, windowHeight = 566;
    var webViewWindow = NSPanel.alloc().init();
    webViewWindow.setFrame_display(NSMakeRect(0, 0, windowWidth, windowHeight), true);
    webViewWindow.setStyleMask(NSTexturedBackgroundWindowMask | NSTitledWindowMask | NSClosableWindowMask | NSResizableWindowMask);

    //Uncomment the following line to define the app bar color with an NSColor
    //webViewWindow.setBackgroundColor(NSColor.whiteColor());
    webViewWindow.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true);
    webViewWindow.standardWindowButton(NSWindowZoomButton).setHidden(true);
    webViewWindow.setTitle(title);
    webViewWindow.setTitlebarAppearsTransparent(true);
    webViewWindow.becomeKeyWindow();
    webViewWindow.setLevel(NSFloatingWindowLevel);
    threadDictionary[identifier] = webViewWindow;
    COScript.currentCOScript().setShouldKeepAround_(true);

    //Add Web View to window
        var webView = WebView.alloc().initWithFrame(NSMakeRect(0, 0, windowWidth, windowHeight - 24));
        webView.setAutoresizingMask(NSViewWidthSizable|NSViewHeightSizable);
        var windowObject = webView.windowScriptObject();
        var delegate = new MochaJSDelegate({

            "webView:didFinishLoadForFrame:" : (function(webView, webFrame) {
                //We call this function when we know that the webview has finished loading
                //It's a function in the UI and we run it with a parameter coming from the updated context
                windowObject.evaluateWebScript("initHTMLData("+drawArea.w+","+dataLength+")");
            }),

            //To get commands from the webView we observe the location hash: if it changes, we do something
            "webView:didChangeLocationWithinPageForFrame:" : (function(webView, webFrame) {
                var locationHash = windowObject.evaluateWebScript("window.location.hash");
                //The hash object exposes commands and parameters
                //In example, if you send updateHash('add','artboardName','Mark')
                //You’ll be able to use hash.artboardName to return 'Mark'
                var hash = parseHash(locationHash);
                log(hash);
                //We parse the location hash and check for the command we are sending from the UI
                //If the command exist we run the following code
                if (hash.hasOwnProperty('update')) {
                    //In example updating the artboard count based on the current contex.
                    //The evaluateWebScript function allows us to call a function from the UI.html with parameters
                    //coming from Sketch
                    //windowObject.evaluateWebScript("updateInput("+updateContext().document.currentPage().artboards().count()+");");
                }
                else if(hash.hasOwnProperty('drawByScreen')){
                    var barNum = Number(hash.num);
                    var barGap = Number(hash.gap);
                    var barWidth = 0;
                    var px = parseHashBoolean(hash.px);
                    if(px){
                        barWidth = Math.ceil((drawArea.w/barNum)-barGap);
                    } else{
                        barWidth = (drawArea.w/barNum)-barGap;
                    }

                    ////DRAW by screen
                    drawCandleChart(context.selection[0], drawArea, barNum, barWidth, barGap, chartData, chartTheme)

                    //Webview cleanup
                    threadDictionary.removeObjectForKey(identifier);
                    webViewWindow.close();
                }
                else if(hash.hasOwnProperty('drawByObject')){
                    var barNum = Number(hash.num);
                    var barGap = Number(hash.gap);
                    var barWidth = Number(hash.siz);

                    //DRAW by object
                    drawCandleChart(context.selection[0], drawArea, barNum, barWidth, barGap, chartData, chartTheme)

                    //Webview cleanup
                    threadDictionary.removeObjectForKey(identifier);
                    webViewWindow.close();
                }
                else if (hash.hasOwnProperty('close')) {
                    //We can also call commands on the window itself, like closing the window
                    //This can be run aftr other commands, obviously
                    threadDictionary.removeObjectForKey(identifier);
                    webViewWindow.close();
                }
            })
        });

        webView.setFrameLoadDelegate_(delegate.getClassInstance());
        webView.setMainFrameURL_(context.plugin.urlForResourceNamed("ui.html").path());
        webViewWindow.contentView().addSubview(webView);
        webViewWindow.center();
        webViewWindow.makeKeyAndOrderFront(nil);
        // Define the close window behaviour on the standard red traffic light button
        var closeButton = webViewWindow.standardWindowButton(NSWindowCloseButton);
        closeButton.setCOSJSTargetFunction(function(sender) {
          COScript.currentCOScript().setShouldKeepAround(false);
          threadDictionary.removeObjectForKey(identifier);
          webViewWindow.close();
        });
        closeButton.setAction("callAction:");
}
