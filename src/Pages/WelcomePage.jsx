import appLogo from "../Assets/appLogo.png"
import { useNavigate } from "react-router-dom"

export default function WelcomePage() {

    const navigate = useNavigate();
    return (
        <div className="flex h-full w-full">
            <section id="left" className="h-full w-[50%] flex-cntr-all">
                <div className="h-[80%] w-[80%] bg-gray-800 flex-cntr-all rounded-lg">
                    <img src={appLogo} alt="" className="w-[60%]" />
                </div>
            </section>
            <section id="right" className="flex-cntr-all flex-col w-[50%] h-full">
                <h1 className="text-5xl">Breeze</h1>
                <p className="my-4 text-gray-500">A Simple Weather App</p>
                <button className=" mt-10 py-2 px-4 rounded-full bg-blue-400" onClick={() => navigate("/home")}>Get Started</button>
            </section>
        </div>
    )
}
