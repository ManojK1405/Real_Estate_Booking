import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CreateListing = () => {
  const fileRef = useRef(null);
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    type: 'rent',
    parking: false,
    furnished: false,
    offer: false,
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountPrice: 0,
    imageUrls: [],
  });

  /* ================= CLEANUP PREVIEW URLs ================= */
  useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  /* ================= HANDLERS ================= */
  const handleChange = useCallback((e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
      ...(id === 'offer' && !checked && { discountPrice: 0 }),
    }));
  }, []);

  const handleTypeChange = useCallback((type) => {
    setFormData((prev) => ({ ...prev, type }));
  }, []);

  const handleFileSelect = useCallback((e) => {
    const selected = Array.from(e.target.files);
    if (selected.length + formData.imageUrls.length > 6) {
      setError('Maximum 6 images allowed');
      return;
    }

    setError('');
    setFiles(selected);

    const previews = selected.map((f) => URL.createObjectURL(f));
    setPreviewImages(previews);
  }, [formData.imageUrls.length]);

  /* ================= CLOUDINARY UPLOAD ================= */
  const handleUpload = async () => {
    if (!files.length) {
      setError('Please select images');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const uploaded = [];

      for (const file of files) {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'InfinityVillas');
        data.append('folder', 'listings');
        data.append('quality', 'auto');
        data.append('fetch_format', 'auto');

        const res = await fetch(
          'https://api.cloudinary.com/v1_1/dy0drp7ka/image/upload',
          { method: 'POST', body: data }
        );

        const img = await res.json();
        uploaded.push(img.secure_url);
      }

      setFormData((prev) => ({
        ...prev,
        imageUrls: prev.imageUrls.concat(uploaded),
      }));

      setFiles([]);
      setPreviewImages([]);
    } catch {
      setError('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.imageUrls.length) {
      setError('At least one image is required');
      return;
    }

    if (formData.offer && formData.discountPrice >= formData.regularPrice) {
      setError('Discount must be less than regular price');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/listing/create`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      navigate(`/listing/${data._id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-24">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-6"
      >
        {/* HEADER */}
        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold text-slate-800">
            Create a New Listing
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Well-presented listings attract better responses.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-14">
          {/* LEFT */}
          <div className="bg-white border rounded-3xl p-10 shadow-sm space-y-10">
            <Section title="Property Details">
              <Input id="name" label="Property Name" onChange={handleChange} />
              <Textarea id="description" label="Description" onChange={handleChange} />
              <Input id="address" label="Address / Location" onChange={handleChange} />
            </Section>

            <Section title="Listing Type">
              <div className="flex gap-4">
                {['rent', 'sell'].map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => handleTypeChange(t)}
                    className={`px-6 py-2.5 rounded-xl border font-medium transition ${
                      formData.type === t
                        ? 'bg-slate-800 text-white'
                        : 'hover:bg-slate-100'
                    }`}
                  >
                    {t === 'rent' ? 'For Rent' : 'For Sale'}
                  </button>
                ))}
              </div>
            </Section>

            <Section title="Features">
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  { id: 'parking', label: '🚗 Parking' },
                  { id: 'furnished', label: '🛋 Furnished' },
                  { id: 'offer', label: '🏷 Offer Available' },
                ].map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      id={item.id}
                      onChange={handleChange}
                      className="accent-slate-700"
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </Section>

            <Section title="Rooms">
              <div className="grid grid-cols-2 gap-6">
                <LabeledNumber id="bedrooms" icon="🛏" label="Bedrooms" onChange={handleChange} />
                <LabeledNumber id="bathrooms" icon="🛁" label="Bathrooms" onChange={handleChange} />
              </div>
            </Section>

            <Section title="Pricing">
              <Input id="regularPrice" label="Regular Price" type="number" onChange={handleChange} />
              {formData.offer && (
                <Input id="discountPrice" label="Discount Price" type="number" onChange={handleChange} />
              )}
            </Section>
          </div>

          {/* RIGHT */}
          <div className="bg-white border rounded-3xl p-10 shadow-sm space-y-8">
            <Section title="Property Images" subtitle="Upload up to 6 images">
              <input
                type="file"
                multiple
                accept="image/*"
                ref={fileRef}
                onChange={handleFileSelect}
                className="input"
              />

              <button
                type="button"
                onClick={handleUpload}
                disabled={uploading}
                className="w-full py-3 rounded-xl border border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition"
              >
                {uploading ? 'Uploading...' : 'Upload Images'}
              </button>

              <div className="grid grid-cols-3 gap-4">
                {previewImages.map((src, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.04 }}>
                    <img
                      src={src}
                      loading="lazy"
                      className="h-28 w-full object-cover rounded-xl"
                    />
                  </motion.div>
                ))}
              </div>
            </Section>

            {error && <p className="text-red-600">{error}</p>}

            <button
              disabled={uploading}
              type="submit"
              className="w-full py-4 rounded-2xl bg-slate-800 text-white font-medium"
            >
              Publish Listing
            </button>
          </div>
        </form>
      </motion.div>

      <style>{`
        .input {
          width: 100%;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
        }
      `}</style>
    </div>
  );
};

/* ================= UI COMPONENTS ================= */

const Section = ({ title, subtitle, children }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">{title}</h3>
    {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    {children}
  </div>
);

const Input = ({ id, label, type = 'text', onChange }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium">{label}</label>
    <input id={id} type={type} onChange={onChange} className="input" required />
  </div>
);

const Textarea = ({ id, label, onChange }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium">{label}</label>
    <textarea id={id} onChange={onChange} className="input h-28 resize-none" required />
  </div>
);

const LabeledNumber = ({ id, label, icon, onChange }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium flex items-center gap-2">
      <span>{icon}</span> {label}
    </label>
    <input id={id} type="number" min="1" defaultValue={1} onChange={onChange} className="input" />
  </div>
);

export default CreateListing;
