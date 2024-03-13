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


import AidanAhern from '../../../images/Version5Photos/AidanAhern.png';
import GraftonLeGare from '../../../images/Version5Photos/GraftonLeGare.jpg';
import IsabellaFaile from '../../../images/Version5Photos/IsabellaFaile.jpg';
import kmiFlorez from '../../../images/Version5Photos/kmiFlorez.jpg';
import McGreggorKennison from '../../../images/Version5Photos/McGreggorKennison.jpg';
import RobertPerez from '../../../images/Version5Photos/RobertPerez.jpg';
import SerinaChugani from '../../../images/Version5Photos/SerinaChugani.jpg';
import TsehaiBoucaud from '../../../images/Version5Photos/TsehaiBoucaud.jpg';
import VicenteVivanco from '../../../images/Version5Photos/VicenteVivanco.png';

const Team5 = () => {

    // =============================  Enter values for TEAM info here ============================== 
    interface Team {
        number: number;
        yearsFound: string;
        objectives: string;
        contributions: string;
        github: string;
    }

    const teamInfo : Team = {
        "number": 5,  // Format as integer number
        "yearsFound": "2023-2024",  // format as string 'yyyy-yyyy'

        "objectives": "The primary goal of BrainBeats version 5 was to introduce a more robust music generation process that supports polyphonic output. Additionally, there was a focus on improving the scripting process along with its visual format.", 

        "contributions": "Version ’s contributions include:" +
        "\n\t• A redesign of the scripting functionality and interface." +
        "\n\t\t◦ The site now supports: images, audio, and video upload." +
        "\n\t\t◦ Users are able to save their scripts for editing or sharing." +
        
        "\n\t• Procedural music generation based on EEG data" +
        "\n\t\t◦ Algorithm is able to detect mood." +
        "\n\t\t◦ There is precision for notes relative to their predecessors." +
        "\n\t\t◦ Tempo and volume are dynamically determined." +
    
        
        "\n\t• Improved Emotion detection." +
        "\n\t\t◦ Intermediary step that improves music generation for the machine learning model.",

        "github": "actual link not created yet",
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

        {name: "Robert Perez", position: "Frontend Developer", image: RobertPerez, bio: "", 
        contributions: ""}, 

       {name: "McGreggor Kennison", position: "AI/ML Music Generation", image: McGreggorKennison, bio: "", 
        contributions: ""},

       {name: "Serina Chugani", position: "EEG Data Collection", image: SerinaChugani, bio: "", 
       contributions: ""}, 

      {name: "Isabella Faile", position: "Frontend Devleoper", image: IsabellaFaile, bio: "", 
        contributions: ""},

        {name: "Aidan Ahern", position: "AI/ML Music Generation", image: AidanAhern, bio: "", 
        contributions:""},

        {name: "Grafton LeGare", position: "Procedural Music Generation", image: GraftonLeGare, bio: "",
        contributions: ""},

        {name: "Vicente Vivanco", position: "EEG to Emotion Framework", image: VicenteVivanco, bio: "", 
     contributions: ""}, 

        {name: "kmi Florez", position: "Vicente's Manager", image: kmiFlorez, bio: "", 
        contributions: ""}, 

     {name: "Tsehai Boucaud", position: "Project Manager", image: TsehaiBoucaud, bio: "", 
     contributions: ""}, 

     

     
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
        const MAX_ROWS:number = 5;
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
            <img src={''} id='version4-team-photo' alt="Team image" onClick={() => {}}/>

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

export default Team5;