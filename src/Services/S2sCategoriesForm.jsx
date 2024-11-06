import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './S2sCategoriesForm.css';

const S2sCategoriesForm = () => {
    const [formData, setFormData] = useState({
        id: '', // ID for updating existing categories
        category: '',
        subcategory: '',
        subcategoryimage: '',
        sid: '' // Add sid field to the state
    });
    const [file, setFile] = useState(null);
    const [categories, setCategories] = useState([]); // State to store fetched categories
    const [error, setError] = useState(''); // State to store error messages
    const [success, setSuccess] = useState(''); // State to store success messages

    // Fetch categories from the API
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/s2scategories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setError('Failed to fetch categories.');
        }
    };

    useEffect(() => {
        // Call fetchCategories to load categories when the component mounts
        fetchCategories();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Clear previous error
        setSuccess(''); // Clear previous success message
    
        const uploadData = new FormData();
        
        if (file) {
            uploadData.append('subcategoryimage', file); // Append new image if one is selected
        } else if (formData.id) {
            uploadData.append('subcategoryimage', categories.find(cat => cat.id === formData.id)?.subcategoryimage); // Append the old image URL if updating without a new image
        }
    
        uploadData.append('category', formData.category);
        uploadData.append('subcategory', formData.subcategory);
        uploadData.append('sid', formData.sid); // Append sid to the form data
    
        try {
            if (formData.id) {
                // PUT request for updating existing category
                const response = await axios.put(`http://localhost:3000/api/s2scategories/${formData.id}`, uploadData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setSuccess('Category updated successfully!');
                alert('Category updated successfully!');
            } else {
                // POST request for adding a new category
                const response = await axios.post('http://localhost:3000/api/s2scategories', uploadData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setSuccess('Category added successfully!');
                alert('Category added successfully!');
            }
    
            // Clear form fields after submission
            setFormData({
                id: '',
                category: '',
                subcategory: '',
                subcategoryimage: '',
                sid: ''
            });
            setFile(null);
    
            // Re-fetch the categories to reflect changes
            fetchCategories();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
                alert(error.response.data.error);
            } else {
                setError('Failed to submit category.');
                alert('Failed to submit category.');
            }
        }
    };
    

    // Handle card click to populate form with existing category data
    const handleCardClick = (category) => {
        setFormData({
            id: category.id, // Set the category ID for the PUT request
            category: category.category,
            subcategory: category.subcategory,
            subcategoryimage: '', // Reset the image input; user can choose a new image or keep the old one
            sid: category.sid // Populate sid when editing
        });
        setFile(null); // Clear the file input
    };

    // Handle deleting a category using the DELETE API
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await axios.delete(`http://localhost:3000/api/s2scategories/${id}`);
                setSuccess('Category deleted successfully!');
                alert('Category deleted successfully!');
                fetchCategories(); // Re-fetch the categories to reflect changes
            } catch (error) {
                setError('Failed to delete category.');
                alert('Category deleted successfully!');
            }
        }
    };

    return (
        <div className="s2s-containerr">
            <form onSubmit={handleSubmit} className="s2s-form">
                <label>
                    Category:
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Subcategory:
                    <input
                        type="text"
                        name="subcategory"
                        value={formData.subcategory}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    SID:
                    <input
                        type="text"
                        name="sid"
                        value={formData.sid}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Subcategory Image:
                    <input
                        type="file"
                        name="subcategoryimage"
                        onChange={handleFileChange}
                        required={!formData.id} // Image is required only for new entries
                    />
                </label>
                <button type="submit">{formData.id ? 'Update Category' : 'Add Category'}</button>
            </form>

            {/* Display the fetched categories as cards */}
            <h2>Categories List</h2>
            <div className="cards-container">
                {categories.map((category) => (
                    <div className="category-card" key={category.id}>
                        <img src={category.subcategoryimage} alt={category.subcategory} className="category-image" />
                        <div className="category-info">
                            <h3>{category.category}</h3>
                            <p>{category.subcategory}</p>
                            <p><strong>SID:</strong> {category.sid}</p> {/* Display SID */}
                            <button onClick={() => handleCardClick(category)}>Edit</button>
                            <button onClick={() => handleDelete(category.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default S2sCategoriesForm;
