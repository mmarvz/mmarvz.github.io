        function openFrame(frameIndex) {
            const tabs = document.querySelectorAll('.tab');
            const buttons = document.querySelectorAll('.buttoncontainer1 .button');
            const iframes = document.querySelectorAll('.frame-left iframe');

            iframes.forEach((iframe, index) => {
                iframe.classList.toggle('active', index === frameIndex);
            });

            tabs.forEach((tab, index) => {
                tab.classList.toggle('active', index === frameIndex);
            });

            buttons.forEach((button, index) => {
                button.classList.toggle('active', index === frameIndex);
            });
        }

        function openRightFrame(index) {
            const tabs = document.querySelectorAll('.tab1');
            const contents = document.querySelectorAll('.frame-right > *');
            
            // Deactivate all content and tabs
            contents.forEach((content, i) => {
                content.style.display = i === index ? 'block' : 'none';
            });
            tabs.forEach((tab, i) => {
                tab.classList.toggle('active', i === index);
            });
        }