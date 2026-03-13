export async function POST(req){

    const payload = await req.json()
  
    if(payload.meta.event_name === "subscription_created"){
  
      const userId = payload.data.attributes.custom_data.user_id
  
      // update user plan
      console.log("Subscription created:", userId)
  
    }
  
  }