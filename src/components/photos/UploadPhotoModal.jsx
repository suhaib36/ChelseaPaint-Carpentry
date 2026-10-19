import React, { useState } from 'react';
import { X, Camera, Image, Upload } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function UploadPhotoModal() {
  const {
    uploadPhotoModalOpen,
    setUploadPhotoModalOpen,
    uploadPhotoProjectId,
    setUploadPhotoProjectId,
    addPhoto,
    projects
  } = useApp();

  const sampleImages = [
    { label: 'Exterior Painting Prep', url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80' },
    { label: 'Historic Portico Detail', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80' },
    { label: 'Coffered Ceiling Framing', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80' },
    { label: 'Finished Woodwork & Enamel', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?w=800&auto=format&fit=crop&q=80' },
  ];

  const [formData, setFormData] = useState({
    projectId: uploadPhotoProjectId || (projects[0]?.id || ''),
    category: 'During',
    title: '',
    areaRef: '',
    url: sampleImages[0].url
  });

  if (!uploadPhotoModalOpen) return null;

  const currentProjId = uploadPhotoProjectId || formData.projectId || projects[0]?.id;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    addPhoto({
      projectId: currentProjId,
      category: formData.category,
      title: formData.title,
      areaRef: formData.areaRef || 'Main Job Site',
      url: formData.url
    });

    setFormData({
      projectId: projects[0]?.id || '',
      category: 'During',
      title: '',
      areaRef: '',
      url: sampleImages[0].url
    });
    setUploadPhotoModalOpen(false);
    setUploadPhotoProjectId(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Upload Site Photo</h3>
              <p className="text-[11px] text-slate-500">Document progress for owner & client</p>
            </div>
          </div>
          <button
            onClick={() => {
              setUploadPhotoModalOpen(false);
              setUploadPhotoProjectId(null);
            }}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto space-y-3.5 text-xs">
          {!uploadPhotoProjectId && (
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Target Project *</label>
              <select
                value={formData.projectId}
                onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500 bg-white"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} ({p.customer})</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Photo Category *</label>
            <div className="grid grid-cols-3 gap-2">
              {['Before', 'During', 'After'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat })}
                  className={`py-2 rounded-xl font-bold border transition-all ${
                    formData.category === cat
                      ? 'bg-chelsea-500 text-white border-chelsea-500 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Caption / Work Description *</label>
            <input
              type="text"
              required
              placeholder="e.g. Second coat of Emerald gloss applied to dental brackets"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Area Reference *</label>
            <input
              type="text"
              required
              placeholder="e.g. South Gable / Carriage House Eaves"
              value={formData.areaRef}
              onChange={(e) => setFormData({ ...formData, areaRef: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-chelsea-500"
            />
          </div>

          {/* Photo Selector & Preview */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1.5">Choose Simulated Photo Sample</label>
            <div className="grid grid-cols-2 gap-2 mb-2">
              {sampleImages.map((s, idx) => (
                <div
                  key={idx}
                  onClick={() => setFormData({ ...formData, url: s.url })}
                  className={`h-20 rounded-xl overflow-hidden border-2 cursor-pointer relative transition-all ${
                    formData.url === s.url ? 'border-chelsea-500 ring-2 ring-rose-200' : 'border-slate-200'
                  }`}
                >
                  <img src={s.url} alt={s.label} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-bold p-1 truncate">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Current Preview */}
            <div className="rounded-xl overflow-hidden border border-slate-200 h-32 relative bg-slate-100">
              <img src={formData.url} alt="Selected preview" className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                Preview ({formData.category})
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setUploadPhotoModalOpen(false);
                setUploadPhotoProjectId(null);
              }}
              className="flex-1 py-2 rounded-xl text-slate-600 font-semibold hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-xl text-white font-bold bg-chelsea-500 hover:bg-chelsea-600 shadow-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Save Photo</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
