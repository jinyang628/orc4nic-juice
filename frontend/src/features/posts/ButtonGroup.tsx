import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { destroyPostAsync} from './postSlice'

function ButtonGroup(props:any) {
    const activeUsername = useSelector((state: RootState) => state.activeUsername);
    console.log(activeUsername);
    console.log(props.username);

    function handleClick(e:any) {
        const payload = {
            post: {
                post_id: props.post_id
            }
        }
        props.dispatch(destroyPostAsync(payload));
    }
  return <div className="btn-group float-end">
      <button 
        className="btn clickableButton btn-warning"
        disabled={!(activeUsername == props.username)}
        style={{ visibility: activeUsername == props.username ? 'visible' : 'hidden' }}
        onClick={() => props.toggleEditForm()}>Edit</button>
      <button 
        className="btn clickableButton btn-danger" 
        disabled={!(activeUsername == props.username)}
        style={{ visibility: activeUsername == props.username ? 'visible' : 'hidden' }}
        onClick={(e) => handleClick(e)}>Delete</button>
  </div>;
}

export default ButtonGroup;
