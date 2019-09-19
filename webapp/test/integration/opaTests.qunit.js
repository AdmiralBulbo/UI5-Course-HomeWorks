/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"UI5_course/UI5_course/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});