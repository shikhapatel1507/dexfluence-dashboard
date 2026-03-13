export function analyzeTopics(trends){

    return trends.map(t => ({
      topic:t,
      score:Math.random()*100
    }))
    .sort((a,b)=>b.score-a.score)
    .slice(0,5)
  
  }