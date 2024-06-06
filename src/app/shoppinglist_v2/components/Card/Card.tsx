// src/Card.tsx
import React, { Dispatch, SetStateAction, useState } from 'react';
import './Card.css';
import Link from 'next/link';
import { Button } from '@mui/material';

interface CardProps {
    title: string;
    setNewName: (name: string)  => void;
    onDelete: () => void;
    url: string;
}

const Card: React.FC<CardProps> = ({ title, setNewName, onDelete, url }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    const handleEditClick = () => {
        if (isEditing) {
            setNewName(newTitle);
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className="card">
            <div className="card-header">
                {isEditing ? (
                    <input 
                        type="text" 
                        value={newTitle} 
                        onChange={(e) => setNewTitle(e.target.value)} 
                    />
                ) : (
                    <>
                    <h3><Link href={url}>{title}</Link></h3>
                    <Link href={`${url}/manageshoppinglist`}>     
                        <Button>
                        Edit
                        </Button>
                    </Link>
                </>
                )}
            </div>
            <div className="card-actions">
                <button onClick={handleEditClick}>
                    {isEditing ? 'Save' : 'Edit'}
                </button>
                <button onClick={onDelete}>Delete</button>
            </div>
        </div>
    );
};

export default Card;
