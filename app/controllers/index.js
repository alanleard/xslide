$.index.add(Alloy.createWidget("com.appcelerator.xslide",{
	info:{
		controller:"info",
		title:"more"
	},
	menu: {
		title:"menu",
		width:"80%",
		backgroundColor:"#CCCCCC",
		items:[
			{title:"Home", controller:"home"}, 
			{title:"Page1", controller:"page1"}, 

		]
	},
	home:{title:"Home", controller:"page1"}
}).getView());

$.index.open();
