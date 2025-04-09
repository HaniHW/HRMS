import React, { useState } from 'react';
import './Settings.css';
import Sidebar from './Sidebar';

const Settings = () => {
  const [theme, setTheme] = useState('Light');
  const [language, setLanguage] = useState('English');
  const [twoFactor, setTwoFactor] = useState(true);
  const [mobilePush, setMobilePush] = useState(true);
  const [desktopPush, setDesktopPush] = useState(true);
  const [emailNotification, setEmailNotification] = useState(true);

  return (
    <div className="settings-main-container">
      <Sidebar />
      <div className="settings-content">
        <div className="settings-header">
          <div>
            <h2>Settings</h2>
            <p>All System Settings</p>
          </div>
          <div className="settings-profile">
            <input type="text" placeholder="Search" className="settings-search" />
            <div className="profile">
              <span>Sarah</span>
              <p>HR Manager</p>
            </div>
          </div>
        </div>

        <div className="settings-list">
          <div className="settings-item">
            <div>
              <h4>Appearance</h4>
              <p>Customize how your theme looks on your device</p>
            </div>
            <select value={theme} onChange={(e) => setTheme(e.target.value)} className="dropdown">
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>

          <div className="settings-item">
            <div>
              <h4>Language</h4>
              <p>Select your language</p>
            </div>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="dropdown">
              <option>English</option>
              <option>Urdu</option>
              <option>French</option>
            </select>
          </div>

          <div className="settings-item">
            <div>
              <h4>Two-factor Authentication</h4>
              <p>Keep your account secure by enabling 2FA via mail</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="settings-item">
            <div>
              <h4>Mobile Push Notifications</h4>
              <p>Receive push notification</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={mobilePush} onChange={() => setMobilePush(!mobilePush)} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="settings-item">
            <div>
              <h4>Desktop Notification</h4>
              <p>Receive push notification in desktop</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={desktopPush} onChange={() => setDesktopPush(!desktopPush)} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="settings-item">
            <div>
              <h4>Email Notifications</h4>
              <p>Receive email notification</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={emailNotification} onChange={() => setEmailNotification(!emailNotification)} />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
