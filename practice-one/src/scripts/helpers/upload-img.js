import storage from "../services/localStorage";
import { querySelector,getElementById } from "./dom-helper";

const displayImagePreview = (selectedImage) => {
    if (selectedImage) {
        const reader = new FileReader();

        reader.onload = (event) => {
            const imageElement = getElementById('image');
            imageElement.src = event.target.result;
        };

        reader.readAsDataURL(selectedImage);
    }
};

const handleSaveClick = async (selectedImage) => {
    if (selectedImage) {
        try {
            const imgbbApiKey = '82001a9d3dcf15421a28667e049d69fd';
            const formData = new FormData();
            formData.append('image', selectedImage);

            const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();
                const imageUrl = responseData.data.url;

                storage.save('uploadedImageUrl', imageUrl);

                const imageElement = getElementById('image');
                imageElement.src = imageUrl;

                const form = getElementById('validation-form');
                form.submit();
            } else {
                console.error('Image upload failed:', response.statusText);
            }
        } catch (error) {
            console.error('Image upload error:', error);
        }
    }
};

const setupImageUploadHandler = () => {
    const uploadButton = querySelector('.upload');
    const imageInput = document.createElement('input');
    imageInput.type = 'file';
    imageInput.accept = 'image/*';
    imageInput.style.display = 'none';

    let selectedImage = null;

    uploadButton.addEventListener('click', () => {
        imageInput.click();
    });

    imageInput.addEventListener('change', (event) => {
        selectedImage = event.target.files[0];
        displayImagePreview(selectedImage);
    });

    const saveButton = getElementById('save');

    saveButton.addEventListener('click', () => {
        handleSaveClick(selectedImage);
    });
};

setupImageUploadHandler();
