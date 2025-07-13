import React, { useState } from 'react';
import axios from 'axios';
import Navigation from './Navigation'; // Assuming you have a Navigation component

const CourseForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    courseKey: '',
    title: '',
    description: '',
    domain: '',
    instructor: '',
    thumbnailUrl: '',
    subtopics: [],
    finalQuizId: null,
    noOfEnrolledStudents: 0,
    tags: []
  });

  const [newSubtopic, setNewSubtopic] = useState({
    title: '',
    type: 'video',
    content: '',
    videoUrl: '',
    quizId: null
  });

  const [tagInput, setTagInput] = useState('');

  const handleChange = (e) => {
    const { name, value,type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type=== "number" ? Number(value) : value
    }));
  };

  const handleSubtopicChange = (e) => {
    const { name, value } = e.target;
    setNewSubtopic(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSubtopic = () => {
    setFormData(prev => ({
      ...prev,
      subtopics: [...prev.subtopics, newSubtopic]
    }));
    setNewSubtopic({ title: '', type: 'video', content: '', videoUrl: '', quizId: null });
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const cleanData = (data) => {
    const cleaned = {};
    for (const key in data) {
      if (Array.isArray(data[key])) {
        cleaned[key] = data[key];
      } else if (data[key] === '') {
        cleaned[key] = null;
      } else {
        cleaned[key] = data[key];
      }
    }
    return cleaned;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedFormData = cleanData(formData);
    axios.post('http://localhost:8080/api/courses/add', cleanedFormData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => alert('Course added!'))
    .catch((error) => {
      alert('Failed to add course.');
      console.error(error);
    });
  };

  return (
    <>
    <Navigation/>
    <form onSubmit={handleSubmit} className="p-4 max-w-2xl mx-auto bg-gray-100 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Course Form</h2>

      
      <input className="input" name="courseKey" placeholder="Course Key" onChange={handleChange} />
      <input className="input" name="title" placeholder="Course Title" onChange={handleChange} />
      <textarea className="input" name="description" placeholder="Description" onChange={handleChange} />
      <input className="input" name="domain" placeholder="Domain (e.g., backend)" onChange={handleChange} />
      <input className="input" name="instructor" placeholder="Instructor" onChange={handleChange} />
      <input className="input" name="thumbnailUrl" placeholder="Thumbnail URL" onChange={handleChange} />
      

      <div className="mb-4">
        <label className="block font-semibold">Tags</label>
        <div className="flex gap-2">
          <input className="input" value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="Add a tag" />
          <button type="button" className="btn" onClick={addTag}>Add Tag</button>
        </div>
        <div className="mt-2">{formData.tags.map((tag, idx) => <span key={idx} className="tag">{tag}</span>)}</div>
      </div>

      <hr className="my-4" />

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Add Subtopic</h3>
        <input className="input" name="title" placeholder="Subtopic Title" value={newSubtopic.title} onChange={handleSubtopicChange} />
        <select className="input" name="type" value={newSubtopic.type} onChange={handleSubtopicChange}>
          <option value="video">Video</option>
          <option value="article">Article</option>
        </select>
        <textarea className="input" name="content" placeholder="Content" value={newSubtopic.content} onChange={handleSubtopicChange} />
        <input className="input" name="videoUrl" placeholder="Video URL" value={newSubtopic.videoUrl} onChange={handleSubtopicChange} />
        <button type="button" className="btn" onClick={addSubtopic}>Add Subtopic</button>
        <div className="mt-2">{formData.subtopics.map((sub, idx) => (
          <div key={idx} className="p-2 bg-white rounded shadow mb-2">
            <strong>{sub.title}</strong> ({sub.type})
          </div>
        ))}</div>
      </div>

      <button type="submit" className="btn bg-green-500 text-white">Add Course</button>
    </form>
    </>
  );
};

export default CourseForm;
