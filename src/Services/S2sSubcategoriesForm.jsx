import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './S2sSubcategoriesForm.css'; // Import the CSS for styling

const S2sSubcategoriesForm = () => {
    const [formData, setFormData] = useState({
        subcategory: '',
        listofcategory: '',
    });
    const [listofcategoryimage, setListOfCategoryImage] = useState(null);
    const [categories, setCategories] = useState([]); // To store the retrieved categories
    const [editingId, setEditingId] = useState(null); // To track the category being edited

    // Fetch categories from the GET API on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/s2ssubcategories');
                setCategories(response.data); // Save retrieved categories to state
            } catch (error) {
                console.error('Error fetching categories:', error);
                alert('Failed to load categories.');
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (event) => {
        setListOfCategoryImage(event.target.files[0]); // Set the selected file for listofcategoryimage
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create FormData to include both the form fields and the image file
        const data = new FormData();
        data.append('subcategory', formData.subcategory);
        data.append('listofcategory', formData.listofcategory);
        if (listofcategoryimage) {
            data.append('listofcategoryimage', listofcategoryimage);
        }

        try {
            if (editingId) {
                // If editing, send PUT request
                await axios.put(`http://localhost:3000/api/s2ssubcategories/${editingId}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                alert('Subcategory updated successfully!');
            } else {
                // If not editing, send POST request
                await axios.post('http://localhost:3000/api/s2ssubcategories', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                alert('Subcategory added successfully!');
            }

            // Reset form after successful submission
            setFormData({
                subcategory: '',
                listofcategory: '',
            });
            setListOfCategoryImage(null);
            setEditingId(null); // Reset editing ID
            // Re-fetch categories to get the updated list
            const response = await axios.get('http://localhost:3000/api/s2ssubcategories');
            setCategories(response.data);
        } catch (error) {
            // Check if the error is related to duplicate entry
            if (error.response && error.response.data && error.response.data.error === 'Duplicate entry: Subcategory already exists') {
                alert('Error: Subcategory already exists.');
            } else {
                console.error('Error submitting data:', error);
                alert('An error occurred while submitting the data.');
            }
        }
    };

    const handleEdit = (category) => {
        // Set the editing ID and populate the form with the category data
        setEditingId(category.id);
        setFormData({
            subcategory: category.subcategory,
            listofcategory: category.listofcategory,
        });
        setListOfCategoryImage(null); // Clear the file input for editing
    };

    return (
        <div>
        <div className="form-container00">
            <form onSubmit={handleSubmit}>
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
                    List of Category:
                    <input
                        type="text"
                        name="listofcategory"
                        value={formData.listofcategory}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    List of Category Image:
                    <input type="file" name="listofcategoryimage" onChange={handleFileChange} />
                </label>
                <button type="submit">{editingId ? 'Update' : 'Submit'}</button>
            </form>

           
        </div>
         <h3>Existing Subcategories</h3>
         <div className="custom-card-grid00">
 {categories.length > 0 ? (
     categories.map((category) => (
         <div key={category.id} className="custom-card00" onClick={() => handleEdit(category)}>
             <img
                 src={category.listofcategoryimage}
                 alt="List of Category"
                 className="custom-card-image00"
             />
             <div className="custom-card-content00">
                 <h4>{category.subcategory}</h4>
                 <p>{category.listofcategory}</p>
             </div>
         </div>
     ))
 ) : (
     <p>No subcategories found.</p>
 )}
</div>
</div>

    );
};

export default S2sSubcategoriesForm;
