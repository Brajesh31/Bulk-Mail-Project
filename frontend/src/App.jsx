import { useState } from 'react'
import axios from 'axios'
import * as XLSL from "xlsx"

const baseURL=import.meta.env.VITE_APP_BASE_URL||"http://localhost:3000"

function App() {
  const [msg,setmsg]=useState("")
  const [btnmsg,setbtnmsg]=useState()
  const [bulkEmail,setemail]=useState([])

  function handlefile(e)
  {
     const file=e.target.files[0]
     const read=new FileReader()
      read.onload=function(e){
        const data=e.target.result
         const workbook=XLSL.read(data,{type:"binary"})
          const emaillist=XLSL.utils.sheet_to_json(workbook.Sheets.Sheet1,{header:"A"})
          console.log(emaillist)
            const totalEmail=emaillist.map(function(item){return item.A})
              setemail(totalEmail)
      }
     read.readAsBinaryString(file)
  }

  function send(){
     setbtnmsg(true)
     console.log(baseURL)
     axios.post(`${baseURL}/sendmail`,{msg:msg,bulkEmail:bulkEmail}).then(function(data){
      console.log(data.data)
     
      if(data.data==true)

      {
        alert("Sucessfully send")
        setmsg("")
        setbtnmsg(false)
        
      }else{
        alert("Email sending Faild")
        setbtnmsg(false)
      }
     })
     
  }


 console.log(bulkEmail)



  return (
    <>
      <div className='bg-blue-950 text-center text-white px-5 py-3 text-2xl'>
        <h1>Bulk Mail</h1>
      </div>
      <div className='bg-blue-800 text-center text-white px-5 py-3 font-medium'>
        <h1>We can help your bussiness wiht sent bulk email at once</h1>
      </div>
      <div className='bg-blue-600 text-center text-white px-5 py-3 font-medium'>
        <h1>Drag and Drop</h1>
      </div>
      <div className='bg-blue-300 text-center flex flex-col items-center text-black px-5 py-3 font-medium'>
       <textarea onChange={(e)=>setmsg(e.target.value)} className='w-[50%] h-40 border border-black rounded-md p-2 ' placeholder='Enter your text here...' ></textarea>
       <input type='file' onChange={handlefile} className='border-4  border-dashed py-3 px-4 mt-2 '></input>
       <p className='mt-1'>
        Total Email in the File :{bulkEmail.length}
       </p>
       
      </div>
      <div className='bg-blue-600 text-center text-white px-5 py-3 font-medium'>
      <button onClick={send} className='bg-blue-950 px-2 py-2 w-fit  rounded-md text-white' >{btnmsg?"Sending...":"Send"}</button>
      </div>
    </>
  )
}

export default App
