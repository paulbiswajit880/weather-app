import React, { useEffect, useState } from 'react'



export default function Index() {
    const [city, setCity] = useState(null)
    const [searchcity, setSearchcity] = useState('Kendrapara')
    const [ico,setIco]=useState('sunny')
    // // console.log(city.temp);
    // if(city.temp>=305){setIcon('sunny')}
    // else if(city.temp>=25){setIcon('partly_cloudy_day')}
    // else{setIcon("ac_unit")}



    useEffect(() => {
        const fechApi = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchcity}&appid=c5607728469a54acb3f94c6f650c5b2b`
            const response = await fetch(url);
            const resJson = await response.json()
            setIco(resJson.weather)
            console.log(resJson.weather);
            setCity(resJson.main)


        }
        fechApi()
    },[searchcity]);
    return (
        <><div className="search">
        <input type="text" placeholder='Search for your city here' onChange={(event) => { setSearchcity(event.target.value) }} />
    </div>
            
            {!city ? (<div className="card">
            
                
                <div id="temp" className="temp">0°C</div>
                <div id="temp-f" className="temp-f">Feels like 0°C</div>


                <div id="place" className="place">{searchcity.toUpperCase()}</div>

                <div className="minmax">
                    <span className="mtemp">0°C MIN </span><span className="mtemp"> 0°C MAX</span>
                </div>
                
            </div>) :
                (<div className="card">
                {ico.map((e,id)=>{
                    return(<><div className="icon"><img key={id} src={`http://openweathermap.org/img/w/${e.icon}.png`} alt="" /></div>
                    </>)
                })}
                    
                    <div id="temp" className="temp">{Math.ceil(((city.temp) - 273.15))}°C</div>
                    <div id="temp-f" className="temp-f">Feels like {Math.floor(((city.feels_like) - 273.15))}°C</div>


                    <div id="place" className="place">{searchcity.toUpperCase()}</div>

                    <div className="minmax">
                        <span className="mtemp">{Math.floor(((city.temp_min) - 273.15))}°C MIN </span>
                        <span className="mtemp"> {Math.ceil(((city.temp_max) - 273.15))}°C MAX</span>

                    </div>
                    
                </div>)}




        </>
    )
}