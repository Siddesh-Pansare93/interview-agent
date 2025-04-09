import Vapi from "@vapi-ai/web"
import { useEffect, useRef, useState } from "react"
import PastInterviews from './components/PastInterviews'
import Header from "./components/common/Header"
import Footer from "./components/common/Footer"

const App = () => {
  const vapi = useRef<any>(null)

  const [isCallActive, setIsCallActive] = useState<boolean>(false)

  useEffect(() => {
    // Initialize Vapi
    vapi.current = new Vapi(import.meta.env.VITE_VAPI_API_KEY)

    vapi.current.on('call-end', () => {
      setIsCallActive(false)
      alert("Call has ended")
    })
    
    vapi.current.on('call-start', () => {
      setIsCallActive(true)
    })

    // Optional: Cleanup on component unmount
    return () => {
      vapi.current?.stop()
      setIsCallActive(false)
    }
  }, [])

  const handleStartCall = async () => {
    try {
      await vapi.current?.start(import.meta.env.VITE_VAPI_ASSISTANT_TOKEN)
      setIsCallActive(true)
      console.log("Call started")
    } catch (error) {
      console.error("Error starting call:", error)
    }
  }

  const handleEndCall = () => {
    try {
      vapi.current?.stop()
      setIsCallActive(false)
    } catch (error) {
      console.error("Error ending call:", error)
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#121212] text-gray-200 overflow-x-hidden">
      {/* Header */}
      <Header/>

      {/* Main content */}
      <div className="w-full px-4 pb-12">
        {/* Call controls and active call animation */}
        <div className="mb-12">
          {isCallActive ? (
            <div className="max-w-md mx-auto mb-6 bg-[#1c1c1c] p-4 rounded-lg border border-[#4a8cca] shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative mr-3">
                    <div className="absolute inset-0 rounded-full bg-[#4a8cca] opacity-30 animate-ping"></div>
                    <div className="relative rounded-full bg-[#5f9ea0] h-3 w-3"></div>
                  </div>
                  <span className="text-white font-medium">Interview in progress</span>
                </div>
                
                {/* Voice wave animation */}
                <div className="flex items-center space-x-1">
                  <div className="w-1 h-6 bg-[#4a8cca] animate-[waveform_1s_ease-in-out_infinite]"></div>
                  <div className="w-1 h-8 bg-[#5f9ea0] animate-[waveform_1.2s_ease-in-out_infinite]"></div>
                  <div className="w-1 h-4 bg-[#4a8cca] animate-[waveform_0.8s_ease-in-out_infinite]"></div>
                  <div className="w-1 h-10 bg-[#5f9ea0] animate-[waveform_1.5s_ease-in-out_infinite]"></div>
                  <div className="w-1 h-5 bg-[#4a8cca] animate-[waveform_0.9s_ease-in-out_infinite]"></div>
                </div>
                
                <button 
                  onClick={handleEndCall}
                  className="bg-[#dc3545] text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-[#c82333] transition-colors"
                >
                  End Call
                </button>
              </div>
            </div>
          ) : null}
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={handleStartCall}
              className="px-8 py-4 text-lg font-bold bg-[#4a8cca] text-white border border-[#333] shadow-md hover:bg-[#3a7bbd] transition-all"
              disabled={isCallActive}
            >
              Start Interview
            </button>
            
            <button 
              onClick={handleEndCall}
              className="px-8 py-4 text-lg font-bold bg-[#5f9ea0] text-white border border-[#333] shadow-md hover:bg-[#4f8b90] transition-all"
              disabled={!isCallActive}
            >
              End Interview
            </button>
          </div>
        </div>

        {/* Interview section */}
        <PastInterviews/>
      </div>

      {/* Added keyframes for the waveform animation and global overflow fixing */}
      <style>
        {`
        html, body {
          overflow-x: hidden;
          max-width: 100%;
        }
        
        @keyframes waveform {
          0%, 100% { 
            height: 3px;
          }
          50% { 
            height: 20px;
          }
        }
      `}
      </style>

      {/* Footer */}
      <Footer/>
    </div>
  )
}

export default App
