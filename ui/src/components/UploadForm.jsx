import React, { useState } from 'react'

const UploadForm = () => {

    const [file, setFile]=useState(null);

    const handleUpload = async(e)=>{
        e.preventDefault();
        if(!file){
            return(alert("Select (.glb) file"))
        }
        const formData=new FormData();
        formData.append("model",file);

        try{
            const res= await fetch("http://localhost:5000/upload",{
                method:"POST",
                body:formData,               
            });
            try {
                  const data= await res.json();
            if(!res.ok){
                throw new Error(data.message||"Error in uploading")
                //throw new Error("Error in uploading")
            }            
            alert(data.message);                
            } catch (error) {
                console.log(data.message);
                console.log(error); 
            }
          
        }catch(error){
            console.error(error);
            alert(" Error")           
        }
    };

  return (
    // <div>UploadForm</div>
    <div>
        <form onSubmit={handleUpload}
            className='flex flex-col items-center justify-center
                        bg-gray-400 p-6 rounded-xl shadow-md w-150'>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    3D Model Uploader
            </h1>                
            <label className='text-lg font-semibold mb-1'>
                                Upload 3d Model(.glb files)
            </label> 
            <input type="file" 
                    accept='.glb'
                    className=''
                     onChange = {(e) => {if(e.target.files && e.target.files[0]){
                        setFile(e.target.files[0])}}} />
            <button className='bg-blue-600 text-white py-2 px-4 mt-4
                                rounded-lg hover:bg-blue-500'>
                Upload
            </button>
        </form>
    </div>
  )
}

export default UploadForm