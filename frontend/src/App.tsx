import Vapi from "@vapi-ai/web"
import { useEffect, useRef, useState } from "react"
import axios from "axios"

// Define Interview type
interface Interview {
  _id: string;
  role: string;
  level: string;
  techstack: string;
  type: string;
  questions: string[];
  createdAt: string;
}

const App = () => {
  const vapi = useRef<any>(null)
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [isCallActive, setIsCallActive] = useState<boolean>(false)

  // Function to fetch interviews from the backend
  const fetchInterviews = async () => {
    try {
      setLoading(true)
      // You might need to adjust this URL based on your backend deployment
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/interviews`)
      console.log(response)
      setInterviews(response.data)
    } catch (error) {
      console.error("Error fetching interviews:", error)
    } finally {
      setLoading(false)
    }
  }

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

    // Fetch interviews when component mounts
    fetchInterviews()

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
    <div className="min-h-screen w-screen bg-[#121212] text-gray-200 overflow-auto">
      {/* Header */}
      <header className="bg-[#1c1c1c] border-b border-[#333] py-6 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-semibold text-center">
            <span className="text-[#4a8cca]">Mock</span>
            <span className="text-gray-100">Interview</span>
            <span className="text-[#5f9ea0]">AI</span>
          </h1>
          <p className="text-center text-gray-400 text-sm mt-1">Professional AI Interview Practice</p>
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-4 pb-12">
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
        <div className="mb-10 relative">
          <h2 className="text-2xl font-semibold text-gray-100 inline-block mb-8 relative">
            <span className="bg-[#4a8cca] text-white px-3 py-1 mr-2">Past</span>
            Interviews
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#5f9ea0]"></div>
          </h2>
          
          {loading ? (
            <div className="flex justify-center my-16">
              <div className="animate-pulse flex space-x-4">
                <div className="h-12 w-12 bg-[#4a8cca] rounded-md"></div>
                <div className="h-12 w-12 bg-[#5f9ea0] rounded-md"></div>
                <div className="h-12 w-12 bg-[#4a8cca] rounded-md"></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {interviews.length > 0 ? (
                interviews.map((interview) => (
                  <div 
                    key={interview._id}
                    className="bg-[#1c1c1c] border border-[#333] shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    {/* Card header with role */}
                    <div className="bg-[#4a8cca] p-4 border-b border-[#333]">
                      <h3 className="text-xl font-semibold text-white truncate">{interview.role}</h3>
                    </div>
                    
                    {/* Card content */}
                    <div className="p-6">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        <span className="bg-[#5f9ea0] text-white px-3 py-1 font-semibold text-sm border border-[#333]">
                          {interview.level}
                        </span>
                        <span className="bg-[#4a8cca] text-white px-3 py-1 font-semibold text-sm border border-[#333]">
                          {interview.techstack}
                        </span>
                        <span className="bg-[#5f9ea0] text-white px-3 py-1 font-semibold text-sm border border-[#333]">
                          {interview.type}
                        </span>
                      </div>
                      
                      {/* Date and question count */}
                      <div className="mb-4 flex justify-between items-center">
                        <span className="text-xs bg-[#333] text-gray-200 px-2 py-1">
                          {new Date(interview.createdAt).toLocaleDateString()}
                        </span>
                        <span className="text-xs font-semibold bg-[#4a8cca] text-white px-2 py-1">
                          {interview.questions.length} Questions
                        </span>
                      </div>
                      
                      {/* Questions preview */}
                      <div className="mb-6">
                        <div className="border-l-4 border-[#5f9ea0] pl-3 mb-3">
                          <h4 className="font-semibold text-sm uppercase text-[#5f9ea0] mb-2">Sample Questions</h4>
                        </div>
                        <div className="bg-[#1c1c1c] p-4 max-h-40 overflow-y-auto">
                          <ul className="space-y-3">
                            {interview.questions.slice(0, 3).map((q, index) => (
                              <li key={index} className="flex">
                                <span className="font-mono text-[#4a8cca] mr-2">{index + 1}.</span>
                                <span className="text-sm">{q}</span>
                              </li>
                            ))}
                            {interview.questions.length > 3 && (
                              <li className="text-sm font-semibold text-[#5f9ea0] hover:underline cursor-pointer mt-2">
                                + {interview.questions.length - 3} more questions
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                      
                      {/* Action button */}
                      <button className="w-full py-3 font-semibold bg-[#4a8cca] text-white border border-[#333] hover:bg-[#3a7bbd] transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-16 text-center">
                  <div className="inline-block border border-[#4a8cca] p-6 bg-[#1c1c1c]">
                    <p className="text-xl font-semibold mb-4">No interviews found</p>
                    <p className="text-[#5f9ea0]">Start your first AI interview session</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add keyframes for the waveform animation */}
      <style>
        {`
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
      <footer className="bg-[#1c1c1c] border-t border-[#333] py-6 text-center">
        <p className="text-sm text-gray-400">© 2024 MockInterviewAI • Powered by AI</p>
      </footer>
    </div>
  )
}

export default App
