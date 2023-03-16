import React from 'react'
import solarsystem from './solarsystem.png'
import star from './Star.png'
import moon from './Moon.png'
import './world.css'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


import * as progressService from '../Services/progressService'

import { User, Profile, Progress } from './../types/models'
interface WorldsProps {
  user: User | null;
  profile: Profile
}

const Worlds = (props: WorldsProps): JSX.Element => {
  const { user, profile } = props
  const navigate = useNavigate()

  const [progress, setProgress] = useState<Progress>({
    profile: 0,
    //! need to be able to add level and world id to this form
    level: 0,
    world: 0,
    levelCompleted: false,
    //! i'm not sure what is supposed to be in exercisesComplete
    // exercisesComplete: "",
  })

  //! once start button is implemented we'll set an onClick for that element to trigger the below function
  const handleLevelStart = async (evt:any): Promise<void> => {
    evt.preventDefault()
    try {
      function handleSet(evt:any){
        setProgress({
          profile: user!.profile.id,
          level: evt.target.id,
          world: evt.target.id,
          levelCompleted: false,
        })
      }
      console.log("progress within handleLevelStart", progress)
      const progressRecord = await progressService.createProgress(progress)
      navigate('/level1',  { state: { progressRecord: progressRecord } })
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <>
      <div onClick={(e) => console.log('hi')} className='bg-transparent w-4 h-4 absolute scale-[7.5] left-[15.49rem] top-[5rem] rounded-xl z-10 cursor-pointer'></div>
      <div onClick={(e) => console.log('hi')} className='bg-transparent w-4 h-4 z-10 top-[13rem] scale-[5] left-[10rem] rounded-xl absolute'></div>
      <div onClick={(e) => console.log('hi')} className='bg-transparent w-4 h-4 z-10 top-[18rem] scale-[6] left-[21rem] rounded-xl absolute'></div>
      <div onClick={(e) => console.log('hi')} className='bg-transparent w-4 h-4 z-10 top-[27rem] scale-[7.2] left-[17.3rem] rounded-xl absolute'></div>
      <div onClick={(e) => console.log('hi')} className='bg-transparent w-4 h-4 z-10 top-[33rem] scale-[5] left-[9.3rem] rounded-xl absolute'></div>
      {/* first world div */}
      <div onClick={handleLevelStart} className='bg-transparent w-4 h-4 z-10 top-[42rem] left-[4.5rem] scale-[5] rounded-xl absolute' id="1" ></div>
      <div onClick={handleLevelStart} className='w-screen h-screen flex overflow-clip' id="world">
        <div className='flex fixed w-screen justify-between p-5 top-1'>
          <div className="bg-gray-800 flex gap-1 rounded-xl w-16 p-1">
            <img src={star} />
            <p className='text-white font-bold font-nunito '>mm</p>
          </div>
          <div className="bg-gray-800 flex gap-1 rounded-xl w-16 p-1">
            <img src={moon} />
            <p className='text-white font-bold font-nunito'>no</p>
          </div>
        </div>
        <img src={solarsystem} className="scale-[1.5] translate-y-[-50px] my-auto" alt="" />
      </div>
    </>
  )
}

export default Worlds