import { useState } from 'react'

const EIAddButton = ( { title, spacing = '30px', clickHandler } : { title: string, spacing?: string, clickHandler: ()=> void }) => {
    const [ active, setActive ] = useState<boolean>(false)

    const mouseUpHandler = (event: any) => {
        setActive(false)
        window.removeEventListener('mouseup', mouseUpHandler)
    }

    const mouseDownHandler = (event: any) => {
        setActive(true)
        window.addEventListener('mouseup', mouseUpHandler)
    }

  return (
    <button 
        type='button' 
        className={`w-[50px] h-[50px] mt-[${spacing}] rounded-full  bg-secondary text-4xl text-white hover:opacity-80 ${active ? 'bg-accent' : null}`}
        title={title}
        onClick={clickHandler}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
    >
    &#43;
    </button>
  )
}

export default EIAddButton