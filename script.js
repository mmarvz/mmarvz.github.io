function goToBBM() {
    window.location.href = 'marvz4.htm';
}

function goToMMP() {
    window.location.href = 'marvz3.htm';
}

function goToRSS() {
    window.location.href = 'marvz2.htm';
}

function goToVER() {
    window.location.href = 'marvz1.htm';
}

function refreshFrameLeft(event) {
    event.preventDefault();
    const iframes = document.querySelectorAll('.frame-left iframe');
    iframes.forEach(iframe => {
        iframe.src = iframe.src;
    });
}
function refreshFrameRight(event) {
    event.preventDefault();
    const iframes = document.querySelectorAll('.frame-right iframe');
    iframes.forEach(iframe => {
        iframe.src = iframe.src;
    });
}

function refreshSpecificFrame(frameId, event) {
    event.preventDefault();

    var iframe = document.getElementById(frameId);
    if (iframe) {
        iframe.src = iframe.src;
    }
}

function openPageFrame(index) {
    console.log("Open Page Frame " + index);
}


function toggleFramesVisibility(event) {
    event.preventDefault();

    const frameContainer = document.querySelector('.frame-container');
    const tabsContainer = document.querySelector('.tabs-container');
    const buttonContainer = document.querySelector('.buttoncontainer');


    if (frameContainer && tabsContainer && buttonContainer) {
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
let framesClosed = false;

function closeAllFrames() {
    const frameContainer = document.querySelector('.frame-container');
    const tabsContainer = document.querySelector('.tabs-container');
    const buttonContainer = document.querySelector('.buttoncontainer');


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

    framesClosed = true;
}

function restoreAllFrames() {
    const frameContainer = document.querySelector('.frame-container');
    const tabsContainer = document.querySelector('.tabs-container');
    const buttonContainer = document.querySelector('.buttoncontainer');
    const buttonContainer1 = document.querySelector('.buttoncontainer1');

    if (frameContainer) {
        frameContainer.innerHTML = initialFrameContent;
    }

    if (tabsContainer) {
        tabsContainer.innerHTML = initialTabsContent;
    }

    if (buttonContainer) {
        buttonContainer.innerHTML = initialButtonContainerContent;
    }

    framesClosed = false;
}

const frameContainer = document.getElementById('frame-left');
const rotateButton = document.getElementById('rotate-button');
const flipHorizontalButton = document.getElementById('flip-horizontal-button');
const flipVerticalButton = document.getElementById('flip-vertical-button');

let currentRotation = 0;
const rotations = [90, 180, 270, 360];
let isFlippedHorizontal = false;
let isFlippedVertical = false;

rotateButton.addEventListener('click', () => {
    currentRotation = (currentRotation + 90) % 360;
    updateTransform();
});

rotateButton.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    currentRotation = 0;
    updateTransform();
});

flipHorizontalButton.addEventListener('click', () => {
    isFlippedHorizontal = !isFlippedHorizontal;
    updateTransform();
});

flipVerticalButton.addEventListener('click', () => {
    isFlippedVertical = !isFlippedVertical;
    updateTransform();
});

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




