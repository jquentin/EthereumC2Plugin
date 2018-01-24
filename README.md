# EthereumC2Plugin

Here are two plugins to integrate the Ethereum Blockchain in your Construct 2 game.

<STRONG>Some details</STRONG>

They both use the Web3 Javascript API version 0.2, so it works with all compatible browsers, like Metamask or Mist.
Like in Web3, there are 2 ways to call most functions: synchronous or asynchronous (although some nodes like Metamask don't support synchronous calls).

To call a function synchronously:

    - Just use the corresponding Expression or Action

To call a function asynchronously:

    - Add the corresponding action, with a chosen callbackID parameter
    - Add an OnCallback condition with the same callbackID
    - Use Ethereum(or the EthereumContract).CurrentCallbackResponse to get the function's response

<STRONG>The plugins:</STRONG>

<B>Ethereum</B>

Contains most functions in the Web3 API (let me know if some useful ones are missing). Go to the page linked higher for a complete list and descriptions.

<B>Ethereum Contract</B>

Facilitates communication with a smart contract. The contract's ABI and address are properties of the plugin, so an instance is created on the plugin's creation.
The main actions are:

    - Call : Calls a constant function of the contract
    - Send : Sends a transaction to the contract


<STRONG>Examples</STRONG>

There is a simple example project in the github project.
You can also look at this real life project that uses the plugin.

<STRONG>Possible Improvements</STRONG>

    - Multiple contract addresses for the different networks
    - Implement CallSuchFunctionAndWait actions to use asynchronous functions like if they were synchronous (in the meantime, you can use WaitForSignal to do that)
