import Vapi from "@vapi-ai/web"
import VapiInstance from "@vapi-ai/web"
import {   useEffect, useRef} from "react"



const App = () => {


  const vapi = useRef<VapiInstance | null>(null)
  // const [vapi , setVapi ] = useState({})
  useEffect(()=>{
  vapi.current = new Vapi(`${import.meta.env.VITE_VAPI_API_KEY}`) as VapiInstance

  })




  const handleStartCall = async ()=>{
    await vapi.current?.start(import.meta.env.VITE_VAPI_ASSISTANT_TOKEN)
    console.log("call started")

    vapi.current?.on('call-end' , ()=>{
      alert("call has been ended")
    })
  } 

  const handleEndCall = ()=>{
    vapi.current?.stop()
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