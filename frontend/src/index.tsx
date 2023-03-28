import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Imports for Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faHeartCirclePlus, faHeartCircleMinus, faHeartCircleCheck} from '@fortawesome/free-solid-svg-icons'


import { faHeart} from '@fortawesome/free-regular-svg-icons'
import { faBars, faHome, faInfo, faCircleInfo, faSearch, faPlugCirclePlus, faPlusCircle, faPlus, faPlayCircle, faEllipsisH, faMusic, faDownload} from '@fortawesome/free-solid-svg-icons'
import { faEye, faEyeSlash, faEdit, faPlay, faPause, faUser, faList, faRightFromBracket, faCircle, faSquare, faArrowUpFromBracket, faFloppyDisk, faTrash} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons'


import {RecoilRoot} from 'recoil'

// Redux
import { store } from './Redux/store'
import { Provider } from 'react-redux'

// Adding icons to global library
library.add(fab, faBars, faHome, faInfo, faCircleInfo, faSearch, faPlusCircle, faPlus, faHeart, faPlayCircle, faEllipsisH, faFloppyDisk, faTrash)
library.add(faEye, faEyeSlash, faEdit, faPlay, faPause, faUser, faMusic, faList, faRightFromBracket, faCircle, faSquare, faArrowUpFromBracket, faDownload, faGithub, faYoutube)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <Provider store={store}>
        <App />
      </Provider>
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
