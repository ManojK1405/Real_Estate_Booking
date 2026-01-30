import React, { useEffect, useRef, useState } from 'react';
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

  // store original data to detect changes
  const [originalData, setOriginalData] = useState(null);

  /* ================= FETCH LISTING ================= */
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
      } catch (err) {
        navigate('/');
      }
    };

    fetchListing();
  }, [id, navigate]);

  /* ================= INPUT HANDLER ================= */
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

  /* ================= FILE SELECT ================= */
  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length + formData.imageUrls.length > 6) {
      setError('Maximum 6 images allowed');
      return;
    }

    setFiles(selectedFiles);
    setPreviewImages((prev) => [
      ...prev,
      ...selectedFiles.map((file) => URL.createObjectURL(file)),
    ]);
  };

  /* ================= UPLOAD IMAGES ================= */
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
    } catch {
      setError('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  /* ================= REMOVE IMAGE ================= */
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
    (
      formData.name !== originalData.name ||
      formData.description !== originalData.description ||
      formData.address !== originalData.address ||
      formData.type !== originalData.type ||
      formData.parking !== originalData.parking ||
      formData.furnished !== originalData.furnished ||
      formData.offer !== originalData.offer ||
      formData.bedrooms !== originalData.bedrooms ||
      formData.bathrooms !== originalData.bathrooms ||
      formData.regularPrice !== originalData.regularPrice ||
      formData.discountPrice !== originalData.discountPrice ||
      formData.imageUrls.length !== originalData.imageUrls.length
    );

  /* ================= SUBMIT UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChanged) return;

    if (formData.imageUrls.length === 0) {
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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Update Listing
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-10">
        {/* LEFT */}
        <div className="flex-1 flex flex-col gap-4">
          <input id="name" value={formData.name} onChange={handleChange} className="border p-3 rounded-lg" />
          <textarea id="description" value={formData.description} onChange={handleChange} className="border p-3 rounded-lg" />
          <input id="address" value={formData.address} onChange={handleChange} className="border p-3 rounded-lg" />

          <div className="flex gap-4 flex-wrap">
            <label><input type="checkbox" checked={formData.type === 'sell'} onChange={() => handleTypeChange('sell')} /> Sell</label>
            <label><input type="checkbox" checked={formData.type === 'rent'} onChange={() => handleTypeChange('rent')} /> Rent</label>
            <label><input type="checkbox" id="parking" checked={formData.parking} onChange={handleChange} /> Parking</label>
            <label><input type="checkbox" id="furnished" checked={formData.furnished} onChange={handleChange} /> Furnished</label>
            <label><input type="checkbox" id="offer" checked={formData.offer} onChange={handleChange} /> Offer</label>
          </div>

          <div className="flex gap-4">
            <input id="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} className="border p-3 w-20 rounded-lg" />
            <input id="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} className="border p-3 w-20 rounded-lg" />
          </div>

          <input id="regularPrice" type="number" value={formData.regularPrice} onChange={handleChange} className="border p-3 w-40 rounded-lg" />

          {formData.offer && (
            <input id="discountPrice" type="number" value={formData.discountPrice} onChange={handleChange} className="border p-3 w-40 rounded-lg" />
          )}
        </div>

        {/* RIGHT */}
        <div className="flex-1 flex flex-col gap-4">
          <input type="file" multiple ref={fileRef} onChange={handleFileSelect} className="border p-3 rounded-lg" />

          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
            className="border border-green-700 text-green-700 p-3 rounded-lg"
          >
            {uploading ? 'Uploading...' : 'Upload Images'}
          </button>

          <div className="grid grid-cols-3 gap-4">
            {previewImages.map((src, index) => (
              <div key={index} className="relative">
                <img src={src} className="h-28 w-full object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white h-6 w-6 rounded-full"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {error && <p className="text-red-600">{error}</p>}

          {/* ✅ Button always visible, disabled if no changes */}
          <button
            disabled={uploading || !isChanged}
            className={`p-3 rounded-lg uppercase text-white
              ${uploading || !isChanged
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-slate-700 hover:opacity-90'
              }`}
          >
            Update Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateListing;
