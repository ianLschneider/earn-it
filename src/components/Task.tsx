import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useState } from 'react'

interface Props{
  id: number;
  task: string;
  iconType: any;
  completed: boolean;
  points: number;
  handleTaskCompleted: (id: number, completed: boolean, points: number) => void;
}

const Task = (props: Props ) => {

  const [isCompleted, setIsCompleted] = useState<boolean>(props.completed)

  const handleTaskChange = (event: React.ChangeEvent) => {
    props.handleTaskCompleted(props.id, !isCompleted, props.points)
    setIsCompleted( !isCompleted )
  }

  return (
    <>
    <div className='flex items-center'>
      <input 
        type='checkbox'
        checked={isCompleted}
        onChange={handleTaskChange}
        className='mb-3' />
      </div>
        <div className='flex flex-col'>
          <div className='flex gap-2  text-[#333] w-[300px] pl-3'>
            <div><FontAwesomeIcon icon={props.iconType} className='text-2xl text-secondary' /></div>
            <div className={!isCompleted ? '' : 'line-through'}>{props.task}</div>
          </div>
          <div className='w-full bg-rule h-[1px] mt-2'></div>
      </div>
    </>
  ) 
}

export default Task