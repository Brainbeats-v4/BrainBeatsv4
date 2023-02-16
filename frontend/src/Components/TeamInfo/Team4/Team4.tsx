import { useState } from 'react';

// Importing CSS
import '../../About/About.css'
import profileImage from '../../../images/blankProfile.png'
import TeamMemberModal from '../../TeamMemberModal/TeamMemberModal';
import { Modal } from 'react-bootstrap';

const Team4 = () => {

    // =============================  Enter values for TEAM info here ============================== 
    interface Team {
        number: number;
        yearsFound: string;
        objectives: string;
        contributions: string;
    }

    const teamInfo : Team = {
        "number": 4,  // Format as integer number
        "yearsFound": "2022-2023",  // format as string 'yyyy-yyyy'

        "objectives": "The primary goal of BrainBeats version 4 was to create a new refactored version of the pre-existing web application. Our objectives included a major redesign of the user interface, a modularization of the codebase, to include more complex music generation methods, and to improve the scripting system with custom compatibility. ", 

        "contributions": "Version 4’s contributions include:" +
        "\n\t• A major redesign of the user interface." +
        "\n\t\t◦ The creation of a more accessible and modern web application." +
        "\n\t\t◦ The addition of new pages and features to improve user experience." +
        
        "\n\n\t• A modularization of the codebase." +
        "\n\t\t◦ The refactorization of the existing backend." +
        "\n\t\t◦ The conversion from JavaScript to TypeScript." +
        "\n\t\t◦ The inclusion of flexible script generation." +
        "\n\t\t◦ Ensuring well-documented code for future BrainBeats developers." +
        
        "\n\n\t• More complex music generation methods." +
        "\n\t\t◦ The inclusion of more music generation options." +
        "\n\t\t◦ The inclusion of plugin discovery with standardized input/output." +
        "\n\t\t◦ The ability for developers to easily add new generation scripts." +
        
        
        "\n\n\t• Improved scripting system with custom image compatibility." +
        "\n\t\t◦ The discovery of stock images to improve the visual script system.",
    }
    // ===============================  Enter TEAM MEMBERS info here =============================== 

    interface TeamMember {
        name: string;
        position: string;
        image: string;
        bio: string;
    }

    const emptyTeamMember: TeamMember = {
        "name": "",
        "position": "",
        "image": "",
        "bio": "",
    }

    const defaultImage = profileImage;
    var teamMembers : TeamMember[] = [
        {name: "Martin McCarthy", position: "Project Manager • Machine Learning Developer", image: defaultImage, bio: "Hello World Empty Text 1"},
        {name: "Brandon Mrgich", position: "Music Generation • Backend Developer", image: defaultImage, bio: "Hello World Empty Text 2"},
        {name: "Aidan Fleming", position: "Database & API • Backend Developer  ", image: defaultImage, bio: "Hello World Empty Text 3"},
        {name: "Aribel Ruiz", position: "Frontend Developer • Visual Designer", image: defaultImage, bio: "Hello World Empty Text 4"},
    ];
    // ============================================================================================= 
    

    // For displaying Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [currentMember, setCurrentMember] = useState<TeamMember>(emptyTeamMember);

    function setTeamMember(currentMember:TeamMember) {
        setCurrentMember(currentMember);
        setShow(true);
    }

    function PopulateTeamMembers() {
        const MAX_COLS:number = 2;
        const MAX_ROWS:number = 3;
        var gridArray:any[] = [];
        var currentMemberCounter:number = 0;

        for(let i = 0; i < MAX_ROWS; i++){
            for(let j = 0; j < MAX_COLS; j++) {
                let currentMember = teamMembers[currentMemberCounter++];
                if(currentMember == null) break;
                currentMember.image = currentMember.image === "" ? defaultImage : currentMember.image;
                let name = currentMember.name;
                let position = currentMember.position;
    
                gridArray.push(currentMember);
            }
        }
        return gridArray;
    }
    
    var memberList = PopulateTeamMembers();
    
    return (
    <div className='about-teams-body'>
        <div className='about-team-info'>
            <h1 className='about-team-title'>Team {teamInfo.number}</h1>
            <h6 className='about-team-year'>({teamInfo.yearsFound})</h6>
            <h3 className='about-team-subtitle'>Goals and Objectives</h3>
            <p>{teamInfo.objectives}</p>
            <h3 className='about-team-subtitle'>Contributions</h3>
            <p>{teamInfo.contributions}</p>
        </div>
        <div className='about-team-members'>
            {memberList.map((teamMember) => (
                    <div className="col track-col">
                        <button className=" btn btn-primary card" id='member-card-body' onClick={() =>setTeamMember(teamMember)}>
                            <img src={teamMember.image} className="card-img-top" id="card-img-ID" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{teamMember.name}</h5>
                                <div className="card-text">
                                    <p id='card-author'>{teamMember.position}</p>
                                </div>
                                
                            </div>
                        </button>
                    </div>
                ))}
        </div>
        <Modal id='pop-up' show={show} onHide={handleClose}>
            <TeamMemberModal teamMember={currentMember}/>
        </Modal>
    </div>
    );
};

export default Team4;