import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Default from "../assets/default.jpeg";
import AuthContext from "../context/AuthContext";
import "./Profile.css";
import Header from "../Header";

function Profile() {
  const [userData, setUserData] = useState(null); // Store user data
  const [isEditingInfo, setIsEditingInfo] = useState(false); // Control info editing mode
  const [newInfo, setNewInfo] = useState(""); // Hold updated info
  const [isEditingPhoto, setIsEditingPhoto] = useState(false); // Control photo editing mode
  const [selectedFile, setSelectedFile] = useState(null); // Hold selected photo file
  const [isEditingUsername, setIsEditingUsername] = useState(false); // Control username editing mode
  const [newUsername, setNewUsername] = useState(""); // Hold updated username
  const { authTokens } = useContext(AuthContext); // Retrieve authentication tokens from context

  // Fetch user data when the component loads
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/user/api/profile/",
          {
            headers: {
              Authorization: `Bearer ${authTokens?.access}`, // Add authorization header
            },
          }
        );
        // Find and set the profile of the authenticated user
        const data = response.data.find(
          (profile) => profile.id === authTokens?.user.pk
        );
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [authTokens]);

  // Handle file selection for photo upload
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Upload the selected photo and update user data
  const handlePhotoUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.put(
        `http://localhost:8000/user/api/profile/${authTokens?.user.pk}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authTokens?.access}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUserData((prev) => ({ ...prev, image: response.data.image })); // Update user image
      setIsEditingPhoto(false); // Exit photo editing mode
      setSelectedFile(null); // Clear selected file
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  // Submit updated username
  const handleSubmitUsernameChange = async (e) => {
    e.preventDefault();
    console.log("iam going to send USER NAME CHANGE : " , e)
    console.log("iam going to send USER NAME CHANGE : " , newUsername)

    try {
      const response = await axios.put(
        `http://localhost:8000/user/api/profile/${authTokens?.user.pk}/`,
        { displayname: newUsername },
        {
          headers: {
            Authorization: `Bearer ${authTokens?.access}`,
          },
        }
      );
      setUserData(response.data); // Update username
      setIsEditingUsername(false); // Exit username editing mode
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  // Submit updated info
  const handleSubmitInfoChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/user/api/profile/${authTokens?.user.pk}/`,
        { info: newInfo },
        {
          headers: {
            Authorization: `Bearer ${authTokens?.access}`,
          },
        }
      );
      setUserData(response.data); // Update info
      setIsEditingInfo(false); // Exit info editing mode
    } catch (error) {
      console.error("Error updating info:", error);
    }
  };

  return (
    <div ClassName="flex flex-col h-screen" height= "1vh">
      <Header />
      <div className="profile-page">
        <div className="profile-content-box">
          <h2>Zajel Profile</h2>

          {/* Display user image or default image */}
          <img
            src={userData?.image || Default}
            alt="User"
            width="100"
            height="100"
          />

          {/* Display user data */}
          <div>
            <p>Name: {userData?.displayname}</p>
            <p>Info: {userData?.info}</p>
          </div>

          {/* Edit Photo Section */}
          <button onClick={() => setIsEditingPhoto(true)}>Edit Photo</button>
          {isEditingPhoto && (
            <div>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <button onClick={handlePhotoUpload}>Upload</button>
              <button
                className="cancel-button"
                onClick={() => setIsEditingPhoto(false)}
              >
                Cancel
              </button>
            </div>
          )}

          {/* Edit Username Section */}
          <button
            onClick={() => {
              setIsEditingUsername(true);
              setNewUsername(userData?.displayname || "puta");
            }}
          >
            Edit Username
          </button>
          {isEditingUsername && (
            <form onSubmit={handleSubmitUsernameChange}>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Enter new username"
              />
              <button type="submit">Submit</button>
              <button
                className="cancel-button"
                onClick={() => setIsEditingUsername(false)}
              >
                Cancel
              </button>
            </form>
          )}

          {/* Edit Info Section */}
          <button
            onClick={() => {
              setIsEditingInfo(true);
              setNewInfo(userData?.info || "");
            }}
          >
            Edit Info
          </button>
          {isEditingInfo && (
            <form onSubmit={handleSubmitInfoChange}>
              <input
                type="text"
                value={newInfo}
                onChange={(e) => setNewInfo(e.target.value)}
                placeholder="Enter new info"
              />
              <button type="submit">Submit</button>
              <button
                className="cancel-button"
                onClick={() => setIsEditingInfo(false)}
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
