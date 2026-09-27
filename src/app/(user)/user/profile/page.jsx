const UserProfilePage = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
          My Profile
        </h1>
        <p className="text-muted mt-1 text-sm">
          Manage your personal information and preferences.
        </p>
      </div>

      {/* Top Grid — Avatar Card + Personal Info Form */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
        {/* Profile Card — col 1 */}
        <div className="flex flex-col items-center rounded-xl bg-white p-6 shadow-sm lg:col-span-1">
          {/* Avatar */}
          <div className="bg-primary mb-4 flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white">
            MR
          </div>
          <h2 className="text-base font-semibold text-gray-800">
            Muhammad Rashed
          </h2>
          <p className="text-muted text-sm">mrashed@example.com</p>
          <p className="text-muted mt-1 text-xs">Member since Jan 2024</p>

          {/* Stats */}
          <div className="mt-5 w-full space-y-2 text-sm">
            <div className="bg-surface flex items-center justify-between rounded-lg px-3 py-2">
              <span className="text-muted">Total Trips</span>
              <span className="text-primary font-semibold">12</span>
            </div>
            <div className="bg-surface flex items-center justify-between rounded-lg px-3 py-2">
              <span className="text-muted">Reward Points</span>
              <span className="text-primary font-semibold">1,480 pts</span>
            </div>
            <div className="bg-surface flex items-center justify-between rounded-lg px-3 py-2">
              <span className="text-muted">Account Status</span>
              <span className="text-sm font-semibold text-green-500">
                Verified ✓
              </span>
            </div>
          </div>

          {/* Edit Avatar Button */}
          <button className="border-primary text-primary mt-5 w-full rounded-lg border px-4 py-2 text-xs font-medium transition hover:bg-primary-bg">
            Change Photo
          </button>
        </div>

        {/* Personal Info Form — col 2-3 */}
        <div className="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="mb-5 text-sm font-semibold text-gray-800">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="form-label">First Name</label>
              <input
                type="text"
                defaultValue="Muhammad"
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Last Name</label>
              <input
                type="text"
                defaultValue="Rashed"
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                defaultValue="mrashed@example.com"
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                defaultValue="+880 1700 000000"
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                defaultValue="1995-06-15"
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Nationality</label>
              <select className="form-input">
                <option>Bangladeshi</option>
                <option>Indian</option>
                <option>Pakistani</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="form-label">Gender</label>
              <select className="form-input">
                <option>Male</option>
                <option>Female</option>
                <option>Prefer not to say</option>
              </select>
            </div>
            <div>
              <label className="form-label">Passport Number</label>
              <input
                type="text"
                defaultValue="AA1234567"
                className="form-input"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
            <p className="text-muted text-xs">
              Last updated: 12 Sep, 2025
            </p>
            <button className="common-btn !px-6 !py-2.5 text-sm">
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-sm font-semibold text-gray-800">
          Change Password
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="form-label">Current Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Confirm New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="form-input"
            />
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
          <p className="text-muted text-xs">
            Use at least 8 characters with letters and numbers.
          </p>
          <button className="border-primary text-primary rounded-lg border px-5 py-2 text-sm font-medium transition hover:bg-primary-bg">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
