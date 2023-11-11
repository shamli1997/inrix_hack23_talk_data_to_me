import React from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import {useState} from "react";

function Home() {
  const [textToCopy, setTextToCopy] = useState();
  const [isCopied, setCopied] = useClipboard(textToCopy, {
      successDuration:1000
  });

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };
  const stopHandle = () => {
    SpeechRecognition.stopListening();
  };
  if (!browserSupportsSpeechRecognition) {
      return null
  }

  return (
      <>
          <div className="container">
              <h2>Title</h2>
              <br/>
              <br/>
              {/* <p>A React hook that converts speech from the microphone to text and makes it available to your React
                  components.</p> */}

              <div className="main-content" onClick={() =>  setTextToCopy(transcript)}>
                  {transcript}
              </div>

              <div className="btn-style">

                  {/* <button onClick={setCopied}>
                      {isCopied ? 'Copied!' : 'Copy to clipboard'}
                  </button> */}
                  <button onClick={handleReset}>Reset</button>
                  <button onClick={startListening}>Start Listening</button>
                  <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>

              </div>

          </div>

      </>
  );
};

export default Home;
