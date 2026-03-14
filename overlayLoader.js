function changeOverlay(element) {
    const overlay = document.getElementById('overlay');
    const value = element.getAttribute('data-value');

    document.querySelectorAll('.grid-item').forEach(item => item.classList.remove('selected'));
    element.classList.add('selected');

    // Change overlay content or image based on selected element
    if (value.includes('.htm')) {
        overlay.innerHTML = `<iframe src="${value}" style="border: none; width: 100%; height: 100%;"></iframe>`;
    } else {
        overlay.style.backgroundImage = `url('${value}')`;
        overlay.style.backgroundSize = 'cover'; // Adjust this to fit your needs
    }
}
