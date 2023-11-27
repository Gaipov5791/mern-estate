import {useSelector} from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
    getDownloadURL, 
    getStorage, 
    ref, 
    uploadBytesResumable
} from 'firebase/storage';
import {app} from '../firebase';

const Profile = () => {
    const fileRef = useRef(null);
    const {currentUser} = useSelector((state) => state.user);
    const [file, setFile] = useState(undefined);
    const [imagePercent, setImagePercent] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [formData, setFormData] = useState({});
    console.log(imagePercent);
    console.log(imageError);
    console.log(formData);
    

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file]);

    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImagePercent(progress);
            },
            // eslint-disable-next-line no-unused-vars
            (error) => {
                setImageError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadUrl) => {
                    setFormData({...formData, avatar: downloadUrl});
                });
            },
            );
    };

    // firebase storage 
    //   allow read;
    //   allow write: if
    //   request.resource.size < 2 * 1024 * 1024 &&
    //   request.resource.contentType.matches('image/.*')
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <form className='flex flex-col gap-4'> 
            <input 
                onChange={(e) => setFile(e.target.files[0])} 
                type="file" 
                ref={fileRef} 
                hidden 
                accept='image/*'
            />
                <img 
                    onClick={() => fileRef.current.click()}
                    className='w-24 h-24 rounded-full object-cover 
                    self-center mt-7 cursor-pointer' 
                    src={formData.avatar || currentUser.avatar} 
                    alt="profile" 
                />
                <p className='text-sm self-center'>
					{imageError ? (
						<span className='text-red-700'>Error uploading image (file size must be less then 2MB)</span>
					) : imagePercent > 0 && imagePercent < 100 ? (
						<span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
					) : imagePercent === 100 ? (
						<span className='text-green-700'>Image Uploaded Successfully</span>
					) : (
						''
					)}
				</p>
                <input 
                    className='border rounded-lg p-3' 
                    type="text" 
                    placeholder='username' 
                    id="username" 
                />
                <input 
                    className='border rounded-lg p-3' 
                    type="email" 
                    placeholder='email' 
                    id="email" 
                />
                <input 
                    className='border rounded-lg p-3' 
                    type="password" 
                    placeholder='password' 
                    id="password" 
                />
                <button className='bg-slate-700 p-3
                 text-white uppercase rounded-lg 
                 hover:opacity-80 disabled:opacity-95'>Update</button>
            </form>
            <div className='flex justify-between mt-5'>
                <span className='text-red-700 cursor-pointer'>Delete Account</span>
                <span className='text-red-700 cursor-pointer'>Sign out</span>
            </div>
        </div>
    )
}

export default Profile;