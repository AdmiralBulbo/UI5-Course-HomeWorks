sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("UI5_course.UI5_course.controller.view3", {

		onInit: function () {

		},

		onNavigate: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("view2");
		},

		onItemPress: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var oItem = oEvent.getSource();
			var oCtx = oItem.getBindingContext("workers");
			oRouter.navTo("workerInfo", {
				workerId: oCtx.getProperty("id")
			});
		}

	});

});