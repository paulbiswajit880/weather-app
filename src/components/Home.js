import React, { useEffect, useState } from 'react'



export default function Index() {
    const [city, setCity] = useState(null)
    const [searchcity, setSearchcity] = useState('Kendrapara')
    const [ico, setIco] = useState('sunny')
    useEffect(() => {
        const fechApi = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchcity}&appid=c5607728469a54acb3f94c6f650c5b2b&units=metric`
            const response = await fetch(url);
            const resJson = await response.json()
            setIco(resJson.weather)
            setCity(resJson.main)
        }
        fechApi()
    }, [searchcity]);
    return (
        <><div className="search">
            <input type="text" placeholder='Search for your city here' onChange={(event) => { setSearchcity(event.target.value) }} />
        </div>

            {!city ? (<div className="card">
                <div id="temp" className="temp">0°C</div>
                <div id="temp-f" className="temp-f">Feels like 0°C</div>
                <div id="place" className="place">{searchcity.toUpperCase()}</div>
                <small>Check your search city</small>
            </div>) :
                (<div className="card">
                <div class="wave wave-1"></div>
        <div class="wave wave-2"></div>
        <div class="wave wave-3"></div>
                    {ico.map((e, id) => {
                        return (<><div className="round">
                            <div className="icon">
                                <img key={id} src={`http://openweathermap.org/img/w/${e.icon}.png`} alt="" />
                            </div>
                            <small className='des'>Mostly {e.main}</small>
                            <div id="temp" className="temp">{Math.floor(city.temp)}°C</div>
                        </div>
                        </>)
                    })}
                    <div id="temp-f" className="temp-f">Feels like {Math.floor(city.feels_like)}°C</div>
                    <div id="temp-f" className="temp-f">Humidity {city.humidity}%</div>
                    <div id="place" className="place">{searchcity.toUpperCase()}</div>
                    <div className="minmax">
                        <small className="mtemp">{Math.floor(city.temp_min-1)}°C MIN |</small>
                        <small className="mtemp">| {Math.ceil(city.temp_max+1)}°C MAX</small>
                    </div>
                </div>)}




        </>
    )
}
