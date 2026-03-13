export default function ViralFeed(){

    const posts = [
      {hook:"Nobody talks about this collagen trick",views:120k},
      {hook:"My skin changed after 7 days",views:85k}
    ]
  
    return(
  
      <div className="bg-white p-6 rounded-xl shadow">
  
        <h2 className="font-bold mb-4">
          Viral Content
        </h2>
  
        <div className="space-y-3">
  
          {posts.map((post,i)=>(
            <div key={i} className="border p-3 rounded">
  
              <p className="font-medium">{post.hook}</p>
  
              <p className="text-xs text-green-500">
                {post.views} views
              </p>
  
            </div>
          ))}
  
        </div>
  
      </div>
  
    )
  
  }