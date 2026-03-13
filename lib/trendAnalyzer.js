export function analyzeTrends(topics){

    return topics.map(topic => ({
      topic,
      score: Math.random()*100
    }))
    .sort((a,b)=>b.score-a.score)
    .slice(0,3)
  
  }