import React, { useState } from 'react';

import { InputText } from '../../../../../Components/InputText/inputtext';

import axios from 'axios';

import '../questionform.css';

export const AddQuestionForm = ({ onClose }) => {
    const reset = {
        question: '',
        category: '',
        res1: '',
        res2: '',
        res3: '',
        res4: '',
        correct: '',
    }
    const [formData, setFormData] = useState(reset);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API_URL}/api/addQuestion`, { formData }, (err) => {
            if (err) throw err;
        });
        setFormData(reset);

        onClose();
        window.location.reload();
    };

    const handleCancel = () => {
        setFormData(reset);

        onClose();
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                <h2>Add New Question</h2>
                <form onSubmit={handleSubmit}>
                    <label name="question_label">Question:</label>
                    <input
                        type="text"
                        id="question"
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        required
                    />
                    {/* <label name="category_label">Category:</label> */}
                    <input
                        type="hidden"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    />
                    {[1, 2, 3, 4].map((nb) => (
                        <InputText
                            key={nb}
                            label={`Option ${nb}`}
                            fieldId={`res${nb}`}
                            fieldName={`Option ${nb}`}
                            value={formData["res" + nb]}
                            onChange={handleChange}
                            required
                        />
                    ))}
                    <label name="correct_label">Correct Answer:</label>
                    <select
                        id="correct"
                        name="correct"
                        value={formData.correct}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select an option</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                        <option value="4">Option 4</option>
                    </select>
                    <div id="form-buttons">
                        <button className="btn-form" type="submit">Add</button>
                        <button className="btn-form" type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
