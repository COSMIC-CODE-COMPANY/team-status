import { useState } from 'react';

const useToggle = (state: boolean) => {
  const [isToggle, setToggle] = useState(state)
  const toggle = () => setToggle(prevState => !prevState)
  return { isToggle, setToggle, toggle }
}

export { useToggle }