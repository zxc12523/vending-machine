const jsondata = require("./build/contracts/VendingMachine.json")

const abi = jsondata['abi']
const address = "0xab8C090F3ba120Bfb75cAb6fA136F51Fa71e21bc"

const VendingMachineContract = (web3) => {
    return new web3.eth.Contract(abi, address)
}

export default VendingMachineContract