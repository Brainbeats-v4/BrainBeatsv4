import * as Tone from 'tone'

// We forked a github containing definitions for each instrument available with toneJs.
// https://github.com/brandonmrgich/tonejs-instruments/tree/master/samples

export const BassElectric = new Tone.Sampler({
    urls: {
        "A#1": 'Q6PBLBjM6QMwQZ3mUM9qGaA7yi6qhUq6.mp3',
        "A#2": 'xKLsjvGrcGStInVs76eow07utLdTjKBq.mp3',
        "A#3": 'mDD9Wyig1QzOkM3m2aQUMleNPe4xBjXH.mp3',
        "A#4": 'nHcC5EnYng6LeIlhWXAbdAFbKIpFS7DL.mp3',
        "C#1": 'VeHLFrkloI2aSpmnzShEZxF7mnbtYiJL.mp3',
        "C#2": 'VeHLFrkloI2aSpmnzShEZxF7mnbtYiJL.mp3',
        "C#3": 'd40BAuiQo0tuHVMosIaCty549ycfTdcf.mp3',
        "C#4": 'zyGgpND17iaWlex3qrWLzVNnxmieTjkU.mp3',
        "C#5": '6TErFXjVAH0Oeo2VZvjV3yWOrNw1e5l8.mp3',
        E1: 'LLPwclBlro28Q0JCrYJglrEbfwdoabzZ.mp3',
        E2: 'm1yqVMiU9dLU2lLLRcRu1HqDuBtVFm6l.mp3',
        E3: 'KP3IS0prPWzlt02o7NaVyDFbTuEVRLd3.mp3',
        E4: 'Q6nU1y0zXKQBVMogS4FmtpnhmJNo6NFO.mp3',
        G1: 'CJD5cADPtzxirQ6VO5zGvbvU5x809uW1.mp3',
        G2: 'iVbb7rGTvN7EAAawRs8nyoTHCl40u0jJ.mp3',
        G3: 'CypCH9QKML9rUva2K4tXyXB5gM6oQT0O.mp3',
        G4: 'NWOZEPtFDrkqypWO2rj7UYawkiABAWab.mp3'
    },
    release: 10,
    baseUrl: 'https://audio.jukehost.co.uk/'
})

export const Bassoon = new Tone.Sampler({
    urls: {
        A2: 'yrSOPTd2mIkJCCUfjfuqH9YSNqKSnzNu.mp3',
        A3: 'iaqnjGJDwuc7uPeoXUxMfCImMcXCIhLG.mp3',
        A4: 'H37gbGd6tTF3E9O71tSnMzooCZyJQdmP.mp3',
        C3: 'QpxOSvteliOzY3xFfZFhgZdazp4xxaX1.mp3',
        C4: '6mDN0hHzQ5zMYV9n7PWvEFcUshtJUd8G.mp3',
        C5: 'uhhTdjO70fVBL8HyBxCmsPMZhKbLZ8E4.mp3',
        E4: 'M3Xsx8kJypgmKk3WXdHp3jezz3BVgLWZ.mp3',
        G2: 'wpbZ3qAZ94QlGU7SLjmNgg1ODxLvZw6S.mp3',
        G3: 'dJ49Qc4dmJRbLyICGIDvAMbEUdEoHtUe.mp3',
        G4: 'pi58ZXj4jQwyiVEH5nKcHEXdt5HQWuBq.mp3'
    },
    release:10,
    baseUrl: 'https://audio.jukehost.co.uk/'
})

const Cello = new Tone.Sampler({
    urls: {
        A2: 'oN5St08XlzvJGn2DL5i9UqL71AAiqvot.mp3',
        A3: 'Zx3yWBjg3FIpxBc0GTAyuPRvsGndFVTB.mp3',
        A4: 'qsVnenMTbFjcFIKH8EkycXWajoXuSkzw.mp3',
        "A#2": 'weAP2niuwdkOJITmHiJNCaBQWX0YdoMJ.mp3',
        "A#3": 'AB9nKOJQOuRuUFGcLf2T2rg8fxyHu3qd.mp3',
        B2: '1ZdMMfp7qVyNjmgDSrI4HBtEKQoHLW3Z.mp3',
        B3: 'BIRRgPE5pQEoSJTNDgWcYJTKAo4nWdeV.mp3',
        B4: 'oPpgHC2jCnTnFxO2JvgTLE0J681vopXl.mp3',
        C2: 'RwpjD0jqzK8dHWK7eg2Ei1NBIE4ghq9N.mp3',
        C3: 'QrLx64oSkcxt2I0ZrnTGcY3EdmkWc1nZ.mp3',
        C4: 'pVBscPOzGRja3bn8eUovJpGe5sr42z8s.mp3',
        C5: 'qrgy7BmyYeXfWP4A3k4kQ0oEiOwTjNYd.mp3',
        "C#3": 'XYCpk1zCO2m0mFwciZ5DJE7PpV16np8F.mp3',
        "C#4": '6mubZFzIYxj1krvKGB38YD0ezd1vJwYI.mp3',
        D2: 'gBCf5XK0Zaik0FJi3ZPxVzk2LOi3gelc.mp3',
        D3: 'WzDPmuXqk5bC9AZR0xQXXtzLnjlLp3BK.mp3',
        D4: 'NBEpG8KXMQ7JJjeqgvBJawR6XL4TajTQ.mp3',
        "D#2": 'yXctUwhAp1QYnYs9SOrDP6vk8tKYbx8p.mp3',
        "D#3": 'QLMYSaexMxkf50QgRN3F2N0EYeyB9opD.mp3',
        "D#4": 'JSv3gFyBnCRZpYdu2s7JKTmqvVaTBthC.mp3',
        E2: 'MrtoI0yJnxmYW4E7NGm2TNaVJGnywjCX.mp3',
        E3: 'nIHVznYvPLChMgjXYOgoTi9AKT3hgzPk.mp3',
        E4: 'G4FBMhKvq6isLGgrghs4DYxZGKHdAIAg.mp3',
        F2: 'XEN5CqHLI3aKlQctpUSUpWqWosD9BILn.mp3',
        F3: 'o3j7vJB6f3Sx5VBNqeRxtzJoJyzKdmy9.mp3',
        F4: 'xKMxs8x9fz6rSDf967tFsWHd3OKWmAEG.mp3',
        "F#3": '2mMwKD6p7AFiPLUX8bPmDVRHybOYNnrm.mp3',
        "F#4": 'DLSnDjefnBEt2WFg09bERIKSMT174cxy.mp3',
        G2: 'NSi8indSr4H3p0e6iZR6M52FkGeNgmeq.mp3',
        G3: '3LhsWynaybtgdu158dplpcg6WjToNlFB.mp3',
        G4: 'YwGUCG23qn4jcxtp4SOxmZxvKtcu9Cnq.mp3',
        "G#2": '7RLkuLxoWvP4t8DiBhdwO4I6oCFFVqfz.mp3',
        "G#3": 'IlM1UlaCZa1m4HjWA2jhfY492ohwDLOr.mp3',
        "G#4": 'qleZnK9WQpCRRFPpNB3r27NtTFL93fvo.mp3'
    },
    baseUrl: 'https://audio.jukehost.co.uk/',
    release: 10
})

export const Piano = new Tone.Sampler({
    urls: {
        A0: "A0.mp3",
        C1: "C1.mp3",
        "D#1": "Ds1.mp3",
        "F#1": "Fs1.mp3",
        A1: "A1.mp3",
        C2: "C2.mp3",
        "D#2": "Ds2.mp3",
        "F#2": "Fs2.mp3",
        A2: "A2.mp3",
        C3: "C3.mp3",
        "D#3": "Ds3.mp3",
        "F#3": "Fs3.mp3",
        A3: "A3.mp3",
        C4: "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        A4: "A4.mp3",
        C5: "C5.mp3",
        "D#5": "Ds5.mp3",
        "F#5": "Fs5.mp3",
        A5: "A5.mp3",
        C6: "C6.mp3",
        "D#6": "Ds6.mp3",
        "F#6": "Fs6.mp3",
        A6: "A6.mp3",
        C7: "C7.mp3",
        "D#7": "Ds7.mp3",
        "F#7": "Fs7.mp3",
        A7: "A7.mp3",
        C8: "C8.mp3"
    },
    release: 10,
    baseUrl: "https://tonejs.github.io/audio/salamander/"
})


export const NULL = new Tone.Sampler({
    release: 10
});

export const SamplerList = [
    NULL, BassElectric, Bassoon, Cello, NULL, NULL, NULL, NULL, NULL, NULL, Piano
]
// export const Flute = new Tone.Sampler({
//     urls: {
//         'A6': 'A6.mp3',
//         'C4': 'C4.mp3',
//         'C5': 'C5.mp3',
//         'C6': 'C6.mp3',
//         'C7': 'C7.mp3',
//         'E4': 'E4.mp3',
//         'E5': 'E5.mp3',
//         'E6': 'E6.mp3',
//         'A4': 'A4.mp3',
//         'A5': 'A5.mp3'
//     },
//     release:
    
// })
