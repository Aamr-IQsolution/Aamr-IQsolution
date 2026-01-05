/**
 * سياق المحتوى (Content Context)؛ يوفر مخزناً مركزياً لبيانات التطبيق، 
 * حيث يدير عمليات تحديث النصوص، حفظ الإعدادات العالمية، إدارة المسؤولين، 
 * والتعامل مع النسخ الاحتياطية (Snapshots) باستخدام LocalStorage.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { TranslationData, ContentSnapshot, GlobalSettings, AdminUser } from '../types';
import { TRANSLATIONS, INITIAL_SETTINGS } from '../constants';

interface ContentContextType {
  content: Record<string, TranslationData>;
  settings: GlobalSettings;
  snapshots: ContentSnapshot[];
  admins: AdminUser[];
  currentUser: AdminUser | null;
  setCurrentUser: (user: AdminUser | null) => void;
  updateContent: (newContent: Record<string, TranslationData>) => void;
  updateSettings: (newSettings: GlobalSettings) => void;
  restoreSnapshot: (snapshotId: string) => void;
  deleteSnapshot: (snapshotId: string) => void;
  updateAdmins: (newAdmins: AdminUser[]) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<Record<string, TranslationData>>(() => {
    const saved = localStorage.getItem('site_content');
    return saved ? JSON.parse(saved) : TRANSLATIONS;
  });

  const [settings, setSettings] = useState<GlobalSettings>(() => {
    const saved = localStorage.getItem('site_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [admins, setAdmins] = useState<AdminUser[]>(() => {
    const saved = localStorage.getItem('site_admins');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        username: 'admin',
        password: 'admin123',
        role: 'SUPER_ADMIN',
        permissions: { editContent: true, editSettings: true, manageUsers: true }
      }
    ];
  });

  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('site_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [snapshots, setSnapshots] = useState<ContentSnapshot[]>(() => {
    const saved = localStorage.getItem('site_snapshots');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (currentUser) {
       localStorage.setItem('site_current_user', JSON.stringify(currentUser));
    } else {
       localStorage.removeItem('site_current_user');
    }
  }, [currentUser]);

  // Apply colors dynamically
  useEffect(() => {
    document.documentElement.style.setProperty('--color-brand-primary', settings.primaryColor);
    document.documentElement.style.setProperty('--color-brand-secondary', settings.secondaryColor);
  }, [settings]);

  const updateContent = (newContent: Record<string, TranslationData>) => {
    createSnapshot();
    setContent(newContent);
    localStorage.setItem('site_content', JSON.stringify(newContent));
  };

  const updateSettings = (newSettings: GlobalSettings) => {
    createSnapshot();
    setSettings(newSettings);
    localStorage.setItem('site_settings', JSON.stringify(newSettings));
  };

  const updateAdmins = (newAdmins: AdminUser[]) => {
    setAdmins(newAdmins);
    localStorage.setItem('site_admins', JSON.stringify(newAdmins));
  };

  const createSnapshot = () => {
    const newSnapshot: ContentSnapshot = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      data: content,
      settings: settings
    };
    const updatedSnapshots = [newSnapshot, ...snapshots].slice(0, 10);
    setSnapshots(updatedSnapshots);
    localStorage.setItem('site_snapshots', JSON.stringify(updatedSnapshots));
  };

  const restoreSnapshot = (snapshotId: string) => {
    const snapshot = snapshots.find(s => s.id === snapshotId);
    if (snapshot) {
      setContent(snapshot.data);
      setSettings(snapshot.settings);
      localStorage.setItem('site_content', JSON.stringify(snapshot.data));
      localStorage.setItem('site_settings', JSON.stringify(snapshot.settings));
    }
  };

  const deleteSnapshot = (snapshotId: string) => {
    const updated = snapshots.filter(s => s.id !== snapshotId);
    setSnapshots(updated);
    localStorage.setItem('site_snapshots', JSON.stringify(updated));
  };

  const resetContent = () => {
    setContent(TRANSLATIONS);
    setSettings(INITIAL_SETTINGS);
    localStorage.removeItem('site_content');
    localStorage.removeItem('site_settings');
  };

  return (
    <ContentContext.Provider value={{ 
      content, settings, snapshots, admins, currentUser, 
      setCurrentUser, updateContent, updateSettings, 
      restoreSnapshot, deleteSnapshot, updateAdmins, resetContent 
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};