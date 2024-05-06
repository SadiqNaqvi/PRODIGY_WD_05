import sunIcon from "../Assets/sun.svg"
import moon from "../Assets/moon.svg"
import mist from "../Assets/mist.svg"
import clearSky from "../Assets/clearSky.svg"
import partiallyRain from "../Assets/partiallyRain.svg"
import cloudThunder from "../Assets/cloudAndThunder.svg"

export default function TodayTemp({ dayDetails }) {

    const handleIcon = () => {
        switch (dayDetails?.condition?.text?.toLowerCase()) {
            case "sunny":
                return sunIcon;
            case "mist":
                return mist;
            case "clear":
                return clearSky
            case "patchy rain nearby":
                return partiallyRain;
            case "thundery outbreaks in nearby":
                return cloudThunder;
            default: {
                if (dayDetails?.is_day) return sunIcon;
                else return moon;
            }
        }
    }


    return (
        <article className="w-full flex-cntr-around flex-col p-4 bg-gray-200 dark:bg-gray-800 rounded-lg h-[70%]">
            <img src={handleIcon()} alt="" className="w-[55%]" />
            <p className="font-semibold text-gray-500 pt-3">{dayDetails?.condition?.text}</p>
            <p className="text-6xl -mb-3 text-gray-800 dark:text-gray-100 flex">
                {dayDetails?.temp_c}
                <span className="mb-auto text-4xl">°C</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400">{new Date().toDateString()}</p>
        </article>
    )
}
