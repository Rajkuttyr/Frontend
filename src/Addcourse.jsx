import React, { useState } from 'react';
import axios from 'axios';
import Navigation from './Navigation';

const CourseForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    courseKey: '',
    title: '',
    description: '',
    domain: '',
    instructor: '',
    thumbnailUrl: '',
    finalQuizId: null,
    noOfEnrolledStudents: 0,
    tags: [],
  });

  const [subtopics, setSubtopics] = useState([]);
  const [newSubtopic, setNewSubtopic] = useState({
    title: '',
    type: 'video',
    content: '',
    videoUrl: '',
    quizId: null
  });

  const [tagInput, setTagInput] = useState('');

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value
    }));
  };

  const handleSubtopicChange = async (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files.length > 0) {
      const file = files[0];
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      try {
        const response = await axios.post('http://localhost:8080/subtopics/upload/video', uploadFormData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          }
        });
        const uploadedUrl = response.data;
        setNewSubtopic(prev => ({
          ...prev,
          videoUrl: uploadedUrl
        }));
      } catch (err) {
        console.error("Video upload failed:", err);
      }
    } else {
      setNewSubtopic(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const addSubtopic = () => {
    setSubtopics(prev => [...prev, newSubtopic]);
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

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataThumbnail = new FormData();
    formDataThumbnail.append("file", file);

    axios.post('http://localhost:8080/courses/upload/thumbnail', formDataThumbnail, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(response => {
        const uploadedUrl = response.data;
        setFormData(prev => ({
          ...prev,
          thumbnailUrl: uploadedUrl
        }));
      })
      .catch(error => {
        console.log(`Error uploading thumbnail: ${error}`);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedFormData = cleanData(formData);

    try {
      const courseRes = await axios.post('http://localhost:8080/courses/add', cleanedFormData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        }
      });

      const courseId = courseRes.data.id || courseRes.data; // depends on backend response

      // Upload subtopics one by one
      for (const subtopic of subtopics) {
        await axios.post(`http://localhost:8080/subtopics/courseid/${courseId}/add`, subtopic, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
          }
        });
      }

      alert('Course and subtopics added successfully!');
      setFormData({
        id: '',
        courseKey: '',
        title: '',
        description: '',
        domain: '',
        instructor: '',
        thumbnailUrl: '',
        finalQuizId: null,
        noOfEnrolledStudents: 0,
        tags: []
      });
      setNewSubtopic({ title: '', type: 'video', content: '', videoUrl: '', quizId: null });
      setTagInput('');
      setSubtopics([]);
    } catch (err) {
      console.error("Error submitting course or subtopics:", err);
      alert("Failed to add course or subtopics.");
    }
  };

  return (
    <>
      <Navigation />
      <form onSubmit={handleSubmit} className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Course</h2>

        <div className="grid grid-cols-1 gap-4">
          <input className="input-field" name="courseKey" placeholder="Course Key" onChange={handleChange} />
          <input className="input-field" name="title" placeholder="Course Title" onChange={handleChange} />
          <textarea className="input-field" name="description" placeholder="Description" onChange={handleChange} />
          <input className="input-field" name="domain" placeholder="Domain (e.g., backend)" onChange={handleChange} />
          <input className="input-field" name="instructor" placeholder="Instructor" onChange={handleChange} />
          <input type="file" name="thumbnail" onChange={handleThumbnailChange} className="file-input" />
        </div>

        <div className="mt-6">
          <label className="block font-semibold mb-1">Tags</label>
          <div className="flex gap-2">
            <input className="input-field flex-1" value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="Add a tag" />
            <button type="button" className="btn" onClick={addTag}>Add</button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.tags.map((tag, idx) => (
              <span key={idx} className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-sm">{tag}</span>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold mb-2">Add Subtopic</h3>
          <input className="input-field" name="title" placeholder="Subtopic Title" value={newSubtopic.title} onChange={handleSubtopicChange} />
          <select className="input-field" name="type" value={newSubtopic.type} onChange={handleSubtopicChange}>
            <option value="video">Video</option>
            <option value="article">Article</option>
          </select>
          <textarea className="input-field" name="content" placeholder="Content" value={newSubtopic.content} onChange={handleSubtopicChange} />
          <input type="file" name="videoUrl" accept="video/*" onChange={handleSubtopicChange} className="file-input" />
          {newSubtopic.videoUrl && (
            <video src={newSubtopic.videoUrl} controls className="mt-2 w-full rounded shadow" />
          )}
          <button type="button" className="btn mt-3" onClick={addSubtopic}>Add Subtopic</button>

          <div className="mt-4">
            {subtopics.map((sub, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded shadow mb-2">
                <strong>{sub.title}</strong> ({sub.type})
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn w-full mt-6 bg-green-600 hover:bg-green-700 text-white">Submit Course</button>
      </form>
    </>
  );
};

export default CourseForm;
