// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.Ethereum = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var pluginProto = cr.plugins_.Ethereum.prototype;
		
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;
	var runtime;
	var inst;
	
	
	var contractInstance;
	
	var currentCallbackFunction;
	var currentCallbackId;
	var currentCallbackResponse;
	var currentCallbackError;
	var currentEvent;

	typeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
	};
	
	var instanceProto = pluginProto.Instance.prototype;

	instanceProto.onCreate = function()
	{
		if (this.runtime.isDomFree)
		{
			cr.logexport("[Construct 2] Ethereum plugin not supported on this platform - the object will not be created");
			return;
		}
		
		this.runtime.tickMe(this);
		
		runtime = this.runtime;
		inst = this;
		
		var contractAddress = this.properties[0];
		var contractABI = JSON.parse(this.properties[1]);
		
		var MyContract = web3.eth.contract(contractABI);
		contractInstance = MyContract.at(contractAddress);
		
		var events = contractInstance.allEvents();

		// watch for changes
		events.watch(function(err, ev){
			if (!err)
			{
				currentEvent = ev;
				runtime.trigger(pluginProto.cnds.OnEvent, inst);
			}
		});
		
		runtime.trigger(pluginProto.cnds.OnContractLoaded, inst);

	};
	
	instanceProto.tick = function ()
	{
	};
	
	instanceProto.onLayoutChange = function ()
	{
	};

	//////////////////////////////////////
	// Conditions
	function Cnds() {};
	
	Cnds.prototype.OnContractLoaded = function ()
	{
		return true;
	};
	Cnds.prototype.OnFunctionSuccess = function (id)
	{
		return currentCallbackId == id;
	};
	Cnds.prototype.OnFunctionError = function (id)
	{
		return currentCallbackId == id;
	};
	Cnds.prototype.OnFunctionCallback = function (id)
	{
		return currentCallbackId == id;
	};
	Cnds.prototype.OnEvent = function (ev)
	{
		return currentEvent == ev;
	};
	
	pluginProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {};
	
	Acts.prototype.Call = function (name, paramsArray, id)
	{
		if (paramsArray.length == 0 || paramsArray.length == 1 && paramsArray[0] == '')
			contractInstance[name].call(function (err, res) { OnSendCallback (err, res, id); });
		else if (paramsArray.length == 1)
			contractInstance[name].call(paramsArray[0], function (err, res) { OnSendCallback (err, res, id); });
		else if (paramsArray.length == 2)
			contractInstance[name].call(paramsArray[0], paramsArray[1], function (err, res) { OnSendCallback (err, res, id); });
		else if (paramsArray.length == 3)
			contractInstance[name].call(paramsArray[0], paramsArray[1], paramsArray[2], function (err, res) { OnSendCallback (err, res, id); });
		else if (paramsArray.length == 4)
			contractInstance[name].call(paramsArray[0], paramsArray[1], paramsArray[2], paramsArray[3], function (err, res) { OnSendCallback (err, res, id); });
		else if (paramsArray.length == 5)
			contractInstance[name].call(paramsArray[0], paramsArray[1], paramsArray[2], paramsArray[3], paramsArray[4], function (err, res) { OnSendCallback (err, res, id); });
	}
	
	Acts.prototype.Send = function (name, paramsArray, id)
	{
		if (paramsArray.length == 0 || paramsArray.length == 1 && paramsArray[0] == '')
			contractInstance[name].sendTransaction(function (err, res) { OnSendCallback (err, res, id); });
		else if (paramsArray.length == 1)
			contractInstance[name].sendTransaction(paramsArray[0], function (err, res) { OnSendCallback (err, res, id); });
		else if (paramsArray.length == 2)
			contractInstance[name].sendTransaction(paramsArray[0], paramsArray[1], function (err, res) { OnSendCallback (err, res, id); });
		else if (paramsArray.length == 3)
			contractInstance[name].sendTransaction(paramsArray[0], paramsArray[1], paramsArray[2], function (err, res) { OnSendCallback (err, res, id); });
		else if (paramsArray.length == 4)
			contractInstance[name].sendTransaction(paramsArray[0], paramsArray[1], paramsArray[2], paramsArray[3], function (err, res) { OnSendCallback (err, res, id); });
		else if (paramsArray.length == 5)
			contractInstance[name].sendTransaction(paramsArray[0], paramsArray[1], paramsArray[2], paramsArray[3], paramsArray[4], function (err, res) { OnSendCallback (err, res, id); });
	}
	
	Acts.prototype.EstimateGas = function (name, paramsArray, id)
	{
		if (paramsArray.length == 0 || paramsArray.length == 1 && paramsArray[0] == '')
			estimatedGas = contractInstance[name].estimateGas(function (err, res) { OnSendCallback (err, res, id); });
		else if (paramsArray.length == 1)
			estimatedGas = contractInstance[name].estimateGas(paramsArray[0], function (err, res) { OnSendCallback (err, res, id); });
		else if (paramsArray.length == 2)
			estimatedGas = contractInstance[name].estimateGas(paramsArray[0], paramsArray[1], function (err, res) { OnSendCallback (err, res, id); });
		else if (paramsArray.length == 3)
			estimatedGas = contractInstance[name].estimateGas(paramsArray[0], paramsArray[1], paramsArray[2], function (err, res) { OnSendCallback (err, res, id); });
		else if (paramsArray.length == 4)
			estimatedGas = contractInstance[name].estimateGas(paramsArray[0], paramsArray[1], paramsArray[2], paramsArray[3], function (err, res) { OnSendCallback (err, res, id); });
		else if (paramsArray.length == 5)
			estimatedGas = contractInstance[name].estimateGas(paramsArray[0], paramsArray[1], paramsArray[2], paramsArray[3], paramsArray[4], function (err, res) { OnSendCallback (err, res, id); });
	}
	
	function OnSendCallback (error, result, id)
	{
		currentCallbackId = id;
		currentCallbackFunction = name;
		if (error)
		{
			currentCallbackResponse = "";
			currentCallbackError = error;
			runtime.trigger(cr.plugins_.Ethereum.prototype.cnds.OnFunctionError, inst);
			runtime.trigger(cr.plugins_.Ethereum.prototype.cnds.OnFunctionCallback, inst);
		}
		else
		{
			currentCallbackError = "";
			currentCallbackResponse = result;
			runtime.trigger(cr.plugins_.Ethereum.prototype.cnds.OnFunctionSuccess, inst);
			runtime.trigger(cr.plugins_.Ethereum.prototype.cnds.OnFunctionCallback, inst);
		}
	}
	
	pluginProto.acts = new Acts();

	//////////////////////////////////////
	// Expressions
	function Exps() {};
	
	
	Exps.prototype.CurrentAccount = function (ret)
	{
		ret.set_string(web3.eth.coinbase.toString());
	};
	Exps.prototype.CurrentCallbackFunction = function (ret)
	{
		ret.set_string(currentCallbackFunction);
	};
	Exps.prototype.CurrentCallbackId = function (ret)
	{
		ret.set_string(currentCallbackId);
	};
	Exps.prototype.CurrentCallbackError = function (ret)
	{
		ret.set_string(currentCallbackError.toString());
	};
	Exps.prototype.CurrentCallbackResponse = function (ret)
	{
		ret.set_string(currentCallbackResponse.toString());
	};
	
	pluginProto.exps = new Exps();

}());