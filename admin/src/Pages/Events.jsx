import React, { useState } from 'react';
import axios from '../axios';

const Events = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const handleFileChange = (event) => {
    if (event.target.name === 'featuredImage') {
      setFeaturedImage(event.target.files[0]);
    } else if (event.target.name === 'gallery') {
      setGalleryImages(event.target.files);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('featuredImage', featuredImage);
    for (let i = 0; i < galleryImages.length; i++) {
      formData.append('gallery', galleryImages[i]);
    }

    try {
      await axios.post('/admin/add-event', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Clear form fields upon successful submission
      setTitle('');
      setDescription('');
      setPrice('');
      setFeaturedImage(null);
      setGalleryImages([]);
      alert('Event added successfully!');
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Error adding event. Please try again later.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl montserrat font-bold mb-6">Manage Events</h2>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" rows="4" required />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price:</label>
          <input type='number' id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" rows="4" required />
        </div>
        <div className="mb-4">
          <label htmlFor="featuredImage" className="block text-gray-700 font-bold mb-2">Featured Image:</label>
          <input type="file" id="featuredImage" name="featuredImage" onChange={handleFileChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="gallery" className="block text-gray-700 font-bold mb-2">Gallery Images:</label>
          <input type="file" id="gallery" name="gallery" multiple onChange={handleFileChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add Event</button>
      </form>
    </div>
  );
};

export default Events;



