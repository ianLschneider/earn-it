import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

interface Props{
    reward?: any,
    icons: string[],
    buttonLabel: string;
    handleSubmit: (formData: any, formType: string, form: string) => void;
    hideForm: () => void;
}

const RewardForm = (props: Props) => {

    const [formData, setFormData] = useState({
        name: '',
        // earner: [1],
        iconType: 'ice-cream',
        points: 0,
    })

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
        props.handleSubmit(formData, 'new', 'rewards')
        props.hideForm()
    }

    const f = (str :string) => str.replaceAll('-', ' ')

    return (
        <form 
            className='w-full text-left text-secondary font-bold'
            onSubmit={handleSubmission}>
            <label>
                Title:
                <input
                    className='block w-full mx-auto mt-[3px]  mb-[10px] px-[10px] py-[2px] border-2 border-solid border-secondary rounded-[5px]'
                    type='text'
                    onChange={handleChange}
                    value={formData.name}
                    name='reward'
                />
            </label>
            <label>
                Points:
            <input
                className='block w-full mx-auto mt-[3px] px-[10px] py-[2px] border-2 border-solid border-secondary rounded-[5px]'
                type='number'
                onChange={handleChange}
                value={formData.points}
                name='points'
                required
            />
            </label>
            <label>
                Reward Icon:<br />
                <select className='w-full mb-[10px] px-[10px] py-[4px] border-2 border-solid border-secondary rounded-[5px] bg-white'
                    onChange={handleChange}
                    name='iconType'
                    defaultValue='star'
                >
                    {props.icons.map( (icon, i) => <option key={i} value={icon} className='capitalize'>{f(icon)}</option> )}
                </select>
            </label>
            <br />
            <input
                type='submit'
                className='ei-link mt-[40px] bg-secondary text-white hover:opacity-80 flex justify-center px-[40px]'
                value={props.buttonLabel} />
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

export default RewardForm