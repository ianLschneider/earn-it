import EILink from './EILink';

interface Props {
    id: number;
    reward: string;
    spacing: string;
    iconType?: string;
}

const RewardLink = ( props: Props ) => {
    return (
        <li className='my-3' key={props.id}>
            <EILink url={`/rewards/${props.id}`} text={props.reward} iconType={props.iconType} spacing={props.spacing} />
        </li>
    )
}

export default RewardLink