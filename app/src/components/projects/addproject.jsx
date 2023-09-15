import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProject } from '../Slices/ProjectSlice';
import { NavLink,useNavigate,useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { v4 as uuidv4 } from 'uuid';
import { updateUser } from '../Slices/UsersSlices';
export default function Addproject() {
 
  // const [newMember,setNewMember] = useState([])
  // const [newUser,setNewUser] = useState({})
  const dispatch = useDispatch()
  const [projectName,setProjectName] = useState("")
  const [projectColor,setProjectColor] = useState("")
  const [projectDetail,setProjectDetail] = useState("")
  const people = useSelector(state=>state.user)
  const {userId} = useParams()
  const navigate  = useNavigate()

  const getProjectName = (e)=>{
    
    setProjectName(e.target.value)
  }
  const getProjectColor = (e)=>{
    
    setProjectColor(e.target.value)
  }
  
  const getProjectDetails = (e)=>{
    
    setProjectDetail(e.target.value)
  }
  
  const newProjectData = ()=>{
    if( projectName != ""){
      const currentDate = new Date();
      let newMember = []
      let newUser = {}
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; 
      const day = currentDate.getDate();

      const newProject = {
        "id":uuidv4(),
        "name": projectName,
        "color": projectColor,
        "tasks": [
          
        ],
        "code":uuidv4(),
        "details":projectDetail,
        "date":day + "/" + month + "/" +year,
          "people":[],
          "author":userId,
      }
      people.map((item) => {
        if (item.id === userId) {
        newMember = [...item.projectsEnrolled,{id: newProject.id}  ]
        newUser = {
          ...item,
          projectsEnrolled: [...newMember], 
        }
        }
      });

      dispatch(addProject(newProject))
      dispatch(updateUser(newUser))
      navigate(`/${userId}`)
    }
    }
    
    useEffect(()=>{
      AOS.init();
    },[])
  return (
   <>
   <div data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration="500">

   <div>
    <NavLink to={`/${userId}`}><button className='border-[1px] text-text m-5 border-border rounded-md p-3 hover:brightness-200'>Back</button> </NavLink>
   </div>
   <div className='w-full mb-12'>
   <div className='bg-bg border-[1px] border-border w-full md:w-[50%] m-auto my-6 rounded-lg flex items-center justify-between'>
        <p className='p-5 text-[25px] font-semibold text-text'>Add <span className='text-[#f5f0cb]'>Project</span></p>
       </div>
      <div className='bg-bg md:w-[50%] m-auto text-[20px] border-[1px] p-5 border-border w-full rounded-lg text-text '>
        <label className='text-text font-bold my-6'>Project Name</label> <br/>
        <input onChange={(e)=>getProjectName(e)} type="text" placeholder='ex : Design' className='w-full my-5 bg-transparent border-[1px] p-2 border-[#cbcaca77] focus:outline-none rounded-lg'/>
        <hr  className='my-7 opacity-50'/>
        <label className='text-text font-bold my-6'>Specialization</label> <br/>
        <input onChange={(e)=>getProjectDetails(e)} type="text" placeholder='ex : UI/UX' className='w-full my-5 bg-transparent border-[1px] p-2 border-[#cbcaca77] focus:outline-none rounded-lg'/>
        <hr  className='my-7 opacity-50'/>
        <label className='text-text font-bold my-6 '>Select a Color</label> <br/>
        <select onChange={(e)=>getProjectColor(e)} name="" id="" className='p-3 rounded-lg my-6 bg-transparent border-red-50 border-[1px]' >
          <option className='bg-[#1a1b1d] text-white' value="#F4F3E6"> White </option>
          <option className='bg-[#1a1b1d] text-white' value="#CE897A"> Red </option>
          <option className='bg-[#1a1b1d] text-white' value="#FFCC14"> Orange </option>
          <option className='bg-[#1a1b1d] text-white' value="#00C87F"> Green </option>
          <option className='bg-[#1a1b1d] text-white' value="#F72A5A"> Pink </option>
        </select><br />
        <hr  className='my-7 opacity-50'/>
        <p>NOTE : <span>Use the code to invite friends</span></p>
        <button onClick={newProjectData} className='border-[1px] border-border rounded-md p-3 w-full hover:brightness-200'>Add Project</button>
        </div>
      </div>
    </div>
   </>
  );
}
