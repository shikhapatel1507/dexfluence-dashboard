export function generateScript(hook,voice){

    return `
  ${hook}
  
  Here's what you need to know.
  
  ${voice.keywords.join(", ")} are the keys to success.
  
  ${voice.call_to_action}
  `
  
  }