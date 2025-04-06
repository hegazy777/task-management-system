import { useState } from 'react';

export default function usePasswordHook() {


    const [eyeTogel2, setEyeTogel2] = useState(false)
 function changeTogle2(): void {
    setEyeTogel2(!eyeTogel2)
  }
  return {eyeTogel2, changeTogle2,}
  
}
