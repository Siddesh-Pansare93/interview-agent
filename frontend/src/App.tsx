import Vapi from "@vapi-ai/web"
import { useState ,  useEffect} from "react"



const App = () => {

  // const [vapi , setVapi ] = useState({})
  const vapi = new Vapi(`${import.meta.env.VITE_VAPI_API_KEY}`)




  const handleStartCall = async ()=>{
    await vapi.start(import.meta.env.VITE_VAPI_ASSISTANT_TOKEN)
    console.log("call started")

    vapi.on('call-end' , ()=>{
      alert("call has been ended")
    })
  } 

  const handleEndCall = ()=>{
    vapi.stop()
  }

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center ">
      <div className="space-x-14">
        <button onClick={handleStartCall}>Start call </button>
        <button onClick={handleEndCall}>End Call </button>
      </div>
    </div>
  )
}

export default App