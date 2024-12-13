import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSupabase } from "@/app/hooks/useSupabase";
import { updateUser } from "@/store/Slices/userSlice";
import API_CONFIG from "../API";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const [avatarUrl, setAvatarUrl] = useState(user.avatar); // Assuming the user object has an `avatar` field.
  const [errorMessage, setErrorMessage] = useState("");

  const supabase = useSupabase();
  const dispatch = useDispatch();

  const updateUserAvatar = async (avatarUrl) => {
    const END_POINT = `${process.env.NEXT_PUBLIC_BACKEND_URL}${API_CONFIG.updateUser}`;

    try {
      const response = await fetch(END_POINT, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user["access_token"]}`,
        },
        body: JSON.stringify({
          id: user.user_id,
          name: user.name,
          email: user.email,
          img_url: avatarUrl,
          is_active: true,
        }),
      });

      if (!response.ok) {
        setErrorMessage("Failed to update avatar.");
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
      setErrorMessage("An unexpected error occurred.");
    }
  };

  const handleImageUpload = async (event) => {
    try {
      const avatarFile = event.target.files[0];
      if (!avatarFile) return;

      // Validate file type
      const allowedTypes = ["image/png", "image/jpeg"];
      if (!allowedTypes.includes(avatarFile.type)) {
        setErrorMessage("Only PNG and JPG formats are allowed.");
        return;
      }
      setErrorMessage(""); // Clear error message if validation passes

      // Generate unique filename
      const fileExtension = avatarFile.type.split("/")[1];
      const fileName = `public/${
        user.id
      }_avatar_${Date.now()}.${fileExtension}`;

      // Upload to Supabase
      const { data, error } = await supabase.storage
        .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET) // Replace with your bucket name
        .upload(fileName, avatarFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Upload error:", error);
        setErrorMessage("Failed to upload image.");
        return;
      }

      // Get public URL
      const { data: publicData, error: publicError } = supabase.storage
        .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET)
        .getPublicUrl(fileName);

      if (publicError) {
        console.error("Error fetching public URL:", publicError);
        setErrorMessage("Failed to fetch image URL.");
        return;
      }

      updateUserAvatar(publicData.publicUrl);
      dispatch(updateUser({ ...user, img_url: publicData.publicUrl }));
      setAvatarUrl(publicData.publicUrl);
      
    } catch (error) {
      console.error("Unexpected error:", error);
      setErrorMessage("An unexpected error occurred.");
    }
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10 pt-4">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={avatarUrl || user.img_url || "profile2.png"} // Provide a fallback avatar URL
          alt="User avatar"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {user.name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {user.email}
        </span>
        {errorMessage && (
          <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
        )}
        <div className="flex mt-4 md:mt-6">
          <label
            htmlFor="upload-input"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
          >
            Upload Image
          </label>
          <input
            id="upload-input"
            type="file"
            accept="image/png, image/jpeg" // Restrict file picker to PNG and JPG
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
