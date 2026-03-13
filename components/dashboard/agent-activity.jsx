export default function AgentActivity(){

    const agents = [
      {name:"Script Agent",status:"running"},
      {name:"Image Agent",status:"running"},
      {name:"Video Agent",status:"running"},
      {name:"Publish Agent",status:"idle"}
    ]
  
    return (
  
      <div className="bg-white p-6 rounded-xl shadow">
  
        <h2 className="font-bold mb-4">AI Agent Activity</h2>
  
        <div className="space-y-4">
  
          {agents.map((agent,i)=>(
  
            <div
              key={i}
              className="flex items-center justify-between border-b pb-2"
            >
  
              <span>{agent.name}</span>
  
              <span
                className={
                  agent.status==="running"
                  ? "text-green-500"
                  : "text-gray-400"
                }
              >
                ● {agent.status}
              </span>
  
            </div>
  
          ))}
  
        </div>
  
      </div>
  
    )
  }