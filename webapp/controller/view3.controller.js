sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
	"use strict";

	return Controller.extend("UI5_course.UI5_course.controller.view3", {

		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("view3").attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function (oEvent) {
			var xhr = new XMLHttpRequest();
			var result;
			var OModel = new JSONModel();
			xhr.addEventListener("readystatechange", function () {
				if (this.readyState === 4) {
					result = this.response;
					var data = '{ "workers":' + result + "}";
					OModel.setData(JSON.parse(data));
				}
			});
			xhr.open("GET", "http://localhost:2403/workers/");
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.send();
			this.getView().setModel(OModel, "workersDeployd");
		},

		onNavigate: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			if (oEvent.getParameter("id").includes("btnTask3Back")) {
				oRouter.navTo("view2");
			} else if (oEvent.getParameter("id").includes("btnTask3Next")) {
				oRouter.navTo("view4");
			}
		},

		onItemPress: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var oItem = oEvent.getSource();

			if (oEvent.getParameter("id").includes("coumnlist")) {
				oRouter.navTo("workerInfo", {
					workerId: oItem.getBindingContext("workers").getProperty("id")
				});
			} else if (oEvent.getParameter("id").includes("workerInfoBtn")) {
				oRouter.navTo("workerDeploydInfo", {
					workerId: oItem.getBindingContext("workersDeployd").getProperty("id")
				});
			}
		}

	});

});