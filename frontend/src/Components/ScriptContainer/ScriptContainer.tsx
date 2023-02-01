import './ScriptContainer.css';
import Cards from './Scripts/Cards/Cards';
import { useNavigate } from 'react-router-dom';

const ScriptContainer = () => {
    const navigate = useNavigate();
    const doNavigate = (route:string) => {
        navigate(route);
    }

    return (
        <div className='container' id='record-container'>
            <h2 className='record-heading'>Record Music</h2>
            <p className='record-heading'>Add a script to influence your thoughts:</p>
            <div>
                {/* Components go here, we will need to add a drag and drop */}
                <Cards />
                <div id='record-buttons-div'>
                    <button type="button" className="btn btn-secondary" id='skip-step-btn' onClick={() => doNavigate("/record")}>Skip This Step</button>
                    <button type="button" className="btn btn-secondary" id='go-record-btn' onClick={() => doNavigate("/record")}>Go to Record</button>
                </div>
            </div>            
        </div>);
}

export default ScriptContainer;