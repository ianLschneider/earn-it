import EILink from './EILink';

interface Props {
    profile: number;
    id: number;
    points: number;
    reward: string;
    spacing: string;
    iconType?: string;

}

const RewardLink = ( props: Props ) => {
    return (
        <li className='my-3' key={props.id}>
            <EILink url={`/${props.profile > 0 ? props.profile : 0 }/rewards/${props.id}/${props.points > 0 ? props.points : ''}`} text={props.reward} iconType={props.iconType} spacing={props.spacing} />
        </li>
    )
}

export default RewardLink