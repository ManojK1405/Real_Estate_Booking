// import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// const UpdateListing = () => {
//   const fileRef = useRef(null);
//   const navigate = useNavigate();
//   const { id } = useParams();

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

//   // store original data to detect changes
//   const [originalData, setOriginalData] = useState(null);

//   /* ================= FETCH LISTING ================= */
//   useEffect(() => {
//     const fetchListing = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:4000/api/listing/get/${id}`,
//           { credentials: 'include' }
//         );
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.message);

//         setFormData(data);
//         setPreviewImages(data.imageUrls);
//         setOriginalData(data);
//       } catch (err) {
//         navigate('/');
//       }
//     };

//     fetchListing();
//   }, [id, navigate]);

//   /* ================= INPUT HANDLER ================= */
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

//   /* ================= FILE SELECT ================= */
//   const handleFileSelect = (e) => {
//     const selectedFiles = Array.from(e.target.files);

//     if (selectedFiles.length + formData.imageUrls.length > 6) {
//       setError('Maximum 6 images allowed');
//       return;
//     }

//     setFiles(selectedFiles);
//     setPreviewImages((prev) => [
//       ...prev,
//       ...selectedFiles.map((file) => URL.createObjectURL(file)),
//     ]);
//   };

//   /* ================= UPLOAD IMAGES ================= */
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
//     } catch {
//       setError('Image upload failed');
//     } finally {
//       setUploading(false);
//     }
//   };

//   /* ================= REMOVE IMAGE ================= */
//   const handleRemoveImage = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       imageUrls: prev.imageUrls.filter((_, i) => i !== index),
//     }));
//     setPreviewImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   /* ================= CHANGE DETECTION ================= */
//   const isChanged =
//     originalData &&
//     (
//       formData.name !== originalData.name ||
//       formData.description !== originalData.description ||
//       formData.address !== originalData.address ||
//       formData.type !== originalData.type ||
//       formData.parking !== originalData.parking ||
//       formData.furnished !== originalData.furnished ||
//       formData.offer !== originalData.offer ||
//       formData.bedrooms !== originalData.bedrooms ||
//       formData.bathrooms !== originalData.bathrooms ||
//       formData.regularPrice !== originalData.regularPrice ||
//       formData.discountPrice !== originalData.discountPrice ||
//       formData.imageUrls.length !== originalData.imageUrls.length
//     );

//   /* ================= SUBMIT UPDATE ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isChanged) return;

//     if (formData.imageUrls.length === 0) {
//       setError('At least one image required');
//       return;
//     }

//     if (formData.offer && formData.discountPrice >= formData.regularPrice) {
//       setError('Discount must be less than regular price');
//       return;
//     }

//     try {
//       const res = await fetch(
//         `http://localhost:4000/api/listing/update/${id}`,
//         {
//           method: 'POST',
//           credentials: 'include',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(formData),
//         }
//       );

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
//         Update Listing
//       </h1>

//       <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-10">
//         {/* LEFT */}
//         <div className="flex-1 flex flex-col gap-4">
//           <input id="name" value={formData.name} onChange={handleChange} className="border p-3 rounded-lg" />
//           <textarea id="description" value={formData.description} onChange={handleChange} className="border p-3 rounded-lg" />
//           <input id="address" value={formData.address} onChange={handleChange} className="border p-3 rounded-lg" />

//           <div className="flex gap-4 flex-wrap">
//             <label><input type="checkbox" checked={formData.type === 'sell'} onChange={() => handleTypeChange('sell')} /> Sell</label>
//             <label><input type="checkbox" checked={formData.type === 'rent'} onChange={() => handleTypeChange('rent')} /> Rent</label>
//             <label><input type="checkbox" id="parking" checked={formData.parking} onChange={handleChange} /> Parking</label>
//             <label><input type="checkbox" id="furnished" checked={formData.furnished} onChange={handleChange} /> Furnished</label>
//             <label><input type="checkbox" id="offer" checked={formData.offer} onChange={handleChange} /> Offer</label>
//           </div>

//           <div className="flex gap-4">
//             <input id="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} className="border p-3 w-20 rounded-lg" />
//             <input id="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} className="border p-3 w-20 rounded-lg" />
//           </div>

//           <input id="regularPrice" type="number" value={formData.regularPrice} onChange={handleChange} className="border p-3 w-40 rounded-lg" />

//           {formData.offer && (
//             <input id="discountPrice" type="number" value={formData.discountPrice} onChange={handleChange} className="border p-3 w-40 rounded-lg" />
//           )}
//         </div>

//         {/* RIGHT */}
//         <div className="flex-1 flex flex-col gap-4">
//           <input type="file" multiple ref={fileRef} onChange={handleFileSelect} className="border p-3 rounded-lg" />

//           <button
//             type="button"
//             onClick={handleUpload}
//             disabled={uploading}
//             className="border border-green-700 text-green-700 p-3 rounded-lg"
//           >
//             {uploading ? 'Uploading...' : 'Upload Images'}
//           </button>

//           <div className="grid grid-cols-3 gap-4">
//             {previewImages.map((src, index) => (
//               <div key={index} className="relative">
//                 <img src={src} className="h-28 w-full object-cover rounded-lg" />
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveImage(index)}
//                   className="absolute top-1 right-1 bg-red-500 text-white h-6 w-6 rounded-full"
//                 >
//                   ✕
//                 </button>
//               </div>
//             ))}
//           </div>

//           {error && <p className="text-red-600">{error}</p>}

//           {/* ✅ Button always visible, disabled if no changes */}
//           <button
//             disabled={uploading || !isChanged}
//             className={`p-3 rounded-lg uppercase text-white
//               ${uploading || !isChanged
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : 'bg-slate-700 hover:opacity-90'
//               }`}
//           >
//             Update Listing
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateListing;


import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateListing = () => {
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const [files, setFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

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

  const [originalData, setOriginalData] = useState(null);

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/listing/get/${id}`,
          { credentials: 'include' }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        setFormData(data);
        setPreviewImages(data.imageUrls);
        setOriginalData(data);
      } catch {
        navigate('/');
      }
    };
    fetchListing();
  }, [id, navigate]);

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
    setPreviewImages((prev) => [
      ...prev,
      ...selected.map((f) => URL.createObjectURL(f)),
    ]);
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
    } catch {
      setError('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  /* ================= CHANGE DETECTION ================= */
  const isChanged =
    originalData &&
    JSON.stringify(
      { ...formData, imageUrls: formData.imageUrls }
    ) !==
      JSON.stringify(
        { ...originalData, imageUrls: originalData.imageUrls }
      );

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChanged) return;

    if (!formData.imageUrls.length) {
      setError('At least one image required');
      return;
    }

    if (formData.offer && formData.discountPrice >= formData.regularPrice) {
      setError('Discount must be less than regular price');
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:4000/api/listing/update/${id}`,
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
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-6"
      >
        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold text-slate-800">
            Update Listing
          </h1>
          <p className="mt-4 text-gray-600">
            Make changes carefully — they go live immediately.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid lg:grid-cols-2 gap-14"
        >
          {/* LEFT */}
          <Card title="Property Details">
            <Input id="name" label="Property Name" value={formData.name} onChange={handleChange} />
            <Textarea id="description" label="Description" value={formData.description} onChange={handleChange} />
            <Input id="address" label="Address / Location" value={formData.address} onChange={handleChange} />

            <Section title="Listing Type">
              <div className="flex gap-4">
                {['rent', 'sell'].map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => handleTypeChange(t)}
                    className={`px-6 py-2.5 rounded-xl border font-medium
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

            <Section title="Rooms">
              <div className="grid grid-cols-2 gap-6">
                <LabeledNumber id="bedrooms" icon="🛏" label="Bedrooms" value={formData.bedrooms} onChange={handleChange} />
                <LabeledNumber id="bathrooms" icon="🛁" label="Bathrooms" value={formData.bathrooms} onChange={handleChange} />
              </div>
            </Section>

            <Section title="Pricing">
              <Input id="regularPrice" label="Regular Price" type="number" value={formData.regularPrice} onChange={handleChange} />
              {formData.offer && (
                <Input id="discountPrice" label="Discount Price" type="number" value={formData.discountPrice} onChange={handleChange} />
              )}
            </Section>
          </Card>

          {/* RIGHT */}
          <Card title="Property Images">
            <input
              type="file"
              multiple
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
              {previewImages.map((src, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <img src={src} className="h-28 w-full object-cover rounded-xl" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-black/70 text-white
                    h-6 w-6 rounded-full"
                  >
                    ×
                  </button>
                </motion.div>
              ))}
            </div>

            {error && <p className="text-red-600">{error}</p>}

            <button
              disabled={uploading || !isChanged}
              className={`w-full py-4 rounded-2xl text-white font-medium
              ${
                uploading || !isChanged
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-slate-800 hover:opacity-90'
              }`}
            >
              Update Listing
            </button>
          </Card>
        </form>
      </motion.div>

      {/* UTIL */}
      <style>
        {`
          .input {
            width: 100%;
            border: 1px solid #e5e7eb;
            border-radius: 0.75rem;
            padding: 0.75rem 1rem;
          }
          .input:focus {
            outline: none;
            border-color: #64748b;
            box-shadow: 0 0 0 2px rgba(100,116,139,0.25);
          }
        `}
      </style>
    </div>
  );
};

/* ========== REUSABLE UI ========= */

const Card = ({ title, children }) => (
  <div className="bg-white border rounded-3xl p-10 shadow-sm space-y-8">
    <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
    {children}
  </div>
);

const Section = ({ title, children }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-slate-700">{title}</h3>
    {children}
  </div>
);

const Input = ({ id, label, type = 'text', value, onChange }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-gray-600">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className="input"
    />
  </div>
);

const Textarea = ({ id, label, value, onChange }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-gray-600">
      {label}
    </label>
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      className="input h-28 resize-none"
    />
  </div>
);

const LabeledNumber = ({ id, label, icon, value, onChange }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="flex items-center gap-2 text-sm font-medium text-gray-600">
      <span className="text-lg">{icon}</span>
      {label}
    </label>
    <input
      id={id}
      type="number"
      min="1"
      value={value}
      onChange={onChange}
      className="input"
    />
  </div>
);

export default UpdateListing;
