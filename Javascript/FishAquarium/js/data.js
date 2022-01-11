const fishTypes = {
    blue: {
        name: "blue",
        color: "blue",
        speed: 10,
        price: 5,
        maxHealthMeter: 100,
        maxhungerMeter: 100,
        baseSize: 9,
        changeInterval: {
            health: 2500,
            hunger: 2000,
            healthTimeout: 5000,
            hungerTimeout: 5000,
            changeXDirection: 5000,
            changeYDirection: 4000,
            resetYDirection: 500,
            levelUp: 500,
        },
        image: {
            totalSpriteWidth: 1992,
            totalSpriteHeight: 981,
            spriteX: 4,
            spriteY: 3,
        },
    },
    black: {
        name: "black",
        color: "black",
        speed: 20,
        price: 10,
        maxHealthMeter: 100,
        maxhungerMeter: 100,
        baseSize: 9,
        changeInterval: {
            health: 3500,
            hunger: 3000,
            healthTimeout: 5000,
            hungerTimeout: 5000,
            changeXDirection: 5000,
            changeYDirection: 4000,
            resetYDirection: 500,
            levelUp: 2000,
        },
        image: {
            totalSpriteWidth: 1992,
            totalSpriteHeight: 981,
            spriteX: 4,
            spriteY: 3,
        },
    },
    green: {
        name: "green",
        color: "green",
        speed: 30,
        price: 15,
        maxHealthMeter: 100,
        maxhungerMeter: 100,
        baseSize: 9,
        changeInterval: {
            health: 4500,
            hunger: 5000,
            healthTimeout: 5000,
            hungerTimeout: 5000,
            changeXDirection: 5000,
            changeYDirection: 4000,
            resetYDirection: 500,
            levelUp: 2000,
        },
        image: {
            totalSpriteWidth: 1992,
            totalSpriteHeight: 981,
            spriteX: 4,
            spriteY: 3,
        },
    },
    purple: {
        name: "purple",
        color: "purple",
        speed: 30,
        price: 20,
        maxHealthMeter: 100,
        maxhungerMeter: 100,
        baseSize: 9,
        changeInterval: {
            health: 4500,
            hunger: 5000,
            healthTimeout: 5000,
            hungerTimeout: 5000,
            changeXDirection: 5000,
            changeYDirection: 4000,
            resetYDirection: 500,
            levelUp: 2000,
        },
        image: {
            totalSpriteWidth: 1992,
            totalSpriteHeight: 981,
            spriteX: 4,
            spriteY: 3,
        },
    },
    red: {
        name: "red",
        color: "red",
        speed: 30,
        price: 25,
        maxHealthMeter: 100,
        maxhungerMeter: 100,
        baseSize: 9,
        changeInterval: {
            health: 4500,
            hunger: 5000,
            healthTimeout: 5000,
            hungerTimeout: 5000,
            changeXDirection: 5000,
            changeYDirection: 4000,
            resetYDirection: 500,
            levelUp: 2000,
        },
        image: {
            totalSpriteWidth: 1992,
            totalSpriteHeight: 981,
            spriteX: 4,
            spriteY: 3,
        },
    },
    yellow: {
        name: "yellow",
        color: "yellow",
        speed: 30,
        price: 30,
        maxHealthMeter: 100,
        maxhungerMeter: 100,
        baseSize: 9,
        changeInterval: {
            health: 4500,
            hunger: 5000,
            healthTimeout: 5000,
            hungerTimeout: 5000,
            changeXDirection: 5000,
            changeYDirection: 4000,
            resetYDirection: 500,
            levelUp: 2000,
        },
        image: {
            totalSpriteWidth: 1992,
            totalSpriteHeight: 981,
            spriteX: 4,
            spriteY: 3,
        },
    },
};

const menuData = {
    select: {
        name: "SELECT",
        width: 200,
        height: 200,
        imgRatio: 12,
    },
    food: {
        name: "FOOD",
        width: 100,
        height: 173,
        imgRatio: 12,
    },
    pill: {
        name: "PILL",
        width: 124,
        height: 256,
        imgRatio: 12,
    },
    clean: {
        name: "CLEAN",
        width: 90,
        height: 78,
        imgRatio: 12,
    },
    fishShop: {
        name: "FISH SHOP",
        width: 128,
        height: 128,
        imgRatio: 12,
    },
    shop: {
        name: "SHOP",
        width: 128,
        height: 128,
        imgRatio: 12,
    },
};

const decorationData = {
    background0: {
        price: 0,
    },
    background1: {
        price: 10,
    },
    background2: {
        price: 20,
    },
    background3: {
        price: 30,
    },
    background4: {
        price: 40,
    },
};
export { fishTypes, menuData, decorationData };