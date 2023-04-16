import { useState } from 'react';

// Importing CSS
import '../../About/About.css'
import profileImage from '../../../images/blankProfile.png'
import TeamMemberModal from '../../Modals/TeamMemberModal/TeamMemberModal';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Importing Team Member Images
import martinMcCarthy from '../../../images/Version4Photos/MartinMcCarthy.jpg';
import brandonMrgich from '../../../images/Version4Photos/BrandonMrgich.png';
import aidanFleming from '../../../images/Version4Photos/AidanFleming.jpg';
import aribelRuiz from '../../../images/Version4Photos/AribelRuiz.jpg';
import version4Team from '../../../images/Version4Photos/BrainBeats.jpg';

const Team4 = () => {

    // =============================  Enter values for TEAM info here ============================== 
    interface Team {
        number: number;
        yearsFound: string;
        objectives: string;
        contributions: string;
        github: string;
    }

    const teamInfo : Team = {
        "number": 4,  // Format as integer number
        "yearsFound": "2022-2023",  // format as string 'yyyy-yyyy'

        "objectives": "The primary goal of BrainBeats version 4 was to create a new refactored version" +
        " of the pre-existing web application. Our objectives included a major redesign of the user interface," +
        " a modularization of the codebase, to include more complex music generation methods, and to improve the" +
        " scripting system with custom compatibility. ", 

        "contributions": "Version 4’s contributions include:" +
        "\n\t• A major redesign of the user interface." +
        "\n\t\t◦ The creation of a more accessible and modern web application." +
        "\n\t\t◦ The addition of new pages and features to improve user experience." +
        
        "\n\t• A modularization of the codebase." +
        "\n\t\t◦ The refactorization of the existing backend." +
        "\n\t\t◦ The conversion from JavaScript to TypeScript." +
        "\n\t\t◦ The inclusion of flexible script generation." +
        "\n\t\t◦ Ensuring well-documented code for future BrainBeats developers." +
        
        "\n\t• More complex music generation methods." +
        "\n\t\t◦ The inclusion of more music generation options." +
        "\n\t\t◦ The inclusion of plugin discovery with standardized input/output." +
        "\n\t\t◦ The ability for developers to easily add new generation scripts." +
        
        
        "\n\t• Improved scripting system with custom image compatibility." +
        "\n\t\t◦ The discovery of stock images to improve the visual script system.",

        "github": "https://github.com/Brainbeats-v4/BrainBeatsv4",
    }
    // ===============================  Enter TEAM MEMBERS info here =============================== 

    interface TeamMember {
        name: string;
        position: string;
        image: string;
        bio: string;
        contributions: string;
    }

    const emptyTeamMember: TeamMember = {
        "name": "",
        "position": "",
        "image": "",
        "bio": "",
        "contributions": "",
    }

    const defaultImage = profileImage;
    var teamMembers : TeamMember[] = [
        {name: "Martin McCarthy", position: "Project Manager • Machine Learning Developer", image: martinMcCarthy, bio: "", 
        contributions:"• Planned meetings and accessed time management" + "\n• Ensured target goals were reached" +
        "\n• Developed a machine learning model" + "\n • Provided assistance to frontend and backend development"},

        {name: "Brandon Mrgich", position: "Music Generation • Backend Developer", image: brandonMrgich, bio: "",
        contributions: "• Researched neurology, music generation, and EEG" + "\n• Restructured the API" + 
        "\n• Restructured previous implementation of music generation" + "\n• Assisted with frontend functions and logic"},

        {name: "Aidan Fleming", position: "Database & API • Backend Developer  ", image: aidanFleming, bio: "", 
        contributions: "• Developed a rework of the original backend system" + "\n• Extended the backend as needed to ensure compatibility" +
        "\n• Assisted in creating functional components" + "\n• Assisted with modularizing/refactoring the codebase"},

        {name: "Aribel Ruiz", position: "Frontend Developer • Visual Designer", image: aribelRuiz, bio: "", 
        contributions: "• Developed a rework of the original frontend system" + "\n• Converted JavaScript to TypeScript" +
       "\n• Developed and implemented UI and UX designs" + "\n• Created functional components for frontend development"}
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
            <h3 className='about-team-subtitle'>See Version {teamInfo.number} Project</h3>
            <h6>
                <FontAwesomeIcon className='modal-track-icons' icon={["fab", "github"]} />
                {'GitHub '} 
                <a href={teamInfo.github}>{teamInfo.github}</a>
            </h6>
            <img src={version4Team} id='version4-team-photo' alt="Team image" onClick={() => {}}/>
        </div>
        <div className='about-team-members'>
            {memberList.map((teamMember, index) => (
                    <div className="col track-col" key={index}>
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