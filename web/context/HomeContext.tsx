import React, { createContext, ReactNode, useEffect, useState } from "react";
import {musicas} from '../dados/musicas';

type music = {
   nome: string,
   audio: string,
   capa: string
}

type HomeContextData = {
   audio: HTMLAudioElement;
   isPlaying: boolean;
   musicas: music[],
   musicIdx: number;
   duration: number;
   currentTime: number;
   volume: number;
   playpause: () => void;
   configMusic: (Idx: number) => void;
   configTime:  (time: number) => void;
   configvolume:(volume:number)=> void;
}


type HomeContextProviderProps = {
    children: ReactNode;
}

export const HomeContext = createContext({} as HomeContextData);
const HomeContextProvider = ({children}:HomeContextProviderProps) => {
    const[audio, setAudio] = useState<HTMLAudioElement>();
    const [isPlaying, setisPlaying] = useState(false);
    const [musicIdx, setMusicIdX] = useState (0);
    const [duration, setduration] = useState (0);
    const [currentTime, setcurrentTime] = useState (0);
    const [volume, setvolume] = useState(0);
    useEffect(() =>{
       const initialAudio = new  Audio(`/Audio/${musicas[musicIdx].audio}`);
       setAudio (initialAudio);
    }, []);

    useEffect(() =>{
       if(audio){
          if(isPlaying){
             audio.play();
          }
         audio.onloadedmetadata = () => {
            setduration(audio.duration);
         }

         audio.ontimeupdate = () => {
            setcurrentTime(audio.currentTime);
         }

          audio.onended = () => configMusic((musicIdx + 1) % musicas.length);
          
       }
    },[audio]);

    const playpause = () => {
        if(isPlaying){
           audio.pause();
           setisPlaying(false);
        }
        else{
           audio.play();
           setisPlaying(true);
        }
    }
   
   const configMusic = (Idx: number) => {
        setMusicIdX(Idx);

        audio.pause();
        const novoAudio = new Audio(`Audio/${musicas[Idx].audio}`)
        setAudio(novoAudio);
        setcurrentTime(0);
   }

  const configTime = (time: number) => {
     audio.currentTime = time;
     setcurrentTime(time);
   }
   const configvolume = (volume: number) => {
      audio.volume = volume;
      setvolume (volume);
   }

    return(
        <HomeContext.Provider value ={
           {
             audio,
             isPlaying,
             musicas,
             musicIdx,
             playpause,
             configMusic,
             duration,
             currentTime,
             configTime,
             volume,
             configvolume
           }
           
        }>
            {children}
         </HomeContext.Provider>   
    );
    
}

export default   HomeContextProvider;