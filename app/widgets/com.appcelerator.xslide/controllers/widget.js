var args = arguments[0] || {};

var rows = [
	$.header
];
var menuWidth = "80%";
var content = null;
var controller = null;

if(args.home){
	menuClick({source:args.home, suppress:true});
}

if(args.menu){
	if(args.menu.title){
		$.leftBtn.text = args.menu.title;
	}
	if(args.menu.items){
		var menuItems = args.menu.items;
		for(var i in menuItems){
			rows.push(Ti.UI.createTableViewRow({
				title:menuItems[i].title,
				controller:menuItems[i].controller,
				color:"#000000",
				height:$.nav.height+10,
				backgroundColor:"transparent"
			}));
		}
		$.menu.setData(rows);
	}
	if(args.menu.width){
		menuWidth = args.menu.width;
	}
	if(args.menu.backgroundColor){
		$.menu.backgroundColor = args.menu.backgroundColor;
	}
}

if(args.info){
	if(args.info.title){
		$.rightBtn.text = args.info.title;
	}
	
	if(args.info.controller){
		$.info.add(Alloy.createController(args.info.controller,args.info.args || {}).getView());
	}
}

function menuClick(evt){
	
	if(evt.source.id != "table" && evt.source.id != "header" ){
		try{
			if(content != evt.source.controller){
				content = evt.source.controller;
				var current = controller;
				controller = Alloy.createController(content);
				$.content.add(controller.getView());
				$.title.text = evt.source.title;
				$.content.remove(current.getView());
				current.destroy();
				current.close && current.close();
				current = null;
			}
			
		} catch(err){
			
		}
		if(!evt.suppress){
			menuOpen();
		}
		
	}	
}

function menuOpen(){
	if($.main.left == menuWidth){
		$.main.removeEventListener("touchstart", menuOpen);
		$.main.animate({left:0, duration:500},function(){
			$.main.left=0;
		});
	} else {
		$.main.addEventListener("touchstart", menuOpen);
		if($.container.top !=0 && $.container.top != undefined){
			infoOpen();
		}
		$.main.animate({left:menuWidth, duration:500}, function(){
			$.main.left=menuWidth;
		});
	}
}

function infoOpen(){
	var infoHeight = $.main.size.height-$.nav.height;//Ti.Platform.displayCaps.platformHeight/(OS_ANDROID?Ti.Platform.displayCaps.logicalDensityFactor:1)-$.nav.height;
	if($.container.top == infoHeight){
		$.container.animate({top:0, duration:500},function(){
			$.container.top=0;
		});
	} else {
		$.container.animate({top:infoHeight, duration:500}, function(){
			$.container.top=infoHeight;
		});
	}
}
