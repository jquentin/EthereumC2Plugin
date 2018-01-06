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
		return id == '' || currentCallbackId == id;
	};
	Cnds.prototype.OnFunctionError = function (id)
	{
		return id == '' || currentCallbackId == id;
	};
	Cnds.prototype.OnFunctionCallback = function (id)
	{
		return id == '' || currentCallbackId == id;
	};
	
	pluginProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {};
	
	Acts.prototype.GetTransactionReceipt = function (hash, id)
	{
		web3.eth.getTransactionReceipt(hash, function (err, res) { OnSendCallback (err, res, id); });
	}
	Acts.prototype.SendTransaction = function (obj, id)
	{
		web3.eth.sendTransaction(obj, function (err, res) { OnSendCallback (err, res, id); });
	}
	Acts.prototype.GetVersionNode = function (id)
	{
		web3.version.getNode(function (err, res) { OnSendCallback (err, res, id); });
	}
	
	Acts.prototype.GetVersionNetwork = function (id)
	{
		web3.version.getNetwork(function (err, res) { OnSendCallback (err, res, id); });
	}
	Acts.prototype.GetVersionEthereum = function (id)
	{
		web3.version.getEthereum(function (err, res) { OnSendCallback (err, res, id); });
	}
	Acts.prototype.GetVersionWhisper = function (id)
	{
		web3.version.getWhisper(function (err, res) { OnSendCallback (err, res, id); });
	}
	
	Acts.prototype.SetHttpProvider = function (url)
	{
		web3.setProvider (new web3.providers.HttpProvider(url));
	}
	
	Acts.prototype.Reset = function (keepIsSyncing)
	{
		web3.reset (keepIsSyncing);
	}
	Acts.prototype.GetListening = function (id)
	{
		web3.net.getListening(function (err, res) { OnSendCallback (err, res, id); });
	}
	Acts.prototype.GetPeerCount = function (id)
	{
		web3.net.getPeerCount(function (err, res) { OnSendCallback (err, res, id); });
	}
	Acts.prototype.GetSyncing = function (id)
	{
		web3.eth.getSyncing(function (err, res) { OnSendCallback (err, res, id); });
	}
	Acts.prototype.GetCoinbase = function (id)
	{
		web3.eth.getCoinbase(function (err, res) { OnSendCallback (err, res, id); });
	}
	Acts.prototype.GetMining = function (id)
	{
		web3.eth.getMining(function (err, res) { OnSendCallback (err, res, id); });
	}
	Acts.prototype.GetHashrate = function (id)
	{
		web3.eth.getHashrate(function (err, res) { OnSendCallback (err, res, id); });
	}
	Acts.prototype.GetGasPrice = function (id)
	{
		web3.eth.getGasPrice(function (err, res) { OnSendCallback (err, res, id); });
	}
	Acts.prototype.GetAccounts = function (id)
	{
		web3.eth.getAccounts(function (err, res) { OnSendCallback (err, res, id); });
	}
	Acts.prototype.GetBlockNumber = function (id)
	{
		web3.eth.getBlockNumber(function (err, res) { OnSendCallback (err, res, id); });
	}
	
	Acts.prototype.Register = function (add, id)
	{
		web3.eth.register(add, function (err, res) { OnSendCallback (err, res, id); });
	}
	
	Acts.prototype.Unregister = function (add, id)
	{
		web3.eth.unregister(add, function (err, res) { OnSendCallback (err, res, id); });
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
	
	Exps.prototype.CurrentCallbackId = function (ret)
	{
		ret.set_string(currentCallbackId);
	};
	Exps.prototype.CurrentCallbackError = function (ret)
	{
		ret.set_string(currentCallbackError ? currentCallbackError.toString() : "");
	};
	Exps.prototype.CurrentCallbackResponse = function (ret)
	{
		ret.set_string(currentCallbackResponse ? currentCallbackResponse.toString() : "");
	};
	
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
	Exps.prototype.VersionAPI = function (ret)
	{
		ret.set_string(web3.version.api);
	};
	Exps.prototype.VersionNode = function (ret)
	{
		ret.set_string(web3.version.node);
	};
	Exps.prototype.VersionNetwork = function (ret)
	{
		ret.set_string(web3.version.network);
	};
	Exps.prototype.VersionEthereum = function (ret)
	{
		ret.set_string(web3.version.ethereum);
	};
	Exps.prototype.VersionWhisper = function (ret)
	{
		ret.set_string(web3.version.whisper);
	};
	Exps.prototype.IsConnected = function (ret)
	{
		ret.set_int(web3.isConnected() ? 1 : 0);
	};
	Exps.prototype.CurrentProvider = function (ret)
	{
		ret.set_string(web3.currentProvider);
	};
	Exps.prototype.ToHex = function (ret, value)
	{
		ret.set_string(web3.toHex(value));
	};
	Exps.prototype.ToAscii = function (ret, hexString)
	{
		ret.set_string(web3.toAscii(hexString));
	};
	Exps.prototype.FromAscii = function (ret, s)
	{
		ret.set_string(web3.fromAscii(s));
	};
	Exps.prototype.ToDecimal = function (ret, s)
	{
		ret.set_int(web3.toDecimal(s));
	};
	Exps.prototype.FromDecimal = function (ret, n)
	{
		ret.set_string(web3.fromDecimal(n));
	};
	Exps.prototype.Coinbase = function (ret)
	{
		ret.set_string(web3.eth.coinbase || '');
	};
	Exps.prototype.IsMining = function (ret)
	{
		ret.set_int(web3.eth.mining ? 1 : 0);
	};
	Exps.prototype.HashRate = function (ret)
	{
		ret.set_int(web3.eth.hashrate);
	};
	Exps.prototype.GasPrice = function (ret)
	{
		ret.set_string(web3.eth.gasPrice);
	};
	Exps.prototype.Accounts = function (ret)
	{
		ret.set_string(web3.eth.accounts);
	};
	Exps.prototype.BlockNumber = function (ret)
	{
		ret.set_int(web3.eth.blockNumber);
	};
	Exps.prototype.GetBalance = function (ret, address)
	{
		ret.set_string(web3.eth.getBalance(address));
	};
	Exps.prototype.GetBalanceAtBlock = function (ret, address, block)
	{
		ret.set_string(web3.eth.getBalance(address, block));
	};
	Exps.prototype.GetStorage = function (ret, addressHexString, position)
	{
		ret.set_string(web3.eth.getStorage(addressHexString, position));
	};
	Exps.prototype.GetStorageAtBlock = function (ret, addressHexString, position, block)
	{
		ret.set_string(web3.eth.getStorage(addressHexString, position, block));
	};
	Exps.prototype.GetCode = function (ret, address)
	{
		ret.set_string(web3.eth.getCode(address));
	};
	Exps.prototype.GetCodeAtBlock = function (ret, address, block)
	{
		ret.set_string(web3.eth.getCode(address, block));
	};
	Exps.prototype.GetBlock = function (ret, block)
	{
		ret.set_string(web3.eth.getBlock(block));
	};
	
	pluginProto.exps = new Exps();

}());