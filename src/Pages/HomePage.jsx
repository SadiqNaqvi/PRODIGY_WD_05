import { useEffect, useState } from 'react'
import appLogo from "../Assets/appLogo.png"
import TodaysWeather from "../Components/TodaysWeather"
import DetailsCard from '../Components/DetailsCard'
import WeatherTile from '../Components/WeatherTile'

export default function HomePage({ location }) {
    const [totalData, setTotalData] = useState({});
    const [usingData, setUsingData] = useState([]);
    const [dayDetails, setDayDetails] = useState({});
    const [airQuality, setAirQuality] = useState(0);
    const [day, setDay] = useState("today");
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(true);

    const additionalData = [
        { name: "Feels like", value: "feelslike_c", ext: "°C" },
        { name: "temperature", value: "temp_f", ext: "°F" },
        { name: "humidity", value: "humidity", ext: " %" },
        { name: "Heat Index", value: "heatindex_c", ext: "°C" },
        { name: "wind", value: "wind_kph", ext: "km/h" },
        { name: "Wind Chill", value: "windchill_c", ext: "°C" },
        { name: "wind direction", value: "wind_dir", ext: "" },
        { name: "cloud", value: "cloud", ext: " %" },
        { name: "Dew Point", value: "dewpoint_c", ext: "°C" },
        { name: "Change of snow", value: "chance_of_snow", ext: " %" },
        { name: "Chance of Rain", value: "chance_of_rain", ext: " %" },
        { name: "Visibility", value: "vis_km", ext: " km" },
        { name: "pressure", value: "pressure_mb", ext: " mb" },
        { name: "uv index", value: "uv", ext: "" },
        { name: "air quality", value: "gb-defra-index", ext: " AQI" },
    ]

    useEffect(() => {
        if (!location) return;

        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&days=3&aqi=yes`)
            .then(res => res.json())
            .then(res => {
                setAirQuality(res.current.air_quality)
                setTotalData(res);
                changeUsingData(res, "today");
                setLoading(false)
            })
            .catch(err => console.log(err));
    }, [location]);

    const changeUsingData = (res, day) => {
        if (!res) return;

        const temp = res.forecast.forecastday;
        
        if (day === "today") {
            setUsingData(temp[0]);
            setDayDetails(temp[0]?.hour?.find(el => new Date().getHours() === new Date(el.time).getHours()));
        } else {
            setUsingData(temp[1]);
            setDayDetails(temp[1]?.hour?.find(el => new Date().getHours() === new Date(el.time).getHours()));
        }
    }

    const handleDayChange = (val) => {
        setDay(val);
        changeUsingData(totalData, val);

    }

    const handleDarkModeChange = () => {
        document.querySelector("html").style.colorScheme = isDarkMode ? "light" : "dark";
        setIsDarkMode(prev => !prev);

    }

    return (
        <>
            {loading ?
                <div className="h-full w-full flex-cntr-all">
                    <div className="lds-ring">
                        <span></span><span></span><span></span><span></span>
                    </div>
                </div>
                :
                <div className={`p-3 w-full h-full dark:bg-gray-900 bg-gray-100 ${isDarkMode ? 'dark' : ''}`}>

                    <header className='w-full h-[8%] flex-cntr-between px-2'>
                        <img src={appLogo} alt="" className='w-10' />

                        <div>
                            <button className={`mx-2 ${day === "today" ? "border-b-2" : ''} border-gray-700 dark:border-gray-300`} onClick={() => handleDayChange("today")}>Today</button>
                            <button className={`mx-2 ${day === "tmr" ? "border-b-2" : ''} border-gray-700 dark:border-gray-300`} onClick={() => handleDayChange("tmr")}>Tomorrow</button>
                        </div>

                        <button className='p-2 rounded-md bg-gray-200 dark:bg-gray-800' onClick={handleDarkModeChange}>
                            {isDarkMode ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-stars" viewBox="0 0 16 16">
                                    <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286" />
                                    <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
                                </svg>
                            }
                        </button>
                    </header>

                    <main className='h-[92%] w-full flex'>

                        <section id='left' className='m-2 w-[25%] h-full'>

                            <TodaysWeather dayDetails={dayDetails} />

                            <div className="mt-4 flex flex-col justify-between">
                                <div className=" mb-4 flex gap-2">
                                    <DetailsCard label="Sunrise" value={usingData?.astro?.sunrise} classname="py-2" />
                                    <DetailsCard label="Sunset" value={usingData?.astro?.sunset} classname="py-2" />
                                </div>
                                <p className='text-2xl uppercase text-center rounded-lg py-3 bg-gray-200 dark:bg-gray-800'>{location}</p>
                            </div>

                        </section>

                        <section id="middle" className='w-[30%] m-2 bg-gray-200 dark:bg-gray-800 rounded-lg flex flex-col'>
                            <label htmlFor="Hourly Forecast" className='text-xs text-gray-500 mt-6 ml-6 uppercase font-semibold'>today's forecast</label>
                            <ul className='flex flex-col flex-1 overflow-y-auto'>
                                {usingData?.hour?.map(doc => (
                                    <WeatherTile key={doc.time} label={doc.time?.split(" ")[1]} temp={doc.temp_c} weather={doc.condition.text} />
                                ))}
                            </ul>
                        </section>

                        <section id="right" className='w-[45%] flex gap-3 m-2 flex-wrap'>
                            {additionalData.map(el => (
                                <DetailsCard label={el.name} key={el.value} value={el.name.includes("air") ? airQuality[el.value] : dayDetails[el.value]} unit={el.ext} classname="basis-3/12" />
                            ))}
                        </section>
                    </main>
                </div>
            }
        </>
    )
}
