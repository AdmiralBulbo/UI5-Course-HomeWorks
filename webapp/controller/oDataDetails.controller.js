sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("UI5_course.UI5_course.controller.oDataDetails", {

		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("oDataDetails").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (oEvent) {
			var that = this;
			var oArgs = oEvent.getParameter("arguments");
			var url = "https://cors-anywhere.herokuapp.com/https://services.odata.org/V2/OData/OData.svc";
			var oModel = new sap.ui.model.odata.v2.ODataModel(url, true);
			oModel.read("/Products(" + oArgs.productId + ")/Supplier", {
				method: "GET",
				success: function (data) {
					var oJSONModel = new JSONModel(data);
					that.getView().setModel(oJSONModel, "supplier");
				}
			});
			oModel.read("/Products(" + oArgs.productId + ")/Category", {
				method: "GET",
				success: function (data) {
					var oJSONModel = new JSONModel(data);
					that.getView().setModel(oJSONModel, "category");
				}
			});
		},

		onNavigate: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("view4");
		}
	});

});