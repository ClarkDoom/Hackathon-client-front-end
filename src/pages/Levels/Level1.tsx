import { useEffect, useState, MouseEvent } from "react";
import { NavLink } from "react-router-dom";
import { User } from "../../types/models";
import "./Levels.css";
import { useLocation } from "react-router";
import * as progressService from '../../Services/progressService'

import Rocket from "./Rocket";
interface LevelProps {
    // user: User | null;
}

const Level1 = (props: LevelProps): JSX.Element => {
    // const { user } = props;
    const [completed, setCompleted] = useState(0);
    const [rocketBox, setRocketBox] = useState(["", "", "", "", ""]);
    const [buttons, setButtons] = useState({
        "1": false,
        "2": false,
        "3": false,
        "4": false,
        "5": false,
    });
    const numOrd = [3, 1, 5, 2, 4];
    const [active, setActive] = useState("");
    const [wrong, setWrong] = useState("");

    const handleButton = (e: any) => {
        setActive(e.target.value);
    };
    const handleRocketBox = (e: any) => {
        const boxIdx: any = e.target.id[2];
        if (boxIdx == active) {
            let newButtons = { ...buttons };
            newButtons[boxIdx] = true;
            setButtons(newButtons);
            let newBox = [...rocketBox];
            newBox[boxIdx - 1] = active;
            setRocketBox(newBox);
            setActive("");
            setCompleted(completed + 1);
        } else {
            setWrong(boxIdx);
            setTimeout(() => {
                setWrong("");
            }, 1000);
        }
    };
    useEffect(() => {
        if (completed == 5) {
            // FETCH TO CREATE THE LEVEL COMPLETED ?
            progressService.updateProgress( {levelCompleted: true}, progressRecord.id)
        }
    }, [completed]);

    // brandon workspace
    const location = useLocation()
    const progressRecord = location.state.progressRecord
    console.log(progressRecord)

    if (completed == 5) {
        return (
            <div
                className={
                    "flex font-nunito flex-col justify-start items-center sm:justify-center pt-12 md:pt-0 h-[100vh] w-full gap-1 success-screen"
                }
            >
                <div className="text-3xl h-16 text-white">Stellar Work!</div>

                {/* Rocket Holder */}
                <div
                    className={
                        "relative w-full h-[24rem] flex flex-col items-center justify-center animate-bounce"
                    }
                >
                    <Rocket />
                </div>
                {/* Button Options */}
                <div className="flex gap-6 flex-col justify-center">
                    <NavLink to="/completed">
                        <button className="h-12 w-64 rounded rounded-[1rem] text-xl text-white bg-beyondBlue my-2">
                            Continue
                        </button>
                    </NavLink>
                </div>
            </div>
        );
    } else {
        return (
            <div
                className={
                    "flex font-nunito flex-col justify-start items-center sm:justify-center pt-12 md:pt-0 h-[100vh] w-full gap-1 "
                }
            >
                <NavLink to="/worlds">
                    <div className="absolute top-0 left-0 p-6 ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="currentColor"
                            className="w-10 h-10"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                </NavLink>

                {/* Rocket Holder */}
                <div
                    className={
                        "relative w-full h-[24rem] flex flex-col items-center justify-center "
                    }
                >
                    <Rocket />
                    <div className="flex flex-col-reverse items-center justify-center z-10 absolute top gap-5 font-bolder">
                        {rocketBox.map((e, i) => {
                            if (buttons[i + 1] == false) {
                                return (
                                    <button
                                        onClick={handleRocketBox}
                                        value={rocketBox[i]}
                                        id={"id" + (i + 1)}
                                        key={i}
                                        className={
                                            "padding-1 border-black rounded border-2 h-10 w-10 " +
                                            (wrong == i + 1
                                                ? " bg-red-200 animate-bounce "
                                                : " bg-white ")
                                        }
                                    >
                                        {" "}
                                        {rocketBox[i]}
                                    </button>
                                );
                            } else {
                                return (
                                    <div
                                        id={"id" + (i + 1)}
                                        key={i}
                                        className="padding-1 border-black rounded border-2 h-10 w-10 bg-green-200 flex justify-center items-center"
                                    >
                                        {" "}
                                        {rocketBox[i]}
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
                {/* Button Options */}
                <div className="flex gap-6 flex-col justify-center">
                    <>
                        <div className="px-10  text-center">
                            {" "}
                            Place the numbers in order from smallest to largest
                            to build your rocket!
                        </div>
                        <div className="flex gap-3 justify-center">
                            {numOrd.map((number, i) => {
                                if (!buttons[number]) {
                                    return (
                                        <button
                                            onClick={handleButton}
                                            className={
                                                "rounded rounded h-14 w-10 text-xl font-bolder " +
                                                (buttons[number]
                                                    ? "bg-gray-300 "
                                                    : "bg-gray-100 ") +
                                                (active == number &&
                                                    " border-black border-2")
                                            }
                                            value={number}
                                            key={i}
                                        >
                                            {number}
                                        </button>
                                    );
                                } else {
                                    return (
                                        <div
                                            className="rounded rounded h-14 w-10 text-xl bg-gray-300 flex justify-center items-center font-bolder"
                                            key={i}
                                        >
                                            {number}
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </>
                </div>
            </div>
        );
    }
};
export default Level1;