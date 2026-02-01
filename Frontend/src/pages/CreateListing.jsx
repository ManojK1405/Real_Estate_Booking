// import React, { useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const CreateListing = () => {
//   const fileRef = useRef(null);
//   const navigate = useNavigate();

//   const [files, setFiles] = useState([]);
//   const [previewImages, setPreviewImages] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState('');

//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     address: '',
//     type: 'rent',
//     parking: false,
//     furnished: false,
//     offer: false,
//     bedrooms: 1,
//     bathrooms: 1,
//     regularPrice: 0,
//     discountPrice: 0,
//     imageUrls: [],
//   });

//   /* ---------- INPUT HANDLER ---------- */
//   const handleChange = (e) => {
//     const { id, value, type, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [id]: type === 'checkbox' ? checked : value,
//       ...(id === 'offer' && !checked && { discountPrice: 0 }),
//     }));
//   };

//   const handleTypeChange = (type) => {
//     setFormData((prev) => ({ ...prev, type }));
//   };

//   /* ---------- FILE SELECT ---------- */
//   const handleFileSelect = (e) => {
//     const selectedFiles = Array.from(e.target.files);

//     if (selectedFiles.length + formData.imageUrls.length > 6) {
//       setError('Maximum 6 images allowed');
//       return;
//     }

//     setFiles(selectedFiles);
//     setPreviewImages(selectedFiles.map((file) => URL.createObjectURL(file)));
//   };

//   /* ---------- UPLOAD ---------- */
//   const handleUpload = async () => {
//     if (files.length === 0) {
//       setError('Please select images');
//       return;
//     }

//     setUploading(true);
//     setError('');

//     try {
//       const uploads = files.map((file) => {
//         const data = new FormData();
//         data.append('file', file);
//         data.append('upload_preset', 'InfinityVillas');

//         return fetch(
//           'https://api.cloudinary.com/v1_1/dy0drp7ka/image/upload',
//           { method: 'POST', body: data }
//         ).then((res) => res.json());
//       });

//       const results = await Promise.all(uploads);
//       const urls = results.map((img) => img.secure_url);

//       setFormData((prev) => ({
//         ...prev,
//         imageUrls: prev.imageUrls.concat(urls),
//       }));

//       setFiles([]);
//       setPreviewImages([]);
//     } catch {
//       setError('Image upload failed');
//     } finally {
//       setUploading(false);
//     }
//   };

//   /* ---------- SUBMIT ---------- */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.imageUrls.length === 0) {
//       setError('At least one image required');
//       return;
//     }

//     if (formData.offer && formData.discountPrice >= formData.regularPrice) {
//       setError('Discount must be less than regular price');
//       return;
//     }

//     try {
//       const res = await fetch('http://localhost:4000/api/listing/create', {
//         method: 'POST',
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       navigate(`/listing/${data._id}`);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-3xl font-semibold text-center mb-8">
//         Create Listing
//       </h1>

//       <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-10">
//         {/* LEFT */}
//         <div className="flex-1 flex flex-col gap-4">
//           <input id="name" placeholder="Name" className="border p-3 rounded-lg" onChange={handleChange} required />
//           <textarea id="description" placeholder="Description" className="border p-3 rounded-lg" onChange={handleChange} required />
//           <input id="address" placeholder="Address" className="border p-3 rounded-lg" onChange={handleChange} required />

//           <div className="flex gap-4 flex-wrap">
//             <label><input type="checkbox" checked={formData.type === 'sell'} onChange={() => handleTypeChange('sell')} /> Sell</label>
//             <label><input type="checkbox" checked={formData.type === 'rent'} onChange={() => handleTypeChange('rent')} /> Rent</label>
//             <label><input type="checkbox" id="parking" onChange={handleChange} /> Parking</label>
//             <label><input type="checkbox" id="furnished" onChange={handleChange} /> Furnished</label>
//             <label><input type="checkbox" id="offer" onChange={handleChange} /> Offer</label>
//           </div>

//           <div className="flex gap-4">
//             <input id="bedrooms" type="number" min="1" defaultValue={1} className="border p-3 rounded-lg w-20" onChange={handleChange} />
//             <input id="bathrooms" type="number" min="1" defaultValue={1} className="border p-3 rounded-lg w-20" onChange={handleChange} />
//           </div>

//           <input id="regularPrice" type="number" placeholder="Regular Price" className="border p-3 rounded-lg w-40" onChange={handleChange} />

//           {/* ✅ CONDITIONAL DISCOUNT */}
//           {formData.offer && (
//             <input
//               id="discountPrice"
//               type="number"
//               placeholder="Discount Price"
//               className="border p-3 rounded-lg w-40"
//               onChange={handleChange}
//             />
//           )}
//         </div>

//         {/* RIGHT */}
//         <div className="flex-1 flex flex-col gap-4">
//           <input type="file" multiple accept="image/*" ref={fileRef} onChange={handleFileSelect} className="border p-3 rounded-lg" />

//           <button type="button" onClick={handleUpload} disabled={uploading}
//             className="border border-green-700 text-green-700 p-3 rounded-lg hover:bg-green-700 hover:text-white">
//             {uploading ? 'Uploading...' : 'Upload Images'}
//           </button>

//           <div className="grid grid-cols-3 gap-4">
//             {previewImages.map((src, index) => (
//               <div key={index} className="relative">
//                 <img src={src} className="h-28 w-full object-cover rounded-lg" />
//                 <button
//                   type="button"
//                   onClick={() => setPreviewImages((p) => p.filter((_, i) => i !== index))}
//                   className="absolute top-1 right-1 bg-red-500 text-white rounded-full h-6 w-6"
//                 >✕</button>
//               </div>
//             ))}
//           </div>

//           {error && <p className="text-red-600">{error}</p>}

//           <button disabled={uploading} type="submit" className="bg-slate-700 text-white p-3 rounded-lg uppercase">
//             Create Listing
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateListing;

import React, { useRef, useState } from 'react';
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

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
      ...(id === 'offer' && !checked && { discountPrice: 0 }),
    }));
  };

  const handleTypeChange = (type) =>
    setFormData((prev) => ({ ...prev, type }));

  const handleFileSelect = (e) => {
    const selected = Array.from(e.target.files);
    if (selected.length + formData.imageUrls.length > 6) {
      setError('Maximum 6 images allowed');
      return;
    }
    setFiles(selected);
    setPreviewImages(selected.map((f) => URL.createObjectURL(f)));
  };

  const handleUpload = async () => {
    if (!files.length) {
      setError('Please select images');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const uploads = files.map((file) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'InfinityVillas');
        return fetch(
          'https://api.cloudinary.com/v1_1/dy0drp7ka/image/upload',
          { method: 'POST', body: data }
        ).then((res) => res.json());
      });

      const results = await Promise.all(uploads);
      setFormData((prev) => ({
        ...prev,
        imageUrls: prev.imageUrls.concat(
          results.map((img) => img.secure_url)
        ),
      }));

      setFiles([]);
      setPreviewImages([]);
    } catch {
      setError('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

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
      const res = await fetch(
        `${API_BASE}/api/listing/create`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

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
        {/* ================= HEADER ================= */}
        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold text-slate-800">
            Create a New Listing
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Share your property with clarity and confidence.
            Well-presented listings attract better responses.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid lg:grid-cols-2 gap-14"
        >
          {/* ================= LEFT COLUMN ================= */}
          <div className="bg-white border rounded-3xl p-10 shadow-sm space-y-10">

            {/* BASIC INFO */}
            <Section title="Property Details">
              <Input id="name" label="Property Name" onChange={handleChange} />
              <Textarea id="description" label="Description" onChange={handleChange} />
              <Input id="address" label="Address / Location" onChange={handleChange} />
            </Section>

            {/* TYPE */}
            <Section title="Listing Type">
              <div className="flex gap-4">
                {['rent', 'sell'].map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => handleTypeChange(t)}
                    className={`px-6 py-2.5 rounded-xl border font-medium transition
                    ${
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

            {/* FEATURES */}
            <Section title="Features">
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  { id: 'parking', label: '🚗 Parking' },
                  { id: 'furnished', label: '🛋 Furnished' },
                  { id: 'offer', label: '🏷 Offer Available' },
                ].map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-3 border rounded-xl px-4 py-3
                    hover:bg-slate-50 cursor-pointer"
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

            {/* ROOMS */}
            <Section title="Rooms">
              <div className="grid grid-cols-2 gap-6">
                <LabeledNumber
                  id="bedrooms"
                  icon="🛏"
                  label="Bedrooms"
                  onChange={handleChange}
                />
                <LabeledNumber
                  id="bathrooms"
                  icon="🛁"
                  label="Bathrooms"
                  onChange={handleChange}
                />
              </div>
            </Section>

            {/* PRICING */}
            <Section title="Pricing">
              <Input
                id="regularPrice"
                label="Regular Price"
                type="number"
                onChange={handleChange}
              />

              {formData.offer && (
                <Input
                  id="discountPrice"
                  label="Discount Price"
                  type="number"
                  onChange={handleChange}
                />
              )}
            </Section>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="bg-white border rounded-3xl p-10 shadow-sm space-y-8">
            <Section title="Property Images" subtitle="Upload up to 6 high-quality images">
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
                className="w-full py-3 rounded-xl border border-green-700
                text-green-700 hover:bg-green-700 hover:text-white transition"
              >
                {uploading ? 'Uploading...' : 'Upload Images'}
              </button>

              <div className="grid grid-cols-3 gap-4">
                {previewImages.map((src, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.04 }}
                    className="relative"
                  >
                    <img
                      src={src}
                      className="h-28 w-full object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setPreviewImages((p) =>
                          p.filter((_, index) => index !== i)
                        )
                      }
                      className="absolute top-1 right-1 bg-black/70
                      text-white h-6 w-6 rounded-full"
                    >
                      ×
                    </button>
                  </motion.div>
                ))}
              </div>
            </Section>

            {error && <p className="text-red-600">{error}</p>}

            <button
              disabled={uploading}
              type="submit"
              className="w-full py-4 rounded-2xl bg-slate-800
              text-white font-medium hover:opacity-90 transition"
            >
              Publish Listing
            </button>
          </div>
        </form>
      </motion.div>

      {/* ================= UTILS ================= */}
      <style>
        {`
          .input {
            width: 100%;
            border: 1px solid #e5e7eb;
            border-radius: 0.75rem;
            padding: 0.75rem 1rem;
            outline: none;
          }
          .input:focus {
            border-color: #64748b;
            box-shadow: 0 0 0 2px rgba(100,116,139,0.25);
          }
        `}
      </style>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const Section = ({ title, subtitle, children }) => (
  <div className="space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      )}
    </div>
    {children}
  </div>
);

const Input = ({ id, label, type = 'text', onChange }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-gray-600">
      {label}
    </label>
    <input
      id={id}
      type={type}
      onChange={onChange}
      className="input"
      required
    />
  </div>
);

const Textarea = ({ id, label, onChange }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-gray-600">
      {label}
    </label>
    <textarea
      id={id}
      onChange={onChange}
      className="input h-28 resize-none"
      required
    />
  </div>
);

const LabeledNumber = ({ id, label, icon, onChange }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-gray-600 flex items-center gap-2">
      <span className="text-lg">{icon}</span>
      {label}
    </label>
    <input
      id={id}
      type="number"
      min="1"
      defaultValue={1}
      onChange={onChange}
      className="input"
    />
  </div>
);

export default CreateListing;

