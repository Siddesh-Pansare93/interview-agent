import  {useEffect, useState} from 'react'
import axios from 'axios';


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

const PastInterviews = () => {

      const [interviews, setInterviews] = useState<Interview[]>([])
      const [loading, setLoading] = useState<boolean>(false)


      useEffect(()=>{
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

          fetchInterviews()
      } , [])
  return (
    <div className="mb-10 relative w-full">
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
  )
}

export default PastInterviews