function GetPluginSettings()
{
	return {
		"name":			"Ethereum Contract",
		"id":			"EthereumContract",
		"version":		"1.0",
		"description":	"Access Ethereum API features for Contracts.",
		"author":		"Scirra",
		"help url":		"http://www.scirra.com/manual/112/Ethereum",
		"category":		"Platform specific",
		"type":			"object",			// not in layout
		"rotatable":	false,
		"flags":		0,
		"cordova-plugins": "cordova-plugin-inappbrowser",
		"dependency":	"channel.html"
	};
};

//////////////////////////////////////////////////////////////
// Conditions

AddStringParam("ID", "The id of the callback to wait for. Leave empty to listen to all callbacks.");
AddCondition(1, cf_trigger, "On function success", "Callbacks", "On function success with ID: {0}", "Triggered when a function returns with no error.", "OnFunctionSuccess");

AddStringParam("ID", "The id of the callback to wait for. Leave empty to listen to all callbacks.");
AddCondition(2, cf_trigger, "On function error", "Callbacks", "On function error with ID: {0}", "Triggered when a function returns with an error.", "OnFunctionError");

AddStringParam("ID", "The id of the callback to wait for. Leave empty to listen to all callbacks.");
AddCondition(3, cf_trigger, "On function callback", "Callbacks", "On function callback with ID: {0}", "Triggered when a function returns, with or without error.", "OnFunctionCallback");

AddStringParam("Event", "The name of the event to watch for.");
AddCondition(4, cf_trigger, "On event", "Event", "On event: {0}", "Triggered when an event is triggered.", "OnEvent");

//////////////////////////////////////////////////////////////
// Actions

AddStringParam("Name with parameters types", "The name of the function to call, in the form 'myMethod(uint256)'.");
AddVariadicParams("Parameter {n}", "A parameter to pass for the function call.");
AddStringParam("Callback id", "The id for identifying the callback.");
AddAction(0, 0, "Call", "Methods", "Call constant method {0} ( {...} )", "Call a Constant Method", "Call");

AddStringParam("Name with parameters types", "The name of the function to call, in the form 'myMethod(uint256)'.");
AddVariadicParams("Parameter {n}", "A parameter to pass for the function call.");
AddStringParam("Callback id", "The id for identifying the callback.");
AddNumberParam("Value", "The value sent to the transaction");
AddAction(1, 0, "Send", "Methods", "Call non-constant method: {0} ( {...} )", "Call a Non-Constant Method", "Send");

AddStringParam("Name with parameters types", "The name of the function to call, in the form 'myMethod(uint256)'.");
AddVariadicParams("Parameter {n}", "A parameter to pass for the function call.");
AddStringParam("Callback id", "The id for identifying the callback.");
AddAction(2, 0, "Estimate Gas", "Methods", "Estimate gas of {0} ( {...} )", "Estimate gas of a Non-Constant Method", "EstimateGas");


//////////////////////////////////////////////////////////////
// Expressions

AddExpression(2, ef_return_string, "Current Callback ID", "Ethereum", "CurrentCallbackId", "Get the Current Callback ID.");
AddExpression(3, ef_return_string, "Current Callback Error Message", "Ethereum", "CurrentCallbackError", "Get the Current Callback's error message.");
AddExpression(4, ef_return_string, "Current Callback Response", "Ethereum", "CurrentCallbackResponse", "Get the Current Callback's response.");

//////////////////////////////////////////////////////////////
ACESDone();

// Property grid properties for this plugin
var property_list = [
	new cr.Property(ept_text,		"Contract ABI",			"",			"The contract's ABI array"),
	new cr.Property(ept_text,		"Mainnet address",		"",			"The contract's address on the Mainnet."),
	new cr.Property(ept_text,		"Ropsten address",		"",			"The contract's address on Ropsten."),
	new cr.Property(ept_text,		"Kovan address",		"",			"The contract's address on Kovan."),
	new cr.Property(ept_text,		"Rinkeby address",		"",			"The contract's address on Rinkeby."),
	];
	
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
