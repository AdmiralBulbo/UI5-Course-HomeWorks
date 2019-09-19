sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("UI5_course.UI5_course.controller.view2", {
		onInit: function () {

		},
		onNavigate: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			if (oEvent.getParameter("id").includes("btnTask2Back")) {
				oRouter.navTo("app");
			}
			else if (oEvent.getParameter("id").includes("btnTask2Next")) {
				oRouter.navTo("view3");
			}
		}
	});

});