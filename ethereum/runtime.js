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
	
	var currentCallbackId;
	var currentCallbackResponse;
	var currentCallbackError;

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
	
	pluginProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {};
	
	Acts.prototype.GetTransactionReceipt = function (hash, id)
	{
		web3.eth.getTransactionReceipt(hash, function (err, res) { OnSendCallback (err, res, id); });
	}
	
	function OnSendCallback (error, result, id)
	{
		currentCallbackId = id;
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
	// Returns string because BigNumbers are not supported by set_int
	Exps.prototype.ToWei = function (ret, number, unit)
	{
		ret.set_string(web3.toWei(number, unit).toString());
	};
	// Returns string because BigNumbers are not supported by set_int
	Exps.prototype.FromWei = function (ret, number, unit)
	{
		ret.set_string(web3.fromWei(number, unit).toString());
	};
	Exps.prototype.Sha3 = function (ret, arg1_, arg2_, arg3_, arg4_, arg5_)
	{
		var arg1 = arg1_ || "";
		var arg2 = arg2_ || "";
		var arg3 = arg3_ || "";
		var arg4 = arg4_ || "";
		var arg5 = arg5_ || "";
		
		ret.set_string(web3.sha3(arg1 + arg2 + arg3 + arg4 + arg5));
	};
	Exps.prototype.IsAddress = function (ret, hexString)
	{
		ret.set_int(web3.isAddress(hexString) ? 1 : 0);
	};
	
	
	pluginProto.exps = new Exps();

}());