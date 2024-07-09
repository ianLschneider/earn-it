import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const EILink = ({text, url, iconType, spacing = "center"} : {text: string, url: string, spacing?: string, iconType?:any}) => {
  return (
    <Link
      to={url}
      className={`ei-link mt-[20px] bg-secondary text-white hover:opacity-80 flex justify-${spacing} px-[40px]`}
    >{text} {iconType ? 
      <FontAwesomeIcon icon={iconType} className='text-2xl pl-[10px]' />
      :
      null}</Link>
  )
}

export default EILink