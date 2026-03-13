export function detectViral(posts){

    return posts.filter(p =>
      p.views > 50000 &&
      p.likes > 5000
    )
  
  }