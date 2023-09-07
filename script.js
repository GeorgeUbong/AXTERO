
const imageInput = document.getElementById('imageInput');
const imageContainer = document.getElementById('imageContainer');
const networkStatus = document.getElementById('networkStatus')
let uploadedImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];


function displayNetworkStatusMessage(isOnline) {
    if (isOnline) {
        networkStatus.textContent = ''; // Clear the message when online
    } else {
        networkStatus.textContent = 'No internet connection. Please check your network.';
    }
}
displayNetworkStatusMessage(navigator.onLine);

// Event listener for online/offline events
window.addEventListener('online', () => {
    displayNetworkStatusMessage(true);
});

window.addEventListener('offline', () => {
    displayNetworkStatusMessage(false);
});

function displayImagesFromLocalStorage() {
    for (const imageData of uploadedImages) {
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('image-container'); // Optional for styling

        const img = document.createElement('img');
        img.src = imageData.src;
        img.alt = imageData.alt;
        img.classList.add('uploaded-image');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');

        // Add click event listener to delete button
        deleteButton.addEventListener('click', () => {
            removeImage(imageData);
            imgContainer.remove(); // Remove the image container
        });

        imgContainer.appendChild(img);
        imgContainer.appendChild(deleteButton);
        imageContainer.appendChild(imgContainer);
    }
}

function saveImageToLocalStorage(file, src) {
    const imageData = { src, alt: file.name };
    uploadedImages.push(imageData);
    localStorage.setItem('uploadedImages', JSON.stringify(uploadedImages));
}

function removeImage(imageData) {
    uploadedImages = uploadedImages.filter((img) => img.src !== imageData.src);
    localStorage.setItem('uploadedImages', JSON.stringify(uploadedImages));
}


// Function to display a success message


//image input
imageInput.addEventListener('change', (event) => {
    if(!navigator.onLine) {
        alert('No internet Connection');
        return;
    }
    const files = event.target.files;

    for (const file of files) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('image-container'); // Optional for styling

            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = file.name;
            img.classList.add('uploaded-image');

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete image';
            deleteButton.classList.add('delete-button');

            // Add click event listener to delete button
            deleteButton.addEventListener('click', () => {
                removeImage({ src: e.target.result, alt: file.name });
                imgContainer.remove(); // Remove the image container
            });

            imgContainer.appendChild(img);
            imgContainer.appendChild(deleteButton);
            imageContainer.appendChild(imgContainer);
            saveImageToLocalStorage(file, e.target.result);
        };

        reader.readAsDataURL(file);
    }
});

displayImagesFromLocalStorage();
