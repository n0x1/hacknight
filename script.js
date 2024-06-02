document.addEventListener("DOMContentLoaded", () => {
    const wasteItems = [
        { name: "banana peel", src: "images/banana_peel.png", type:"compost" },
        { name: "plastic bottle", src: "images/plastic_bottle.png", type:"recycle"},
        { name: "glass bottle", src: "images/glass_bottle.webp", type:"recycle"},
        { name: "pizza slice", src: "images/pizza_slice.png", type:"compost" },
        { name: "chip bag", src: "images/chip_bag.png", type:"trash" },
        { name: "styrofoam cup", src: "images/styrofoam_cup.webp", type:"trash" },
        { name: "magazine", src: "images/magazine.png", type:"recycle" },
        { name: "office paper", src: "images/paper.png", type:"recycle" },
        { name: "plastic straw", src: "images/plastic_straw.png", type:"trash"},
        { name: "apple", src: "images/apple.png", type:"compost" }
        // more items tbd
    ];

    var randomItem = wasteItems[Math.floor(Math.random() * wasteItems.length)]

    // Create a new img element
    const imgElement = document.createElement('img');
    imgElement.id = `wasteItem`;
    imgElement.src = randomItem.src;
    imgElement.alt = randomItem.name;

    const response = document.getElementById('response');
    const container = document.getElementById('wasteItemContainer'); 
    container.appendChild(imgElement);

    const recycleButton = document.querySelector('#recycleButton');
    const trashButton = document.querySelector('#trashButton');
    const compostButton = document.querySelector('#compostButton');

    recycleButton.addEventListener('click', function() {
        recycle(randomItem);
    });

    trashButton.addEventListener('click', function() {
        trash(randomItem);
    });

    compostButton.addEventListener('click', function() {
        compost(randomItem);

    });


    function recycle(randomItem) {
        if (randomItem.type === "recycle") {    
            response.textContent=`Correct! You can recycle ${randomItem.name}`;
        }
        else {
                response.textContent=`Incorrect! You cannot recycle ${randomItem.name}`;
            }
            changeImageSource(randomItem);
    }
    function trash(randomItem) {
        if (randomItem.type === "trash") {    
            response.textContent=`Correct! You can trash ${randomItem.name}`;
        }
        else {
                response.textContent=`Incorrect! You cannot trash ${randomItem.name}.`;
            }
            changeImageSource(randomItem);
    }
    function compost(randomItem) {
        if (randomItem.type === "compost") {    
            response.textContent=`Correct! You can compost ${randomItem.name}.`;
        }
        else {
                response.textContent=`Incorrect! You cannot compost ${randomItem.name}`;
            }
            changeImageSource(randomItem);
    }

    function changeImageSource(randomItem) {
        imgElement.src = randomItem.src;
        imgElement.alt = randomItem.name;
    }
});
