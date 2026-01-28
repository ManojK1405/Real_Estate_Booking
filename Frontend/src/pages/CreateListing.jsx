import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateListing = () => {
  const fileRef = useRef(null);
  const navigate = useNavigate();

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

  /* ---------- INPUT HANDLER ---------- */
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
      ...(id === 'offer' && !checked && { discountPrice: 0 }),
    }));
  };

  const handleTypeChange = (type) => {
    setFormData((prev) => ({ ...prev, type }));
  };

  /* ---------- FILE SELECT ---------- */
  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length + formData.imageUrls.length > 6) {
      setError('Maximum 6 images allowed');
      return;
    }

    setFiles(selectedFiles);
    setPreviewImages(selectedFiles.map((file) => URL.createObjectURL(file)));
  };

  /* ---------- UPLOAD ---------- */
  const handleUpload = async () => {
    if (files.length === 0) {
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
      const urls = results.map((img) => img.secure_url);

      setFormData((prev) => ({
        ...prev,
        imageUrls: prev.imageUrls.concat(urls),
      }));

      setFiles([]);
      setPreviewImages([]);
    } catch {
      setError('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.imageUrls.length === 0) {
      setError('At least one image required');
      return;
    }

    if (formData.offer && formData.discountPrice >= formData.regularPrice) {
      setError('Discount must be less than regular price');
      return;
    }

    try {
      const res = await fetch('http://localhost:4000/api/listing/create', {
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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Create Listing
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-10">
        {/* LEFT */}
        <div className="flex-1 flex flex-col gap-4">
          <input id="name" placeholder="Name" className="border p-3 rounded-lg" onChange={handleChange} required />
          <textarea id="description" placeholder="Description" className="border p-3 rounded-lg" onChange={handleChange} required />
          <input id="address" placeholder="Address" className="border p-3 rounded-lg" onChange={handleChange} required />

          <div className="flex gap-4 flex-wrap">
            <label><input type="checkbox" checked={formData.type === 'sell'} onChange={() => handleTypeChange('sell')} /> Sell</label>
            <label><input type="checkbox" checked={formData.type === 'rent'} onChange={() => handleTypeChange('rent')} /> Rent</label>
            <label><input type="checkbox" id="parking" onChange={handleChange} /> Parking</label>
            <label><input type="checkbox" id="furnished" onChange={handleChange} /> Furnished</label>
            <label><input type="checkbox" id="offer" onChange={handleChange} /> Offer</label>
          </div>

          <div className="flex gap-4">
            <input id="bedrooms" type="number" min="1" defaultValue={1} className="border p-3 rounded-lg w-20" onChange={handleChange} />
            <input id="bathrooms" type="number" min="1" defaultValue={1} className="border p-3 rounded-lg w-20" onChange={handleChange} />
          </div>

          <input id="regularPrice" type="number" placeholder="Regular Price" className="border p-3 rounded-lg w-40" onChange={handleChange} />

          {/* ✅ CONDITIONAL DISCOUNT */}
          {formData.offer && (
            <input
              id="discountPrice"
              type="number"
              placeholder="Discount Price"
              className="border p-3 rounded-lg w-40"
              onChange={handleChange}
            />
          )}
        </div>

        {/* RIGHT */}
        <div className="flex-1 flex flex-col gap-4">
          <input type="file" multiple accept="image/*" ref={fileRef} onChange={handleFileSelect} className="border p-3 rounded-lg" />

          <button type="button" onClick={handleUpload} disabled={uploading}
            className="border border-green-700 text-green-700 p-3 rounded-lg hover:bg-green-700 hover:text-white">
            {uploading ? 'Uploading...' : 'Upload Images'}
          </button>

          <div className="grid grid-cols-3 gap-4">
            {previewImages.map((src, index) => (
              <div key={index} className="relative">
                <img src={src} className="h-28 w-full object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => setPreviewImages((p) => p.filter((_, i) => i !== index))}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full h-6 w-6"
                >✕</button>
              </div>
            ))}
          </div>

          {error && <p className="text-red-600">{error}</p>}

          <button disabled={uploading} type="submit" className="bg-slate-700 text-white p-3 rounded-lg uppercase">
            Create Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateListing;
