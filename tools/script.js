function goToBBM() {
    window.location.href = 'marvz4.htm';
}

function goToMMP() {
    window.location.href = 'marvz3.htm';
}

function goToRSS() {
    window.location.href = 'marvz2.htm';
}

function refreshFrameLeft(event) {
    event.preventDefault();
    const iframes = document.querySelectorAll('.frame-left iframe');
    iframes.forEach(iframe => {
        iframe.src = iframe.src;
    });
}

function toggleFramesVisibility(event) {
    event.preventDefault();

    const frameContainer = document.querySelector('.frame-container');
    const tabsContainer = document.querySelector('.tabs-container');
    const buttonContainer = document.querySelector('.button-container');
    const buttonContainer1 = document.querySelector('.button-container1');

    if (frameContainer && tabsContainer && buttonContainer && buttonContainer1) {
        if (framesClosed) {
            restoreAllFrames();
        } else {
            closeAllFrames();
        }
    }
}

let initialFrameContent = '';
let initialTabsContent = '';
let initialButtonContainerContent = '';
let initialButtonContainer1Content = '';
let framesClosed = false;

function closeAllFrames() {
    const frameContainer = document.querySelector('.frame-container');
    const tabsContainer = document.querySelector('.tabs-container');
    const buttonContainer = document.querySelector('.button-container');
    const buttonContainer1 = document.querySelector('.button-container1');

    if (frameContainer) {
        initialFrameContent = frameContainer.innerHTML;
        frameContainer.innerHTML = '';
    }

    if (tabsContainer) {
        initialTabsContent = tabsContainer.innerHTML;
        tabsContainer.innerHTML = '';
    }

    if (buttonContainer) {
        initialButtonContainerContent = buttonContainer.innerHTML;
        buttonContainer.innerHTML = '';
    }

    if (buttonContainer1) {
        initialButtonContainer1Content = buttonContainer1.innerHTML;
        buttonContainer1.innerHTML = '';
    }

    framesClosed = true;
}

function restoreAllFrames() {
    const frameContainer = document.querySelector('.frame-container');
    const tabsContainer = document.querySelector('.tabs-container');
    const buttonContainer = document.querySelector('.button-container');
    const buttonContainer1 = document.querySelector('.button-container1');

    if (frameContainer) {
        frameContainer.innerHTML = initialFrameContent;
    }

    if (tabsContainer) {
        tabsContainer.innerHTML = initialTabsContent;
    }

    if (buttonContainer) {
        buttonContainer.innerHTML = initialButtonContainerContent;
    }

    if (buttonContainer1) {
        buttonContainer1.innerHTML = initialButtonContainer1Content;
    }

    framesClosed = false;
}

const frameContainer = document.querySelector('.frame-left'); // Ensure correct selection of container
const rotateButton = document.getElementById('rotate-button');
const flipHorizontalButton = document.getElementById('flip-horizontal-button');
const flipVerticalButton = document.getElementById('flip-vertical-button');

let currentRotation = 0;
let isFlippedHorizontal = false;
let isFlippedVertical = false;

if (rotateButton) {
    rotateButton.addEventListener('click', () => {
        currentRotation = (currentRotation + 90) % 360;
        updateTransform();
    });

    rotateButton.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        currentRotation = 0;
        updateTransform();
    });
}

if (flipHorizontalButton) {
    flipHorizontalButton.addEventListener('click', () => {
        isFlippedHorizontal = !isFlippedHorizontal;
        updateTransform();
    });
}

if (flipVerticalButton) {
    flipVerticalButton.addEventListener('click', () => {
        isFlippedVertical = !isFlippedVertical;
        updateTransform();
    });
}

function updateTransform() {
    let transformString = `rotate(${currentRotation}deg)`;
    if (isFlippedHorizontal) {
        transformString += ' scaleX(-1)';
    }
    if (isFlippedVertical) {
        transformString += ' scaleY(-1)';
    }
    frameContainer.style.transform = transformString;
}
