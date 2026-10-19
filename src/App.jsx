import React from 'react';
import { useApp } from './context/AppContext';
import DeviceFrame from './components/common/DeviceFrame';
import Header from './components/common/Header';
import BottomNav from './components/common/BottomNav';
import Toast from './components/common/Toast';
import NotificationDrawer from './components/common/NotificationDrawer';
import RoleSwitcherModal from './components/common/RoleSwitcherModal';

import HomeDashboard from './components/home/HomeDashboard';
import ProjectList from './components/projects/ProjectList';
import TaskManager from './components/tasks/TaskManager';
import ScheduleView from './components/schedule/ScheduleView';
import MessagesView from './components/messages/MessagesView';

import CreateProjectModal from './components/projects/CreateProjectModal';
import DailyReportModal from './components/reports/DailyReportModal';
import UploadPhotoModal from './components/photos/UploadPhotoModal';
import PreviewDocModal from './components/documents/PreviewDocModal';

export default function App() {
  const { activeTab } = useApp();

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeDashboard />;
      case 'projects':
        return <ProjectList />;
      case 'tasks':
        return <TaskManager />;
      case 'schedule':
        return <ScheduleView />;
      case 'messages':
        return <MessagesView />;
      default:
        return <HomeDashboard />;
    }
  };

  return (
    <DeviceFrame>
      <div className="flex flex-col min-h-full">
        {/* Top Header */}
        <Header />

        {/* Dynamic Screen View */}
        <div className="flex-1">
          {renderActiveScreen()}
        </div>

        {/* Fixed Bottom Navigation */}
        <BottomNav />

        {/* Global Modals & Notifications */}
        <NotificationDrawer />
        <RoleSwitcherModal />
        <CreateProjectModal />
        <DailyReportModal />
        <UploadPhotoModal />
        <PreviewDocModal />
        <Toast />
      </div>
    </DeviceFrame>
  );
}
