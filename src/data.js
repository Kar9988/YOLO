const data = {
    "Menu-Item": {
        "Pizza": 10,
        "Hamburger": 10,
        "Sushi": 10,
        "Stake": 10,
        "Pasta": 10,
        "Fish & Chips": 10,
        "Salad": 10,
        "Fish Fillet": 10,
        "Tofu Stake": 10,
        "Fried Vegatables": 10,
        "Baked Vefatables": 10,
        "Chicken Stake": 10,
        "Pork Chop": 10
    },
    "Ingredient": {
        "Pizza": [
            "Tomato Sauce",
            "Mozzarella Cheese",
            "Fresh Tomato",
            "Fresh Onion",
            "Olive Oil",
        ],
        "Hamburger": [
            "Chedder Cheese",
            "Pickles",
            "Fresh Tomato",
            "Fresh Cucumber",
            "Fresh Onion",
            "French Fries",
            "Small Salad",
            "Mayonayese Sauce",
            "Home Made Barbecue Sauce",
            "Baked Potatos"
        ],
        "Sushi": [
            "Pickles",
            "Fresh Cucumber",
            "Soy Sauce",
            "Rice",
            "Small Salad",
            "Thai Mayonayese Sauce",
            "Taryaki",
            "Wasabi"
        ],
        "Stake": [
            "Tomato Sauce",
            "Mozzarella Cheese",
            "Pickles",
            "Rice",
            "French Fries",
            "Small Salad",
            "Mayonayese Sauce",
            "Home Made Barbecue Sauce",
            "Baked Potatos"
        ],
        "Pasta": [
            "Mozzarella Cheese",
            "Fresh Tomato",
            "Olive Oil",
            "Small Salad"
        ],
        "Fish & Chips": [
            "Mozzarella Cheese",
            "Pickles",
            "Fresh Tomato",
            "Fresh Cucumber",
            "Fresh Onion",
            "Olive Oil",
            "Rice",
            "Small Salad",
            "Mayonayese Sauce",
            "Home Made Barbecue Sauce"
        ],
        "Salad": [
            "Fresh Tomato",
            "Fresh Cucumber",
            "Fresh Onion",
            "Olive Oil",
            "Soy Sauce",
            "Rice",
            "Baked Potatos"
        ],
        "Fish Fillet": [
            "Tomato Sauce",
            "Chedder Cheese",
            "Mozzarella Cheese",
            "Fresh Onion",
            "Olive Oil",
            "Soy Sauce",
            "Rice",
            "French Fries",
            "Home Made Barbecue Sauce",
            "Baked Potatos"
        ],
        "Tofu Stake": [
            "Tomato Sauce",
            "Fresh Cucumber",
            "Fresh Onion",
            "Olive Oil",
            "French Fries",
            "Small Salad",
            "Mayonayese Sauce",
            "Home Made Barbecue Sauce",
            "Baked Potatos"
        ],
        "Fried Vegatables": [
            "Chedder Cheese",
            "Pickles",
            "Fresh Tomato",
            "Olive Oil",
            "Soy Sauce",
            "Rice",
            "French Fries",
            "Mayonayese Sauce",
            "Home Made Barbecue Sauce",
            "Baked Potatos"
        ],
        "Baked Vefatables": [
            "Tomato Sauce",
            "Chedder Cheese",
            "Mozzarella Cheese",
            "Pickles",
            "Fresh Onion",
            "Olive Oil",
            "Soy Sauce",
            "Small Salad",
            "Mayonayese Sauce",
            "Home Made Barbecue Sauce",
            "Baked Potatos"
        ],
        "Chicken Stake": [
            "Tomato Sauce",
            "Chedder Cheese",
            "Mozzarella Cheese",
            "Pickles",
            "Fresh Tomato",
            "Fresh Cucumber",
            "Fresh Onion",
            "Olive Oil",
            "Soy Sauce",
            "Rice",
            "French Fries",
            "Small Salad",
            "Mayonayese Sauce",
            "Home Made Barbecue Sauce",
            "Baked Potatos"
        ],
        "Pork Chop": [
            "Tomato Sauce",
            "Chedder Cheese",
            "Mozzarella Cheese",
            "Pickles",
            "Fresh Tomato",
            "Fresh Cucumber",
            "Fresh Onion",
            "Olive Oil",
            "Soy Sauce",
            "Rice",
            "French Fries",
            "Small Salad",
            "Mayonayese Sauce",
            "Home Made Barbecue Sauce",
            "Baked Potatos"
        ]
    },
    "And": "And"
};

// Object.keys(data.Ingredient).forEach((e, index) => {
//     data.Ingredient[e] = {
//         id: `ingredient-${index}`,
//         name: e,
//         children: data.Ingredient[e]
//     }
// });

Object.keys(data['Menu-Item']).forEach((e, index) => {
    data['Menu-Item'][e] = {
        id: `menu-item-${Math.floor(Math.random() * 10000000)}`,
        name: e,
        price: data['Menu-Item'][e],
        ingredients: data.Ingredient[e],
    }
});

console.log('dataaaa', data)

export default data;