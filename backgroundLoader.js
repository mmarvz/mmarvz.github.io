const dbName = "backgroundDB";
const storeName = "settings";

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, { keyPath: "key" });
            }
        };

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        request.onerror = function(event) {
            reject(event.target.error);
        };
    });
}

function saveToDB(key, value) {
    return openDB().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, "readwrite");
            const store = transaction.objectStore(storeName);
            const request = store.put({ key, value });

            request.onsuccess = () => resolve();
            request.onerror = event => reject(event.target.error);
        });
    });
}

function getFromDB(key) {
    return openDB().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, "readonly");
            const store = transaction.objectStore(storeName);
            const request = store.get(key);

            request.onsuccess = event => resolve(event.target.result ? event.target.result.value : null);
            request.onerror = event => reject(event.target.error);
        });
    });
}

function changeBackground(element) {
    const background = document.getElementById('background');
    const value = element.getAttribute('data-value');

    document.querySelectorAll('.grid-item').forEach(item => item.classList.remove('selected'));
    element.classList.add('selected');

    if (value === 'NavyBlue') {
        setBackground('#0B467D');
    } else if (value === 'plainBlack') {
        setBackground('black');
    } else if (value === 'customImage') {

    } else if (value === 'customVideo') {

    } else {
        const iframeHTML = `<iframe src="${value}"></iframe>`;
        setBackground('transparent', iframeHTML);
    }

    saveToDB('selectedBackground', value);
}

function setBackground(color, content = '') {
    const background = document.getElementById('background');
    background.innerHTML = content;
    background.style.backgroundColor = color;
}

function loadBackground() {
    getFromDB('selectedBackground').then(savedBackground => {
        if (savedBackground === 'customImage') {
            getCustomImageData().then(imageData => {
                if (imageData) {
                    const imgHTML = `<img src="${imageData}" style="width: 100%; height: 100%;">`;
                    setBackground('transparent', imgHTML);
                }
            });
        } else if (savedBackground === 'customVideo') {
            getCustomVideoData().then(videoData => {
                if (videoData) {
                    const videoHTML = `<video src="${videoData}" style="width: 100%; height: 100%;" autoplay loop muted playsinline></video>`;
                    setBackground('transparent', videoHTML);

                    const videoElement = background.querySelector('video');
                    videoElement.setAttribute('autoplay', '');
                    videoElement.setAttribute('loop', '');
                    videoElement.setAttribute('muted', '');
                    videoElement.setAttribute('playsinline', '');
                    videoElement.play();
                }
            });
        } else if (savedBackground) {
            const element = document.querySelector(`.grid-item[data-value="${savedBackground}"]`);
            if (element) {
                element.click();
            }
        } else {
            document.querySelector('.grid-item[data-value="NavyBlue"]').click();
        }
    });
}

function handleCustomImageUpload() {
    const customImageInput = document.getElementById('customImageInput');

    customImageInput.addEventListener('change', function() {
        const file = this.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const imageData = e.target.result;
            const imgHTML = `<img src="${imageData}" style="width: 100%; height: 100%;">`;
            setBackground('transparent', imgHTML);

            saveToDB('selectedBackground', 'customImage');
            saveCustomImageData(imageData);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    });
}

function saveCustomImageData(imageData) {
    return openDB().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, "readwrite");
            const store = transaction.objectStore(storeName);
            const request = store.put({ key: 'customImageData', value: imageData });

            request.onsuccess = () => resolve();
            request.onerror = event => reject(event.target.error);
        });
    });
}

function getCustomImageData() {
    return getFromDB('customImageData');
}

function handleCustomVideoUpload() {
    const customVideoInput = document.getElementById('customVideoInput');

    customVideoInput.addEventListener('change', function() {
        const file = this.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const videoData = e.target.result;
            const videoHTML = `<video src="${videoData}" style="width: 100%; height: 100%;" autoplay loop muted playsinline></video>`;
            setBackground('transparent', videoHTML);

            saveToDB('selectedBackground', 'customVideo');
            saveCustomVideoData(videoData);

            const videoElement = document.querySelector('#background video');
            videoElement.setAttribute('autoplay', '');
            videoElement.setAttribute('loop', '');
            videoElement.setAttribute('muted', '');
            videoElement.setAttribute('playsinline', '');
            videoElement.play();
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    });
}

function saveCustomVideoData(videoData) {
    return openDB().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, "readwrite");
            const store = transaction.objectStore(storeName);
            const request = store.put({ key: 'customVideoData', value: videoData });

            request.onsuccess = () => resolve();
            request.onerror = event => reject(event.target.error);
        });
    });
}

function getCustomVideoData() {
    return getFromDB('customVideoData');
}

window.addEventListener('load', function() {
    loadBackground();
    handleCustomImageUpload();
    handleCustomVideoUpload();

    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.addEventListener('click', function() {
            changeBackground(this);
        });
    });
});






