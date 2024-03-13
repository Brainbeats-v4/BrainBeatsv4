import { useState } from 'react';

// Importing CSS
import '../../About/About.css'
import profileImage from '../../../images/blankProfile.png'
import { Modal } from 'react-bootstrap';
import TeamMemberModal from '../../Modals/TeamMemberModal/TeamMemberModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Importing Team Member Images
import quanminhNguen from '../../../images/Version3Photos/QuanminhNguyen.jpg';
import noahLang from '../../../images/Version3Photos/NoahLang.jpg';
import shyamParikh from '../../../images/Version3Photos/ShyamParikh.jpg';
import SamiEskirjeh from '../../../images/Version3Photos/SamiEskirjeh.jpg';

const Team3 = () => {

    // =============================  Enter values for TEAM info here ============================== 
    interface Team {
        number: number;
        yearsFound: string;
        objectives: string;
        contributions: string;
        github: string;
    }

    const teamInfo : Team = {
        "number": 3,  // Format as integer number
        "yearsFound": "2022",  // format as string 'yyyy-yyyy'

        "objectives": "The primary goal of BrainBeats version 3 was to migrate the previous state of" + 
        " the platform into a more scalable medium that allows public users to create, view," + 
        " and share content created by BrainBeats. This entails translating version 2's" +
        " desktop application into a web application. BrainBeats version 3's goals also included the overall" +
        " increase of the user experience.", 

        "contributions": "Version 3’s contributions include:" +
        "\n\t• Developing a web platform for BrainBeats." +
        "\n\t\t◦ Allowing users to create, read, update, and delete their own posts." +
        "\n\t\t◦ Allowing users to find and discover public posts and playlists." +
        
        "\n\t• Establishing a Bluetooth connection over the Web." +
        "\n\t\t◦ Functional use of the OpenBCI headset to generate music." +

        "\n\t• Music generation and playback." +
        "\n\t\t◦ Live-feedback loop when recording/creating a MIDI file." +
        "\n\t\t◦ Live visual accompaniment when generating music using brainwaves.",

        "github": "https://github.com/BrainBeatsv3/BrainBeatsWeb",
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
        {name: "Shyam Parikh", position: "Project Manager • Systems Administrator • Backend Developer", image: shyamParikh, 
        bio: "Learn more about me and my other projects on GitHub: https://github.com/Aestrus",
        contributions:"• Handled Agile development practices" + "\n• Handled system administration" +
        "\n• Developed scripts for building/testing the web application" + "\n• Assisted in creating music generation model" + 
        "\n • Helped in data transmission between browser and EEG device" + "\n• Handled database design and management" + 
        "\n• Worked on the API"},

        {name: "Noah Lang", position: "Music Generation • Full-Stack Developer", image: noahLang, 
        bio: "I'm a UCF Alumni who graduated in 2022 and is passionate about all things computer science and music. I am excited by the opportunity to combine my passions in a meaningful way via the BrainBeats project.",
        contributions: "• Researched music generation and algorithms" + "\n• Assisted in creating music generation model" + 
        "\n• Helped in data transmission between browser and EEG device" + "\n• Assisted with frontend functionality"},

        {name: "Sami Eskirjeh", position: "EEG Connection • Backend Developer", image: SamiEskirjeh, bio: "",
        contributions: "• Researched backend technologies" + "\n• Developed API functionality with OpenBCI headset" + 
        "\n• Worked in data transmission between browser and EEG device" + "\n• Assisted with frontend functionality"},

        {name: "Quanminh Nguyen", position: "Frontend Developer • Visual Designer", image: quanminhNguen, bio: "",
        contributions: "• Researched frontend technologies" + "\n• Designed and implemented UI/UX for web application" + 
        "\n• Developed functional frontend components" + "\n• Assisted in developing a music generation model"},
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
            <br></br>
            <h6>
                <FontAwesomeIcon className='modal-track-icons' icon={["fab", "youtube"]} />
                {'Senior Design Showcase Video '}
            </h6>
            <iframe width="80%" height="300px" src="https://www.youtube.com/embed/wvttb2_AZag" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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

export default Team3;