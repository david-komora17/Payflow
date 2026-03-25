const car = {
  brand: "Toyota",
  model: "Camry",
  year: 2023
};

Object.values(car).forEach(value => {
    const key = car[value];
    console.log(`${key}: ${value}`);
});
