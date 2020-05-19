
//geth --datadir './privatechain' attach ipc:./privatechain/geth.ipc
//eth.sendTransaction({from:"0xcd34d1fcc8f2284fa2af8ea18d6c7d0b60ee17f5",to:"8dd2ac28a87fbe6615395066077935df9eab91ed",value:web3.toWei(1,"ether")})

//eth.getTransaction("0xac78df9068d3fdc0f45936cf7c0e5c1397d3cab002c3694bcd88824e65e99f38")//转账信息
//eth.getTransactionReceipt("0x934aafb8007343a3def281eab78eddfff5807cb8dae3bec59744bc12581f1a92")//转账信息
web3.fromWei(eth.getBalance("0x60098f146d567285bb07a5e13cbc8e43b4301534"),"ether")
var address ="0xe5802C40aA69b1a2297ADF8FdeB091A39072aE7B"

var abi =[{"constant":false,"inputs":[{"name":"account","type":"address"},{"name":"contact","type":"address"}],"name":"addContact","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getMessages","outputs":[{"components":[{"name":"sender","type":"address"},{"name":"content","type":"string"},{"name":"receiver","type":"address"},{"name":"timeStamp","type":"uint256"}],"name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"getUserInfo","outputs":[{"components":[{"name":"userName","type":"string"},{"name":"role","type":"string"},{"name":"contacts","type":"address[]"}],"name":"","type":"tuple"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"},{"name":"userName","type":"string"},{"name":"role","type":"string"}],"name":"initUser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"getContactsLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"content","type":"string"},{"name":"receiver","type":"address"}],"name":"sendMessage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"getContacts","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMessageLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"content","type":"string"},{"indexed":false,"name":"receiver","type":"address"},{"indexed":false,"name":"timeStamp","type":"uint256"}],"name":"logSentMes","type":"event"}]
var contra = web3.eth.contract(abi).at(address)
var method = contra.getUserInfo.call("0xca35b7d915458ef540ade6068dfe2f44e8fa733c");
var adopters = adoption.getAdopters.call();
var adopt = adoption.adopt.sendTransaction(2,"0xcd34d1fcc8f2284fa2af8ea18d6c7d0b60ee17f5",{from:eth.accounts[0],gas:1000000});





Web3 {
  providersModuleFactory: ProvidersModuleFactory {},
  providerDetector: ProviderDetector {},
  providerResolver:
   ProviderResolver { providersModuleFactory: ProvidersModuleFactory {} },
  givenProvider: null,
  _currentProvider:
   HttpProvider {
     host: 'http://localhost:8545',
     timeout: 0,
     headers: undefined,
     connected: true,
     providersModuleFactory: ProvidersModuleFactory {},
     agent: { httpAgent: [Agent] } },
  _defaultAccount: undefined,
  _defaultBlock: 'latest',
  _transactionBlockTimeout: 50,
  _transactionConfirmationBlocks: 24,
  _transactionPollingTimeout: 750,
  _defaultGasPrice: undefined,
  _defaultGas: undefined,
  BatchRequest: [Function],
  eth:
   Eth {
     providersModuleFactory: ProvidersModuleFactory {},
     providerDetector: ProviderDetector {},
     providerResolver:
      ProviderResolver { providersModuleFactory: ProvidersModuleFactory {} },
     givenProvider: null,
     _currentProvider:
      HttpProvider {
        host: 'http://localhost:8545',
        timeout: 0,
        headers: undefined,
        connected: true,
        providersModuleFactory: ProvidersModuleFactory {},
        agent: [Object] },
     _defaultAccount: undefined,
     _defaultBlock: 'latest',
     _transactionBlockTimeout: 50,
     _transactionConfirmationBlocks: 24,
     _transactionPollingTimeout: 750,
     _defaultGasPrice: undefined,
     _defaultGas: undefined,
     BatchRequest: [Function],
     methodFactory:
      MethodFactory {
        methodModuleFactory: [ModuleFactory],
        utils: [Object],
        formatters: [Object],
        _methods: [Object] },
     net:
      Network {
        providersModuleFactory: ProvidersModuleFactory {},
        providerDetector: ProviderDetector {},
        providerResolver: [ProviderResolver],
        givenProvider: null,
        _currentProvider: [HttpProvider],
        _defaultAccount: undefined,
        _defaultBlock: 'latest',
        _transactionBlockTimeout: 50,
        _transactionConfirmationBlocks: 24,
        _transactionPollingTimeout: 750,
        _defaultGasPrice: undefined,
        _defaultGas: undefined,
        BatchRequest: [Function],
        methodFactory: [MethodFactory],
        utils: [Object],
        formatters: [Object] },
     accounts:
      Accounts {
        providersModuleFactory: ProvidersModuleFactory {},
        providerDetector: ProviderDetector {},
        providerResolver: [ProviderResolver],
        givenProvider: null,
        _currentProvider: [HttpProvider],
        _defaultAccount: undefined,
        _defaultBlock: 'latest',
        _transactionBlockTimeout: 50,
        _transactionConfirmationBlocks: 24,
        _transactionPollingTimeout: 750,
        _defaultGasPrice: undefined,
        _defaultGas: undefined,
        BatchRequest: [Function],
        transactionSigner: undefined,
        formatters: [Object],
        chainIdMethod: [ChainIdMethod],
        getGasPriceMethod: [GetGasPriceMethod],
        getTransactionCountMethod: [GetTransactionCountMethod],
        defaultKeyName: 'web3js_wallet',
        accounts: {},
        accountsIndex: 0,
        wallet: [Accounts] },
     personal:
      Personal {
        providersModuleFactory: ProvidersModuleFactory {},
        providerDetector: ProviderDetector {},
        providerResolver: [ProviderResolver],
        givenProvider: null,
        _currentProvider: [HttpProvider],
        _defaultAccount: undefined,
        _defaultBlock: 'latest',
        _transactionBlockTimeout: 50,
        _transactionConfirmationBlocks: 24,
        _transactionPollingTimeout: 750,
        _defaultGasPrice: undefined,
        _defaultGas: undefined,
        BatchRequest: [Function],
        methodFactory: [MethodFactory],
        utils: [Object],
        formatters: [Object],
        net: [Network] },
     Iban: [Function: Iban],
     abi: AbiCoder { utils: [Object], ethersAbiCoder: [AbiCoder] },
     ens:
      Ens {
        providersModuleFactory: ProvidersModuleFactory {},
        providerDetector: ProviderDetector {},
        providerResolver: [ProviderResolver],
        givenProvider: null,
        _currentProvider: [HttpProvider],
        _defaultAccount: undefined,
        _defaultBlock: 'latest',
        _transactionBlockTimeout: 50,
        _transactionConfirmationBlocks: 24,
        _transactionPollingTimeout: 750,
        _defaultGasPrice: undefined,
        _defaultGas: undefined,
        BatchRequest: [Function],
        ensModuleFactory: EnsModuleFactory {},
        contractModuleFactory: [ContractModuleFactory],
        promiEvent: [Function: PromiEvent],
        abiCoder: [AbiCoder],
        utils: [Object],
        formatters: [Object],
        registryOptions: {},
        net: [Network],
        transactionSigner: undefined,
        _registry: false },
     utils:
      { randomHex: [Function: randomHex],
        jsonInterfaceMethodToString: [Function: jsonInterfaceMethodToString],
        hexToAscii: [Function: hexToAscii],
        asciiToHex: [Function: asciiToHex],
        getUnitValue: [Function: getUnitValue],
        fromWei: [Function: fromWei],
        toWei: [Function: toWei],
        toChecksumAddress: [Function: toChecksumAddress],
        keccak256: [Function],
        sha3: [Function],
        toDecimal: [Function: hexToNumber],
        hexToNumber: [Function: hexToNumber],
        fromDecimal: [Function: numberToHex],
        numberToHex: [Function: numberToHex],
        hexToUtf8: [Function: hexToUtf8],
        hexToString: [Function: hexToUtf8],
        toUtf8: [Function: hexToUtf8],
        stringToHex: [Function: utf8ToHex],
        fromUtf8: [Function: utf8ToHex],
        utf8ToHex: [Function: utf8ToHex],
        toAscii: [Function: hexToAscii],
        fromAscii: [Function: asciiToHex],
        padLeft: [Function: leftPad],
        padRight: [Function: rightPad],
        getSignatureParameters: [Function: getSignatureParameters],
        isAddress: [Function: isAddress],
        isBN: [Function: isBN],
        checkAddressChecksum: [Function: checkAddressChecksum],
        toBN: [Function: toBN],
        toHex: [Function: toHex],
        hexToNumberString: [Function: hexToNumberString],
        toTwosComplement: [Function: toTwosComplement],
        isHex: [Function: isHex],
        isHexStrict: [Function: isHexStrict],
        isBloom: [Function: isBloom],
        isTopic: [Function: isTopic],
        bytesToHex: [Function: bytesToHex],
        hexToBytes: [Function: hexToBytes],
        soliditySha3: [Function: soliditySha3] },
     formatters:
      { outputBigNumberFormatter: [Function: outputBigNumberFormatter],
        isPredefinedBlockNumber: [Function: isPredefinedBlockNumber],
        inputDefaultBlockNumberFormatter: [Function: inputDefaultBlockNumberFormatter],
        inputBlockNumberFormatter: [Function: inputBlockNumberFormatter],
        txInputFormatter: [Function: txInputFormatter],
        inputCallFormatter: [Function: inputCallFormatter],
        inputTransactionFormatter: [Function: inputTransactionFormatter],
        inputSignFormatter: [Function: inputSignFormatter],
        outputTransactionFormatter: [Function: outputTransactionFormatter],
        outputTransactionReceiptFormatter: [Function: outputTransactionReceiptFormatter],
        outputBlockFormatter: [Function: outputBlockFormatter],
        inputLogFormatter: [Function: inputLogFormatter],
        outputLogFormatter: [Function: outputLogFormatter],
        inputPostFormatter: [Function: inputPostFormatter],
        outputPostFormatter: [Function: outputPostFormatter],
        inputAddressFormatter: [Function: inputAddressFormatter],
        outputSyncingFormatter: [Function: outputSyncingFormatter] },
     subscriptionsFactory:
      SubscriptionsFactory { utils: [Object], formatters: [Object] },
     contractModuleFactory:
      ContractModuleFactory {
        utils: [Object],
        formatters: [Object],
        abiCoder: [AbiCoder],
        accounts: [Accounts],
        methodModuleFactory: [ModuleFactory] },
     initiatedContracts: [],
     _transactionSigner: TransactionSigner { utils: [Object], formatters: [Object] },
     Contract: [Function] },
  shh:
   Shh {
     providersModuleFactory: ProvidersModuleFactory {},
     providerDetector: ProviderDetector {},
     providerResolver:
      ProviderResolver { providersModuleFactory: ProvidersModuleFactory {} },
     givenProvider: null,
     _currentProvider:
      HttpProvider {
        host: 'http://localhost:8545',
        timeout: 0,
        headers: undefined,
        connected: true,
        providersModuleFactory: ProvidersModuleFactory {},
        agent: [Object] },
     _defaultAccount: undefined,
     _defaultBlock: 'latest',
     _transactionBlockTimeout: 50,
     _transactionConfirmationBlocks: 24,
     _transactionPollingTimeout: 750,
     _defaultGasPrice: undefined,
     _defaultGas: undefined,
     BatchRequest: [Function],
     methodFactory:
      MethodFactory {
        methodModuleFactory: [ModuleFactory],
        utils: [Object],
        formatters: [Object],
        _methods: [Object] },
     subscriptionsFactory:
      SubscriptionsFactory { utils: [Object], formatters: [Object] },
     net:
      Network {
        providersModuleFactory: ProvidersModuleFactory {},
        providerDetector: ProviderDetector {},
        providerResolver: [ProviderResolver],
        givenProvider: null,
        _currentProvider: [HttpProvider],
        _defaultAccount: undefined,
        _defaultBlock: 'latest',
        _transactionBlockTimeout: 50,
        _transactionConfirmationBlocks: 24,
        _transactionPollingTimeout: 750,
        _defaultGasPrice: undefined,
        _defaultGas: undefined,
        BatchRequest: [Function],
        methodFactory: [MethodFactory],
        utils: [Object],
        formatters: [Object] } },
  bzz: Bzz { givenProvider: null, currentProvider: null },
  utils:
   { randomHex: [Function: randomHex],
     jsonInterfaceMethodToString: [Function: jsonInterfaceMethodToString],
     hexToAscii: [Function: hexToAscii],
     asciiToHex: [Function: asciiToHex],
     getUnitValue: [Function: getUnitValue],
     fromWei: [Function: fromWei],
     toWei: [Function: toWei],
     toChecksumAddress: [Function: toChecksumAddress],
     keccak256: { [Function: sha3] _Hash: [Object] },
     sha3: { [Function: sha3] _Hash: [Object] },
     toDecimal: [Function: hexToNumber],
     hexToNumber: [Function: hexToNumber],
     fromDecimal: [Function: numberToHex],
     numberToHex: [Function: numberToHex],
     hexToUtf8: [Function: hexToUtf8],
     hexToString: [Function: hexToUtf8],
     toUtf8: [Function: hexToUtf8],
     stringToHex: [Function: utf8ToHex],
     fromUtf8: [Function: utf8ToHex],
     utf8ToHex: [Function: utf8ToHex],
     toAscii: [Function: hexToAscii],
     fromAscii: [Function: asciiToHex],
     padLeft: [Function: leftPad],
     padRight: [Function: rightPad],
     getSignatureParameters: [Function: getSignatureParameters],
     isAddress: [Function: isAddress],
     isBN: [Function: isBN],
     checkAddressChecksum: [Function: checkAddressChecksum],
     toBN: [Function: toBN],
     toHex: [Function: toHex],
     hexToNumberString: [Function: hexToNumberString],
     toTwosComplement: [Function: toTwosComplement],
     isHex: [Function: isHex],
     isHexStrict: [Function: isHexStrict],
     isBloom: [Function: isBloom],
     isTopic: [Function: isTopic],
     bytesToHex: [Function: bytesToHex],
     hexToBytes: [Function: hexToBytes],
     soliditySha3: [Function: soliditySha3] },
  version: '1.0.0-beta.48' }

function toWei(number, unit) {
    unit = getUnitValue(unit);
    if (!isBN(number) && !isString(number)) {
        throw new Error('Please pass numbers as strings or BigNumber objects to avoid precision errors.');
          
    }
    return isBN(number) ? ethjsUnit.toWei(number, unit) : ethjsUnit.toWei(number, unit).toString(10);
}

