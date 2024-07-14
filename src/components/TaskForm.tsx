import { useState } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props{
    // id?: number;
    // task?: string;
    // iconType?: string;
    // points?: number;
    // completed?: boolean;
    task?: any;
    earner: number;
    formType: string;
    buttonLabel: string;
    icons:string[]
    handleSubmit: (formData: any, formType: string, form: string) => void;
    deleteTask?: (id: number) => void;
    hideForm: () => void;
}

const TaskForm = (props: Props) => {

    // https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
    let d: Date = new Date()
    const offset = d.getTimezoneOffset()
    d = new Date(d.getTime() - (offset*60*1000))
    const today: string = d.toISOString().split('T')[0]

    const [formData, setFormData] = useState(
        props.formType.toLowerCase() === 'new' ? {
            earner: props.earner,
            task: '',
            iconType: 'trophy',
            points: 0,
            completed: false,
            completeByDate: today,
        } : {
            id: props.task.id,
            earner: props.earner,
            task: props.task.task,
            iconType: props.task.iconType,
            points: props.task.points,
            completed: props.task.completed
        }
    )

    const f = (str :string) => str.replaceAll('-', ' ')

    const handleChange = (event: any) => {
        setFormData( prev =>(
            {
                ...prev,
                [event.target.name]: event.target.value
            }
        ) )
    }

    const handleSubmission = (event: React.FormEvent) => {
        event.preventDefault()
        props.handleSubmit(formData, props.formType, 'tasks')
        props.hideForm()
    }

    const handleDeleteTask = () => {
        if(props.deleteTask)props.deleteTask(props.task.id)
    }

    return (
        <form 
            className='w-full text-left text-secondary font-bold'
            onSubmit={handleSubmission}>
            <label>
                Task:
                <input
                    className='block w-full mx-auto mt-[3px]  mb-[10px] px-[10px] py-[2px] border-2 border-solid border-secondary rounded-[5px]'
                    type='text'
                    onChange={handleChange}
                    value={formData.task}
                    name='task'
                />
            </label>
            <label>
                Task Icon:<br />
                <select className='w-full mb-[10px] px-[10px] py-[4px] border-2 border-solid border-secondary rounded-[5px] bg-white'
                    onChange={handleChange}
                    name='iconType'
                    defaultValue='circle-check'
                >
                    {props.icons.map( (icon, i) => <option key={i} value={icon} className='capitalize'>{f(icon)}</option> )}
                </select>
            </label>
            <br />
            <label>
                Points for completing task:
            <input
                className='block w-full mx-auto mt-[3px] px-[10px] py-[2px] border-2 border-solid border-secondary rounded-[5px]'
                type='number'
                onChange={handleChange}
                value={formData.points}
                name='points'
                required
            />
            </label>
            <input
                type='submit'
                className='ei-link mt-[40px] bg-secondary text-white hover:opacity-80 flex justify-center px-[40px]'
                value={props.buttonLabel} />

            {props.formType.toLowerCase() === 'edit' &&
                <button
                type='button'
                className='ei-link mt-[20px] bg-secondary text-white hover:opacity-80 flex justify-center px-[40px]'
                onClick={handleDeleteTask}
                >Delete</button>
            }
            <button
                className='ei-link mt-[20px] bg-secondary text-white hover:opacity-80 flex justify-center px-[40px]'
                type='button'
                title='Cancel'
                onClick={ ()=>{ 
                    props.hideForm() 
                } }
            >
                Cancel
            </button>
        </form>
    )
}

export default TaskForm