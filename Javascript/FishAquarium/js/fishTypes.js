const fishTypes = {
    blue: {
        name: "blue",
        color: "blue",
        speed: 10,
        maxHealthMeter: 100,
        maxhungerMeter: 100,
        changeInterval: {
            health: 2500,
            hunger: 2000,
            healthTimeout: 5000,
            hungerTimeout: 5000,
            changeXDirection: 5000,
            changeYDirection: 4000,
            resetYDirection: 500,
        },
    },
    black: {
        name: "black",
        color: "black",
        speed: 20,
        maxHealthMeter: 100,
        maxhungerMeter: 100,
        changeInterval: {
            health: 3500,
            hunger: 3000,
            healthTimeout: 5000,
            hungerTimeout: 5000,
            changeXDirection: 5000,
            changeYDirection: 4000,
            resetYDirection: 500,
        },
    },
    green: {
        name: "green",
        color: "green",
        speed: 30,
        maxHealthMeter: 100,
        maxhungerMeter: 100,
        changeInterval: {
            health: 4500,
            hunger: 5000,
            healthTimeout: 5000,
            hungerTimeout: 5000,
            changeXDirection: 5000,
            changeYDirection: 4000,
            resetYDirection: 500,
        },
    },
};

export { fishTypes };
