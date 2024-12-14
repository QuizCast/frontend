import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSupabase } from "@/app/hooks/useSupabase";
import { updateUser } from "@/store/Slices/userSlice";
import API_CONFIG from "../API";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const [avatarUrl, setAvatarUrl] = useState(user.avatar); // Assuming the user object has an `avatar` field.
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Add this state for the success message
  const [isUploading, setIsUploading] = useState(false); // Add this state to track upload status

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
      setSuccessMessage(""); // Clear success message before starting upload

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
      setSuccessMessage("Image uploaded successfully!"); // Set success message
    } catch (error) {
      console.error("Unexpected error:", error);
      setErrorMessage("An unexpected error occurred.");
    }
  };

  return (
    <div className="max-w-sm bg-white relative p-4 w-full max-w-md max-h-full">
      <div className="relative rounded-lg border-2 flex flex-col items-center pb-10 pt-4">
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
        {successMessage && (
          <p className="text-sm text-green-500 mt-2">{successMessage}</p>
        )}
        <div className="flex mt-4 md:mt-6">
          {isUploading ? (
            <button
              disabled
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </button>
          ) : (
            <>
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
                onChange={async (event) => {
                  setIsUploading(true); // Set uploading state
                  await handleImageUpload(event); // Call the upload function
                  setIsUploading(false); // Reset uploading state after completion
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
