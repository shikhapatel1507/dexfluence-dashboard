export default function AIInsights(){

  const insights = [
    "Hook 'Nobody talks about this collagen trick' performing 4x better",
    "Videos with face avatar get 2.1x engagement",
    "Best posting time detected: 7:30 PM",
    "Agent @skinwithanna generated 12k views"
  ]

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="font-bold text-lg mb-4">AI Insights</h2>

      <ul className="space-y-2">
        {insights.map((insight,i)=>(
          <li key={i} className="text-sm text-gray-600">
            {insight}
          </li>
        ))}
      </ul>

    </div>
  )
}