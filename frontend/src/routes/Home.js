import React, { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {useState} from "react";
import apiRequest from "../components/apiRequest";
import "./Home.css"

const keyword_extractor = require("keyword-extractor");

function Home() {
    const [voiceState,setVoiceState] = useState(0);
    const [transcriptList,setTranscriptList] = useState('{"msg":[]}')

    const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
    const startListening = () => {
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true, language: 'en-US' })
    };
    const stopListening = () => {
        SpeechRecognition.stopListening();
        if(transcript.length > 0){
            var transcriptObj = JSON.parse(transcriptList)
            transcriptObj["msg"].push({transcript:transcript,user:true})
            setTranscriptList(JSON.stringify(transcriptObj))
            extractKeyword(transcript)
        }
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
                <div className="mainContentContainer">
                    <div className="main-content">
                        <div className="oldText">
                            {JSON.parse(transcriptList)["msg"].map((v,i)=>{
                                return <div className={(v["user"] === true ? "userMsgTranscript" : "botMsgTranscript")}
                                    key={i}>
                                    {v["transcript"]}
                                </div>
                            })}
                            {
                                voiceState === 0 ? <div/> :
                                <div className="currentTranscript">
                                    {transcript+" ..."}
                                </div>
                            }
                        </div>
                    </div>
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
                        <button onClick={()=>{resetListening(); setVoiceState(0)}}>Reset</button>
                    }
                </div>

            </div>
        </div>
    );
};

function extractKeyword(transcript){
    transcript = "parking spots please"
    transcript = transcript.toLowerCase();
    var opt = -1

    const keyWords = [
        {raw:["find me boba stores","bad day","rough day"],high:["store","shop","restaurant","hungry"],low:["find","where"]},
        {raw:["schedule"],high:[],low:[]},
        {raw:["take me home"],high:["home","work"],low:["take","get"]},
        {raw:["precondition the house","make the house"],high:["lights","heat"],low:["turn"]},
        {raw:["bad day","rough day"],high:["movies","shows"],low:["watch"]},
        {raw:["parking spots"],high:["grocery"],low:["car"]},
        {raw:["clap clap","turn off"],high:[""],low:["car"]},
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

function queryTTS(opt){
    const speech = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    speech.voice = voices[1]
    speech.lang = "en-US"
    speech.rate = 1
    var retStr = ""

    const queryVoice = function(text){
        retStr += text
        speech.text = text
        window.speechSynthesis.speak(speech); 
    }

    //prequery
    if(opt === -1){
        queryVoice("I did not understand you. Sorry.")
    }
    else if(opt === 0){
        queryVoice("I am finding stores for you to eat at.")
        apiRequest("http://localhost:8082/food").then((data)=>{
            queryVoice((data["code"] !== 0 ? "Here are the places I found. ":"")+data["msg"])
        })
    }
    else if(opt === 1){
        queryVoice("I will repeat your schedule")
        apiRequest("http://localhost:8082/calendar").then((data)=>{
            queryVoice((data["code"] !== 0 ? "Here is the result.":"")+data["msg"])
        })
    } 
    else if(opt === 2){
        queryVoice("I am calculating your route home")
        apiRequest("http://localhost:3081/location/findtime").then((data)=>{
            queryVoice("Here is the result.")
            queryVoice(data["msg"])
        })
    }
    else if(opt === 3){
        queryVoice("I will turn on appliances when you are about to get home.")
        apiRequest("http://localhost:8080/api/callrouting").then((data)=>{
            queryVoice("I have finished.")
        })
    }
    else if(opt === 4){
        queryVoice("Here are some movies to cheer you up")
        apiRequest("http://localhost:8080/api/tv").then((data)=>{
            queryVoice(data["msg"])
        })
    }
    else if(opt === 5){
        queryVoice("Here are some parking spots.")
        apiRequest("http://localhost:4001/location/findparkingspots").then((data)=>{
            queryVoice(data["msg"])
        })
    }
    else if(opt === 6){
        queryVoice("Here are some parking spots.")
        apiRequest("http://localhost:4001/location/findparkingspots").then((data)=>{
            queryVoice(data["msg"])
        })
    }
    return retStr;
}
export default Home;
