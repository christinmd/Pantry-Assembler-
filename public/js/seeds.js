var recipes = [
    { 
        name:'Baked Kale Chips',
        description: 'Savory kale chips baked in an oven',
        instructions: 'Preheat oven to 350 degrees. Remove the leaves from the thick stems and tear into bite size pieces. Drizzle kale with olive oil and sprinkle with seasoning salt. Bake until the edges are brown',
        img: 'https://d3k19ysnp189dx.cloudfront.net/wp-content/uploads/2018/12/Coconut-Oil-Kale-Chips-2.jpg'
    },
    {
        name:'Extra Easy Hummus',
        description:'Hummus made in a blender',
        instructions:'In a blender combine 1 can garbanzo beans, 1 clove garlic, 2 teaspoons ground cumin, 1/2 teaspoon salt, and 1 tablespoon olive oil. Blend on low speed, gradually adding reserved bean liquid until desired consistency is achieved.',
        img:'https://hips.hearstapps.com/hmg-prod/images/hummus-horizontal-jpg-1525126330.jpg'
    },
    {
        name:'Yummy Pork Chops',
        description:'Pork chops so delicious you will ask for more',
        instructions:'Mix 1/4 cup soy sauce, and 1/2 teaspoon pepper in a bowl. Place 4 boneless pork chops in a skillet over medium heat, and cover with the dressing mixture. Cover skillet and cook pork chops 25 minutes, turning occasionally. Remove cover, reduce heat to low, and continue cooking to desired doneness.',
        img:'https://www.primaverakitchen.com/wp-content/uploads/2018/10/Garlic-Butter-Baked-Pork-Chops-Primavera-Kitchen-3.jpg'
    },
    {
        name:'Parmesan Crusted Pork Chops',
        description:'Pork chops with an Italian and Cajun flare',
        instructions:'Preheat over to 350 degrees. Whisk egg in a shallow bowl. Mix 1/4 cup grated Parmesan cheese and 1 teaspoon Cajun seasoning together on plate. Dip each pork chop into egg. Press until coated on both sides. Baked in preheated overn until golden for 35 to 40 minutes.',
        img:'https://images.media-allrecipes.com/userphotos/560x315/3875421.jpg'
    },
    {
        name:'Melt-In-Your-Mouth Dark Chocolate',
        description:"Chocolate so good you'll every morsel",
        instructions:'Gently melt coconut oil in a saucepan over medium-low heat. Stir 1/2 cup cocoa powder, 3 tablespoons honey, and 1/2 teaspoon vanilla extract into melted oil until well blended. Pour mixture into a tray. Refrigerate until chilled',
        img:'https://cdn.renewingallthings.com/wp-content/uploads/homemade-dark-chocolate.jpg'
    },
    {
        name:'Kale and Quinoa Salad',
        description:'Delicious and health Kale salad',
        instructions:'Stir 1 cup quinoa into boiling water reduce heat to medium-low, place cover on saucepan, and cook until water absorbs into the quinoa, about 12 minutes. Remove saucepan from heat and let cool. Put kale in  mixing bowl. Whisk olive oil, lemon juice, Dijon mustard, garlic, pepper, and salt together in a bowl until oil emulsifies and drizzle over mixture. Add quinoa and feta.',
        img:'https://blog.katescarlata.com/wp-content/uploads/2017/02/Quinoa-kale-spoon.jpg'
    },
    {
        name:'Easy No Bake Chocolate Cookies',
        description:'Better than store bought',
        instructions:'In a saucepan over medium heat, combine 2 cups sugar, 1/4 cup unsweetened cocoa powder, 1/2 cup milk, and 1/2 cup margarine. Bring to a boil. Remove from heat and stir in vanilla, salt, peanut butter, and oats. Drop by rounded spoonfuls onto waxed paper. Allow cookies to cool for at least 1 hour.',
        img:'https://shewearsmanyhats.com/wp-content/uploads/2014/12/no-bake-oatmeal-chocolate-coconut-cookies-1-copy.jpg'
    },
    {
        name:'Garbanzo Bean Salad',
        description:"I hope you've got some Beano, its that good!",
        instructions:'In a salad bowl, combine the chick peas, celery, onion, apple, and walnuts. Prepare the dressing by whisking together the mayonnaise, honey, mustard, and lemon juice. Combine the salad mixture and dressing. Toss and serve on a bed of shredded lettuce.',
        img:'https://images-gmi-pmc.edge-generalmills.com/1daacf40-49ce-4fe8-9f1e-67eb9a534144.jpg'
    },
];


var ingredients = [
    {name:'kale'},
    {name:'olive oil'},
    {name:'salt'},
    {name:'garbanzo beans'},
    {name:'garlic'},
    {name:'cumin'},
    {name:'soy sauce'},
    {name:'pepper'},
    {name:'pork'},
    {name:'egg'},
    {name:'parmesan cheese'},
    {name:'seasoning'},
    {name:'coconut oil'},
    {name:'cocoa powder'},
    {name:'honey'},
    {name:'vanilla extract'},
    {name:'water'},
    {name:'quinoa'},
    {name:'pepper'},
    {name:'feta cheese'},
    {name:'sugar'},
    {name:'milk'},
    {name:'margarine'},
    {name:'peanut butter'},
    {name:'oats'},
    {name:'celery'},
    {name:'onion'},
    {name:'apple'},
    {name:'walnuts'},
    {name:'mayonnaise'},
    {name:'mustard'},
    {name:'lettuce'},
    {name:'lemon juice'}    
];

var recipeIngredients = [
    {recipeId:1, ingredientId:1, quantity:1, unit:'bunch'},
    {recipeId:1, ingredientId:2, quantity:1, unit:'tablespoon'},
    {recipeId:1, ingredientId:3, quantity:1, unit:'teaspoon'},
    {recipeId:2, ingredientId:4, quantity:1, unit:'can'},
    {recipeId:2, ingredientId:5, quantity:1, unit:'clove'},
    {recipeId:2, ingredientId:6, quantity:2, unit:'teaspoons'},
    {recipeId:2, ingredientId:3, quantity:2, unit:'teaspoons'},
    {recipeId:2, ingredientId:2, quantity:1, unit:'tablespoon'},
    {recipeId:3, ingredientId:7, quantity:0.25, unit:'cup'},
    {recipeId:3, ingredientId:8, quantity:0.5, unit:'teaspoon'},
    {recipeId:3, ingredientId:9, quantity:4, unit:'pieces'},
    {recipeId:4, ingredientId:10, quantity:1, unit:'egg'},
    {recipeId:4, ingredientId:11, quantity:0.25, unit:'cup'},
    {recipeId:4, ingredientId:12, quantity:1, unit:'teaspoon'},
    {recipeId:4, ingredientId:9, quantity:2, unit:'pieces'},
    {recipeId:5, ingredientId:13, quantity:0.5, unit:'cup'},
    {recipeId:5, ingredientId:14, quantity:0.5, unit:'cup'},
    {recipeId:5, ingredientId:15, quantity:3, unit:'tablespoons'},
    {recipeId:5, ingredientId:16, quantity:0.5, unit:'teaspoon'},
    {recipeId:6, ingredientId:17, quantity:2, unit:'cups'},
    {recipeId:6, ingredientId:18, quantity:1, unit:'cup'},
    {recipeId:6, ingredientId:1, quantity:10, unit:'leaves'},
    {recipeId:6, ingredientId:2, quantity:3, unit:'tablespoons'},
    {recipeId:6, ingredientId:33, quantity:2, unit:'tablespoons'},
    {recipeId:6, ingredientId:5, quantity:1, unit:'clove'},
    {recipeId:6, ingredientId:8, quantity:1, unit:'teaspoon'},
    {recipeId:6, ingredientId:3, quantity:0.5, unit:'teaspoon'},
    {recipeId:6, ingredientId:20, quantity:0.75, unit:'teaspoon'},
    {recipeId:7, ingredientId:21, quantity:2, unit:'cups'},
    {recipeId:7, ingredientId:14, quantity:0.25, unit:'cups'},
    {recipeId:7, ingredientId:22, quantity:0.5, unit:'cup'},
    {recipeId:7, ingredientId:23, quantity:0.5, unit:'cup'},
    {recipeId:7, ingredientId:16, quantity:1, unit:'teaspoon'},
    {recipeId:7, ingredientId:3, quantity:1, unit:'pinch'},
    {recipeId:7, ingredientId:24, quantity:1.5, unit:'cup'},
    {recipeId:7, ingredientId:25, quantity:3, unit:'cups'},
    {recipeId:8, ingredientId:4, quantity:1, unit:'cup'},
    {recipeId:8, ingredientId:26, quantity:0.75, unit:'teaspoon'},
    {recipeId:8, ingredientId:27, quantity:0.5, unit:'cup'},
    {recipeId:8, ingredientId:28, quantity:0.5, unit:'diced cup'},
    {recipeId:8, ingredientId:29, quantity:1, unit:'whole'},
    {recipeId:8, ingredientId:30, quantity:0.25, unit:'cup'},
    {recipeId:8, ingredientId:31, quantity:1, unit:'tablespoon'},
    {recipeId:8, ingredientId:32, quantity:1, unit:'tablespoon'},
    {recipeId:8, ingredientId:33, quantity:0.25, unit:'teaspoon'},
    {recipeId:8, ingredientId:15, quantity:0.5, unit:'head'}
];

module.exports = {
    recipes,
    ingredients,
    recipeIngredients
};
