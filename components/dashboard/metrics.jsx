export default function Metrics(){

  const metrics = [
    {title:"Campaigns Running",value:12},
    {title:"Scripts Generated",value:342},
    {title:"Videos Generated",value:128},
    {title:"Posts Published",value:89}
  ]

  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {metrics.map((m,i)=>(
        <div key={i} className="p-6 bg-white rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">{m.title}</h3>
          <p className="text-3xl font-bold">{m.value}</p>
        </div>
      ))}
    </div>
  )
}