import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { BrowserProvider } from 'ethers/providers'
import BuyMeCoffee from './contract.json'
import BuyCoffee from './components/BuyCoffee'
import Patrons from './components/Patrons'



const App = () => {
  const [account, setAccount] = useState('')
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })
  const [hasBought, setHasBought] = useState(false)
  

  /*---- Handle Change Accounts ----*/ 
  const handleAccountsChanged = async (accounts) => {
    if (accounts.length > 0 && account != accounts[0]) {
      setAccount(accounts[0])
    } else {
      setAccount(null)
    }
  }


  useEffect(() => {
    const loadData = async () => {
      const { ethereum } = window

      if (ethereum) {
        try {
          const provider = new BrowserProvider(ethereum)
          await provider.send("eth_requestAccounts", [])
          const signer = await provider.getSigner()
          const accountAddress = await signer.getAddress()
          const contract = new ethers.Contract(BuyMeCoffee.address, BuyMeCoffee.abi, signer)

          setAccount(accountAddress)
          setState({ provider, signer, contract })

        } catch(error) {
          console.log("Error:", error.message)
        }
      } else {
        alert("Please install MetaMask")
      }
    }

    loadData()

    
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged)
    }
    
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
      }
    }

  }, [account])

  

  return (
    <main>

      {/*----- Header -----*/}
      <header className='text-center py-5 flex flex-col gap-7'>
        <h1 className='text-4xl text-orange-500'>Buy Me Coffee</h1>
        <h1>Connected Account: {account}</h1>
      </header>

      {/*----- BuyCoffe -----*/}
      <BuyCoffee state={state} hasBought={hasBought} setHasBought={setHasBought} />

      {/*----- Patrons -----*/}
      <Patrons state={state} hasBought={hasBought} />

    </main>
  )
}

export default App
