"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session, status } = useSession();

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Redirect if no session
  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/login";
    }
  }, [status]);

  if (status === "loading" || !session) {
    return <p className="p-10">Loading...</p>;
  }

  const user = session.user;

  // ---------- CHANGE PASSWORD ----------
  const handlePasswordChange = async () => {
    if (!passwordData.currentPassword.trim()) {
      alert("Please enter your current password");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert("New password must be at least 8 characters!");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    const res = await fetch("/api/update-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Password updated successfully!");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setIsChangingPassword(false);
    } else {
      alert(data.message || "Failed to change password");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white pt-5">
      
      <div className="max-w-4xl mx-auto px-6 py-12">

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600 mb-8">Manage your account</p>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 to-blue-500 px-8 py-10 text-center">
            <div className="w-20 h-20 mx-auto rounded-xl bg-white/20 flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4">
              {user.name?.split(" ").map((n) => n[0]).join("")}
            </div>

            <h2 className="text-2xl font-bold text-white">{user.name}</h2>

            <span className="mt-2 inline-block px-4 py-1.5 bg-white/20 rounded-full text-white text-sm font-medium">
              {user.role === "teacher" ? "👨‍🏫 Teacher" : "🎓 Student"}
            </span>
          </div>

          {/* BODY */}
          <div className="p-8 space-y-6">
            
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={user.name}
                disabled
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">Password</label>

                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Change Password
                </button>
              </div>

              <input
                type="password"
                value="••••••••"
                disabled
                className="w-full mt-2 px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50"
              />
            </div>

          </div>
        </div>
      </div>

      {/* CHANGE PASSWORD MODAL */}
      {isChangingPassword && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">

            {/* Close */}
            <button
              onClick={() => setIsChangingPassword(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Change Password</h2>

            {/* FORM */}
            <div className="space-y-4">

              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, currentPassword: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200"
                />
              </div>

              {/* Confirm */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={handlePasswordChange}
                className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold"
              >
                Update Password
              </button>

              <button
                onClick={() => setIsChangingPassword(false)}
                className="px-6 py-3 bg-gray-200 rounded-xl"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;
