import {useSelector, useDispatch} from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {
    getDownloadURL, 
    getStorage, 
    ref, 
    uploadBytesResumable
} from 'firebase/storage';
import {app} from '../firebase';
import { 
    updateUserStart, 
    updateUserSuccess, 
    updateUserFailure, 
    deleteUserFailure,
    deleteUserSuccess,
    deleteUserStart,
    signOutUserStart,
    signOutUserFailure,
    signOutUserSuccess
} from '../redux/user/userSlice';

const Profile = () => {
    const fileRef = useRef(null);
    const {currentUser, loading, error} = useSelector((state) => state.user);
    const [file, setFile] = useState(undefined);
    const [imagePercent, setImagePercent] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [showErrorListings, setShowErrorListings] = useState(false);
    const [listingsLoading, setListingsLoading] = useState(false);
    const [userListings, setUserListings] = useState([]);
    const dispatch = useDispatch();
    console.log(imagePercent);
    console.log(imageError);
    console.log(formData);
    

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
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

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }
            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
        } catch (error) {
            dispatch(updateUserFailure(error.message));
        }
    };

    const handleDeleteClick = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: "DELETE"
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    };

    const handleSignOut = async () => {
        try {
            dispatch(signOutUserStart());
            const res = await fetch('/api/auth/sign-out');
            const data = await res.json();
            if (data.success === false) {
                dispatch(signOutUserFailure(data.message));
            }
            dispatch(signOutUserSuccess(data));
        } catch (error) {
            dispatch(signOutUserFailure(error.message));
        }
    };

    const handleShowListings = async () => {
        try {
            setListingsLoading(true);
            setShowErrorListings(false);
            const res = await fetch(`/api/user/listings/${currentUser._id}`);
            const data = await res.json();
            if (data.success === false) {
                setShowErrorListings(true);
            }
            setListingsLoading(false);
            setUserListings(data);
        } catch (error) {
            setShowErrorListings(true);
            setListingsLoading(false);
        }
    };
   

    // firebase storage 
    //   allow read;
    //   allow write: if
    //   request.resource.size < 2 * 1024 * 1024 &&
    //   request.resource.contentType.matches('image/.*')
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <form 
                onSubmit={handleSubmit}
                className='flex flex-col gap-4'
            > 
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
                    defaultValue={currentUser.username}
                    onChange={handleChange}
                />
                <input 
                    className='border rounded-lg p-3' 
                    type="email" 
                    placeholder='email' 
                    id="email" 
                    defaultValue={currentUser.email}
                    onChange={handleChange}
                />
                <input 
                    className='border rounded-lg p-3' 
                    type="password" 
                    placeholder='password' 
                    id="password" 
                    onChange={handleChange}
                />
                <button className='bg-slate-700 p-3
                 text-white uppercase rounded-lg 
                 hover:opacity-80 disabled:opacity-95'>
                    {loading ? "Loading..." : "Update"}
                 </button>
                 <Link 
                    className='bg-green-700 text-white uppercase p-3 text-center rounded-lg hover:opacity-95' 
                    to='/create-listing'
                >
                    Create Listing
                </Link>
            </form>
            <div className='flex justify-between mt-5'>
                <span 
                    onClick={handleDeleteClick} 
                    className='text-red-700 cursor-pointer'
                >
                    Delete Account
                </span>
                <span 
                    onClick={handleSignOut} 
                    className='text-red-700 cursor-pointer'
                >
                    Sign out
                </span>
            </div>
            <p className='text-red-700 mt-5'>{error ? error : ''}</p>
            <p className='text-green-700'>
                {updateSuccess ? "User updated successfully!" : ""}
            </p>
            <button 
                disabled={listingsLoading}
                onClick={handleShowListings} 
                className='text-green-700 w-full'
            >
                {listingsLoading ? "Loading..." : "Show Listings"}
            </button>
            <p 
                className='text-red-700 mt-5'
            >
                {showErrorListings ? "Error showing listings" : ""}
            </p>
            {userListings && userListings.length > 0 && 
            <div className='flex flex-col gap-4'>
                <h1 className='text-center text-2xl mt-7 font-semibold'>
                    Your Listing
                </h1>
                {userListings.map((listing) => (
                    <div 
                        className='border rounded-lg p-3 flex justify-between items-center gap-4' 
                        key={listing._id}>
                        <Link to={`/listing/${listing._id}`}>
                            <img 
                                className='w-16 h-16 object-contain' 
                                src={listing.imageUrls[0]} 
                                alt="listing cover" 
                            />
                        </Link>
                        <Link 
                            className='text-slate-700 font-semibold 
                            flex-1 hover:underline truncate' 
                            to={`/listing/${listing._id}`}>
                            <p>{listing.name}</p>
                        </Link>
                        <div className='flex flex-col items-center'>
                            <button className='text-red-700 uppercase'>
                                Delete
                            </button>
                            <button className='text-green-700 uppercase'>
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        }
        </div>
    )
}

export default Profile;