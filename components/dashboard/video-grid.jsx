export default function VideoGrid(){

  const videos = [
    {id:1,status:"script"},
    {id:2,status:"image"},
    {id:3,status:"video"},
    {id:4,status:"published"}
  ]

  return(

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="font-bold mb-4">Video Production Pipeline</h2>

      <div className="grid grid-cols-4 gap-4">

        {videos.map(video=>(
          <div
            key={video.id}
            className="p-4 border rounded-lg text-center"
          >
            <p className="text-sm">Video #{video.id}</p>

            <p className="text-xs text-gray-500 mt-2">
              {video.status}
            </p>
          </div>
        ))}

      </div>

    </div>

  )
}