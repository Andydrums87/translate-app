import React, { useState } from "react";
import Sound from "../images/sound_max_fill.svg"
import Copy from "../images/Copy.svg"
import Exchange from "../images/Exchange.svg"
import Letter from "../images/Sort_alfa.svg"
import Logo from "../images/logo.svg"
import languages from "../languages";
import LanguageDetect from "languagedetect"


function Translator() {
    
    const [toLanguage, setToLanguage] = useState("fr")
    const [fromLanguage, setFromLanguage] = useState("en")
    const [fromInputText, setFromInputText] = useState('Hello, how are you')
    const [toInputText, setToInputText] = useState('Bonjour, comment vas-tu?')
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(0)
    const [active, setActive] = useState("zero")
    const [toActive, setToActive] = useState("zero")
    const [isPlaying, setIsPlaying] = useState(false)

    const countCharacters = (e) => {
        setCount(fromInputText.length)
        console.log(count)
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
    }

    const detectLanguage = () => {
        const langDetect = new LanguageDetect()
        langDetect.setLanguageType('iso2')
        const newLanguage = langDetect.detect(fromInputText, 20)
        const languageArr = newLanguage[0].slice(0, 1)
        const languageString = languageArr.toString()
        setFromLanguage(languageString)
      
    }

    const voiceResponse = ( text, language) => {
       
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang=(fromLanguage)
        synth.speak(utterance)
        utterance.onend = () => setIsPlaying(false)
        
    }

    const handleFromButton = (target, id) => {
        id === "French" ? setFromLanguage("fr") : setFromLanguage("en") 
    }

    const handleToButton = (target, id) => {
        id === "French" ? setToLanguage("fr") : setToLanguage("en") 
    }

    const handleSound = (target, id) => {
        id === "from" ? voiceResponse(fromInputText, fromLanguage) : voiceResponse(toInputText, toLanguage)
    }

    const handleCopy = (target, id) => {
       id === "copyFrom" ? copyText(fromInputText) : copyText(toInputText)
    }

    const handleExchange = () => {
        setFromInputText(toInputText)
        setToInputText(fromInputText)
        setToLanguage(fromLanguage)
        setFromLanguage(toLanguage)
    }

    const handleTranslate = async () => {
        if(!fromInputText.trim()) {
            setToInputText('')
            return 
        } 
        setLoading(true)
     const response = await fetch (
        
        `https://api.mymemory.translated.net/get?q=${fromInputText}&langpair=${fromLanguage}|${toLanguage}`
     )

     const data = await response.json()
     setToInputText(data.responseData.translatedText);
     setLoading(false)
    }

    // const handleTranslate = () => {
      
    //     setLoading(true);
    //     let url = `https://api.mymemory.translated.net/get?q=${fromInputText}&langpair=${fromLanguage}|${toLanguage}`;

    //     fetch(url)
    //     .then((res) => res.json())
    //     .then((data) => {
    //         setToInputText(data.responseData.translatedText);
    //         setLoading(false);
    //     });
    // };

   


   

    return (
      <div className="wrapper">
          <div className="fromText">
             <ul className="languages">
                <li><button className={`country__btn ${active === "first" ? "country__btn__active" : ""}`} onClick={(e) => {detectLanguage(); setActive("first")}} >Detect Language</button></li>
                <li><button id="1" value={fromLanguage} className={`country__btn ${active === "second" ? "country__btn__active" : ""}`} onClick={(e) => {handleFromButton(e.target, "English"); setActive("second")}}>English</button></li>
                <li><button id="2" value={fromLanguage} className={`country__btn ${active === "third" ? "country__btn__active" : ""}`}onClick={(e) => {handleFromButton(e.target, "French"); setActive("third")}} >French</button></li>
                <li>
                 <select value={fromLanguage} onChange={(e) => setFromLanguage(e.target.value)}className="dropdown__menu" id="from">
                   {Object.entries(languages).map(([code, name]) => (
                    <option key={code} value={code.slice(0, 2)}>
                    {name}
                   
                    </option>
                    ))}
                
                 </select>
                </li>
             </ul>
             <textarea value={fromInputText} name="from" id="from" placeholder="Enter text" onChange={(e) => {setFromInputText(e.target.value); countCharacters()}} maxLength="500"></textarea> 
             <p className="count">{count}/500</p>
             <div className="controls">
               <ul className="controls__list">
               <li id="from"onClick={(e) => {handleSound(e.target, "from"); setIsPlaying(true)}} ><img src={Sound} alt="" className="icon" style={{backgroundColor: isPlaying === true ? "white" : '' }} onend={(e) => setIsPlaying(false)} /></li>
                <li id="copyFrom" onClick={(e) => handleCopy(e.target, "copyFrom")}><img src={Copy} alt="" className="icon" /></li>
                </ul>
                <button onClick={handleTranslate} disabled={loading} className="translate"><img src={Letter} alt="" />{loading ? 'Translating...' : 'Translate'}</button>
              </div>
            </div>
            <div className="toText">
                <ul className="languages">
                    <li><button id="1" value={fromLanguage} className={`country__btn ${toActive === "fourth" ? "country__btn__active" : ""}`}  onClick={(e) => {handleToButton(e.target, "English"); setToActive("fourth")}} >English</button></li>
                    <li><button id="1" value={fromLanguage} className={`country__btn ${toActive === "fifth" ? "country__btn__active" : ""}`}  onClick={(e) => {handleToButton(e.target, "French"); setToActive("fifth")}}>French</button></li>
                    <li>
                    <select value={toLanguage} onChange={(e) => setToLanguage(e.target.value)}className="dropdown__menu">
                    <i class="fa-solid fa-chevron-down"></i>
                        {Object.entries(languages).map(([code, name]) => (
                        <option key={code} value={code.slice(0, 2)}>
                            {name}
                        </option>
                        ))}
                        
                    </select>
                    </li>
                  
                </ul>
                <img className="icon exchange" onClick={handleExchange} src={Exchange} alt="" /> 
                <textarea value={toInputText} name="to" id="to" readOnly></textarea>
              <div className="controls">
                  <ul className="controls__list">
                    <li id="to" onClick={(e) => {handleSound(e.target, "to"); setIsPlaying(true)}}  ><img style={{backgroundColor: isPlaying === true ? "white" : ""}}className="icon"src={Sound} alt="" /></li>
                    <li id="copyTo" onClick={(e) => handleCopy(e.target, "copyTo")}><img className="icon" src={Copy} alt="" /></li>
                   </ul>
               </div>
            </div>  
        </div>
        

    )
}

export default Translator;