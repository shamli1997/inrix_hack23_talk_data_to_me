import React from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
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
                        if(voiceState === 0){
                            startListening()
                        } else{
                            stopListening()
                        }
                        setVoiceState(voiceState ^ 1)
                    }}>
                        {voiceState === 0?"Start Listening":"Stop Listening" }
                    </button>
                    {
                        voiceState == 0 ? <div/>:
                        <button onClick={()=>{resetListening()}}>Reset</button>
                    }
                </div>

            </div>
        </div>
    );
};

function extractKeyword(transcript){
    transcript = transcript.toLowerCase();
    transcript = "hello there i am trying to find a place to eat. Where is the nearest boba shot"

    var opt = -1
    const keyWords = [
        ["find","where"],
        ["take","home","work"],
        ["turn"]
    ]
    for(let i = 0; i < keyWords.length; i++){
        
    }

    console.log(transcript)
    const extraction_result = keyword_extractor.extract(transcript,{
        language:"english",
        remove_digits: true,
        return_changed_case:true,
        remove_duplicates: false
    });
    console.log(extraction_result)
}
/*

*/

export default Home;
