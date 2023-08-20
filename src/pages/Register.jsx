import  { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {addImg} from '../images'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db, storage } from '../config/firebase.config'
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage'
import { v4 as uuid} from 'uuid'
import { doc, setDoc } from 'firebase/firestore'
import { AuthContext } from '../contexts/AuthContext'

function Register() {
    const { setChangeDet, changeDet } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [regErr, setRegErr] = useState(false)
    const [data, setData] = useState({
        displayName: '',
        email: '',
        password: '',
        avatar: ''
    })
    const navigate = useNavigate()

    const bucketRef = ref(storage, `profileImage/${ uuid()+data.avatar.name}`)

    const handleSubmit = async (e)=>{
        e.preventDefault()
       

        

        createUserWithEmailAndPassword( auth, data.email, data.password)
        .then((res)=>{
            const userRes = res.user
            console.log(userRes);
            uploadBytes(bucketRef, data.avatar)
            .then((snapshot)=>{
                getDownloadURL(snapshot.ref)
                .then((url)=>{
                    updateProfile(userRes, {
                        displayName: data.displayName,
                        photoURL: url
                    }).then(()=>{

                        setDoc(doc(db, 'users', userRes.uid),{
                            uid: userRes.uid,
                            displayName: userRes.displayName,
                            email: userRes.email,
                            photoURL: url
                        }).then((resp)=>{
                            console.log(resp);
                        }).catch((err)=>{
                            console.log(err.message);
                            console.log(err.code);
                        })

                        setDoc(doc(db, 'userChat', userRes.uid), {})
                        .then((usRes)=>{
                            console.log(usRes);
                        }).catch((err)=>{
                            console.log(err.message);
                            console.log(err.code);
                        })
                        setChangeDet(!changeDet)
                        navigate('/chatRoom')
                    }).catch((err)=>{
                        console.log(err.message);
                        console.log(err.code);
                    }) 
                }).catch(err=>{
                    console.log(err.message);
                    console.log(err.code);
                })
            }).catch(err=>{
                console.log(err.message);
                console.log(err.code);
            })
        }).catch((err)=>{
            console.log(err.message);
            console.log(err.code);
            setRegErr(true)
        })
        
        

    }

    

    const handleChange = (e)=>{
        setData({
            ...data,
            [e.target.name] : e.target.type === 'file' ? e.target.files[0] : e.target.value
        })
    }

  return (
    <>
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Chat Application</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input required type="text" onChange={handleChange} value={data.displayName} name="displayName" placeholder="Display Name" />
                    <input required type="email" onChange={handleChange} value={data.email} name="email" placeholder="Email" />
                    <input required type="password" onChange={handleChange} value={data.password} name="password" placeholder="Password" />
                    <input required type="file" onChange={handleChange} name="avatar" style={{display: 'none'}} id="file" />

                    <label htmlFor="file">
                        <img src={addImg} alt="file image" />
                        <span>Add an avatar</span>
                    </label>

                    <button disabled={loading}>Sign up</button>
                    {regErr && <p style={{color: 'red', fontWeight: 'bold', textAlign: 'center'}}>Something went wrong!</p>}
                </form>

                <p> You do have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    </>
  )
}

export default Register