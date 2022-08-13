const Web3 = require('web3')
const rpcURL = 'http://localhost:8545'
const web3 = new Web3(rpcURL)

const abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "donutBalances", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getVendingMachineBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "purchase", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "restock", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const address = "0x81e236F25682FaA14e3746DC2d30a79Ce3C03d31"

const contract = new web3.eth.Contract(abi, address)
const accounts = web3.eth.getAccounts()

contract.methods.getVendingMachineBalance().call((err, result) => { console.log(result) })
contract.methods.dountBalances(accounts).call((err, result) => { console.log(result) })
contract.methods.dountBalances("0x94417542ab56cf1b7e385043d560E1C62538f69b").call((err, result) => { console.log(result) })

contract.methods.getDountsByAccount(accounts[0]).call((err, result) => { console.log(result) })
