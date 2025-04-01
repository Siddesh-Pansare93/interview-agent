import Vapi from "@vapi-ai/web"
import { useState ,  useEffect} from "react"


const App = () => {

  const [vapi , setVapi ] = useState({})

  useEffect(() => {
    const vapi = new Vapi(`${process.env.VITE_VAPI_ASSISTANT_TOKEN}`)
    setVapi(vapi)
  }, [])

  return (
    <div className="w-screen h-screen bg-black">
      <div>
        <button>Start call </button>
        <button>End Call </button>
      </div>
    </div>
  )
}

export default App