import { useEffect, useState } from 'react'
import { BsBalloonHeartFill } from "react-icons/bs"



const Patrons = ({ state, hasBought }) => {
  const { contract } = state
  const [patrons, setPatrons] = useState([])


  /*------- Get Patrons -------*/
  const getPatrons = async () => {
    try {
      if (contract) {
        let patrons = await contract.getPatrons()

        patrons = patrons?.map((patron, index) => ({
          id: index,
          name: patron.name?.toString(),
          message: patron.message?.toString(),
          time: patron.time?.toString(),
          from: patron.from?.toString()
        }))

        setPatrons(patrons)
      }
    } catch(error) {
      console.log("Error:", error.message)
    }
  }

  
  useEffect(() => {
    contract && getPatrons()
  }, [contract])


  useEffect(() => {
    contract && getPatrons()
  }, [hasBought])

  
  return (
    <section className='flex flex-col justify-center py-4'>
      
      {/* ---- Title ---- */}
      <div className='flex justify-center items-center gap-2 text-2xl py-3'>
        <span className='text-red-600'><BsBalloonHeartFill/></span>
        <h1>Patrons</h1>
        <span className='text-red-600'><BsBalloonHeartFill/></span>
      </div>

      {/* ---- Patrons ---- */}
      <div className='w-full max-w-[1100px] mx-auto mt-4'>
        {
          patrons && patrons?.map((patron, index) => (
            <div key={index} className='w-full grid grid-cols-fluid px-5 py-3 bg-purple-700 rounded-sm mb-3 text-base'>
              <span>{patron.id}</span>
              <span className='text-center'>{patron.name}</span>
              <span className='text-center'>{patron.message}</span>
              <span className='text-center'>{new Date(patron.time * 1000).toLocaleString()}</span>
              <span className='text-center'>{patron.from}</span>
            </div>
          ))
        }
      </div>

    </section>
  )
}

export default Patrons