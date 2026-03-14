export default function ViralRadar() {

  const videos = [
    { title: "Shopify Hack", views: 82000 },
    { title: "AI Marketing Trick", views: 54000 },
    { title: "Dropshipping Mistake", views: 39000 },
    { title: "Content Growth Tip", views: 27000 }
  ]

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">

      <h2 className="text-xl font-semibold mb-6">
        Viral Radar
      </h2>

      <div className="space-y-4">

        {videos.map((video, i) => (
          <div
            key={i}
            className="flex justify-between bg-zinc-950 p-4 rounded-lg border border-zinc-800"
          >
            <span>{video.title}</span>
            <span className="text-purple-400 font-semibold">
              {video.views.toLocaleString()} views
            </span>
          </div>
        ))}

      </div>

    </div>
  )
}