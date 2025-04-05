import Vapi from "@vapi-ai/web"
import { useEffect, useRef } from "react"

const App = () => {
  const vapi = useRef<any>(null)

  useEffect(() => {
    vapi.current = new Vapi(import.meta.env.VITE_VAPI_API_KEY)

    // Set up the 'call-end' event listener once when Vapi is initialized
    vapi.current.on('call-end', () => {
      alert("Call has ended")
    })

    // Optional: Cleanup on component unmount
    return () => {
      vapi.current?.stop()
    }
  }, [])

  const handleStartCall = async () => {
    try {
      await vapi.current?.start(import.meta.env.VITE_VAPI_ASSISTANT_TOKEN)
      console.log("Call started")
    } catch (error) {
      console.error("Error starting call:", error)
    }
  }

  const handleEndCall = () => {
    try {
      vapi.current?.stop()
    } catch (error) {
      console.error("Error ending call:", error)
    }
  }

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center ">
      <div className="space-x-14">
        <button onClick={handleStartCall}>Start call</button>
        <button onClick={handleEndCall}>End Call</button>
      </div>
    </div>
  )
}

export default App
