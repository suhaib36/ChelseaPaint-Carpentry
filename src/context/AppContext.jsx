import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  USERS,
  INITIAL_PROJECTS,
  INITIAL_TASKS,
  INITIAL_CHANGE_ORDERS,
  INITIAL_PHOTOS,
  INITIAL_DAILY_REPORTS,
  INITIAL_SCHEDULE,
  INITIAL_DOCUMENTS,
  INITIAL_EXPENSES,
  INITIAL_MESSAGES,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Load state from localStorage if available
  const loadStored = (key, fallback) => {
    try {
      const saved = localStorage.getItem(`cpc_${key}`);
      return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
      return fallback;
    }
  };

  const [currentRole, setCurrentRole] = useState(() => loadStored('role', 'owner'));
  const [currentUserId, setCurrentUserId] = useState(() => {
    const role = loadStored('role', 'owner');
    if (role === 'owner') return 'user_jonah';
    if (role === 'project_manager') return 'user_marcus';
    return 'user_dave'; // default worker is Dave Miller
  });

  const currentUser = USERS.find(u => u.id === currentUserId) || USERS[0];

  // Navigation states
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProjectTab, setSelectedProjectTab] = useState('overview');
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [activeConvId, setActiveConvId] = useState('conv_washtenaw');
  const [isDeviceFrame, setIsDeviceFrame] = useState(true);

  // Modals & Drawers
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false);
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [createTaskDefaults, setCreateTaskDefaults] = useState({});
  const [dailyReportModalOpen, setDailyReportModalOpen] = useState(false);
  const [addExpenseModalOpen, setAddExpenseModalOpen] = useState(false);
  const [reportProblemModalOpen, setReportProblemModalOpen] = useState(false);
  const [problemTaskTarget, setProblemTaskTarget] = useState(null);
  const [scheduleJobModalOpen, setScheduleJobModalOpen] = useState(false);
  const [uploadPhotoModalOpen, setUploadPhotoModalOpen] = useState(false);
  const [uploadPhotoProjectId, setUploadPhotoProjectId] = useState(null);
  const [previewDocModal, setPreviewDocModal] = useState(null);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Main Entities
  const [projects, setProjects] = useState(() => loadStored('projects', INITIAL_PROJECTS));
  const [tasks, setTasks] = useState(() => loadStored('tasks', INITIAL_TASKS));
  const [changeOrders, setChangeOrders] = useState(() => loadStored('changeOrders', INITIAL_CHANGE_ORDERS));
  const [photos, setPhotos] = useState(() => loadStored('photos', INITIAL_PHOTOS));
  const [dailyReports, setDailyReports] = useState(() => loadStored('dailyReports', INITIAL_DAILY_REPORTS));
  const [schedule, setSchedule] = useState(() => loadStored('schedule', INITIAL_SCHEDULE));
  const [documents, setDocuments] = useState(() => loadStored('documents', INITIAL_DOCUMENTS));
  const [expenses, setExpenses] = useState(() => loadStored('expenses', INITIAL_EXPENSES));
  const [messages, setMessages] = useState(() => loadStored('messages', INITIAL_MESSAGES));
  const [notifications, setNotifications] = useState(() => loadStored('notifications', INITIAL_NOTIFICATIONS));

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('cpc_role', JSON.stringify(currentRole));
  }, [currentRole]);
  useEffect(() => {
    localStorage.setItem('cpc_projects', JSON.stringify(projects));
  }, [projects]);
  useEffect(() => {
    localStorage.setItem('cpc_tasks', JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    localStorage.setItem('cpc_changeOrders', JSON.stringify(changeOrders));
  }, [changeOrders]);
  useEffect(() => {
    localStorage.setItem('cpc_photos', JSON.stringify(photos));
  }, [photos]);
  useEffect(() => {
    localStorage.setItem('cpc_dailyReports', JSON.stringify(dailyReports));
  }, [dailyReports]);
  useEffect(() => {
    localStorage.setItem('cpc_schedule', JSON.stringify(schedule));
  }, [schedule]);
  useEffect(() => {
    localStorage.setItem('cpc_documents', JSON.stringify(documents));
  }, [documents]);
  useEffect(() => {
    localStorage.setItem('cpc_expenses', JSON.stringify(expenses));
  }, [expenses]);
  useEffect(() => {
    localStorage.setItem('cpc_messages', JSON.stringify(messages));
  }, [messages]);
  useEffect(() => {
    localStorage.setItem('cpc_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Toast helper
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(prev => (prev?.message === message ? null : prev));
    }, 3200);
  };

  // Role Switcher
  const switchRole = (newRole, userId = null) => {
    setCurrentRole(newRole);
    if (userId) {
      setCurrentUserId(userId);
    } else {
      if (newRole === 'owner') setCurrentUserId('user_jonah');
      else if (newRole === 'project_manager') setCurrentUserId('user_marcus');
      else setCurrentUserId('user_dave');
    }
    showToast(`Switched view to ${newRole === 'owner' ? 'Owner (Jonah Brown)' : newRole === 'project_manager' ? 'Project Manager (Marcus Vance)' : 'Worker (Field View)'}`, 'info');
  };

  // --- ACTIONS ---

  // Projects
  const addProject = (projectData) => {
    const newProj = {
      ...projectData,
      id: `proj_${Date.now()}`,
      actualCost: 0,
      laborCost: 0,
      materialCost: 0,
      progress: 0,
      status: projectData.status || 'Estimate'
    };
    setProjects(prev => [newProj, ...prev]);
    addNotification({
      title: 'New Project Created',
      description: `"${newProj.name}" has been created for ${newProj.customer}.`,
      type: 'project',
      targetTab: 'projects',
      targetProjectId: newProj.id
    });
    showToast('Project created successfully!');
    return newProj;
  };

  const updateProject = (projectId, updates) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, ...updates } : p));
    showToast('Project updated');
  };

  // Tasks
  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: `task_${Date.now()}`,
      status: taskData.status || 'To Do',
      isOverdue: false,
      photos: [],
      comments: [],
      issueReported: null
    };
    setTasks(prev => [newTask, ...prev]);
    const assignedUser = USERS.find(u => u.id === newTask.assignedTo);
    addNotification({
      title: 'New Task Assignment',
      description: `Assigned to ${assignedUser ? assignedUser.name : 'worker'}: "${newTask.title}"`,
      type: 'task',
      targetTab: 'tasks',
      targetTaskId: newTask.id
    });
    showToast('Task added to schedule');
    return newTask;
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          status: newStatus,
          isOverdue: newStatus === 'Completed' ? false : t.isOverdue
        };
      }
      return t;
    }));
    showToast(`Task moved to ${newStatus}`);
  };

  const addTaskComment = (taskId, commentText) => {
    const newComment = {
      id: `c_${Date.now()}`,
      author: currentUser.name,
      authorRole: currentUser.title,
      text: commentText,
      timestamp: 'Just now',
      avatar: currentUser.avatar
    };
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, comments: [...t.comments, newComment] };
      }
      return t;
    }));
    showToast('Comment added');
  };

  const reportTaskProblem = (taskId, issueText) => {
    const issueObj = {
      text: issueText,
      reportedBy: currentUser.name,
      timestamp: 'Just now'
    };
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, issueReported: issueObj };
      }
      return t;
    }));
    const targetTask = tasks.find(t => t.id === taskId);
    addNotification({
      title: 'Problem Reported on Task',
      description: `${currentUser.name} reported: "${issueText}" on "${targetTask?.title || 'task'}"`,
      type: 'issue',
      targetTab: 'tasks',
      targetTaskId: taskId
    });
    showToast('Problem reported to Project Manager', 'warning');
  };

  // Change Orders
  const addChangeOrder = (coData) => {
    const newCO = {
      ...coData,
      id: `co_${Date.now()}`,
      requestedDate: new Date().toISOString().split('T')[0],
      requestedBy: currentUser.name,
      status: 'Pending',
      attachments: coData.attachments || []
    };
    setChangeOrders(prev => [newCO, ...prev]);
    addNotification({
      title: 'New Change Order Requested',
      description: `"${newCO.title}" ($${Number(newCO.totalPrice).toLocaleString()}) awaits review.`,
      type: 'approval',
      targetTab: 'projects',
      targetProjectId: newCO.projectId,
      targetSection: 'changeOrders'
    });
    showToast('Change order submitted for review');
    return newCO;
  };

  const updateChangeOrderStatus = (coId, status) => {
    setChangeOrders(prev => prev.map(co => {
      if (co.id === coId) {
        return {
          ...co,
          status,
          approvedDate: status === 'Approved' ? new Date().toISOString().split('T')[0] : null
        };
      }
      return co;
    }));

    const targetCO = changeOrders.find(c => c.id === coId);
    if (targetCO && status === 'Approved') {
      // Adjust project budget
      setProjects(prev => prev.map(p => {
        if (p.id === targetCO.projectId) {
          return {
            ...p,
            estimatedBudget: p.estimatedBudget + Number(targetCO.totalPrice)
          };
        }
        return p;
      }));
    }

    showToast(`Change order marked as ${status}`);
  };

  // Photos
  const addPhoto = (photoData) => {
    const newPhoto = {
      ...photoData,
      id: `p_${Date.now()}`,
      uploader: currentUser.name,
      timestamp: 'Just now'
    };
    setPhotos(prev => [newPhoto, ...prev]);
    addNotification({
      title: 'New Site Photo Added',
      description: `${currentUser.name} uploaded photo for "${photoData.areaRef || 'site'}"`,
      type: 'photo',
      targetTab: 'projects',
      targetProjectId: photoData.projectId,
      targetSection: 'photos'
    });
    showToast('Photo uploaded successfully');
    return newPhoto;
  };

  // Daily Reports
  const addDailyReport = (reportData) => {
    const newReport = {
      ...reportData,
      id: `rep_${Date.now()}`,
      author: currentUser.name,
      authorRole: currentUser.title
    };
    setDailyReports(prev => [newReport, ...prev]);
    addNotification({
      title: 'Daily Report Submitted',
      description: `${currentUser.name} filed daily log (${reportData.hoursWorked} hrs).`,
      type: 'report',
      targetTab: 'projects',
      targetProjectId: reportData.projectId,
      targetSection: 'updates'
    });
    showToast('Daily report recorded');
    return newReport;
  };

  // Expenses
  const addExpense = (expenseData) => {
    const newExp = {
      ...expenseData,
      id: `exp_${Date.now()}`,
      amount: Number(expenseData.amount),
      recordedBy: currentUser.name,
      date: expenseData.date || new Date().toISOString().split('T')[0]
    };
    setExpenses(prev => [newExp, ...prev]);

    // Update actual cost on project
    setProjects(prev => prev.map(p => {
      if (p.id === expenseData.projectId) {
        const added = Number(expenseData.amount);
        const isLabor = expenseData.category === 'Labor';
        return {
          ...p,
          actualCost: p.actualCost + added,
          laborCost: isLabor ? p.laborCost + added : p.laborCost,
          materialCost: !isLabor ? p.materialCost + added : p.materialCost
        };
      }
      return p;
    }));

    showToast('Expense added and project budget updated');
    return newExp;
  };

  // Schedule
  const addScheduleJob = (jobData) => {
    const newJob = {
      ...jobData,
      id: `sch_${Date.now()}`,
      status: jobData.status || 'Scheduled'
    };
    setSchedule(prev => [...prev, newJob]);
    showToast('Job scheduled on calendar');
    return newJob;
  };

  const updateScheduleJob = (jobId, updates) => {
    setSchedule(prev => prev.map(j => j.id === jobId ? { ...j, ...updates } : j));
    showToast('Schedule updated');
  };

  // Documents
  const addDocument = (docData) => {
    const newDoc = {
      ...docData,
      id: `doc_${Date.now()}`,
      uploadDate: new Date().toISOString().split('T')[0],
      uploader: currentUser.name
    };
    setDocuments(prev => [newDoc, ...prev]);
    showToast('Document saved');
    return newDoc;
  };

  const removeDocument = (docId) => {
    setDocuments(prev => prev.filter(d => d.id !== docId));
    showToast('Document removed');
  };

  // Messages
  const sendMessage = (convId, text, imageUrl = null) => {
    const newMsg = {
      id: `m_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text,
      timestamp: 'Just now',
      date: new Date().toISOString().split('T')[0],
      ...(imageUrl ? { image: imageUrl } : {})
    };

    setMessages(prev => prev.map(c => {
      if (c.id === convId) {
        return {
          ...c,
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    }));
  };

  // Notifications
  const addNotification = (notif) => {
    const newNotif = {
      ...notif,
      id: `notif_${Date.now()}`,
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read');
  };

  // Quick navigation helper
  const navigateTo = ({ tab, projectId, projectTab, taskId, convId }) => {
    if (tab) setActiveTab(tab);
    if (projectId !== undefined) setSelectedProjectId(projectId);
    if (projectTab) setSelectedProjectTab(projectTab);
    if (taskId) setSelectedTaskId(taskId);
    if (convId) setActiveConvId(convId);
    setNotificationDrawerOpen(false);
  };

  // Reset demo data
  const resetDemoData = () => {
    localStorage.clear();
    setProjects(INITIAL_PROJECTS);
    setTasks(INITIAL_TASKS);
    setChangeOrders(INITIAL_CHANGE_ORDERS);
    setPhotos(INITIAL_PHOTOS);
    setDailyReports(INITIAL_DAILY_REPORTS);
    setSchedule(INITIAL_SCHEDULE);
    setDocuments(INITIAL_DOCUMENTS);
    setExpenses(INITIAL_EXPENSES);
    setMessages(INITIAL_MESSAGES);
    setNotifications(INITIAL_NOTIFICATIONS);
    showToast('Reset data to Chelsea PC initial state');
  };

  return (
    <AppContext.Provider
      value={{
        // Role & User
        currentRole,
        currentUserId,
        currentUser,
        switchRole,
        setCurrentUserId,

        // Navigation
        activeTab,
        setActiveTab,
        selectedProjectId,
        setSelectedProjectId,
        selectedProjectTab,
        setSelectedProjectTab,
        selectedTaskId,
        setSelectedTaskId,
        activeConvId,
        setActiveConvId,
        isDeviceFrame,
        setIsDeviceFrame,
        navigateTo,

        // Modals
        notificationDrawerOpen,
        setNotificationDrawerOpen,
        createProjectModalOpen,
        setCreateProjectModalOpen,
        createTaskModalOpen,
        setCreateTaskModalOpen,
        createTaskDefaults,
        setCreateTaskDefaults,
        dailyReportModalOpen,
        setDailyReportModalOpen,
        addExpenseModalOpen,
        setAddExpenseModalOpen,
        reportProblemModalOpen,
        setReportProblemModalOpen,
        problemTaskTarget,
        setProblemTaskTarget,
        scheduleJobModalOpen,
        setScheduleJobModalOpen,
        uploadPhotoModalOpen,
        setUploadPhotoModalOpen,
        uploadPhotoProjectId,
        setUploadPhotoProjectId,
        previewDocModal,
        setPreviewDocModal,
        roleModalOpen,
        setRoleModalOpen,

        // State Entities
        projects,
        tasks,
        changeOrders,
        photos,
        dailyReports,
        schedule,
        documents,
        expenses,
        messages,
        notifications,

        // Operations
        addProject,
        updateProject,
        addTask,
        updateTaskStatus,
        addTaskComment,
        reportTaskProblem,
        addChangeOrder,
        updateChangeOrderStatus,
        addPhoto,
        addDailyReport,
        addExpense,
        addScheduleJob,
        updateScheduleJob,
        addDocument,
        removeDocument,
        sendMessage,
        markNotificationRead,
        markAllNotificationsRead,
        showToast,
        toastMessage,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
