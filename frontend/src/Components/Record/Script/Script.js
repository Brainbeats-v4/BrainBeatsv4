import React from 'react'


const Script = () => {



    return (
        <div className="scriptBox">
            {stage == 0 && (
                <>
                  <div>
                    <div className="row">
                      <p className="textHeader">Music Settings</p>
                    </div>
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Basic Settings
                                
                        </Accordion.Header>
                        <Accordion.Body>
                            <div>
                            <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderBasicTips}>
                                <button style={{display: 'flex', border: 'none', background: 'none', justifyContent: 'left'}}><FaQuestion /></button>
                            </OverlayTrigger>
                            </div>
                            <div>
                                <input type="radio"  onChange={setToSlow} className='defaultRadio' name='tempo' value='slow' /> <label>Slow and Melodic</label>
                                <input type="radio" onChange={setToMed} className='defaultRadio' name='tempo' value='normal' /><label>Moderate and Timely</label> 
                                <input type="radio" onChange={setToQuick} className='defaultRadio' name='tempo' value='normal' checked/><label>Quick and Lively</label> 
                                <input type="radio" onChange={setToFast} className='defaultRadio' name='tempo' value='fast'/> <label>Fast and Frenzy</label>
                              </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>Advanced Settings</Accordion.Header>
                        <Accordion.Body>
                            <div>
                            <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderAdvanceTip}>
                                <button style={{display: 'flex', border: 'none', background: 'none', justifyContent: 'left'}}><FaQuestion /></button>
                            </OverlayTrigger>
                            </div>
                          <div className="row">
                            <div className="col">
                              <div>FP1 Instrument</div>
                              <select className='advanceInputBoxes' onChange={(e) => setFP1Inst(e.target.value)} value={FP1}>
                                <option value={-3}>SineWave</option>
                                <option value={-2}>TriangleWave</option>
                                <option value={-1}>SquareWave</option>
                                <option value={0}>Flute</option>
                                <option value={1}>Oboe</option>
                                <option value={2}>Clarinet</option>
                                <option value={3}>Bassoon</option>
                                <option value={4}>Trumpet</option>
                                <option value={5}>FrenchHorn</option>
                                <option value={6}>Trombone</option>
                                <option value={7}>Tuba</option>
                              </select>
                              <div>FP2 Instrument</div>
                              <select className='advanceInputBoxes' onChange={(e) => setFP2Inst(e.target.value)} value={FP2}>
                                <option value={-3}>SineWave</option>
                                <option value={-2}>TriangleWave</option>
                                <option value={-1}>SquareWave</option>
                                <option value={0}>Flute</option>
                                <option value={1}>Oboe</option>
                                <option value={2}>Clarinet</option>
                                <option value={3}>Bassoon</option>
                                <option value={4}>Trumpet</option>
                                <option value={5}>FrenchHorn</option>
                                <option value={6}>Trombone</option>
                                <option value={7}>Tuba</option>
                              </select>
                              <div>C3 Instrument</div>
                              <select className='advanceInputBoxes' onChange={(e) => setC3Inst(e.target.value)} value={C3}>
                                <option value={-3}>SineWave</option>
                                <option value={-2}>TriangleWave</option>
                                <option value={-1}>SquareWave</option>
                                <option value={0}>Flute</option>
                                <option value={1}>Oboe</option>
                                <option value={2}>Clarinet</option>
                                <option value={3}>Bassoon</option>
                                <option value={4}>Trumpet</option>
                                <option value={5}>FrenchHorn</option>
                                <option value={6}>Trombone</option>
                                <option value={7}>Tuba</option>
                              </select>
                              <div>C4 Instrument</div>
                              <select className='advanceInputBoxes' onChange={(e) => setC4Inst(e.target.value)} value={C4}>
                                <option value={-3}>SineWave</option>
                                <option value={-2}>TriangleWave</option>
                                <option value={-1}>SquareWave</option>
                                <option value={0}>Flute</option>
                                <option value={1}>Oboe</option>
                                <option value={2}>Clarinet</option>
                                <option value={3}>Bassoon</option>
                                <option value={4}>Trumpet</option>
                                <option value={5}>FrenchHorn</option>
                                <option value={6}>Trombone</option>
                                <option value={7}>Tuba</option>
                              </select>
                            </div>
                            <div className="col">
                              <div>FP1 Note Type</div>
                              <select className='advanceInputBoxes' onChange={(e) => setFP1Note(e.target.value)} value={FP1Note}>
                                <option value={0}>Whole</option>
                                <option value={1}>Half</option>
                                <option value={2}>Quarter</option>
                                <option value={3}>Eighth</option>
                                <option value={4}>Sixteenth</option>
                              </select>
                              <div>FP2 Note Type</div>
                              <select className='advanceInputBoxes' onChange={(e) => setFP2Note(e.target.value)} value={FP2Note}>
                                <option value={0}>Whole</option>
                                <option value={1}>Half</option>
                                <option value={2}>Quarter</option>
                                <option value={3}>Eighth</option>
                                <option value={4}>Sixteenth</option>
                              </select>
                              <div>C3 Note Type</div>
                              <select className='advanceInputBoxes' onChange={(e) => setC3Note(e.target.value)} value={C3Note}>
                                <option value={0}>Whole</option>
                                <option value={1}>Half</option>
                                <option value={2}>Quarter</option>
                                <option value={3}>Eighth</option>
                                <option value={4}>Sixteenth</option>
                              </select>
                              <div>C4 Note Type</div>
                              <select className='advanceInputBoxes' onChange={(e) => setC4Note(e.target.value)} value={C4Note}>
                                <option value={0}>Whole</option>
                                <option value={1}>Half</option>
                                <option value={2}>Quarter</option>
                                <option value={3}>Eighth</option>
                                <option value={4}>Sixteenth</option>
                              </select>
                            </div>
                            <div className="col">
                              <div>Number of Octaves</div>
                              <select className='advanceInputBoxes' onChange={(e) => setNumNotes(e.target.value * 7)} value={numNotes/7}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                              </select>
                              <div>Tempo</div>
                              <select className='advanceInputBoxes' onChange={(e) => setBPM(BPMArray[e.target.value])} value={BPM}>
                                {BPMArray.map((item, index) => {
                                  return <option value={item} key={index}>{item}</option>;
                                })}
                              </select>
                              <div>Key Signature</div>
          
                              <select
                                onChange={(e) => setKey(e.target.value)}
                                value={keyNum}
                                className='advanceInputBoxes'
                              >
                                <option value={0}>C</option>
                                <option value={1}>C#/Db</option>
                                <option value={2}>D</option>
                                <option value={3}>D#/Eb</option>
                                <option value={4}>E</option>
                                <option value={5}>F</option>
                                <option value={6}>F#/Gb</option>
                                <option value={7}>G</option>
                                <option value={8}>G#/Ab</option>
                                <option value={9}>A</option>
                                <option value={10}>A#/Bb</option>
                                <option value={11}>B</option>
                              </select>
                              <div>Scale</div>
                              <select
                                onChange={(e) => setScale(e.target.value)}
                                value={scale}
                                className='advanceInputBoxes' 
                              >
                                <option value={0}>Major</option>
                                <option value={1}>Minor</option>
                              </select>
                            </div>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                      <button className="arrowButtonMain" onClick={goNext}>
                          Next {<FaAngleRight />}
                    </button>
                
              </>
            )}
            {stage == 1 && (
            <div>
                <div>
                <div>
                    <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderScriptTip}>
                        <button style={{display: 'flex', border: 'none', background: 'none', justifyContent: 'left'}}><FaQuestion /></button>
                    </OverlayTrigger>
                </div>
                <br />
                <div>
                <p className="textHeader">Script</p>
                </div>
                </div>
              
              <div>
                <input
                  className="InputForYoutube"
                  placeholder="YouTube Link"
                  onChange={(e) => setYoutubeLink(e.target.value)}
                />
                <p className="line">
                  <span className="wordInLine">OR</span>
                </p>
                <br />
                <input
                  className="inputForCard"
                  placeholder="YOUR TEXT HERE"
                  onChange={(e) => setCardTextState(e.target.value)}
                  style={{
                    color: `rgba(${textColor.color.r}, ${textColor.color.g}, ${textColor.color.b}, ${textColor.color.a})`,
                    background: `rgba(${backgroundColor.color.r}, ${backgroundColor.color.g}, ${backgroundColor.color.b}, ${backgroundColor.color.a})`,
                  }}
                  value={cardText}
                />
              </div>
              <br></br>
              <div className="row">
                <div className="col-sm-2">
                <p>Text Color</p>
                  <div>
                    <div
                      style={{
                        padding: "2px",
                        background: "#fff",
                        borderRadius: "1px",
                        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
                        display: "inline-block",
                        cursor: "pointer",
                      }}
                      onClick={openTextColor}
                    >
                        
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "2px",
                          background: `rgba(${textColor.color.r}, ${textColor.color.g}, ${textColor.color.b}, ${textColor.color.a})`,
                        }}
                      />
                    </div>
                    {textColor.displayColorPicker ? (
                      <div
                        style={{
                          position: "absolute",
                          zIndex: "2",
                          bottom: "50px",
                        }}
                      >
                        <div
                          style={{
                            position: "fixed",
                            top: "0px",
                            right: "0px",
                            bottom: "0px",
                            left: "0px",
                          }}
                          onClick={closeTextColor}
                        />
                        <SketchPicker
                          color={textColor.color}
                          onChange={setColorText}
                        />
                      </div>
                    ) : null}
                    <br />
                    
                  </div>
                </div>
                <div className="col-sm-2">
                  <div>
                  <p style={{position: 'relative', left: '0px'}}>Background Color</p>
                  
                    <div
                      style={{
                        padding: "2px",
                        background: "#fff",
                        borderRadius: "1px",
                        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
                        display: "inline-block",
                        cursor: "pointer",
                      }}
                      onClick={openBackgroundColor}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "2px",
                          background: `rgba(${backgroundColor.color.r}, ${backgroundColor.color.g}, ${backgroundColor.color.b}, ${backgroundColor.color.a})`,
                        }}
                      />
                    </div>
                    {backgroundColor.displayColorPicker ? (
                      <div
                        style={{
                          position: "absolute",
                          zIndex: "2",
                          bottom: "50px",
                        }}
                      >
                        <div
                          style={{
                            position: "fixed",
                            top: "0px",
                            right: "0px",
                            bottom: "0px",
                            left: "0px",
                          }}
                          onClick={closeBackgroundColor}
                        />
                        <SketchPicker
                          color={backgroundColor.color}
                          onChange={setColorBackground}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col">
                    <p>Card Duration</p>
                  <input
                    type="number"
                    placeholder="Seconds"
                    className="timeInput"
                    onChange={(e) => setSpeed(e.target.value)}
                    value={speed}
                  />
                </div>
    
                <div className="col">
                  <Button
                    style={{ width: "100px", float: "center", marginTop: '20px'}}
                    onClick={addCard}
                  >
                    Add
                  </Button>
                </div>
              </div>
              <button className="arrowButtonMain" onClick={goBack}>
                {<FaAngleLeft />} Script{" "}
              </button>
              <button className="arrowButtonMain" onClick={goNext} disabled={(cards.length === 0) ^ (youtubeLink !== '')}>
                Record {<FaAngleRight />}
              </button>
              <p className="line">
                <span className="wordInLine">OR</span>
              </p>
              <br />
              <Button
                style={{ width: "100px", marginTop: "10px" }}
                onClick={noScript}
              >
                SKIP
              </Button>
            </div>
          )}
            {//User does not want to script
            stage == 4 && (
                <>
                <div>
                    <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderRecordTip}>
                        <button style={{display: 'flex', border: 'none', background: 'none', justifyContent: 'left'}}><FaQuestion /></button>
                    </OverlayTrigger>
                </div>
                <h2>Record</h2>
                <img src={Img} className="scriptless"/>
                <Setting numNotes={numNotes} instrumentArr={instrumentList} noteDuration={noteDuration} scale={scale} keyNum={keyNum} BPM={BPM} setMIDIFile={setMIDIFile}/>
                <button className='arrowButtonMain' onClick={() => {setStage(1)}}>{<FaAngleLeft />} Script </button>
                <button className='arrowButtonMain' onClick={() => {setStage(3)}}>Publish {<FaAngleRight />}</button>
                </>
            )}
            {//This displays cards
            stage == 2 && youtubeLink === '' && (
                <>
                <div>
                    <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderRecordTip}>
                        <button style={{display: 'flex', border: 'none', background: 'none', justifyContent: 'left'}}><FaQuestion /></button>
                    </OverlayTrigger>
                </div>
                <div><h2>Record</h2></div>
                <div className='alignSlide'>
                    
                    <ValidScript slides={cards} setCurrentSlide={setCurrentSlide} autoplay={autoplay} currentSlide={currentSlide}/>
                </div>
                <Setting numNotes={numNotes} instrumentArr={instrumentList} noteDuration={noteDuration} scale={scale} keyNum={keyNum} BPM={BPM} setMIDIFile={setMIDIFile}/>
                <button className='arrowButtonMain' onClick={goBack}>{<FaAngleLeft />} Script </button>
                <button className='arrowButtonMain' onClick={goNext}>Publish {<FaAngleRight />}</button>
                
                </>
            )}
            {//This shows youtube
            stage == 2 && cards.length === 0 && (
                <>
                <div>
                    <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderRecordTip}>
                    <button style={{display: 'flex', border: 'none', background: 'none', justifyContent: 'left'}}><FaQuestion /></button>
                    </OverlayTrigger>
                </div>
                <h2>Record</h2>
                <VidLink link={youtubeLink} />
                <Setting numNotes={numNotes} instrumentArr={instrumentList} noteDuration={noteDuration} scale={scale} keyNum={keyNum} BPM={BPM} setMIDIFile={setMIDIFile}/>
                <button className='arrowButtonMain' onClick={goBack}>{<FaAngleLeft />} Script </button>
                <button className='arrowButtonMain' onClick={goNext}>Publish {<FaAngleRight />}</button>
                
                </>
            )}
            {stage == 3 && (
                <>
                <div>
                <div>
                    <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderPublishTip}>
                    <button style={{display: 'flex', border: 'none', background: 'none', justifyContent: 'left'}}><FaQuestion /></button>
                    </OverlayTrigger>
                </div>
                <div>
                    <h2>Publish</h2>
                </div>
                <div>
                    <img src={thumbnail} style = {{height: "400px", width: "400px"}} />
                    
                </div>
                <div> 
                    <label for="file-upload" className="custom-file-upload">
                        Upload Image (optional)
                    </label>
                </div>
                <div> <input type="text" className='titleInput' onChange={(e) => setTitle(e.target.value)}/></div>
                </div>
                <p>Post Title</p>
                <button onClick={generateMIDIURIAndDownloadFile} className="downloadMidiButton">Download</button>
                <button className='publishButton' onClick={postFile}>Publish</button>
                
                <br />
                <p>{msg}</p>
                <button className='arrowButtonMain' onClick={() => setStage(0)}>{<FaAngleLeft />} Record </button>
                
                </>
            )}
            </div>
        )
}