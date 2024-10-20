import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";



export function DeleteVideo(){

    let params = useParams();
    let navigate =useNavigate();

    const[videos, setVideos] = useState([{VideoId:0,Title:'', Url:'', Likes:'', Dislikes:'', Views:0, CategoryId:0}])

    function GetVideo(){
        axios.get(`http://127.0.0.1:5000/video/${params.id}`)
        .then(response=>{
            setVideos(response.data);
        } )
    }

    useEffect(()=>{
        GetVideo();
    },[])

    function handleDeleteClick(){
        axios.delete(`http://127.0.0.1:5000/delete-video/${params.id}`)
        .then(()=>{
            alert('Delete Successfully');
            navigate('/admin-dash');


        })
    }
    
    return(
        <div className="container-fluid"style={{height:'100vh'}}>
            <h2 className="text-white"> Delete Video </h2>
            <div className="card">
                <div className="card w-50">
                    <div className="card-header">
                        <h4>{videos[0].Title}</h4>
                    </div>
                    <div className="card-body">
                        <iframe width="100%" height="300" src={videos[0].Url}></iframe>
                    </div>
                    <div className="card-footer text-center">
                        <button onClick={handleDeleteClick } className="btn btn-danger me-2">Yes</button>
                        <Link className="btn btn-warning" to="/admin-dash">Cancel</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}