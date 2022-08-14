import Head from "next/head";
import { useState, useEffect } from "react"
import Web3 from "web3";
import "bulma/css/bulma.css";
import style from '../styles/VendingMachine.module.css';
import VendingMachineContract from "../vending";




export default function VendingMachine() {
    //window.ethereum

    const [error, setError] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [inventory, setInventory] = useState('')
    const [myDonutCounts, setMyDonutCounts] = useState('')
    const [buyCount, setBuyCount] = useState('')
    const [web3, setWeb3] = useState(null)
    const [address, setAddress] = useState(null)
    const [vmContract, setVmContract] = useState(null)
    const [purchases, setPurchases] = useState(0)

    useEffect(() => {
        if (vmContract) getInventoryHandler()
        if (vmContract && address) getMyDonutCountsHandler()
    }, [vmContract, address, purchases])

    const getInventoryHandler = async () => {
        try {
            const inventory = await vmContract.methods.getVendingMachineBalance().call()
            setInventory(inventory)
        } catch (err) {
            setError(err)
        }
    }

    const getMyDonutCountsHandler = async () => {
        try {
            const counts = await vmContract.methods.donutBalances(address).call()
            setMyDonutCounts(counts)
        } catch (err) {
            setError(err)
        }
    }

    const updateDonutQuantity = event => {
        setBuyCount(event.target.value)
    }

    const buyDonutsHandler = async () => {
        try {
            // console.log(`account: ${address}`)
            await vmContract.methods.purchase(buyCount)
                .send({
                    from: address,
                    value: web3.utils.toWei('2', 'ether') * buyCount
                })

            setPurchases(purchases + 1)
            setSuccessMsg(`Successfully buy ${buyCount} donuts!`)
        } catch (err) {
            setError(err.message)
        }
    }

    const connectWalletHandler = async () => {
        // check whether matamask is available
        if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
            try {
                // requect wallet connection
                await window.ethereum.request({ method: "eth_requestAccounts" })
                // set web3 instance
                web3 = new Web3(window.ethereum)
                setWeb3(web3)

                // get list of accounts
                const accounts = await web3.eth.getAccounts()
                setAddress(accounts[0])

                // create local contract copy
                const vm = VendingMachineContract(web3)
                setVmContract(vm)

                setSuccessMsg("Successfully connect wallet!")
            }
            catch (error) {
                setError(error.message)
            }
        }
        else {
            console.log("no matemask");
            return;

        }
    }

    return (
        <div className={style.main}>
            <Head>
                <title>Vending Machine App</title>
                <meta name="description" content="A blockchain vending machine app" />
            </Head>
            <nav className="navbar mt-4 mb-4">
                <div className="container">
                    <div className="navbar-brand">
                        <h1>VendingMachine</h1>
                    </div>
                    <div className="navbar-end">
                        <bottom className="button is primary" onClick={connectWalletHandler}> Connect Wallet</bottom>
                    </div>
                </div>
            </nav>
            <section>
                <div className="container">
                    <h2> Vending Machine Inventory: {inventory}</h2>
                </div>
            </section>
            <section>
                <div className="container">
                    <h2> My dounts: {myDonutCounts}</h2>
                </div>
            </section>
            <section className="mt-5">
                <div className="container">
                    <div className="feild">
                        <label className="label"> Buy Donuts</label>
                        <div className="control">
                            <input onChange={updateDonutQuantity} className="input" type="type" placeholder="Enter amount..."></input>
                        </div>
                        <button onClick={buyDonutsHandler} className="button is-primary mt-2">Buy</button>
                    </div>
                </div>
            </section>
            <section>
                <div className="container has-text-danger">
                    <p> {error}</p>
                </div>
            </section>
            <section>
                <div className="container has-text-success">
                    <p> {successMsg}</p>
                </div>
            </section>
        </div>
    )
}

// help luxury attend orange crack camp nerve damp enough general impose crater