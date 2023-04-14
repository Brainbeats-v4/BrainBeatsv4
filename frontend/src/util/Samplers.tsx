import * as Tone from 'tone'

// We forked a github containing definitions for each instrument available with toneJs.
// https://github.com/brandonmrgich/tonejs-instruments/tree/master/samples

const BassElectric = new Tone.Sampler({
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
    baseUrl: 'https://audio.jukehost.co.uk/',
    volume: -5
})

const Bassoon = new Tone.Sampler({
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
    baseUrl: 'https://audio.jukehost.co.uk/',
    volume: -2
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
    release: 10,
    volume: -10
})

const Clarinet = new Tone.Sampler({
    urls: {
        "A#3": 'F87L9UEFZbRrmNRO7cTznrykkt67v8wd.mp3',
        "A#4": 'EGAFyPp2MJm9N4vwk1sgVRaDTvlRZ7RZ.mp3',
        "A#5": 'h5qlCIPw1zGhUH1XG7WvCIp9qz5ClkDw.mp3',
        D3: 'a5H92HZ4mz2sJtcMNzQR2MoLyNYCyiRH.mp3',
        D4: 'vEv3CKZONubwgDS0jnFu6wAH74EHTmvK.mp3',
        D5: 'K9jpYqNo9abs9SoDtLzz6PbFsfEh60cF.mp3',
        D6: 'x7PUl37U1EH0zV8dlqnhz4hzlGebHNlI.mp3',
        F3: 'ez47nexkKd3D9Bk91LZZ3jZHET4Y1Eo8.mp3',
        F4: '47Ve3hsgKFhGXMvMqMqOKg4eD4vlgOWU.mp3',
        F5: 'LP2pXXBZ9FKdQjZRN2FKqyymOtub4Zwr.mp3',
        "F#6": 'PL6JhSFfFk8v8vyujOVUaSrPy9VDL4BI.mp3',
    },
    release: 10,
    baseUrl: 'https://audio.jukehost.co.uk/'
})

const Contrabass = new Tone.Sampler({
    urls: {
        A2: 'Lj9m9E6vO7IaSeuFvyo3mZg0ibO35KsU.mp3',
        "A#1": 'KQDyyRJkA2nTH6fkQh2QAI2RHtOCnTyY.mp3',
        B3: 'IxpiwM13VFyJX4URYMnpSeBnuF97LFLx.mp3',
        C2: 'xVe32RMIhgvpXJuXb6x006iDnH7zIq8b.mp3',
        "C#3": 'JfrxykPtxYws7voqp269s7TcStZMlqo2.mp3',
        D2: 'B9AYc61WSXnJYIIQmI1zp7Nf3gpIj6CM.mp3',
        E2: 'a0acO8ycWnS6K2yqJ35MfnGy9POJHtGx.mp3',
        E3: 'sYup1GFYhIQN98bbxhQwfi8MaW6LhVwR.mp3',
        "F#1": 'u0oOL1HfVM7kznGTlayXUWvwOpFrg2lb.mp3',
        "F#2": '3c9FjnB1pduzVpa66TLoGvrQOMzIbdSG.mp3',
        G1: 'MpAJO06bK2SsgJFw05BKCP4kMSuefQ03.mp3',
        "G#2": 'DoAwBSGvP5lX2rOAR8soyZoO8zmVhTeN.mp3',
        "G#3": 'SzsmGjCCkp08C5W81FIKD2RHpiNr8lH7.mp3'
    },
    release: 10,
    baseUrl: 'https://audio.jukehost.co.uk/'
})

const Flute = new Tone.Sampler({
    urls: {
        A4: 'NjIinWgM6geoLkC6PYy7hBfSYk5Nyc0X.mp3',
        A5: 'xctRIwbFcI5qehFP2iulCqyakygwt2an.mp3',
        A6: '4u251foosSEdDfMdbOPzjsbtAtTTVtm1.mp3',
        C4: 'JV8FndgndCUFJey8Hx5mJHfQeCLsj8ga.mp3',
        C5: 'vNVvnjxpOw2KNaKdGE8dSAl1CQXhQJmd.mp3',
        C6: '4Q7hqDA5aJgXyt3lcR7e1YCit2PZFidw.mp3',
        C7: 'OGFW5SSPXVMhrm1yVFIuBymw5yOSkUzN.mp3',
        E4: 'T4SvojMjXcG9ymZsaPGe8dwZ1EgkwCHE.mp3',
        E5: '7FS6mwOzFql4LNFt32MumFGl7PdMRomB.mp3',
        E6: '2N8Tz0iTa5aV918yOeDX2Sjb6GsjbeMw.mp3',
    },
    release: 10,
    baseUrl: 'https://audio.jukehost.co.uk/'
})

const FrenchHorn = new Tone.Sampler({
    urls: {
        A1: 'KxHzN6BYbPKCj7qwDFU8iAx0XFZv7MpT.mp3',
        A3: 'Va5yJaCsyrsuWdGNvOAQzZE9u7wO1WsM.mp3',
        C2: 'MDmhQlIrmVzXQIxwJsXud02wbwCfogjE.mp3',
        C4: 'gEaFArEuNqSX8JHXeqIa72JZ5xC3bCgQ.mp3',
        D3: 'y6MnmuwI3j1aafroK7SZBbz0ZYOgHnpl.mp3',
        D5: '67oj3HZ5WZdSw8A8hJsD7fVKlBqTFmaG.mp3',
        "D#2": 'TSWOdKeT7WNFtWZfK2dcGpcy5QO6RyYN.mp3',
        F3: 'boRYSClzN7lNx2qPo1BNfwx3BdBJBvk3.mp3',
        F5: 'CYnUuG0JpElsyTyChD23OIDoxJJP9Wrx.mp3',
        G2: 'GXAwIbkmpbsE1rb2r1jgsmDhWk5KwvJ1.mp3',
    },
    release: 10,
    baseUrl: 'https://audio.jukehost.co.uk/'
})

const GuitarAcoustic = new Tone.Sampler({
    urls: {
        A2: 'ScQtgAuc5pXKOqZzzSvKftUBsEZhMa0m.mp3',
        A3: 'Ldsn3tIfywICd6A4rc1aNwIXrokgOdvz.mp3',
        A4: 'my9wTBkg8fh9j56e89uFrM3QfKQ6jHeQ.mp3',
        "A#2": 'iVBsN54WoyrYk5wQh0gkA2hVIXP5SFuN.mp3',
        "A#3": 'XFBjQ1TxZwL98louc3lItqcBUSazPurs.mp3',
        "A#4": 'bKaWqyLlLseC8VnkzdGwZssmyCq5KbeV.mp3',
        B2: '5p20nf78XX13kiEAmEtQPZfduhBFmyOq.mp3',
        B3: 'efhQ1aLLikhMKr5PUBcDczzZs2R1ozo0.mp3',
        B4: 'YMa9wtEC9oV3gYWw7Uz0Cs30rJVgDiGK.mp3',
        C3: 'MDmhQlIrmVzXQIxwJsXud02wbwCfogjE.mp3',
        C4: 'nOp3RjvodDdFUXU1n088WmEmUFRcvaGV.mp3',
        C5: 'SzAFFOrmVYvJ5qvS61tm23M47TkGN1Kn.mp3',
        "C#3": '7VsB18xmLQybUyRFdxMGiQkusTR6UxGu.mp3',
        "C#4": '6fk9iOHkwZOieRQcAjdQNJUK3kUBvev4.mp3',
        "C#5": 'a0Z9IdxqF8hPNLs1fkzduU1PlHW7LmKK.mp3',
        D2: 'cLOErU7agOXAnOfTo4i2U2xhBb5j7msX.mp3',
        D3: 'KuXf1PpJOwpWW0X43fiAQhwl2Xw3nMu4.mp3',
        D4: 'jE4td2ZpUphByaBtBwcBVWOG78I247SJ.mp3',
        D5: 'rMi8Mw56PnS0m9zrZOfiWLSSkYAYbWYD.mp3',
        "D#2": 'DOKnKlmnFRZjwvcuRiPnBeciHJADAPge.mp3',
        "D#3": 'AZIfRpesPWP7ibTtZ2ilNrCukbnLn7lN.mp3',
        "D#4": 'SKcXzv5W7C83WhZbj38N42RfRy7XCciQ.mp3',
        E2: 'zR51kxfVXcX7mVDBAfjirV2hBj0qWRaI.mp3',
        E3: 'mkvqOYbKJzZVCfOGmH25XKxiytQG2Lgn.mp3',
        E4: 'xCTEzCkoKeSJHoK5Xbqv2mi6CfvfbEZl.mp3',
        F2: 'ItfbVqKvXKHI3ZCAsc4AhwecHTDgmxRn.mp3',
        F3: 'w7xm6mThYp6uwXy9DO5KqhlbYCBz4LeH.mp3',
        F4: 'XIk7s7EUUHFznH7ZIKoKQsme9qW7qnwF.mp3',
        "F#2": 'eA4BQtmeIndgoskot7j5Ni7wTCYbIMR6.mp3',
        'F#3': 'Z9Gn3geE3iyNkfMURIvRHmQruWZ0ONZU.mp3',
        "F#4": 'J2Lh1jXspWcU9kKStlluMTOooNrG1IuK.mp3',
        G2: 'LwdvC6V9ew8C5PaBw6BUZ26pMY3Zb96b.mp3',
        G3: 'FR4sQE0bqF7PJ7yhJBPvlguIsC6umEym.mp3',
        G4: 'uP2BQ2B9hwBEPntwZPx9JdXiIBhR4cHq.mp3',
        "G#2": 'N4iWfI7q0hL03zYqFMOef9l0SSwqjNVf.mp3',
        "G#3": 'vA4lNT1SW0jIIc2SH3x3uA3bM9Fosy5M.mp3',
        "G#4": 'yifumYzQleNavrekx3pfqvvJazqsG6HH.mp3'
    },
    release: 10,
    baseUrl: 'https://audio.jukehost.co.uk/'
})

const GuitarElectric = new Tone.Sampler({
    urls: {
        A2: '1XqAh9uxDChOBrTEJ9RP3Ab2e6NnG4Q5.mp3',
        A3: 'kPxA6YcXlg6bBtH9HfG9FtBECpdoXDWx.mp3',
        A4: 'aJ1Tbw4COu3RXaltD3eRYbptxiqfBEIF.mp3',
        A5: 'OQVQKHyIuP4Bb3cYo0VUI46phEctWZAL.mp3',
        C3: '1OGuaPGq38oAQ4KOGGf91jebQdd5d1vL.mp3',
        C4: 'tYhNqbZcuVKzzOePzgxq782zjRjNX5Ck.mp3',
        C5: 'sNYYEhmk7T8XEqBHDT9dDamf1JGmEYf6.mp3',
        C6: 'udpUCtSc9okgB911spzcFjqPKkkyuKdp.mp3',
        "C#2": '2ZBPvkIPWzuM8ts5LqDlACnm8jEsZH0t.mp3',
        "D#3": '4mUfaxa7HT5ZCtRM1fCLL2BmRgSquuNs.mp3',
        "D#4": 'Jf5i2rbj7r9u917D22E6b8Yv3QSLRRKY.mp3',
        "D#5": 'ilabZgtpPQMmMgSgBnJQ5OCoHT3XSzkQ.mp3',
        E2: 'qgEtz2sDztdhAuBMNP0xJ3G06QiQKpmq.mp3',
        "F#2": 'XNV2wqcFnl172mkoY6Bh3T1PFDYmZ2gG.mp3',
        "F#3": 'QAg5SPahF9uUACNKWaJW66ab3YHc9WrG.mp3',
        "F#4": 'ejLYYTsU6rdkmJEZCzk0HStRljcxLT6y.mp3',
        "F#5": 'FBySwDcP0QXhbqtzCuwEXg3YmSHsGmHY.mp3'
    },
    release: 10,
    baseUrl: 'https://audio.jukehost.co.uk/'
})

const GuitarNylon = new Tone.Sampler({
    urls: {
        A2: 'Ec2qzRj1pwk2gihJn8aAqxtTfa1t0KND.mp3',
        A3: 'wMYjnBBn7mbhWvgXGLj2vdVY1Ot7Ek4x.mp3',
        A4: 'YRRWpCINVofnral8YaiohTYJvsZ1fowl.mp3',
        A5: 'oFeccJ3JjAfPc5cxle7J006PTIbfZvfw.mp3',
        "A#5": 'N7bqTHkAWRjooYBXAZI2U7gNJVFc6dDB.mp3',
        B1: 'g5gK18wB1WtXVyWUHcCMDrSThhsFsXvS.mp3',
        B2: '8M9NwpLbGcJyfW2BGuH5rTcE7ViOoUn3.mp3',
        B3: 'GMObptQLTSVFTl4IW1kEUergZMqEN6OD.mp3',
        B4: 'z0yDERXcIkkZirT6aQE2YEZcCozYAxnV.mp3',
        "C#3": 'BMsbJvpfwrEH6imJt0FvISHmh3W9jTe9.mp3',
        "C#4": 'fSOMqWFR9oW6QWD6eroxu18WnLGw2f2Y.mp3',
        "C#5": 'ttVOZgldr1ADlMCOn6ytlWAL88Uw7Kek.mp3',
        D2: 'gSolvAPAEEJFCRY50oj8BLt56TIvjo54.mp3',
        D3: 'lA5sqb9jWmRy69fjN4S4gl9QFs0uul5I.mp3',
        D5: '5Cc89oRJooS6DEBxAXYrdej9ebn5JToW.mp3',
        "D#4": '5N9A4YSBv2T1oeGJJNYK3xcVtfffja3y.mp3',
        E2: '7N8GjXxqROJI2kpWHxQcBLv0FFww4vck.mp3',
        E3: '0AhvLOpGa2dcWfHZIuHm4kcJo2yoHdzU.mp3',
        E4: 'KhTYxbNZS8f3ahGZyHErFK2uR4Gs2Ogx.mp3',
        E5: 'yql8j0aw8yikuzB8SEaIjuj3HdyGv0im.mp3',
        "F#2": 'g8xkaVrjVcwTdSAtMEdEFxOJYsJfXRoI.mp3',
        "F#3": 'akt9m8EI44h5fVKJ8h0jEXyO4jH0EqMt.mp3',
        "F#4": 'MlKY6QaxajSSrOPPiuU04fqEbwyixcQD.mp3',
        "F#5": 'wyQX4Tbyq1FXthpiZm5aMEJep3za5JKG.mp3',
        G3: 'oY5AWKKNMNR3Mblo902saxx24mt074Jj.mp3',
        G5: 'rU6IKr7LLuBkwtsAHM3Za2nZq2CgdSAK.mp3',
        "G#2": 'gsWiLDFHjfhQEP6iNSVw8a2VqRq2cuLF.mp3',
        "G#4": 'QwvkFNDc471pGoJvRfOmzzOOOQZkNWSw.mp3',
        "G#5": '3frqBYTBahHdMexTsSTFu7wFH5PG2ga0.mp3'
    },
    release: 10,
    baseUrl: 'https://audio.jukehost.co.uk/'
})

const Piano = new Tone.Sampler({
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

const Harmonium = new Tone.Sampler({
    urls: {
        A2: 'jj7yM8qhWbAUOS7QaPEDxyDGZU41xI6r.mp3',
        A3: 'CgBxdgQexwmTgjTTwJsdgx52uGWnrg3m.mp3',
        A4: 'p8avo2ACOhi93hNooXc40xzO76BlFMmK.mp3',
        "A#2": 'vOFYGSNuU9SWPlPuAHWXDH5jxu2ba34Z.mp3',
        "A#3": 'wYM9OoBLGAiWQAoZE6xm770O7LXIg4Rk.mp3',
        "A#4": 'zcIc5HQSVU02HQ7xQZ1CH6OMM4j7HnPM.mp3',
        B2: 'io7capmizjeptJpx50VmZugtCSaVLYoO.mp3',
        B3: 'm9maJIUKh1UNcs5nGm5Ia0nzWVsE3Tbx.mp3',
        B4: 'p0auxmIV0blpEenC7BhIgYWiSOlmZaqT.mp3',
        C2: 'Lygao9nQthS6e9k6lwZrnQX40HG8z7oY.mp3',
        C3: 'GXR6stRYZaM6eGJ8W86dfGjLVAXBgpEg.mp3',
        C4: '9hegGivmBuTpFvtQA6jWuYZOv64yIAgg.mp3',
        C5: 'DE0zRxBlMMZ6MWtNZcEi3C2SUMh1IAHJ.mp3',
        "C#2": 'WjXLtMMmOGeeoo5Xp8Pisp8oSitNlUBB.mp3',
        "C#3": 'zeCQgaalVNWor5Y7AptzV0lREEzMQXkg.mp3',
        "C#4": 'o5cAEnYNBxlFLhCabhj0fSevgUmewZLx.mp3',
        "C#5": 'tUbdgmWR5lQWy89gDKSkOwloCC290cqI.mp3',
        D2: '21TSaNgNm9WBziXnZY4tmfHSvLi1bx32.mp3',
        D3: '7XlmEqWLlNrfEWQM3KKmQN3FQmlI4mTE.mp3',
        D4: 'H0Rhsszn4mrCgqX3qp6paIUca4VXQzc5.mp3',
        D5: 'zHFY1PdATAhnmZpGHrtBYWDaA0AqfmtW.mp3',
        "D#2": 'fpwSiaqLQYjW99x0FdUeZeAGc9v8PJGm.mp3',
        "D#3": 'z3RPiRZWpJkPk4iODpJxDsFLZT3dtewK.mp3',
        "D#4": 'Z4Blm2QPXxNK6RtJ0ZMaDhuVvCSbJrGr.mp3',
        E2: 'sxkCnw1QsGuBysAUAZXskNCLjwRbZY6k.mp3',
        E3: 'eBloBqgTcatrlvktka7zXKC0BHKPhEP0.mp3',
        E4: 's7qPcqNUFXb4UHlCcrhYEnhV0QRtoRiW.mp3',
        F2: 'sGcLKYTw4KEICYfoPHCxoHYw8iOtstBO.mp3',
        F3: 'BFo0XoLDQXHXeuNnnUADqnaEBz783GhF.mp3',
        F4: 'GA2CUmdbOmDdQKzsdOwRAPYactAN39GZ.mp3',
        "F#2": '6yjr1vpYVLVHF6nAYTRbHOteVUHtTgfv.mp3',
        'F#3': 'x1tDTPjbhHiVc6ygDg5f1JyJjzlbTLBi.mp3',
        G2: 'Zr2Z1bPd1tz4hQ02vqqEBhmFIlx0R6RC.mp3',
        G3: 'Yo307EiyAyi5sXndWX3vo2JPHEOxlvTi.mp3',
        G4: 'r8JCvru3GoMTbwL9D8UrPfPTsivG7dTa.mp3',
        "G#2": 'Ol1Nd4Ye5fpAc3IeMq5lHlKifDx6j1pD.mp3',
        "G#3": 'QGaqSdRwwI69xe7kPpqs36Wt16CoLKdL.mp3',
        "G#4": '18agsiCagNc2Oj2aqoeSQ5AOWmpIjggA.mp3'
    },
    release: 10,
    baseUrl: 'https://audio.jukehost.co.uk/'
})

const Harp = new Tone.Sampler({
    urls: {
        A2: 'QHcS3JojoI2YSrd8JViATzaCdI5lNdvo.mp3',
        A4: 'BHdcu0CN2K19sTBQJ187BixpjLYRYF8D.mp3',
        A6: 'ZW0kUFMEqpnpI1ZBgBmdWBBAt56BSqIp.mp3',
        B1: 'My9D5LZODF43YnWUJe87kPUTDH6iDYS6.mp3',
        B3: 'Lk9hGVUhbchwKnlgSAJiFozd73iIf3NQ.mp3',
        B5: 'cdVB57DeDc0zGWOlEGXLJEXpwOg6rRc5.mp3',
        B6: '7p2c3DbYwnO6zAmqZtrO5cT383HF6Gpf.mp3',
        C3: 'gRcrT9aYCXTPBSDExopJPGGkauCPBbTO.mp3',
        C5: 'DqJnjXt0TYktC2NvtnlXsQFhYGHDJZPB.mp3',
        D2: 'tGO8MnMvu4Xbi1uQ7ux4oT2ExSkEpIc8.mp3',
        D4: 'OaInx08uOITYwVX98pZ08uJ4nAgpt7NV.mp3',
        D6: '3PsfvYeXCC3NeR4R0BAsdqGdn1WZe4m7.mp3',
        D7: 'U6Ys2CpjqT5ikIsZgSkGmYvFPzckg0ku.mp3',
        E1: 'KyGAajOvsfresyUKKYBiD5uDWcMM01JK.mp3',
        E3: '8Q9RCMWqJtr8brluWQlgCB6pnVDsdZnN.mp3',
        E5: 'c1OZDlpahsNt5xyhbHEgjNkrsL5pJHuE.mp3',
        F2: 'n2skZrEH8NnFIIBPn0Xn35Udsj6xdzu5.mp3',
        F4: 'WTjsY2IKBxbem5E2Awjg5OfaeczP7f9p.mp3',
        F6: 'OW6WBZLSE2lBI8yMaBoeWOgRs2xP2clj.mp3',
        F7: 'pW0KLlydmobw3ylLEbBMcfvn56qEF3p0.mp3',
        G1: 'wXhhr0FqL38upk93XePTVghH9n2rpVot.mp3',
        G3: 'gXq6CWiPTHBwYLfbv95aRaldUKQJyd4b.mp3',
        G5: '4SvS2YIGtXjVtJDHngNdLB1IntxH4ANS.mp3',
    },
    release: 10,
    baseUrl: 'https://audio.jukehost.co.uk/'
})

const Organ = new Tone.Sampler({
    urls: {
        A1: 'hQ9zIhAr56MkBXLmFFXQWq6q6nx599Mn.mp3',
        A2: 'GSVC3hyckwmQUzmwoQ2KJmcI6m1pWVBG.mp3',
        A3: 'oKlhwxY13lt5zw19TjHB3uDLuHeiTcl0.mp3',
        A4: 'XKEDA9WFh2Mccnc6fbgtwgowxH5QomD2.mp3',
        A5: 'UzPdtQGYqUdk4BfcYlWROGvQ8N6n74MH.mp3',
        C1: 'eKtWp8GtYJylTjmo3Hd4tELUzB949Vhl.mp3',
        C2: 'cbDdMolpBkUxOdXTjYLLH7uFppqMyTeX.mp3',
        C3: '2dUvncaBFpncZVH684zz5swmttJLQ1TT.mp3',
        C4: 'r9Tmjrq8kRLN3g7ue3FNE2rcuMyiFWjM.mp3',
        C5: 'uqZM5LUnpJ8Y2lOK9Qmuk2NMb9R3CDUq.mp3',
        C6: '7rIg5gwweUuFPil3qqrkEo67jR2f6VyY.mp3',
        "D#1": 'j7MDbXtmXcJDuuuqxpxkcZOK3kdRpUa9.mp3',
        "D#2": 'wrNieu1dmNc66LdePCaCbMkxNTKrJWa8.mp3',
        "D#3": 'hxYrTf9kaH95R9nBmlUyqUft7B8fRrRz.mp3',
        "D#4": 'tr1ob50wyiQhaieAc1MBvbSSQMijZllE.mp3',
        "D#5": 'Cc1XfU0Zzor3dGTpeApXOw8jpQm1Eaxl.mp3',
        "F#1": '083j0b0YNyIcITzqNAX4VNteDlmT3YgZ.mp3',
        "F#2": 'ffTqWGgbZNtjWmMDIfoNXaMp0Iw4HF2T.mp3',
        "F#3": '5LR0Es3s9wEjKTlGJKMWHpZaXJ1E1vaT.mp3',
        "F#4": 'DFzOSsWmRfl2JW6X5kT8PP6NZYJeD6iQ.mp3',
        "F#5": 'p7QdPHHwos6BsFw65NfKaQ0rKc81wKgq.mp3',
    },
    release: 10,
    baseUrl: 'https://audio.jukehost.co.uk/'
})

const Trombone = new Tone.Sampler({
    urls: {
        "A#1": 'Rr3Eu8vQiEsZSn4EYfXT9pUKdtxFpRro.mp3',
        "A#2": 'dk5lKBHW1dMAAGNHJLDSHGfKimE5eksa.mp3',
        "A#3": 'otoPjOQIPfLlQtHyOtUT17Y5QVSNlstw.mp3',
        C3: 'q0TeXuY9WbmQrfC79Uo0oCaBfeomNIiP.mp3',
        C4: 'xG6H9otApJ3JfYWP1iGsk2VlTSjxnl2m.mp3',
        "C#2": 'cfXBpCWMNvt7XLKiSQP5pYB79iNQarKa.mp3',
        "C#4": 'vZYe8IxBQjc0z0tcDMLexeU7kYkIYjzX.mp3',
        D3: 'WjDI7aYVHrWdislM8QcoPcLPjSq40ulb.mp3',
        D4: 'ByQmiDx5ztbdCn3AqwOxtmqFAHbvRy2c.mp3',
        "D#2": 'OhdoiBb6K48pxjuaSg1IQgEs8KAo1N9g.mp3',
        "D#3": 'tdlj2xnjJCnxlPOjFwlUUpiLx53Qe5Bn.mp3',
        "D#4": 'RjKDbHcr9HQFe4VMZYnYpc4tWZVUrK1N.mp3',
        F2: 'zExRa8FXHcjF4dAIjJFE6qZdssqDhx8b.mp3',
        F3: 'msixPmc0kKdLKbKbGPVBkO8Ri6Db09wp.mp3',
        F4: 'lEDsf8uQEXPLwCYSLKLYpgwfUEGbruiA.mp3',
        "G#2": 'gSv23M8O4Qz53PLv1XIHwTpejQg5tAQJ.mp3',
        "G#3": 'Ljf4HB3NooQvEgtTVQKY6ywGnQJDJngG.mp3',
    },
    release: 10,
    baseUrl: 'https://audio.jukehost.co.uk/'
})

const Saxophone = new Tone.Sampler({
    urls: {
        A4: '3bS8KJbuj3q0C3ZYu5aXm6X6utwJIgJ8.mp3',
        A5: 'kbObWS5oi1GJY2NQ2zKoqNiJaxbQOKP8.mp3',
        "A#3": '43nazoy8nIDrsB3De96sNgdAwxUT9Fsm.mp3',
        "A#4": 'YDqo8VxWknZxejcUci9hMQh30bVFOJju.mp3',
        B3: 'g1ppnLu7zT3tKWzciXCWlRTJXa3yGhMJ.mp3',
        B4: 'k3AGJ4VdjkFai0fSVJbCvFSRuDG4hwIo.mp3',
        C4: 'fq0w89Tqe4bREJcVbPkGdVf5vecjHKXY.mp3',
        C5: 'giviGyUlvb0ZeYXplrRMvWnpcYLEb1rl.mp3',
        "C#3": '8UGspks9dECjOXnFASkIm8n0oUmIwZki.mp3',
        "C#4": 'yPkWpqAaH1qwxjsRUbmTcmSD4NzqVRQz.mp3',
        "C#5": 'XJBfZtpP0GIf6UTptMTtn4y8eoVcIRQz.mp3',
        D3: 'GGFDBUmfYupJ3aB9CGMjpZbl8enz2mMU.mp3',
        D4: 'K4ImOvroWcDg6CLwxjCuqr9dw4kLiI8e.mp3',
        D5: '0VD6e8jU9k1bXyNturm5iO3MybTqJGC1.mp3',
        "D#3": 'QrH0J9TpbMUOLLJ8UV8hP79h1I05TlSN.mp3',
        "D#4": 'PCDL5ZCCoiqiTEt2Aq9jO0LoBlNKmzf7.mp3',
        "D#5": 'dO9ZWxZ1qPnjEEJL5KFwhBHLx7T8PdeK.mp3',
        E3: 'TwnvbsGSf0tPJU0YB4WkG6S8kkIVyuHU.mp3',
        E4: 'cuH0Mz49pcQClaiGjPKykg3qRnPhofwI.mp3',
        E5: 'NhQU5NmHDuNzaef04IFS5VcJQFlpLYJc.mp3',
        F3: 'WPc7JV2Y0QBus4NwFL3guOBTuhGL6d6v.mp3',
        F4: 'dsvKZSfvXf1TPvumETalnqXr6SNrNRUL.mp3',
        F5: '1j8UhBAGsaDMyRLwSnqV7eYvBgGokqsz.mp3',
        'F#3': 'PIF5RShJeQYHPZNcBqSe8fV0hpDUTpei.mp3',
        'F#4': 'Y8URM01pFMVi2UyvRvNOC1YNSCc3eQ4N.mp3',
        'F#5': 'iekcyWggP68CgxyktTHKTWlRh2aGXzx5.mp3',
        G3: 'kp9UzSmlURwoCoSMKMzsQj8jGyTi7Iym.mp3',
        G4: 'q8Xy8cz2IiwCzzhtNSOYlCki1fteYncJ.mp3',
        G5: 'kJsXPINJa1KuF6zuO1YB6QgBLu6Nys4F.mp3',
        "G#3": 'ATIndoxX0DH2aWuGiXqmgK2iMWUaVdfp.mp3',
        "G#4": 'obZsW3dRbqcxAwaoDoEGDePGbgLjkajO.mp3',
        "G#5": 'MI8b64wLwXVbaHayWnEYCsVlLXJp3zwi.mp3'
    },
    release: 10,
    baseUrl: 'https://audio.jukehost.co.uk/'
})

const Trumpet = new Tone.Sampler({
    urls: {
        A3: 'thvZAPt4whMBikRA8DGPFmXNWQoIQYx8.mp3',
        A5: 'EyDn835pKGIpb2GtWAbhiZPIhkFiQkcT.mp3',
        "A#4": 'CltUoZ96sNzj5RoTB2qfxMANaBB13R7L.mp3',
        C4: 'KdEjiS8Rro1oezXBBlfwb9qyqksV5Fth.mp3',
        C6: 'Zuq8PcfC8x3s2Fm1qbiSALXtdHOemPIQ.mp3',
        D5: 'VrEkfdDEYYf075yfo4wptPKtryUXuksv.mp3',
        "D#4": 'uuKUfLgzFRsfJwcj4JgxBoIWMRXjiblg.mp3',
        F3: 'Qo2tcEu4TXClAxmO1TTDtRuKW9IwwJr8.mp3',
        F4: 'nNiQuACkknuijo4xN0KtbixKmBtYmieW.mp3',
        F5: '2BmhRvBKngU1FkvjEaKqi5ikPiNFFcsl.mp3',
        G5: 'OLtUECfNXagfmKxlu6Q516omIXTQha7e.mp3',
    },
    release: 10,
    baseUrl: 'https://audio.jukehost.co.uk/'
})

const Tuba = new Tone.Sampler({
    urls: {
        "A#1": 'zsRt0jCMgZhGFEil1XRYlqdorJlOOAYF.mp3',
        "A#2": 'z3YegmAJ90p6VxswQyZY0rtIElODz1rs.mp3',
        "A#3": 'Tcm2ZlFjcTApcEmZNTWRGBYVt1ygGF4K.mp3',
        D3: 'x1ECF4Rl6M3NlamYHvsin0xfV78BuyVf.mp3',
        D4: 'eJr8pcpvjTMvsfFeNiDjcJ4BaZcVAM5t.mp3',
        "D#2": 'wzlwOPa1w3jEP1gBv4USJUApggKn5Awk.mp3',
        F1: 'wpRuD3PnIrsM91xk8VKN0LgmVhTFaLKU.mp3',
        F2: 'XurHA7kSx1f5v9AYtnkMfs2qNkWU0ftD.mp3',
        F3: '1cN7l627sYMOhTrWbuW0ocYgHMny7tOl.mp3',
    },
    release: 10,
    baseUrl: 'https://audio.jukehost.co.uk/'
})

const Violin = new Tone.Sampler({
    urls: {
        A3: 'bfTdelBxEyEksCvX3kyu6OcnnOdYCs6Z.mp3',
        A4: 'EdLWCMD7dOgwjE3iQp8Ah07CO6Ysi9nH.mp3',
        A5: 'fi5Smf2YlPo8opn6W0nQfn4vh9ZxiOC6.mp3',
        A6: 'z1eGM5tje9cdemeyZKzCwBFxbLX9Qghl.mp3',
        C4: 'i80xrDQze3LrEC0xTGllHCUHI0ptTLnV.mp3',
        C5: 'Ow2XKliahvV6jFFcoTOlidvfgL3RmOj7.mp3',
        C6: 'VsaHtl1VkbJt91BIjXqQhrnTziegKHRE.mp3',
        C7: 'vTLfyK6tNDrjj01xSEtElt86G1O3Jm3U.mp3',
        E4: 'BL4OTmlbLaaD8ZLntSSgFJnE2AKSwtx0.mp3',
        E5: 'fIjEJpc3LrCL0dzeCWKRQxQEepVdLEW9.mp3',
        E6: '4lpaMgkRTqTIgA2594CHRhT4HVl2jFVV.mp3',
        G3: 'q2iKWXBAgzZMu7r0t3oZDIH7My8EnxzO.mp3',
        G4: '4EpBbymy3DvjJ40nx1mlz5EbGf0Fckcg.mp3',
        G5: 'weQqZS2J6caEYGc8CPpZfpT0V7yMdgvC.mp3',
        G6: 'DVGRJ37YBvhRpXjjNATjxNFTxOVsPXl1.mp3',
    },
    release: 10,
    baseUrl: 'https://audio.jukehost.co.uk/'
})

const Xylophone = new Tone.Sampler({
    urls: {
        C5: 'Qh6w9acAvwDclh1yGcYoH7NHyuH3mlan.mp3',
        C6: 'NCLODEU2NKEO3BJYvANIw04KRmgUJV9Z.mp3',
        C7: 'nnqUke2ix2oxQTh1uNUc3KsEqYinq6CB.mp3',
        C8: 'QkZSS7E84VVFMVNaNIxNP3MyWJf2i3zt.mp3',
        G4: 'OgzClIAG1RMAEa1v41nEvsM68oAwQhGZ.mp3',
        G5: 'eEkxdWd87YXHtGcymQ4uP08TpAvZrkH0.mp3',
        G6: '4vGJk6IwnnGKvkCXSplDywaHiym9ROnQ.mp3',
        G7: '7WM1yAMQGbcn6Ktbf2BR56MXh5l7LWub.mp3',
    },
    release: 10,
    baseUrl: 'https://audio.jukehost.co.uk/'
})

const NULL = new Tone.Sampler({
    release: 10
});

export const SamplerList = [ NULL, BassElectric, Bassoon, Cello, Clarinet, Contrabass, Flute, FrenchHorn, GuitarAcoustic, GuitarElectric, GuitarNylon, Piano, Harmonium, Harp, Organ, Saxophone, Trombone, Trumpet, Tuba, Violin, Xylophone ]
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
