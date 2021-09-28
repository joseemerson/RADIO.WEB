export  const timeTostring = (duration: number) => {
    const minutos = Math.trunc(duration / 60);
    const remaingSeconds = Math.trunc(duration % 60);
    return `${("0"+ minutos).slice(-2)}:${("0"+ remaingSeconds).slice(-2)}`

}