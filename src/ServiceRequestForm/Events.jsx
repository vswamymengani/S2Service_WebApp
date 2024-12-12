import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Events.css';

const Events = () => {
  const [eventInfo, setEventInfo] = useState('');
  const [files, setFiles] = useState([]); // For uploading multiple files
  const [events, setEvents] = useState([]); // To store fetched events including media files

  // Fetch events and their media files from the API on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://18.60.190.183:3000/events');
        setEvents(response.data); // Assuming response is an array of events with mediaUrls
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Handle multiple files
    if (selectedFiles.length > 0) {
      setFiles(selectedFiles);
      alert('Photos/Videos added successfully!');
    }
  };

  const handleAddMedia = () => {
    document.getElementById('media-input').click();
  };

  const handleSubmitEvent = async () => {
    if (!eventInfo || files.length === 0) {
      alert('Please provide event description and select media files.');
      return;
    }

    const formData = new FormData();
    formData.append('description', eventInfo);
    files.forEach((file) => {
      formData.append('mediaFiles', file);
    });

    try {
      const response = await axios.post('http://localhost:3000/events', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Event submitted successfully!');
    } catch (error) {
      console.error('Error submitting event:', error);
      alert('Error submitting event.');
    }
  };

  return (
    <div className="events-container">
      {/* <h1>Events</h1> */}
      <div className="events-content">
        <h2>Event Description</h2>
        <textarea
          placeholder="Enter event info"
          value={eventInfo}
          onChange={(e) => setEventInfo(e.target.value)}
          className="events-textarea"
        />
        <input
          type="file"
          id="media-input"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          accept="image/*,video/*"
          multiple // Allow multiple file uploads
        />
        <button onClick={handleAddMedia} className="media-button">
          Add Photo/Video
        </button>
        <button onClick={handleSubmitEvent} className="submit-button">
          Submit Event
        </button>
      </div>

      {/* Display fetched media files */}
      <div className="media-gallery">
        <h2>Uploaded Media</h2>
        <div className="media-grid">
          {events.length > 0 ? (
            events.map((event, index) => (
              <div key={event.id} className="event-item">
                <p>{event.description}</p>
                <div className="media-grid">
                  {event.mediaUrls.map((url, idx) => (
                    <div key={idx} className="media-item">
                      {url.endsWith('.mp4') ? (
                        <video controls src={url} className="media-video" />
                      ) : (
                        <img src={url} alt={`media-${idx}`} className="media-image" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No media files uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
