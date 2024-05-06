
export default function DetailsCard({ label, value, unit, classname }) {
    return (
        <article className={`flex-1 ${classname} flex-cntr-all flex-col rounded-lg bg-gray-200 dark:bg-gray-800`}>
            <label htmlFor="detailsCard" className="text-sm font-semibold uppercase flex gap-1 text-gray-600 dark:text-gray-400">{label}</label>
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">{value}{unit}</span>
        </article>
    )
}
