import { useState } from 'react';

export default function useConfirmPasswoedHook() {

  const [eyeTogel, setEyeTogel] = useState(false)
  function changeTogle(): void {
    setEyeTogel(!eyeTogel)
  }


  return { changeTogle, eyeTogel,}
}
