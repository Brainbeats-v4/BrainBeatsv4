import { useState } from 'react';

// Importing CSS
import '../../About/About.css'
import profileImage from '../../../images/blankProfile.png'
import { Modal } from 'react-bootstrap';
import TeamMemberModal from '../../Modals/TeamMemberModal/TeamMemberModal';

// Importing Team Member Images
import AnthonyH from '../../../images/Version1Photos/AnthonyH.jpg';
import GabrielLara from '../../../images/Version1Photos/GabrielLara.jpg';
import HungNguyen from '../../../images/Version1Photos/HungNguyen.jpg';
import JustinBang from '../../../images/Version1Photos/JustinBang.jpg';
import LloydD from '../../../images/Version1Photos/LloydD.jpg';

const Team1 = () => {

    // =============================  Enter values for TEAM info here ============================== 
    interface Team {
        number: number;
        yearsFound: string;
        objectives: string;
        contributions: string;
        github: string;
    }

    const teamInfo : Team = {
        "number": 1,  // Format as integer number
        "yearsFound": "2020",  // format as string 'yyyy-yyyy'

        "objectives": "The general goals of BrainBeats version 1 was to create a machine learning model that" +
        " can correctly infer what type of music a user is listening to, to create a web application that allows" +
        " for the production of music, and the creation of a digital audio workstation tool that allows users to mix samples of music," +
        " Version 1 goals also included giving users the ability to find and discover songs created by other users.",

        "contributions": "Version 1’s contributions include:" +
        "\n\t• The creation of a web application to host BrainBeats." +

        "\n\t• The creation of a machine learning model" +
        "\n\t\t◦ A machine learning model infering what music a user is listening to." +
        "\n\t\t◦ The use of emotion analysis for a machine learning model." +

        "\n\t• The implementation of a Digital Audio Workstation (DAW) into the application.",
        "github": "",
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
        "contributions" : "",
    }

    const defaultImage = profileImage;
    var teamMembers : TeamMember[] = [
        {name: "Anthony Hevia", position: "Project Manager • Music Generation", image: AnthonyH, bio: "",
        contributions:"• Handled sprint planning and team meetings" + "\n• Researched EEG and machine learning technology" + 
        "\n• Assisted in backend development" + "\n• Assisted in implementation of music generation"},

        {name: "Justin Bang", position: "Database Engineer • Backend Developer", image: JustinBang, bio: "",
        contributions:"• Researched and developed backend infrastructure" + "\n• Researched and developed database system" + 
        "\n• Researched and developed music recommendation system" + "\n• Developed music classification system"},

        {name: "Lloyd Dapaah", position: "User-Experience(UX) Developer • Unit Testing Developer", image: LloydD, bio: "",
        contributions:"• Designed approximate user flow of application" + "\n• Created and managed desktop application" + 
        "\n• Researched and installed test frameworks" + "\n• Installed plugins for unit testing"},

        {name: "Gabriel Lara", position: "Music Generation • Machine Learning Developer", image: GabrielLara, bio: "",
        contributions:"• Researched machine learning models and frameworks" + "\n• Tested, configured, and ran machine learning environments" + 
        "\n• Researched testing frameworks for machine learning models" + "\n• Researched testing frameworks for backend"},

        {name: "Hung Nguyen", position: "Frontend Developer • Unit Testing Developer", image: HungNguyen, bio: "",
        contributions:"• Developed responsive front-end application" + "\n• Managed web application integration with backend services" + 
        "\n• Researched testing frameworks for frontend & backend" + "\n• Assisted in API development"},
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

export default Team1;