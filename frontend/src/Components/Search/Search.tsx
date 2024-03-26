import React, { useState, useEffect, useCallback, ReactPropTypes } from "react";
import parse from 'html-react-parser';
import { Component } from "react";

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

import { userJWT, userModeState } from "../../JWT";
import sendAPI from "../../SendAPI";
import TrackCard from "../TrackCard/TrackCard";
import { render } from "@testing-library/react";

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

  //const TrackCard = React.lazy(() => import('../TrackCard/TrackCard'));

  const [html, setHtml] = useState('<TrackCard cardType="Search" input="' + query + '"} />');

  const [liked, setLiked] = useState([]) as any;

  useEffect(() => {
    // console.log("request");
    if (!title) {
      sendAPI("get", "/tracks/getAllTracks").then((res) => {
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
  }, [query]);

  function showAdd(event: any) {
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
    // console.log(query);
    // let parentDiv = document.getElementsByClassName("searchBody")


  //   <Suspense fallback={<h1>Still Loading…</h1>}>
  //   <TrackCard cardType={'Search'} input={query} />
  // </Suspense>


  }

  function createPlaylist() {
      if(user) {
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
  }

  function addToPlaylist(prop: any) {
    const bodyData = {
      postID: currentSelectPost,
      playlistID: prop.id,
      token: jwt,
    };
    // console.log(bodyData);
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
    if(user) {
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
          console.error(err.data)
      })
    }
  },[])



  const onRemove = useCallback((post: any) => {
      if(user) {
        let bodyData = {
          userID: user.id,
          postID: post,
          token: jwt,
        }
        sendAPI('delete', '/likes/removeUserLike', bodyData)
        .then((res) => {
            setLiked((l: any[]) => l.filter((p) => p.postID !== post))})
        .catch((err) => {
            console.error(err.data)
        })
      }

  },[])

  // useEffect(() => {
  //   let elem = document.getElementsByClassName("searchBody");

  // },[query]);

  return (
    <>
      <div className="searchMainBody">
        <div className="searchbar-header-div">
          <h2 id="searchTitle">Searching for a Track?</h2>


          <div className="search">
           <FontAwesomeIcon color="black" icon={["fas", "search"]} />
            <input
              type="search"
              id="searchbar"
              placeholder="Search"
              className="search-input"
              aria-label="Search"
              onChange={(e) => setQuery(e.target.value)}
            />
            {/* <Button className="buttonStyle" onClick={searchFuntion}>
              Search
            </Button> */}
          </div>



        </div>
        <hr />
        <h6 className="searchResultsText">Track Results</h6>
        <div className="searchBody">
          <TrackCard cardType={'Search'} input={query}/>
        </div>
      </div>
    </>
  );
};
export default SearchPage;
