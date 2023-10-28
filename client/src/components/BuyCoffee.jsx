import { useState } from 'react'
import { ethers } from 'ethers'
import { PiCoffeeFill } from "react-icons/pi"



const BuyCoffee = ({ state, hasBought, setHasBought }) => {
    const { contract } = state
    const [name, setName] = useState('')
    const [message, setMessage] = useState('');

    
    /*------- Buy Coffee -------*/
    const buyCoffee = async (name, message) => {
        if (name.length === 0 || message.length === 0) {
            alert("Please fill all inputs")
            return
        }
        
        try {
            setHasBought(true)

            const responseTx = await contract.buyCoffee(name, message, { value: ethers.parseEther("0.01") })
            await responseTx.wait()
    
            setName("")
            setMessage("")
    
            alert("Transaction is successfull")
            setHasBought(false)
        } catch (error) {
            console.log("Error:", error.message)
            setHasBought(false)
        }
    }


  return (
    <section className='flex justify-center py-5'>
        <div className='w-full max-w-[400px] flex flex-col gap-4'>

            <input 
                type="text" 
                placeholder='Name' 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className='px-2 py-3 w-full text-black text-xl border-none outline-none rounded-sm'
            />

            <input 
                type="text" 
                placeholder='Message' 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                className='px-2 py-3 w-full text-black text-xl border-none outline-none'
            />

            <button onClick={() => buyCoffee(name, message)} className='px-5 py-4 text-2xl flex justify-center items-center bg-blue-500 transition-colors hover:bg-blue-600'>
                {
                    hasBought ?  <span className='text-sm'>Processing...</span> : <PiCoffeeFill />
                }
            </button>
            
        </div>
    </section>
  )
}

export default BuyCoffee