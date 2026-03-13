export function distributeVideos(videos, agents){

    const jobs = []
  
    videos.forEach((video,i)=>{
  
      const agent = agents[i % agents.length]
  
      jobs.push({
        agent,
        video
      })
  
    })
  
    return jobs
  
  }