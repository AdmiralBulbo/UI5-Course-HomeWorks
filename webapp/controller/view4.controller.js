sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("UI5_course.UI5_course.controller.view4", {
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("view4").attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function (oEvent) {
			var that = this;
			var url = "https://cors-anywhere.herokuapp.com/https://services.odata.org/V2/OData/OData.svc";
			var oModel = new sap.ui.model.odata.v2.ODataModel(url, true);
			oModel.read("/Products", {
				method: "GET",
				success: function (data) {
					var oProducts = data.results;
					var oJSONModel = new JSONModel(oProducts);
					var oTable = that.byId("oDataTable");
					oTable.setModel(oJSONModel, "products");
					console.log(data);
				},
				error: function (data) {

				}
			});
		},

		onItemPress: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var oItem = oEvent.getSource();
			oRouter.navTo("oDataDetails", {
				productId: oItem.getBindingContext("products").getProperty("ID")
			});
		},

		onNavigate: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("view3");
		}
	});

});