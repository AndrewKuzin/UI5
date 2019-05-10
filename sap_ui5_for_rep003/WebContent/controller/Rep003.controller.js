sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/XMLView",
	"sap/ui/model/BindingMode",
	"sap/ui/core/UIComponent"
], function (Controller,JSONModel, XMLView, BindingMode, UIComponent) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.App", {

		onInit: function () {
			var oRouter = UIComponent.getRouterFor(this);		// Устанавливаем роутер
			
			// Получаем маршрут rep003 и присваиваем ему обработчик _onRouteMatched
			oRouter.getRoute("rep003").attachMatched(this._onRouteMatched, this);		

		},

		_onRouteMatched : function (oEvent) {
			var oArgs, oView;
			var oRep003D;

			oArgs = oEvent.getParameter("arguments");		// Принимаем аргумент
			oView = this.getView();		// Получаем текущий View
			
			// Определяем url
//			var sServiceUrl = "http://hrd1app.erp.rw:8001/sap/opu/odata/sap/ZGW_UI5_REP003_TEST_SRV_01";
//			var oModel = new sap.ui.model.odata.ODataModel (sServiceUrl, true);		// Определяем модель
//			
			var oModel = this.getOwnerComponent().getModel("rep003");	
			var oJsonModel = new sap.ui.model.json.JSONModel();
			
			oModel.read("/MainSet('"+oArgs.pernr+"')", {		// Считываем основные данные для переданного ТН
				async:"false",
			    urlParameters: {
			    	// Получаем все связанные с этим ТН таблицы
			        "$expand" : 'MainToMainNak,MainToMainNagr,MainToMov,MainToStaj,MainToNak,MainToNagr,MainToFam,MainToEduc,MainToDocs,MainToAddr,MainToContr'
			    },
			    success: function(oData, response){
			    	oRep003D = oData;
					oJsonModel.setData(oRep003D);		// Передаем полученные данные в Json модель		
			    	
//				oJsonModel.setData(oData)
			    }
			})
			
	
			
			this.getView().setModel(oJsonModel);		// Устанавливаем Json модель как модель для текущего View

		}

	});

});