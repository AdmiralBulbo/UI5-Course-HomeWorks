sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
	"use strict";

	return Controller.extend("UI5_course.UI5_course.controller.App", {
		onInit: function () {
		},

		onNavigate: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			if (oEvent.getParameter("id").includes("btnToTask1")) {
				oRouter.navTo("view1");
			}
			else if (oEvent.getParameter("id").includes("btnToTask2")) {
				oRouter.navTo("view2");
			}
			else if (oEvent.getParameter("id").includes("btnToTask3")) {
				oRouter.navTo("view3");
			}
			else if (oEvent.getParameter("id").includes("btnToTask4")) {
				oRouter.navTo("view4");
			}
		}
	});
});