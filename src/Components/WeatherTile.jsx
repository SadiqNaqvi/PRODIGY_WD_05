export default function WeatherTile({ label, weather, temp }) {
    return (
        <li className='py-4 px-6 list-none border-b border-gray-300 dark:border-gray-700 last:border-b-0 flex-cntr-between'>
            <label htmlFor="WeatherTile" className='text-sm text-gray-500'>{label}</label>
            <span className="font-semibold text-center text-gray-700 dark:text-gray-300">{weather}</span>
            <span className='font-semibold text-gray-700 dark:text-gray-300'>{temp} °C</span>
        </li>
    )
}
