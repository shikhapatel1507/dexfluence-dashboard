export async function analyzeInstagram(posts){

    const captions = posts.map(p=>p.caption)
  
    const combined = captions.join(" ")
  
    return combined
  
  }