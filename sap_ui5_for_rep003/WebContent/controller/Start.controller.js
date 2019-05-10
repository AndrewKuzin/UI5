sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/XMLView",
	"sap/ui/model/BindingMode",
	"sap/ui/core/UIComponent"
], function (Controller,JSONModel, XMLView, BindingMode, UIComponent) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.App", {

		onPress : function () {
			
			var pernr = this.byId("idPernr").getValue();		// Считываем ТН

			var oRouter = UIComponent.getRouterFor(this);		// Получаем роутер
			oRouter.navTo("rep003",{		// Переходим по маршруту rep003 	
				pernr : pernr		// Передаем параметр pernr со считанным значением ТН
			});

		}
	});

});