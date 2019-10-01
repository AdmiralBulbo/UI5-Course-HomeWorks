sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
	"use strict";

	return Controller.extend("UI5_course.UI5_course.controller.view1", {
		onInit: function () {
			var OModel = new JSONModel();
			this.getView().setModel(OModel);
		},

		onFormSend: function () {
			var oModel = this.getView().getModel();
			var data = oModel.getJSON();

			var xhr = new XMLHttpRequest();
			xhr.withCredentials = true;
			xhr.addEventListener("readystatechange", function () {
				if (this.readyState === 4) {
					MessageToast.show('JSON data that will be send: ' + data);
				}
			});
			xhr.open('POST', 'http://localhost:2403/workers');
			xhr.setRequestHeader('Content-Type', "application/json");
			xhr.send(data);
		},

		onNavigate: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			if (oEvent.getParameter("id").includes("btnTask1Next")) {
				oRouter.navTo("view2");
			}
			else if (oEvent.getParameter("id").includes("btnToMain")) {
				oRouter.navTo("app");
			}
		}
	});

});