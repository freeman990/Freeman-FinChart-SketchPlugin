
onRun=function(context)
{

    log("=======================================================================");
    log("=======================================================================");
    log("======================         I AM TEST          =====================");
    log("=======================================================================");
    log("=======================================================================");
		var doc = context.document;
		var pluginRoot = context.scriptPath.stringByDeletingLastPathComponent().stringByDeletingLastPathComponent().stringByDeletingLastPathComponent();


		var frame = NSMakeRect(0, 0, 200, (200 + 32));

		var Panel = NSPanel.alloc().init();
		Panel.setFrame_display(frame, true);
    /*Panel.setTitleVisibility(NSWindowTitleHidden);
    Panel.setTitlebarAppearsTransparent(true);
    Panel.standardWindowButton(NSWindowCloseButton).setHidden(true);
    Panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true);
    Panel.standardWindowButton(NSWindowZoomButton).setHidden(true);
    Panel.setFrame_display(frame, true);
    Panel.setBackgroundColor(NSColor.colorWithRed_green_blue_alpha(1, 1, 1, 1));
    Panel.setWorksWhenModal(true);*/

		var contentView = Panel.contentView(),

    webView = WebView.alloc().initWithFrame(NSMakeRect(0, 0, 200, 200));
    //var windowObject = webView.windowScriptObject();
    //contentView.setWantsLayer(true);
    //contentView.layer().setFrame(frame);
    //webView.setBackgroundColor(NSColor.colorWithRed_green_blue_alpha(1, 1, 1, 1));
    webView.setMainFrameURL_(pluginRoot+"/Contents/Resources/ui.html")
    contentView.addSubview(webView);

		var closeBtn = NSButton.alloc().initWithFrame(NSMakeRect(0,0,100,20));



		log(NSApp.runModalForWindow(Panel));


}
