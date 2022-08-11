import Head from "next/head";
import { useState } from "react"
import Web3 from "web3";
import "bulma/css/bulma.css";
import style from '../styles/VendingMachine.module.css';

export default function VendingMachine() {
    //window.ethereum

    const [error, setError] = useState('')

    const connectWalletHandler = async () => {
        if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" })
                let web3 = new Web3(window.ethereum)
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
                    <p> placeholder test</p>
                </div>
            </section>
            <section>
                <div className="container has-text-danger">
                    <p> {error}</p>
                </div>
            </section>
        </div>
    )
}

// help luxury attend orange crack camp nerve damp enough general impose crater