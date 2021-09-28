import { duration } from '@material-ui/core';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { useContext } from 'react';
import { HomeContext } from '../context/HomeContext';
import { musicas } from '../dados/musicas';
import styles from '../styles/Home.module.css';
import { timeTostring} from '../utils/Time';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
export default function Home() {
  const{
    isPlaying,
    musicas,
    playpause,
    musicIdx,
    configMusic,
    duration,
    currentTime,
    volume,
    configvolume,
    configTime
  } = useContext (HomeContext); 
     
  return (
    <div className={styles.container}>
        <h1>BEM VINDO A NOSSA RADIO WEB DEIXE SEU LIKE <ThumbUpIcon/> </h1>
       <div className ={styles.header}>
         <div className ={styles.headerImage}>
           <img src={`Capas/${musicas[musicIdx].capa}`} />
           {isPlaying ?
           (<button onClick ={playpause}><PauseCircleOutlineIcon className = {styles.play}/></button>):
           (<button onClick ={playpause}><PlayCircleOutlineIcon className = {styles.play}/></button>)
           }
           <div className = {styles.control}>
               <input 
                 className ={styles.timecontrol}
                type="range"
                 min="0"
                 max = {duration} 
                value = {currentTime}
                onChange = {(e) => configTime(Number(e.target.value))}
                />
                <div className ={styles.time}>
               <span> {timeTostring(currentTime)}</span>  
               <span> {timeTostring(duration)}</span>
               </div>
                 <div>
                   <input 
                   type="range" 
                   min = "0" 
                   max = "1"
                   step = "0.01"
                   value ={volume}
                   onChange = {(e) => configvolume(Number(e.target.value))}/>
                 </div>
           </div>
           </div>
           <div className = {styles.perfil}>
              <div className = {styles.perfilDetails}>
                   <div className ={styles.perfilphoto}>
                         <div className = {styles.IconContainer}>
                     <CloudUploadIcon className = {styles.perfilIcon}/>
                       </div>
                      <img src="perfil/perfil1.png"  />
                      <div className ={styles.perfilphoto}>
                         <div className = {styles.IconContainer}>
                     <FavoriteIcon className = {styles.perfilIcon}/>
                       </div>
                       </div>
                   </div>
                   <h1> FELIPE SANTANA</h1>
                   <h2>ENGENHEIRO CIVIL</h2>
                   </div>
           </div>
           </div>
           <div className ={styles.content}>
             <h1 className = {styles.Destacada}>MAIS TOCADAS</h1>
             <div className ={styles.musiclist}>
             {
               musicas.map((music, Idx)=>{
                 return(
                  <div onClick={()=> configMusic(Idx)} key={music.audio} className={styles.musicItem}>
                  <img src={`Capas/${music.capa}`} />
                    <div className ={styles.musicDetails}>                
                   <h1>{music.nome}</h1> 
                   </div>   
                </div>
                 )
               })
              }
            </div>
           </div>
           </div>
         )
        }
