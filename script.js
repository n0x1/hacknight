document.addEventListener("DOMContentLoaded", () => {
    const wasteItems = [
        { name: "banana peel", src: "images/banana_peel.png" },
        { name: "plastic bottle", src: "images/plastic_bottle.png" },
        { name: "glass bottle", src: "images/glass_bottle.webp" },
        { name: "pizza slice", src: "images/pizza_slice.jpg" },
        { name: "chip bag", src: "images/chip_bag.png" },
        { name: "styrofoam cup", src: "images/styrofoam_cup.webp" },
        { name: "brown plain paper bag", src: "images/paper_bag.webp" },
        { name: "magazine", src: "images/magazine.png" },
        { name: "office paper", src: "images/paper.png" },
        { name: "plastic straw", src: "images/plastic_straw.png" },
        // more items tbd
    ];

    // Select a random waste item
    const randomItem = wasteItems[Math.floor(Math.random() * wasteItems.length)];
    const imgElement = document.getElementById('draggableWasteItem');
    imgElement.src = randomItem.src;
    imgElement.alt = randomItem.name;

    console.log("Waste Items:", wasteItems);

    window.allowDrop = function(event) {
        event.preventDefault();
    };

    window.drag = function(event) {
        event.dataTransfer.setData("text", event.target.id);
    };

    window.drop = async function(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData("text");
        const draggedElement = document.getElementById(data);
        const wasteOption = event.target.id.replace('Bin', '').toLowerCase();
        const wasteItem = draggedElement.alt;

        const prompt = `I have a ${wasteItem}. Should I compost, trash, or recycle it? I chose ${wasteOption}. Is this correct? If not, please explain why.`;

        const responseElement = document.getElementById('response');
        responseElement.textContent = 'Checking...';

        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer sk-proj-3NEWGthBfRYdTCVQVPy4T3BlbkFJOXdX5Gq9XT2DqM6fARhI`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                prompt: prompt,
                max_tokens: 150,
                temperature: 0.7
            })
        });

        const data = await response.json();
        responseElement.textContent = data.choices[0].text.trim();
    };
});