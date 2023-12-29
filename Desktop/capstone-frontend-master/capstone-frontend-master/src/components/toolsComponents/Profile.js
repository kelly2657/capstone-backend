import React, { useState } from 'react';
import defaultImage from '../../assets/images/default_profile.png';

export default function Profile() {
  const [file, setFile] = useState(null);
  const [profileImage, setImageUrl] = useState('');
  const [userName, setName] = useState('user');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(file);
      setImageUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setFile(null);
      setImageUrl('');
    }
  };
  const ClearImage = () => {
    setFile(null);
    setImageUrl('');
  };
  const ClearName = () => {
    setName(userName);
  };
  return (
    <div className="profile">
      {profileImage ? (
        <div>
          <img src={profileImage} alt="프로필" onClick={ClearImage} width={150} height={150} />
          <p>
            <h3>{userName}</h3>
          </p>
        </div>
      ) : (
        <>
          <label htmlFor="image-upload">
            <img src={defaultImage} alt="프로필" width={150} height={150} />
          </label>
          <p>
            <h3>{userName}</h3>
          </p>
        </>
      )}
      <input id="image-upload" type="file" onChange={handleImageUpload} style={{ display: 'none' }} />
    </div>
  );
}
