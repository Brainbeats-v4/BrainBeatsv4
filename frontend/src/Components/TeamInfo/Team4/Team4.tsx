// Importing CSS
import { useState } from 'react';
import '../../About/About.css'

const Team4 = () => {

    interface Team {
        number: number;
        yearsFound: string;
        objectives: string;
        contributions: string;
    }

    // =======================  Enter values for TEAM info here ======================= 
    const teamInfo : Team = {
        "number": 4,  // Format as integer number
        "yearsFound": "2022-2023",  // format as string 'yyyy-yyyy'

        "objectives": "BrainBeats is a Senior Design project for computer science students at the University of Central Florida." +
                        "The project is sponsored by Dr. Leinecker, and has been ongoing since 2019. The premise of BrainBeats is" +
                        "to take the electrical waves in your brain (using an EEG device) and utilize them to generate ", 

        "contributions": "BrainBeats is a Senior Design project for computer science students at the University of Central Florida." +
        "The project is sponsored by Dr. Leinecker, and has been ongoing since 2019. The premise of BrainBeats is" +
        "to take the electrical waves in your brain (using an EEG device) and utilize them to generate ",
    }

    // =========================  Enter TEAM MEMBERS info here ========================= 

    interface TeamMember {
        name: string,
        position: string,
    }

    // const [memberList, setMemberList] = useState<TeamMember[]>([]);

    var memberList : TeamMember[] = [
        {name: "Martin McCarthy", position: "Project Manager • Machine Learning "},
        {name: "Brandon Mrgich", position: "Music Generation • Backend Developer "},
        {name: "Martin McCarthy", position: "Database • Backend Developer "},
        {name: "Martin McCarthy", position: "Project Manager • Machine Learning"},

    ];
    



    // ================================================================================ 
    
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
            <h2>Members</h2>
        </div>
    </div>
    );
};

export default Team4;