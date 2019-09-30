sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("UI5_course.UI5_course.controller.workerInfo", {
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("workerInfo").attachMatched(this._onRouteMatched, this);
		},
		
		_onRouteMatched: function (oEvent) {
			var oArgs = oEvent.getParameter("arguments");
			var oView = this.getView();
			oView.bindElement({
				 path: "/workers/" + (oArgs.workerId-1), 
				 model:"workers"
			});
		},
		
		onNavigate: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("view3");
			
		}
	});

});