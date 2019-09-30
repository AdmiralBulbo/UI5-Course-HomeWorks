sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	'sap/ui/core/Fragment',
	'sap/m/MessageToast',
	'sap/m/Dialog',
	'sap/m/Button',
	'sap/m/Text',

], function (Controller, JSONModel, Fragment, MessageToast, Dialog, Button, Text) {
	"use strict";

	return Controller.extend("UI5_course.UI5_course.controller.workerDeploydInfo", {
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("workerDeploydInfo").attachMatched(this._onRouteMatched, this);
			this._showFormFragment("displayWorker");
		},

		_onRouteMatched: function (oEvent) {
			var xhr = new XMLHttpRequest();
			var oArgs = oEvent.getParameter("arguments");
			var OModel = new JSONModel();
			xhr.addEventListener("readystatechange", function () {
				if (this.readyState === 4) {
					var result = this.response;
					OModel.setData(JSON.parse(result));
				}
			});
			xhr.open("GET", "http://localhost:2403/workers/" + oArgs.workerId);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.send();
			this.getView().setModel(OModel, "workersDeployd");
		},

		onChange: function () {
			//this._showFormFragment("changeWorker");
			this._toggleButtonsAndView(true);
		},

		onCancle: function () {
			this._toggleButtonsAndView(false);
		},

		onSave: function (oEvent) {
			var oModel = this.getView().getModel("workersDeployd");
			var data = oModel.getJSON();

			var xhr = new XMLHttpRequest();
			xhr.addEventListener("readystatechange", function () {
				if (this.readyState === 4) {
					MessageToast.show('New JSON data: ' + data);
				}
			});
			xhr.open('PUT', 'http://localhost:2403/workers/' + JSON.parse(data).id);
			xhr.setRequestHeader('Content-Type', "application/json");
			xhr.send(data);

			this._toggleButtonsAndView(false);
		},

		onDelete: function (oEvent) {
			var oModel = this.getView().getModel("workersDeployd");
			var data = oModel.getJSON();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var xhr = new XMLHttpRequest();
			xhr.addEventListener("readystatechange", function () {
				if (this.readyState === 4) {
					oRouter.navTo("view3");
				}
			});
			var dialog = new Dialog({
				title: 'Confirm your action',
				type: 'Message',
				content: new Text({
					text: 'Are you sure you want to delete this worker?'
				}),
				beginButton: new Button({
					text: 'Submit',
					press: function () {
						xhr.open("DELETE", "http://localhost:2403/workers/" + JSON.parse(data).id);
						xhr.setRequestHeader("Content-Type", "application/json");
						xhr.send();
						dialog.close();
					}
				}),
				endButton: new Button({
					text: 'Cancel',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function () {
					dialog.destroy();
				}
			});
			dialog.open();
		},

		_toggleButtonsAndView: function (bEdit) {
			var oView = this.getView();
			// Show the appropriate action buttons
			oView.byId("btnEdit").setVisible(!bEdit);
			oView.byId("btnDelete").setVisible(!bEdit);
			oView.byId("btnSave").setVisible(bEdit);
			oView.byId("btnCancle").setVisible(bEdit);
			// Set the right form type
			this._showFormFragment(bEdit ? "changeWorker" : "displayWorker");
		},

		_getFormFragment: function (sFragmentName) {
			var oFormFragment = this._formFragments[sFragmentName];

			if (oFormFragment) {
				return oFormFragment;
			}

			oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "UI5_course.UI5_course.view." + sFragmentName);

			this._formFragments[sFragmentName] = oFormFragment;
			return this._formFragments[sFragmentName];
		},

		_formFragments: {},

		_showFormFragment: function (sFragmentName) {
			var oPage = this.byId("page");

			oPage.removeAllContent();
			oPage.insertContent(this._getFormFragment(sFragmentName));
		},

		onNavigate: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("view3");
		}
	});

});