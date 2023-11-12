import React from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {useState} from "react";
import "./Home.css"

const keyword_extractor = require("keyword-extractor");

function Home() {
    const [voiceState,setVoiceState] = useState(0);

    const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
    const startListening = () => {
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true, language: 'en-IN' })
    };
    const stopListening = () => {
        SpeechRecognition.stopListening();
        extractKeyword(transcript)
    };
    const resetListening = () => {
        SpeechRecognition.stopListening();
        resetTranscript();
    }
    if (!browserSupportsSpeechRecognition) {
        return null
    }

  return (
      <div>
          <div className="container">
              <h2 className="page-title">Talk Data to Me</h2>
              <br/>
              <br/>
                <div className="main-content">
                    {transcript}
                </div>

                <div className="btn-style">
                    <button onClick={()=>{
                        if(voiceState === 0) startListening()
                        else stopListening()
                        setVoiceState(voiceState ^ 1)
                    }}>
                        {voiceState === 0?"Start Listening":"Stop Listening" }
                    </button>
                    {
                        voiceState === 0 ? <div/>:
                        <button onClick={()=>{resetListening()}}>Reset</button>
                    }
                </div>

            </div>
        </div>
    );
};

function extractKeyword(transcript){
    transcript = "can you make the house"
    transcript = transcript.toLowerCase();
    var opt = -1

    const keyWords = [
        {raw:["find me boba stores"],high:["store","shop","restaurant"],low:["find","where"]},
        {raw:["schedule"],high:[],low:[]},
        {raw:["take me home"],high:["home","work"],low:["take","get"]},
        {raw:["precondition the house","make the house"],high:["lights","heat"],low:["turn"]},
    ]
    for(let i = 0; i < keyWords.length; i++){
        keyWords[i]["raw"].forEach(phrase => {
            if(transcript.search(phrase) !== -1) opt = i;
        });
    }
    const extraction_result = keyword_extractor.extract(transcript,{
        language:"english",
        remove_digits: true,
        return_changed_case:true,
        remove_duplicates: false
    });
    console.log(extraction_result)

    for(let certainty of ["high","low"]){
        if(opt !== -1) break;
        for(let i = 0; i < keyWords.length; i++){
            keyWords[i][certainty].forEach(phrase => {
                if(transcript.search(phrase) !== -1) opt = i;
            });
            if(opt !== -1) break;
        }
    } 
    queryTTS(opt,extraction_result)
}

function queryTTS(opt,parameters){
    const speech = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    speech.voice = voices[1]
    speech.lang = "en-US"
    speech.rate = 1

    const queryVoice = function(text){
        speech.text = text
        window.speechSynthesis.speak(speech); 
    }
    console.log("ok")

    //prequery
    if(opt === -1){
        queryVoice("I did not understand you. Sorry.")
    }
    else if(opt === 0){
        queryVoice("I am finding stores for you to eat at.")
        //insert function to turn on routing.
        queryVoice("Here is the result.")
    }
    else if(opt === 1){
        queryVoice("I will repeat your schedule")
        //insert function to scheduling.
        queryVoice("Here is the result.")
    } 
    else if(opt === 2){
        queryVoice("I am calculating your route home")
        //insert function to turn on routing. get routing and update the result string.
        queryVoice("Here is the result.")
    }
    else if(opt === 3){
        queryVoice("I will turn on appliances when you are about to get home.")
        //insert command to run for turning on appliances
        queryVoice("I have finished.")
    }
}
export default Home;
