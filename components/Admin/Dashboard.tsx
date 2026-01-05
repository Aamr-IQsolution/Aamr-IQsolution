/**
 * لوحة تحكم الإدارة (Dashboard CMS)؛ تتيح تعديل 
 * كل نصوص وصور الموقع وروابط العملاء في معرض الأعمال، 
 * بالإضافة إلى إدارة المسؤولين، الإعدادات العامة، وقسم التواصل والأسعار والخدمات وقسم من أنا.
 */
import React, { useState } from 'react';
import { useContent } from '../../contexts/ContentContext';
import { Language, TranslationData, GlobalSettings, AdminUser, UserRole, PricingTier, Service } from '../../types';
import * as LucideIcons from 'lucide-react';
import { 
  Save, RotateCcw, LogOut, Layout, Type, 
  Briefcase, Image, DollarSign, Globe, Plus, Trash2,
  Eye, History, Clock, CheckCircle, Palette, Users, Settings,
  ShieldCheck, Shield, Mail, MapPin, Link as LinkIcon, UserPlus, Key, ShieldAlert,
  Info, MessageSquare, PenTool, Star, ChevronDown, ChevronUp, HelpCircle, FileText
} from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
  onViewSite: () => void;
}

type Tab = 'hero' | 'about' | 'services' | 'portfolio' | 'pricing' | 'contact' | 'branding' | 'history' | 'users';

const Dashboard: React.FC<DashboardProps> = ({ onLogout, onViewSite }) => {
  const { 
    content, settings, snapshots, admins, currentUser, setCurrentUser,
    updateContent, updateSettings, restoreSnapshot, deleteSnapshot, updateAdmins, resetContent 
  } = useContent();
  
  const [selectedLang, setSelectedLang] = useState<Language>('nl');
  const [activeTab, setActiveTab] = useState<Tab>('hero');
  const [tempContent, setTempContent] = useState(content);
  const [tempSettings, setTempSettings] = useState(settings);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');
  
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    role: 'EDITOR' as UserRole,
    permissions: { editContent: true, editSettings: false, manageUsers: false }
  });

  const currentData = tempContent[selectedLang];

  const canEditContent = currentUser?.permissions.editContent || currentUser?.role === 'SUPER_ADMIN';
  const canEditSettings = currentUser?.permissions.editSettings || currentUser?.role === 'SUPER_ADMIN';
  const canManageUsers = currentUser?.role === 'SUPER_ADMIN';

  const handleSave = () => {
    updateContent(tempContent);
    updateSettings(tempSettings);
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const updateField = (section: keyof TranslationData, field: string, value: string) => {
    setTempContent(prev => ({
      ...prev,
      [selectedLang]: {
        ...prev[selectedLang],
        [section]: {
          ...prev[selectedLang][section],
          [field]: value
        }
      }
    }));
  };

  const updateNestedField = (path: string[], value: any) => {
    setTempContent(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData[selectedLang];
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newData;
    });
  };

  const updateSetting = (key: keyof GlobalSettings, value: string) => {
    setTempSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleAddAdmin = () => {
    if (!newUser.username || !newUser.password) return;
    const adminToAdd: AdminUser = {
      id: Math.random().toString(36).substr(2, 9),
      ...newUser
    };
    updateAdmins([...admins, adminToAdd]);
    setNewUser({
      username: '',
      password: '',
      role: 'EDITOR' as UserRole,
      permissions: { editContent: true, editSettings: false, manageUsers: false }
    });
    setIsAddingUser(false);
  };

  const handleDeleteAdmin = (id: string) => {
    if (id === currentUser?.id) return alert("You cannot delete yourself!");
    const updated = admins.filter(a => a.id !== id);
    updateAdmins(updated);
  };

  // Services Helpers
  const addService = () => {
    const newService: Service = {
      icon: 'Briefcase',
      title: 'New Service',
      description: 'Service description goes here.'
    };
    const currentItems = [...currentData.services.items, newService];
    updateNestedField(['services', 'items'], currentItems);
  };

  const removeService = (index: number) => {
    const currentItems = currentData.services.items.filter((_, i) => i !== index);
    updateNestedField(['services', 'items'], currentItems);
  };

  const updateServiceItemField = (index: number, field: keyof Service, value: string) => {
    const currentItems = [...currentData.services.items];
    currentItems[index] = { ...currentItems[index], [field]: value };
    updateNestedField(['services', 'items'], currentItems);
  };

  // Pricing Helpers
  const addTier = (category: 'social' | 'web') => {
    const newTier: PricingTier = {
      name: 'New Package',
      price: '€0',
      features: ['Feature 1'],
      isPopular: false,
      priceSuffix: category === 'social' ? 'p.m.' : 'one-time'
    };
    const currentTiers = [...currentData.pricing[category].tiers, newTier];
    updateNestedField(['pricing', category, 'tiers'], currentTiers);
  };

  const removeTier = (category: 'social' | 'web', index: number) => {
    const currentTiers = currentData.pricing[category].tiers.filter((_, i) => i !== index);
    updateNestedField(['pricing', category, 'tiers'], currentTiers);
  };

  const updateTierField = (category: 'social' | 'web', index: number, field: keyof PricingTier, value: any) => {
    const currentTiers = [...currentData.pricing[category].tiers];
    (currentTiers[index] as any)[field] = value;
    updateNestedField(['pricing', category, 'tiers'], currentTiers);
  };

  const addFeature = (category: 'social' | 'web', tierIndex: number) => {
    const currentTiers = [...currentData.pricing[category].tiers];
    currentTiers[tierIndex].features.push('New Feature');
    updateNestedField(['pricing', category, 'tiers'], currentTiers);
  };

  const removeFeature = (category: 'social' | 'web', tierIndex: number, featureIndex: number) => {
    const currentTiers = [...currentData.pricing[category].tiers];
    currentTiers[tierIndex].features = currentTiers[tierIndex].features.filter((_, i) => i !== featureIndex);
    updateNestedField(['pricing', category, 'tiers'], currentTiers);
  };

  const updateFeature = (category: 'social' | 'web', tierIndex: number, featureIndex: number, value: string) => {
    const currentTiers = [...currentData.pricing[category].tiers];
    currentTiers[tierIndex].features[featureIndex] = value;
    updateNestedField(['pricing', category, 'tiers'], currentTiers);
  };

  const renderTabs = () => {
    const tabs = [
      { id: 'hero', icon: Layout, label: 'Hero Content', restricted: !canEditContent },
      { id: 'branding', icon: Settings, label: 'Settings & Info', restricted: !canEditSettings },
      { id: 'about', icon: Type, label: 'About', restricted: !canEditContent },
      { id: 'services', icon: Briefcase, label: 'Services', restricted: !canEditContent },
      { id: 'portfolio', icon: Image, label: 'Portfolio', restricted: !canEditContent },
      { id: 'pricing', icon: DollarSign, label: 'Pricing & Plans', restricted: !canEditContent },
      { id: 'contact', icon: MessageSquare, label: 'Contact Section', restricted: !canEditContent },
      { id: 'users', icon: Users, label: 'Admins', restricted: !canManageUsers },
      { id: 'history', icon: History, label: 'History', restricted: !canEditContent },
    ];

    return (
      <div className="flex overflow-x-auto gap-2 mb-6 border-b border-slate-700 pb-2 scrollbar-hide">
        {tabs.map(tab => !tab.restricted && (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === tab.id 
                ? 'bg-brand-primary text-white' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>
    );
  };

  const renderPricingManager = (category: 'social' | 'web') => {
    const categoryData = currentData.pricing[category];
    return (
      <div className="space-y-6 mt-10">
        <div className="flex justify-between items-center bg-slate-800/60 p-4 rounded-xl border border-slate-700">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                 <Star className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold">{category === 'social' ? 'Social Media Plans' : 'Web Design Plans'}</h4>
                <p className="text-slate-500 text-xs">Manage tiers for this category</p>
              </div>
           </div>
           <button 
             onClick={() => addTier(category)}
             className="flex items-center gap-2 bg-brand-primary/20 hover:bg-brand-primary text-brand-primary hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
           >
             <Plus className="w-4 h-4" /> Add Package
           </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {categoryData.tiers.map((tier, tIdx) => (
            <div key={tIdx} className={`bg-slate-900 border ${tier.isPopular ? 'border-brand-primary/50' : 'border-slate-800'} p-6 rounded-2xl relative group`}>
              <div className="absolute top-4 right-4 flex items-center gap-2">
                 <button 
                   onClick={() => updateTierField(category, tIdx, 'isPopular', !tier.isPopular)}
                   className={`p-2 rounded-lg transition-all ${tier.isPopular ? 'bg-brand-primary text-white' : 'bg-slate-800 text-slate-500 hover:text-white'}`}
                   title="Toggle Popular Status"
                 >
                   <Star className="w-4 h-4" />
                 </button>
                 <button 
                   onClick={() => removeTier(category, tIdx)}
                   className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                 >
                   <Trash2 className="w-4 h-4" />
                 </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <InputGroup label="Package Name" value={tier.name} onChange={(v) => updateTierField(category, tIdx, 'name', v)} />
                <InputGroup label="Price" value={tier.price} onChange={(v) => updateTierField(category, tIdx, 'price', v)} />
                <InputGroup label="Price Suffix" value={tier.priceSuffix || ''} onChange={(v) => updateTierField(category, tIdx, 'priceSuffix', v)} placeholder="e.g. p.m. or one-time" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Features List</label>
                  <button 
                    onClick={() => addFeature(category, tIdx)}
                    className="text-brand-primary hover:text-brand-secondary text-xs font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Feature
                  </button>
                </div>
                <div className="space-y-3">
                  {tier.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex gap-2">
                      <input 
                        type="text" 
                        value={feature} 
                        onChange={(e) => updateFeature(category, tIdx, fIdx, e.target.value)}
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-brand-primary outline-none"
                      />
                      <button 
                        onClick={() => removeFeature(category, tIdx, fIdx)}
                        className="p-2 text-slate-600 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderServicesManager = () => {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="bg-slate-800/40 p-6 rounded-xl border border-slate-700">
           <h3 className="text-white font-bold mb-6 flex items-center gap-2">
             <Type className="w-4 h-4 text-brand-primary" /> Section Info
           </h3>
           <InputGroup label="Section Title" value={currentData.services.title} onChange={(v) => updateField('services', 'title', v)} />
        </div>

        <div className="flex justify-between items-center">
           <h3 className="text-xl font-bold text-white">Service Items</h3>
           <button 
             onClick={addService}
             className="flex items-center gap-2 bg-brand-primary hover:bg-brand-secondary text-white px-4 py-2 rounded-lg font-bold transition-all shadow-lg"
           >
             <Plus className="w-4 h-4" /> Add New Service
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentData.services.items.map((service, sIdx) => {
            const IconComp = (LucideIcons as any)[service.icon] || HelpCircle;
            return (
              <div key={sIdx} className="bg-slate-800/60 border border-slate-700 p-6 rounded-2xl relative group shadow-xl transition-all hover:border-brand-primary/30">
                <button 
                  onClick={() => removeService(sIdx)}
                  className="absolute top-4 right-4 p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-brand-primary border border-slate-700">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <InputGroup 
                      label="Lucide Icon Name" 
                      value={service.icon} 
                      onChange={(v) => updateServiceItemField(sIdx, 'icon', v)} 
                      placeholder="e.g. Monitor, Share2, Zap..."
                    />
                  </div>
                </div>

                <InputGroup label="Service Title" value={service.title} onChange={(v) => updateServiceItemField(sIdx, 'title', v)} />
                <InputGroup label="Description" value={service.description} onChange={(v) => updateServiceItemField(sIdx, 'description', v)} type="textarea" rows={3} />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'hero':
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-4">Hero Section Content</h3>
            <InputGroup label="Main Catchy Title" value={currentData.hero.title} onChange={(v) => updateField('hero', 'title', v)} />
            <InputGroup label="Engaging Subtitle" value={currentData.hero.subtitle} onChange={(v) => updateField('hero', 'subtitle', v)} type="textarea" />
            <InputGroup label="CTA Button Text" value={currentData.hero.cta} onChange={(v) => updateField('hero', 'cta', v)} />
          </div>
        );
      case 'about':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-slate-800/40 p-6 rounded-xl border border-slate-700">
               <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                 <FileText className="w-4 h-4 text-brand-primary" /> About Section Content
               </h3>
               <InputGroup label="Section Title" value={currentData.about.title} onChange={(v) => updateField('about', 'title', v)} />
               <InputGroup label="About Content Text" value={currentData.about.content} onChange={(v) => updateField('about', 'content', v)} type="textarea" rows={6} />
            </div>
          </div>
        );
      case 'services':
        return renderServicesManager();
      case 'pricing':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-slate-800/40 p-6 rounded-xl border border-slate-700">
               <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                 <Type className="w-4 h-4 text-brand-primary" /> Pricing Header & Intro
               </h3>
               <InputGroup label="Main Section Title" value={currentData.pricing.title} onChange={(v) => updateField('pricing', 'title', v)} />
               <InputGroup label="Section Subtitle" value={currentData.pricing.subtitle} onChange={(v) => updateField('pricing', 'subtitle', v)} type="textarea" />
            </div>

            <div className="bg-slate-800/40 p-6 rounded-xl border border-slate-700">
               <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                 <Star className="w-4 h-4 text-brand-secondary" /> Group Titles
               </h3>
               <div className="grid md:grid-cols-2 gap-4">
                 <InputGroup label="Social Media Group Title" value={currentData.pricing.social.title} onChange={(v) => {
                   const newData = {...currentData.pricing.social, title: v};
                   updateNestedField(['pricing', 'social'], newData);
                 }} />
                 <InputGroup label="Web Design Group Title" value={currentData.pricing.web.title} onChange={(v) => {
                   const newData = {...currentData.pricing.web, title: v};
                   updateNestedField(['pricing', 'web'], newData);
                 }} />
               </div>
            </div>

            {renderPricingManager('social')}
            {renderPricingManager('web')}
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-slate-800/40 p-6 rounded-xl border border-slate-700">
               <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                 <Type className="w-4 h-4 text-brand-primary" /> Section Titles
               </h3>
               <div className="grid md:grid-cols-2 gap-4">
                 <InputGroup label="Main Section Title" value={currentData.contact.title} onChange={(v) => updateField('contact', 'title', v)} />
                 <InputGroup label="Info Sidebar Title" value={currentData.contact.infoTitle} onChange={(v) => updateField('contact', 'infoTitle', v)} />
               </div>
            </div>

            <div className="bg-slate-800/40 p-6 rounded-xl border border-slate-700">
               <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                 <PenTool className="w-4 h-4 text-brand-secondary" /> Form Labels & Buttons
               </h3>
               <InputGroup label="Form Header Title" value={currentData.contact.formTitle} onChange={(v) => updateField('contact', 'formTitle', v)} />
               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                 <InputGroup label="Name Input Label" value={currentData.contact.name} onChange={(v) => updateField('contact', 'name', v)} />
                 <InputGroup label="Email Input Label" value={currentData.contact.email} onChange={(v) => updateField('contact', 'email', v)} />
                 <InputGroup label="Message Input Label" value={currentData.contact.message} onChange={(v) => updateField('contact', 'message', v)} />
                 <InputGroup label="Submit Button Text" value={currentData.contact.send} onChange={(v) => updateField('contact', 'send', v)} />
               </div>
            </div>
          </div>
        );
      case 'branding':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-slate-800/40 p-6 rounded-xl border border-slate-700">
              <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                <Globe className="w-4 h-4 text-brand-primary" /> Site Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <InputGroup label="Site Main Title" value={tempSettings.siteTitle} onChange={(v) => updateSetting('siteTitle', v)} />
                <InputGroup label="Official Contact Email" value={tempSettings.contactEmail} onChange={(v) => updateSetting('contactEmail', v)} />
              </div>
              <InputGroup label="Physical Location / Office Address" value={tempSettings.location} onChange={(v) => updateSetting('location', v)} />
            </div>

            <div className="bg-slate-800/40 p-6 rounded-xl border border-slate-700">
              <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                <Palette className="w-4 h-4 text-brand-secondary" /> Branding & Assets
              </h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <InputGroup label="Logo URL" value={tempSettings.logoUrl} onChange={(v) => updateSetting('logoUrl', v)} />
                  <div className="h-20 bg-slate-900 rounded-lg flex items-center justify-center p-2 border border-slate-700">
                    <img src={tempSettings.logoUrl} className="max-h-full object-contain" alt="Logo Preview" />
                  </div>
                </div>
                <div>
                  <InputGroup label="Hero Image URL" value={tempSettings.heroImageUrl} onChange={(v) => updateSetting('heroImageUrl', v)} />
                  <div className="h-20 bg-slate-900 rounded-lg flex items-center justify-center p-2 border border-slate-700">
                    <img src={tempSettings.heroImageUrl} className="max-h-full object-contain" alt="Hero Preview" />
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                   <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Primary Color</label>
                   <div className="flex gap-2">
                     <input type="color" value={tempSettings.primaryColor} onChange={(e) => updateSetting('primaryColor', e.target.value)} className="w-12 h-12 bg-transparent border-0 cursor-pointer" />
                     <input type="text" value={tempSettings.primaryColor} onChange={(e) => updateSetting('primaryColor', e.target.value)} className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white" />
                   </div>
                </div>
                <div>
                   <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Secondary Color</label>
                   <div className="flex gap-2">
                     <input type="color" value={tempSettings.secondaryColor} onChange={(e) => updateSetting('secondaryColor', e.target.value)} className="w-12 h-12 bg-transparent border-0 cursor-pointer" />
                     <input type="text" value={tempSettings.secondaryColor} onChange={(e) => updateSetting('secondaryColor', e.target.value)} className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white" />
                   </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white">Manage Team Members</h3>
                <p className="text-slate-500 text-sm">Create and manage access levels for your agency team.</p>
              </div>
              {!isAddingUser && (
                <button 
                  onClick={() => setIsAddingUser(true)}
                  className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/80 text-white px-4 py-2 rounded-lg font-bold transition-all"
                >
                  <UserPlus className="w-4 h-4" /> Add New Admin
                </button>
              )}
            </div>

            {isAddingUser && (
              <div className="bg-slate-800 border border-brand-primary/30 p-6 rounded-xl space-y-4 shadow-2xl animate-scale-in">
                <h4 className="text-white font-bold flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand-primary" /> New Admin Details
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <InputGroup label="Username" value={newUser.username} onChange={(v) => setNewUser({...newUser, username: v})} />
                  <InputGroup label="Password" value={newUser.password} onChange={(v) => setNewUser({...newUser, password: v})} />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Assign Role</label>
                    <select 
                      value={newUser.role}
                      onChange={(e) => {
                        const role = e.target.value as UserRole;
                        const perms = role === 'SUPER_ADMIN' 
                          ? { editContent: true, editSettings: true, manageUsers: true }
                          : role === 'MANAGER'
                          ? { editContent: true, editSettings: true, manageUsers: false }
                          : { editContent: true, editSettings: false, manageUsers: false };
                        setNewUser({...newUser, role, permissions: perms});
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-brand-primary focus:outline-none"
                    >
                      <option value="SUPER_ADMIN">Owner (Full Control)</option>
                      <option value="MANAGER">Manager (Content & Settings)</option>
                      <option value="EDITOR">Editor (Content Only)</option>
                    </select>
                  </div>
                  <div className="flex items-end gap-3">
                    <button 
                      onClick={handleAddAdmin}
                      className="flex-1 bg-brand-primary text-white font-bold py-3 rounded-xl hover:bg-brand-secondary transition-all"
                    >
                      Create User
                    </button>
                    <button 
                      onClick={() => setIsAddingUser(false)}
                      className="flex-1 bg-slate-700 text-white font-bold py-3 rounded-xl hover:bg-slate-600 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid gap-4">
              {admins.map((admin) => (
                <div key={admin.id} className="bg-slate-800/50 border border-slate-700 p-5 rounded-xl flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      admin.role === 'SUPER_ADMIN' ? 'bg-brand-primary/20 text-brand-primary' : 
                      admin.role === 'MANAGER' ? 'bg-brand-secondary/20 text-brand-secondary' : 
                      'bg-slate-700 text-slate-400'
                    }`}>
                      {admin.role === 'SUPER_ADMIN' ? <ShieldCheck className="w-6 h-6" /> : <Shield className="w-6 h-6" />}
                    </div>
                    <div>
                      <h4 className="text-white font-bold flex items-center gap-2">
                        {admin.username}
                        {admin.id === currentUser?.id && <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded text-slate-300">You</span>}
                      </h4>
                      <p className="text-slate-400 text-xs uppercase tracking-widest">{admin.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-3">
                      <PermissionBadge label="Content" active={admin.permissions.editContent} />
                      <PermissionBadge label="Settings" active={admin.permissions.editSettings} />
                      <PermissionBadge label="Users" active={admin.permissions.manageUsers} />
                    </div>
                    <button 
                      onClick={() => handleDeleteAdmin(admin.id)}
                      disabled={admin.id === currentUser?.id}
                      className={`p-2 rounded-lg transition-all ${
                        admin.id === currentUser?.id 
                          ? 'text-slate-700 cursor-not-allowed' 
                          : 'text-slate-500 hover:text-red-500 hover:bg-red-500/10'
                      }`}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'portfolio':
        return (
          <div className="space-y-8 animate-fade-in">
             <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Portfolio Items</h3>
              <button onClick={() => {
                   const newItems = [...currentData.portfolio.items, { image: 'https://picsum.photos/600/400', title: 'New Project', category: 'Web', link: '#' }];
                   updateNestedField(['portfolio', 'items'], newItems);
                }} className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded-md text-sm">
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>
            <InputGroup label="Section Header" value={currentData.portfolio.title} onChange={(v) => updateField('portfolio', 'title', v)} />
            <div className="grid md:grid-cols-2 gap-6">
              {currentData.portfolio.items.map((item, idx) => (
                <div key={idx} className="bg-slate-800 p-6 rounded-xl border border-slate-700 relative group shadow-xl">
                   <button onClick={() => {
                      const newItems = currentData.portfolio.items.filter((_, i) => i !== idx);
                      updateNestedField(['portfolio', 'items'], newItems);
                    }} className="absolute top-4 right-4 text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="space-y-4">
                     <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden border border-slate-700 flex items-center justify-center p-4">
                       <img src={item.image} className="max-h-full object-contain" alt="preview" />
                     </div>
                     <InputGroup label="Project Name" value={item.title} onChange={(v) => {
                      const newItems = [...currentData.portfolio.items];
                      newItems[idx].title = v;
                      updateNestedField(['portfolio', 'items'], newItems);
                    }} />
                     <InputGroup label="Category Tag" value={item.category} onChange={(v) => {
                      const newItems = [...currentData.portfolio.items];
                      newItems[idx].category = v;
                      updateNestedField(['portfolio', 'items'], newItems);
                    }} />
                     <InputGroup label="External Link (URL)" value={item.link || ''} placeholder="https://..." onChange={(v) => {
                      const newItems = [...currentData.portfolio.items];
                      newItems[idx].link = v;
                      updateNestedField(['portfolio', 'items'], newItems);
                    }} />
                     <InputGroup label="Image URL" value={item.image} onChange={(v) => {
                      const newItems = [...currentData.portfolio.items];
                      newItems[idx].image = v;
                      updateNestedField(['portfolio', 'items'], newItems);
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'history':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Version History</h3>
              <p className="text-slate-500 text-sm">Restore previous site states (up to 10 snapshots).</p>
            </div>
            {snapshots.length === 0 ? (
               <div className="bg-slate-800/50 p-12 rounded-xl text-center border border-slate-700 border-dashed">
                  <Clock className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                  <p className="text-slate-500">No backup snapshots found yet. Snapshots are created when you save changes.</p>
               </div>
            ) : (
              <div className="space-y-3">
                {snapshots.map((s) => (
                  <div key={s.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-400">
                          <History className="w-5 h-5" />
                       </div>
                       <div>
                          <p className="text-white font-medium">{new Date(s.timestamp).toLocaleString()}</p>
                          <p className="text-slate-500 text-xs">Snapshot ID: {s.id}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <button 
                         onClick={() => { if(confirm("Restore this version?")) restoreSnapshot(s.id); }}
                         className="flex items-center gap-2 bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
                       >
                         <RotateCcw className="w-4 h-4" /> Restore
                       </button>
                       <button 
                         onClick={() => deleteSnapshot(s.id)}
                         className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                       >
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-white font-bold mb-4 capitalize">{activeTab} Section</h3>
            <InputGroup label="Section Title" value={(currentData as any)[activeTab]?.title || ''} onChange={(v) => updateField(activeTab as any, 'title', v)} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-slate-800">
           <div className="flex items-center gap-3">
              <img src={settings.logoUrl} className="w-8 h-8 object-contain" alt="Logo" />
              <h1 className="font-bold text-white text-lg tracking-tight">AmA Admin</h1>
           </div>
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto scrollbar-hide">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 block">Languages</label>
          <div className="space-y-1 mb-8">
             {(['nl', 'en', 'ar'] as Language[]).map(lang => (
                <button
                  key={lang}
                  onClick={() => setSelectedLang(lang)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${
                    selectedLang === lang ? 'bg-brand-primary text-white font-bold' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span>{lang === 'nl' ? '🇳🇱 Dutch' : lang === 'en' ? '🇺🇸 English' : '🇦🇪 العربية'}</span>
                  {selectedLang === lang && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                </button>
             ))}
          </div>

          <div className="mt-auto pt-8 border-t border-slate-800 space-y-2">
            <button onClick={onViewSite} className="w-full flex items-center gap-3 text-slate-400 hover:text-white px-3 py-2 text-sm transition-colors group">
              <Eye className="w-4 h-4 group-hover:text-brand-primary" /> View Site
            </button>
            <button onClick={() => { setCurrentUser(null); onLogout(); }} className="w-full flex items-center gap-3 text-slate-400 hover:text-white px-3 py-2 text-sm transition-colors group">
              <LogOut className="w-4 h-4 group-hover:text-red-400" /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 z-20">
          <div className="flex items-center gap-4">
             <div className="p-2 bg-slate-800 rounded-lg text-brand-primary">
                {activeTab === 'users' ? <Users className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
             </div>
             <h2 className="text-white font-bold capitalize text-xl tracking-tight">{activeTab.replace('branding', 'Settings')}</h2>
          </div>
          <button 
            onClick={handleSave}
            disabled={activeTab === 'users' || activeTab === 'history'}
            className="flex items-center gap-2 bg-brand-primary hover:bg-brand-secondary active:scale-95 text-white px-8 py-2.5 rounded-xl font-bold transition-all shadow-xl shadow-brand-primary/10 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {saveStatus === 'saved' ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saveStatus === 'saved' ? 'Saved Successfully' : 'Save Changes'}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-brand-dark/50">
          <div className="max-w-5xl mx-auto pb-20">
            {renderTabs()}
            <div className="mt-8">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const PermissionBadge = ({ label, active }: { label: string, active: boolean }) => (
  <div className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tighter border ${
    active ? 'border-green-500/30 bg-green-500/10 text-green-400' : 'border-slate-700 bg-slate-800/50 text-slate-600'
  }`}>
    {active ? <CheckCircle className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
    {label}
  </div>
);

const InputGroup = ({ label, value, onChange, type = 'text', rows = 3, placeholder }: { label: string, value: string, onChange: (v: string) => void, type?: 'text' | 'textarea', rows?: number, placeholder?: string }) => (
  <div className="mb-6">
    <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{label}</label>
    {type === 'textarea' ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-brand-primary focus:outline-none transition-all placeholder:text-slate-700"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-brand-primary focus:outline-none transition-all placeholder:text-slate-700"
      />
    )}
  </div>
);

export default Dashboard;