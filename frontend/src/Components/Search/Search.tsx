import React, { useState, useEffect, useCallback, ReactPropTypes } from "react";
import parse from 'html-react-parser';

import { Suspense, lazy } from 'react';
// import {
//   FaHeart,
//   FaRegHeart,
//   FaPlayCircle,
//   FaPlus,
//   FaEllipsisH,
// } from "react-icons/fa";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

import { Card, Modal, Dropdown, Button } from "react-bootstrap";

// import MidiPlayer from "react-midi-player";
import "./Search.css";
import { useRecoilValue } from "recoil";

import { userJWT, userModeState } from "../context/GlobalState";
import sendAPI from "../../SendAPI";
import TrackCard from "../TrackCard/TrackCard";

// import { playMidiFile } from "../Record/Playback";

// import Logo from '../Navbar/Logo.jpg'


// !!! Current errors temporarily solved with "any" type, though everything should 
// be explicitly typed later.

const SearchPage = () => {
  const user = useRecoilValue(userModeState);
  const jwt = useRecoilValue(userJWT);

  const [userPlaylist, setUserPlaylist] = useState([]);
  const [post, setPost] = useState([]);
  //states to create/addto playlist
  const [addPlay, setAddPlay] = useState(false);
  const [createPlay, setCreatePlay] = useState(false);
  const [playListTitle, setPlayListTitle] = useState("");
  const [picture, setPicture] = useState();
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [query, setQuery] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [currentSelectPost, setCurretSelectPost] = useState("");
  const [addedToPlay, setAddedToPlay] = useState("");

  const trackcard = React.lazy(() => import('../TrackCard/TrackCard'));

  const [html, setHtml] = useState('<TrackCard cardType="Search" input="' + query + '"} />');

  const [liked, setLiked] = useState([]) as any;

  useEffect(() => {
    if (!title) {
      sendAPI("get", "/posts/getAllPosts").then((res) => {
        setPost(res.data);
      });
    }
    if (user) {
      const dataParam = {
        userID: user.id,
      };
      sendAPI("get", "/playlists/getUserPlaylists", dataParam).then((res) => {
        setUserPlaylist(res.data);
      });

      sendAPI("get", "/likes/getAllUserLikes", dataParam).then((res) => {
        setLiked(res.data);
      });
    }
  }, [liked]);

  useEffect(() => {
    searchFuntion();
  }, [query])

  function showAdd(event: any) {
    console.log(event);
    setAddPlay(true);
    setCurretSelectPost(event.id);
  }

  function showCreate() {
    setCreatePlay(true);
  }

  function hideModals() {
    setAddPlay(false);
    setCreatePlay(false);
    setCurretSelectPost("");
    setMessage("");
  }

function searchFuntion() {
    console.log("search triggered");
    // let parentDiv = document.getElementsByClassName("searchBody")

    let html = '<TrackCard cardType={Search} input=' + '{' + query + '} />'

    setHtml(html);
    
    // parentDiv[0].appendChild(parse(html));

    // let heading = document.create("Trac");
    
    // ) = "cardType={'Search'} input={query}";

    // heading.cardType = "Search"
    // heading.textContent = "GeeksforGeeks"
    // heading.innerHTML = "something is here"

    // if (parentDiv[0] != null)
    //   parentDiv[0].appendChild(heading)
    // else console.log("is null");
    // let div = document.getElementsByClassName("searchBody");
    // let child = document.createElement("TrackCard");



    // div[0].appendChild(child);


  //   <Suspense fallback={<h1>Still Loading…</h1>}>
  //   <TrackCard cardType={'Search'} input={query} />
  // </Suspense>


  }

  function createPlaylist() {
    const dataBody = {
      name: playListTitle,
      userID: user.id,
      token: jwt,
      thumbnail: thumbnail,
    };
    sendAPI("post", "/playlists/createPlaylist", dataBody).then((res) => {
      setMessage("Playlist Created");
    });
  }

  function addToPlaylist(prop: any) {
    const bodyData = {
      postID: currentSelectPost,
      playlistID: prop.id,
      token: jwt,
    };
    console.log(bodyData);
    sendAPI("post", "/playlists/addPostToPlaylist", bodyData).then((res) => {
      setAddedToPlay("Post added to playlist");
    });
  }

  const handleSearch = (event: any) => {
    if (event.key === "Enter") {
      searchFuntion();
    }
  };

  const updateProfilePic = (file: File) => {
    const fileInput = document.querySelector('input[type=file]') as HTMLInputElement;
    var file: File;

    if (fileInput.files && fileInput.files[0]) 
      file = fileInput.files[0];
    
    var reader = new FileReader();
    var baseString;
    reader.onloadend = () => {
      baseString = String(reader.result);
      setThumbnail(baseString);
    };
    reader.readAsDataURL(file);
    // setProfilePicture(baseString);
  };
  
  const onLike = useCallback((post: any) => {
    let bodyData = {
        userID: user.id,
        postID: post,
        token: jwt,
    }
    sendAPI('post', '/likes/createUserLike', bodyData)
    .then((res) => {
        setLiked((l: any[]) => [... l,res.data])
    })
    .catch((err) => {
        console.log(err.data)
    })
  },[])



  const onRemove = useCallback((post: any) => {
      let bodyData = {
          userID: user.id,
          postID: post,
          token: jwt,
      }
      sendAPI('delete', '/likes/removeUserLike', bodyData)
      .then((res) => {
          setLiked((l: any[]) => l.filter((p) => p.postID !== post))})
      .catch((err) => {
          console.log(err.data)
      })

  },[])

  return (
    <>
      <div>
        <h1>Search</h1>
      </div>

      <div className="searchMainBody">
        <div className="Header">
          <input
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button className="buttonStyle" onClick={searchFuntion}>
            Search
          </Button>
          <p className="searchHeaderText">Search results</p>
          <hr />
        </div>
        <div className="searchBody">

          {parse(html, {htmlparser2: {
            lowerCaseTags: false,
            lowerCaseAttributeNames: false
          }})}
          
        </div>
      </div>
    </>
  );
};
export default SearchPage;
