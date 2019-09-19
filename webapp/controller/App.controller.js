sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
	"use strict";

	return Controller.extend("UI5_course.UI5_course.controller.App", {
		onInit: function () {
			
			var OModel = new JSONModel();
			var data = {
				Name: "",
				Age: "",
				Gender: "",
				Position: ""
			};
			OModel.setData(data);
			this.getView().setModel(OModel);
			
		},
		onFormSend: function () {
			var oModel = this.getView().getModel();
			var data = oModel.getJSON();
			MessageToast.show('JSON data that will be send: ' + data);

			var xhr = new XMLHttpRequest();
			xhr.open('POST', 'google.com');
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.send(data);
		},
		onNavigate: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("view2");
		}
		
	});
});