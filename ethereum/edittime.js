function GetPluginSettings()
{
	return {
		"name":			"Ethereum",
		"id":			"Ethereum",
		"version":		"1.0",
		"description":	"Access Ethereum API features.",
		"author":		"Scirra",
		"help url":		"http://www.scirra.com/manual/112/Ethereum",
		"category":		"Platform specific",
		"type":			"object",			// not in layout
		"rotatable":	false,
		"flags":		pf_singleglobal,
		"cordova-plugins": "cordova-plugin-inappbrowser",
		"dependency":	"channel.html"
	};
};

//////////////////////////////////////////////////////////////
// Conditions

AddStringParam("ID", "The id of the callback to wait for.");
AddCondition(1, cf_trigger, "On function success", "Callbacks", "On function success with ID: {0}", "Triggered when a function returns with no error.", "OnFunctionSuccess");

AddStringParam("ID", "The id of the callback to wait for.");
AddCondition(2, cf_trigger, "On function error", "Callbacks", "On function error with ID: {0}", "Triggered when a function returns with an error.", "OnFunctionError");

AddStringParam("ID", "The id of the callback to wait for.");
AddCondition(3, cf_trigger, "On function callback", "Callbacks", "On function callback with ID: {0}", "Triggered when a function returns, with or without error.", "OnFunctionCallback");


//////////////////////////////////////////////////////////////
// Actions

AddStringParam("Hash", "The transaction hash.");
AddStringParam("Callback id", "The id for identifying the callback.");
AddAction(3, 0, "Get Transaction Receipt", "Blocks", "Returns the receipt of transaction {0}", "Returns the receipt of a transaction by transaction hash", "GetTransactionReceipt");



//////////////////////////////////////////////////////////////
// Expressions

AddExpression(0, ef_return_string, "Current Account", "Ethereum", "CurrentAccount", "Get the Current Account Address.");

AddExpression(2, ef_return_string, "Current Callback ID", "Callbacks", "CurrentCallbackId", "Get the Current Callback ID.");
AddExpression(3, ef_return_string, "Current Callback Error Message", "Callbacks", "CurrentCallbackError", "Get the Current Callback's error message.");
AddExpression(4, ef_return_string, "Current Callback Response", "Callbacks", "CurrentCallbackResponse", "Get the Current Callback's response.");

AddNumberParam("Number", "The value in Unit");
AddStringParam("Unit", "The unit to convert from.");
AddExpression(5, ef_return_string, "Converts into wei", "Web3", "ToWei", "Converts an ethereum unit into wei.");

AddNumberParam("Number", "The value in Wei");
AddStringParam("Unit", "The unit to convert to.");
AddExpression(6, ef_return_string, "Converts from wei", "Web3", "FromWei", "Converts a number of wei into ethereum units.");

//AddVariadicParams("Elements", "The elements to hash.");
AddExpression(7, ef_return_string | ef_variadic_parameters, "Hash the elements", "Ethereum", "Sha3", "Hashes the elements using web3.sha3.");

AddStringParam("hex String", "An HEX string.");
AddExpression(8, ef_return_number, "Checks if the given string is an address", "Web3", "IsAddress", "Checks if the given string is an address.");

AddExpression(9, ef_return_string, "The ethereum js api version", "Version", "VersionAPI", "The ethereum js api version");

AddExpression(10, ef_return_string, "The client/node version.", "Version", "VersionNode", "The client/node version.");

AddExpression(11, ef_return_string, "The network protocol version.", "Version", "VersionNetwork", "The network protocol version.");

AddExpression(12, ef_return_string, "The ethereum protocol version", "Version", "VersionEthereum", "The ethereum protocol version");

AddExpression(13, ef_return_string, "The whisper protocol version.", "Version", "VersionWhisper", "The whisper protocol version.");

AddExpression(14, ef_return_number, "Should be called to check if a connection to a node exists.", "Web3", "IsConnected", "Should be called to check if a connection to a node exists.");

AddExpression(15, ef_return_string, "Will contain the current provider, if one is set.", "Web3", "CurrentProvider", "Will contain the current provider, if one is set.");

AddAnyTypeParam("Value", "The value to parse to HEX.");
AddExpression(16, ef_return_string, "Converts any value into HEX.", "Web3", "ToHex", "Converts any value into HEX.");

AddStringParam("HexString", "A HEX string to be converted to ascii.");
AddExpression(17, ef_return_string, "Converts a HEX string into a ASCII string.", "Web3", "ToAscii", "Converts a HEX string into a ASCII string.");

AddStringParam("String", "An ASCII string to be converted to HEX.");
AddExpression(18, ef_return_string, "Converts any ASCII string to a HEX string.", "Web3", "FromAscii", "Converts any ASCII string to a HEX string.");

AddStringParam("String", "An HEX string to be converted to a number.");
AddExpression(19, ef_return_number, "Converts a HEX string to its number representation.", "Web3", "ToDecimal", "Converts a HEX string to its number representation.");

AddAnyTypeParam("Number", "A number to be converted to a HEX string.");
AddExpression(20, ef_return_string, "Converts a number or number string to its HEX representation.", "Web3", "FromDecimal", "Converts a number or number string to its HEX representation.");

AddExpression(21, ef_return_string, "The coinbase address of the client.", "Eth", "Coinbase", "The coinbase address of the client.");

AddExpression(22, ef_return_number, "says whether the node is mining or not.", "Eth", "IsMining", "says whether the node is mining or not.");

AddExpression(23, ef_return_number, "returns the number of hashes per second that the node is mining with.", "Eth", "HashRate", "returns the number of hashes per second that the node is mining with.");

AddExpression(24, ef_return_string, "returns the current gas price.", "Eth", "GasPrice", "returns the current gas price.");

AddExpression(25, ef_return_string, "returns a list of accounts the node controls.", "Eth", "Accounts", "returns a list of accounts the node controls.");

AddExpression(26, ef_return_number, "returns the current block number.", "Eth", "BlockNumber", "returns the current block number.");


AddStringParam("Address", "The address to get the balance of.");
AddExpression(27, ef_return_string, "Get the balance of an address at the current block.", "Eth", "GetBalance", "Get the balance of an address at the current block.");

AddStringParam("Address", "The address to get the balance of.");
AddAnyTypeParam("Block", "The block at which to get the balance.");
AddExpression(28, ef_return_string, "Get the balance of an address at a given block.", "Eth", "GetBalanceAtBlock", "Get the balance of an address at a given block.");

AddStringParam("addressHexString", "The address to get the storage from.");
AddNumberParam("position", "The index position of the storage.")
AddExpression(29, ef_return_string, "Get the storage at a specific position of an address.", "Eth", "GetStorage", "Get the storage at a specific position of an address.");


AddStringParam("addressHexString", "The address to get the storage from.");
AddNumberParam("position", "The index position of the storage.")
AddAnyTypeParam("Block", "The block at which to get the storage.");
AddExpression(30, ef_return_string, "Get the storage at a specific position of an address at a given block.", "Eth", "GetStorageAtBlock", "Get the storage at a specific position of an address at a given block.");


AddStringParam("Address", "The address to get the code from.");
AddExpression(31, ef_return_string, "Get the code at a specific address.", "Eth", "GetCode", "Get the code at a specific address.");


AddStringParam("Address", "The address to get the code from.");
AddAnyTypeParam("Block", "The block at which to get the code.");
AddExpression(32, ef_return_string, "Get the code at a specific address at a given block.", "Eth", "GetCodeAtBlock", "Get the code at a specific address at a given block.");

AddAnyTypeParam("Block", "The block at which to get the code.");
AddExpression(33, ef_return_string, "Returns a block matching the block number or block hash.", "Eth", "GetBlock", "Returns a block matching the block number or block hash.");




//////////////////////////////////////////////////////////////
ACESDone();

// Property grid properties for this plugin
var property_list = [];
	
// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
	return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance, this);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	// Save the constructor parameters
	this.instance = instance;
	this.type = type;
	
	// Set the default property values from the property table
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
}

// Called by the IDE after all initialization on this instance has been completed
IDEInstance.prototype.OnCreate = function()
{
}

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}
	
// Called by the IDE to draw this instance in the editor
IDEInstance.prototype.Draw = function(renderer)
{
}

// Called by the IDE when the renderer has been released (ie. editor closed)
// All handles to renderer-created resources (fonts, textures etc) must be dropped.
// Don't worry about releasing them - the renderer will free them - just null out references.
IDEInstance.prototype.OnRendererReleased = function()
{
}
