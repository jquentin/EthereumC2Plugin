// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.EthereumContract = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var pluginProto = cr.plugins_.EthereumContract.prototype;
		
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;
	var runtime;
	
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
			cr.logexport("[Construct 2] EthereumContract plugin not supported on this platform - the object will not be created");
			return;
		}
		
		this.runtime.tickMe(this);
		
		runtime = this.runtime;
		
		var contractABI = JSON.parse(this.properties[0]);
		
		var MyContract = web3.eth.contract(contractABI);
		
		var contractAddress;
		
		switch (web3.version.network)
		{
			//Mainnet
			case "1": contractAddress = this.properties[1]; break;
			//Ropsten
			case "3": contractAddress = this.properties[2]; break;
			//Kovan
			case "42": contractAddress = this.properties[3]; break;
			//Rinkeby
			case "4": contractAddress = this.properties[4]; break;
			//Unknown
			default: cr.logexport("This ethereum network is not supported by this ethereum plugin."); return;
		}
		if (!contractAddress)
		{
			cr.logexport("This ethereum network is not supported by this dapp."); 
			return;
		}
		
		this.contractInstance = MyContract.at(contractAddress);
		
		this.currentCallbackId = "";
		this.currentCallbackResponse = "";
		this.currentCallbackError = "";
		
		var events = this.contractInstance.allEvents();

		// watch for changes
		var self = this;
		events.watch(function(err, ev){
			if (!err)
			{
				self.currentEvent = ev;
				runtime.trigger(pluginProto.cnds.OnEvent, self);
			}
		});

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
	
	Cnds.prototype.OnFunctionSuccess = function (id)
	{
		return id == '' || this.currentCallbackId == id;
	};
	Cnds.prototype.OnFunctionError = function (id)
	{
		return id == '' || this.currentCallbackId == id;
	};
	Cnds.prototype.OnFunctionCallback = function (id)
	{
		return id == '' || this.currentCallbackId == id;
	};
	Cnds.prototype.OnEvent = function (ev)
	{
		return this.currentEvent == ev;
	};
	
	pluginProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {};
	
	Acts.prototype.Call = function (name, paramsArray, id)
	{
		var self = this;
		if (paramsArray.length == 0 || paramsArray.length == 1 && paramsArray[0] == '')
			this.contractInstance[name].call(function (err, res) { self.OnCallback (err, res, id); });
		else if (paramsArray.length == 1)
			this.contractInstance[name].call(paramsArray[0], function (err, res) { self.OnCallback (err, res, id); });
		else if (paramsArray.length == 2)
			this.contractInstance[name].call(paramsArray[0], paramsArray[1], function (err, res) { self.OnCallback (err, res, id); });
		else if (paramsArray.length == 3)
			this.contractInstance[name].call(paramsArray[0], paramsArray[1], paramsArray[2], function (err, res) { self.OnCallback (err, res, id); });
		else if (paramsArray.length == 4)
			this.contractInstance[name].call(paramsArray[0], paramsArray[1], paramsArray[2], paramsArray[3], function (err, res) { self.OnCallback (err, res, id); });
		else if (paramsArray.length == 5)
			this.contractInstance[name].call(paramsArray[0], paramsArray[1], paramsArray[2], paramsArray[3], paramsArray[4], function (err, res) { self.OnCallback (err, res, id); });
	}
	
	Acts.prototype.Send = function (name, paramsArray, id, v)
	{
		var self = this;
		if (paramsArray.length == 0 || paramsArray.length == 1 && paramsArray[0] == '')
			this.contractInstance[name].sendTransaction({value:v}, function (err, res) { self.OnCallback (err, res, id); });
		else if (paramsArray.length == 1)
			this.contractInstance[name].sendTransaction(paramsArray[0], {value:v}, function (err, res) { self.OnCallback (err, res, id); });
		else if (paramsArray.length == 2)
			this.contractInstance[name].sendTransaction(paramsArray[0], paramsArray[1], {value:v}, function (err, res) { self.OnCallback (err, res, id); });
		else if (paramsArray.length == 3)
			this.contractInstance[name].sendTransaction(paramsArray[0], paramsArray[1], paramsArray[2], {value:v}, function (err, res) { self.OnCallback (err, res, id); });
		else if (paramsArray.length == 4)
			this.contractInstance[name].sendTransaction(paramsArray[0], paramsArray[1], paramsArray[2], paramsArray[3], {value:v}, function (err, res) { self.OnCallback (err, res, id); });
		else if (paramsArray.length == 5)
			this.contractInstance[name].sendTransaction(paramsArray[0], paramsArray[1], paramsArray[2], paramsArray[3], paramsArray[4], {value:v}, function (err, res) { self.OnCallback (err, res, id); });
	}
	
	Acts.prototype.EstimateGas = function (name, paramsArray, id)
	{
		var self = this;
		if (paramsArray.length == 0 || paramsArray.length == 1 && paramsArray[0] == '')
			this.contractInstance[name].estimateGas(function (err, res) { self.OnCallback (err, res, id); });
		else if (paramsArray.length == 1)
			this.contractInstance[name].estimateGas(paramsArray[0], function (err, res) { self.OnCallback (err, res, id); });
		else if (paramsArray.length == 2)
			this.contractInstance[name].estimateGas(paramsArray[0], paramsArray[1], function (err, res) { self.OnCallback (err, res, id); });
		else if (paramsArray.length == 3)
			this.contractInstance[name].estimateGas(paramsArray[0], paramsArray[1], paramsArray[2], function (err, res) { self.OnCallback (err, res, id); });
		else if (paramsArray.length == 4)
			this.contractInstance[name].estimateGas(paramsArray[0], paramsArray[1], paramsArray[2], paramsArray[3], function (err, res) { self.OnCallback (err, res, id); });
		else if (paramsArray.length == 5)
			this.contractInstance[name].estimateGas(paramsArray[0], paramsArray[1], paramsArray[2], paramsArray[3], paramsArray[4], function (err, res) { self.OnCallback (err, res, id); });
	}
	
	instanceProto.OnCallback = function(error, result, id)
	{
		this.currentCallbackId = id;
		if (error)
		{
			this.currentCallbackResponse = "";
			this.currentCallbackError = error;
			runtime.trigger(cr.plugins_.EthereumContract.prototype.cnds.OnFunctionError, this);
			runtime.trigger(cr.plugins_.EthereumContract.prototype.cnds.OnFunctionCallback, this);
		}
		else
		{
			this.currentCallbackError = "";
			this.currentCallbackResponse = result;
			runtime.trigger(cr.plugins_.EthereumContract.prototype.cnds.OnFunctionSuccess, this);
			runtime.trigger(cr.plugins_.EthereumContract.prototype.cnds.OnFunctionCallback, this);
		}
	};
	
	pluginProto.acts = new Acts();

	//////////////////////////////////////
	// Expressions
	function Exps() {};
	
	Exps.prototype.CurrentCallbackId = function (ret)
	{
		ret.set_string(currentCallbackId);
	};
	Exps.prototype.CurrentCallbackError = function (ret)
	{
		ret.set_string(this.currentCallbackError ? this.currentCallbackError.toString() : "");
	};
	Exps.prototype.CurrentCallbackResponse = function (ret)
	{
		ret.set_string(this.currentCallbackResponse ? this.currentCallbackResponse.toString() : "");
	};
	
	pluginProto.exps = new Exps();

}());