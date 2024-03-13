import { useState } from 'react';

// Importing CSS
import '../../About/About.css'
import profileImage from '../../../images/blankProfile.png'
import { Modal } from 'react-bootstrap';
import TeamMemberModal from '../../Modals/TeamMemberModal/TeamMemberModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Importing Team Member Images
import joshuaNeumann from '../../../images/Version2Photos/JoshuaNeumann.jpg';
import melanieBrady from '../../../images/Version2Photos/MelanieBrady.jpg';
import harrysauers from '../../../images/Version2Photos/HarrySauers.jpg';
import jordypantoja from '../../../images/Version2Photos/JordyPantoja.jpg';


const Team2 = () => {

    // =============================  Enter values for TEAM info here ============================== 
    interface Team {
        number: number;
        yearsFound: string;
        objectives: string;
        contributions: string;
        github: string;
    }

    const teamInfo : Team = {
        "number": 2,  // Format as integer number
        "yearsFound": "2021-2022",  // format as string 'yyyy-yyyy'

        "objectives": "The primary goal of BrainBeats version 2 was to create a desktop interface for a system" +
        " that better translates brainwaves (taken as EEG data) into music (output as a MIDI file)." +
        " Other goals of version 3 included good cybersecurity practices used throughout the system and" +
        " allowing users to create, read, update, and delete their own MIDI files. ", 

        "contributions": "Version 2’s contributions include:" +
        "\n\t• Developing the core application of BrainBeats." +
        "\n\t\t◦ Allowing BrainBeats to be run as a desktop application or webapp." +
        
        "\n\t• Translating EEG data into MIDI files." +
        "\n\t\t◦ Improved music generation using concepts from music theory." +

        "\n\t• The creation of a well-maintained and scalable system." +
        "\n\t\t◦ Allowing future developers to easily add upon version 2.",
        
        "github": "https://github.com/BrainBeatsV2/BrainBeatsApp/",
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
        {name: "Melanie Brady", position: "Project Manager • Music Generation", image: melanieBrady, bio: "",
        contributions:"• Handled sprint planning and weekly scrums" + "\n• Oversaw team organization and communications" + 
        "\n• Researched machine learning & music generation models" + "\n• Developed framework for music generation model"},

        {name: "Joshua Neumann", position: "Music Generation • Full-Stack Developer", image: joshuaNeumann, 
        bio: "Brain Beats V2 was the highlight of my academic career as a UCF undergrad. I contributed backend API functionality and researching and developing deterministic music generation models.", 
        contributions:"• Researched music generation & machine learning models" + "\n• Implemented model for music generation" + 
        "\n• Integrated frontend and backend services" + "\n• Researched proper authentication and encryption for system"},

        {name: "Jordy Pantoja", position: "Frontend Developer • Music Generation", image: jordypantoja, bio: "",
        contributions:"• Developed front-end web and desktop appliction" + "\n• Researched & implemented testing frameworks for frontend" + 
        "\n• Researched EEG and MIDI homebrew implementations" + "\n• Curated ideas for different music generation models"},

        {name: "Harry Sauers", position: "Database Engineer • Backend Developer", image: harrysauers, bio: "",
        contributions:"• Researched and managed database system" + "\n• Researched & developed backend infrastructure" + 
        "\n• Managed deployment, servers, CI/CD pipeline & testing" + "\n• Integrated frontend and backend services"},
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

export default Team2;