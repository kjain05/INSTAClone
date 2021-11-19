import React,{useState} from 'react'


const CreatePost = () => {

    const [title,setTitle]= useState("");
    const [body,setBody]= useState("");
    const [image,setImage]=useState("");

    const PostDetails = () =>{

        const formData = new FormData();//create an empty form data object
        
        formData.append("file",image);//adding a key value pair to our form data obj
        formData.append("upload_preset","Insta-Clone");
        formData.append("cloud_name","heavenly");

        //connect to the network using fetch
        fetch("https://api.cloudinary.com/v1_1/heavenly/image/upload",{
            method : "post" ,
            body : formData
        })
        .then(res => res.json())
        .then(formData => {console.log(formData)})
        .catch(error => {console.log(error)})
    }


    return (
        <div className="card input-field"
            style={{
                margin: "30px auto",
                maxWidth: "500px",
                padding: "20px",
                textAlign: "center"
            }}>


            <input type='text' placeholder="title" value={title} 
                onChange={(e) => setTitle(e.target.value)}
            />
            <input type='text' placeholder="body" value={body} 
                onChange={(e) => setBody(e.target.value)}/>

            <div className="file-field input-field">
                <div className="btn  #0d47a1 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e)=> setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #0d47a1 blue darken-4"
              onChange={()=>PostDetails()}     >Submit post
            </button>
        </div>
    )
}

export default CreatePost;