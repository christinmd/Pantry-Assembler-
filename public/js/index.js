// Get references to page elements
var $recipeName = $("#recipeName");
var $recipeDescription = $("#recipeDescription");
var $recipeInstructions = $("#recipeInstructions");
var $ingredientsFile = $("#ingredientsFile");
var $submitBtn = $("#submit");
var $submitRecipeBtn = $("#addRecipeBtn");
var $exampleList = $("#example-list");
var $customFile = $("#customFile");
var $ingredientsInput = $("#ingredientsInput");
var $ingredientsSubmitBtn = $("#ingredientsSubmitBtn");
var $recipesByIngredient = $("#recipesByIngredient");
var $recipeIngredients = $("#recipeIngredients");
var $imgInput = $("#imgInput");

var $signUpName = $(".signUpName");
var $signUpPassword = $(".signUpPassword");
var $signUpPassword2 = $(".signUpPasswordAgain");
var $signUpEmail = $(".signUpEmail");
var $signUpSubmit = $(".signUpSubmit");
var $signInSubmit = $(".signInSubmit");
var $signInName = $(".signInName");
var $signInPassword = $(".signInPassword");

// add food
var $addIngredient = $("#add_ingredient");
var $ingredientQuantity = $("#ingredient_quantity");
var $ingredientUnit = $("#ingredient_unit");
var $ingredientExpireDate = $("#ingredient_expireDate");
var $addFoodBtn = $("#add_food");

var $signInBtn = $('<button type="button" style="margin-right: 6px" class="loginbtn btn btn-danger btn-sm" data-toggle="modal" data-target="#sign_in">').text("SIGN IN")
var $signUpBtn = $('<button type="button" class="loginbtn btn btn-danger btn-sm" data-toggle="modal" data-target="#sign_up">').text("SIGN UP")

var $profileBtn = $('<button type="button" class="loginbtn btn btn-danger btn-sm" onclick="profile();" data-toggle="modal" data-target="#profile">')
var $signOutBtn = $('<button type="button" style="margin-right: 6px" class="loginbtn btn btn-danger btn-sm" onclick="signOut();" >').text("SIGN OUT")

$("#log_area").append($signInBtn);
$("#log_area").append($signUpBtn);

var logedInUserId = "-1";
var logedInUserName = ""


function generatePassword() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  var user = {
    user_name: profile.getEmail(),
    password: generatePassword(),
    email: profile.getEmail(),
  }
  getApi.findOneUser(user.user_name).then(function (data) {
    if (data.length != 0) {
      console.log("welcome come back")
      logedInUserId = data[0].id;
      logedInUserName = data[0].user_name;
    } else {
      console.log("you are a new user, welcome")
      getApi.saveUser(user).then(function (data) {
        logedInUserId = data[0].id;
        logedInUserName = data[0].user_name;
      })
    }
  });
  refreshfoods();
  $("#log_area").empty();
  $("#add_food_div").css("display", "unset");
  $("#log_area").append($signOutBtn);
  $("#log_area").append($profileBtn.text("PROFILE"));
  getItems();
  $(".login_close_btn").click();

  localStorage.setItem("pantryUserId", logedInUserId);
      localStorage.setItem("pantryUserName", logedInUserName);
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      localStorage.setItem("pantryExpireTime", tomorrow);
  // $("#log_area").append($profileBtn.text("user id:" + logedInUserId));
}; //onSignIn funtion end

//google sign out
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');

  });
  $("#log_area").empty();
  $("#food-thead").empty();
  $("#foodInfo").empty();
  $("#log_area").append($signInBtn);
  $("#log_area").append($signUpBtn);
  $("#add_food_div").css("display", "none");
  logedInUserId = "-1"
  
  logedInUserName = ""
  localStorage.setItem("pantryUserId", -1);
      localStorage.setItem("pantryUserName", "");

}



var $userNameProfile = $("#user_name_profile");
var $userEmailProfile = $("#user_email_profile");
var $userPasswordProfile = $("#user_password_profile");
var $changePasswordProfile = $(".change_password");
var $changePasswordBtn = $(".changePassword_btn");

var creatNewPassword = function (newPassword, username) {
  console.log(newPassword)
  getApi.changePassword(newPassword, username).then(function (data) {
    alert("password changed")
  })
};
//profile
function profile() {
  getApi.findOneUser(logedInUserName).then(function (data) {
    $userNameProfile.text(data[0].user_name);
    $userEmailProfile.text(data[0].email);
    $userPasswordProfile.text(data[0].password);
  });
  $changePasswordBtn.on("click", function () {
    var newPassword = $changePasswordProfile.val().trim();
    if (newPassword.length < 6 || newPassword.length > 12) {
      alert("The password length must be between 6 and 12");
      return;
    };
    creatNewPassword(newPassword, logedInUserName)
  });
}


// Bootstrap card html
var card = '<div class="col-md-4">';
card += ' <div class="card mb-4 shadow-sm">';
card += '  <img src="..." class="card-img-top" alt="...">';
card += '   <div class="card-body">';
card += '     <h5 class="recipeName card-title">Recipe name</h5>';
card += '     <div class="cardInfo">';
card += '       <b>Description:</b>'
card += '       <p class="recipeDescription"></p>';
card += '       <b>Ingredients:</b>'
card += '       <ul class="recipeIngredients">';
card += '       </ul>';
card += '       <b>Instructions:</b>';
card += '       <p class="recipeInstructions" class="card-text"></p>';
card += '     </div>';
// card += '     <div class="d-flex justify-content-between align-items-center">';
// card += '       <div class="btn-group">';
// card += '          <button type="button" class="btn btn-danger btn-sm" style="margin-top: 5px">Save recipe</button>';
// card += '       </div>';
// card += '     </div>';
card += '   </div>';
card += '  </div>';
card += '</div>';

var getApi = {
  saveUser: function (user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/users",
      data: JSON.stringify(user)
    });
  },
  changePassword: function (password, user) {
    return $.ajax({
      url: "/api/password/" + password + "/" + user,
      type: "PUT"
    });
  },
  findOneUser: function (user_name) {
    // console.log(user_name);
    return $.ajax({
      url: "/api/users/" + user_name,
      type: "GET"
    });
  },
  saveFood: function (food) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/foods",
      data: JSON.stringify(food)
    });
  },
  getAllFoods: function (UserId) {
    return $.ajax({
      url: "api/allfoods/" + UserId,
      type: "GET"
    });
  },
  userPage: function () {
    console.log("userpage ajax")
    return $.ajax({
      url: "userpage",
      type: "GET"
    });
  },

};

var submitToLogin = function (event) {
  event.preventDefault();

  var signInName = $signInName.val().trim();
  if (!signInName) {
    alert("please input user name");
    return;
  }

  getApi.findOneUser(signInName).then(function (data) {
    // console.log(data);
    if (data.length === 0) {
      alert("user name not exist");
      return;
    } else if (data[0].password === $signInPassword.val().trim()) {
      logedInUserId = data[0].id;
      logedInUserName = data[0].user_name;
      console.log("you are loged in, user id is: " + logedInUserId);
      $signInName.val("");
      $signInPassword.val("");
      $("#add_food_div").css("display", "unset");
      $("#log_area").empty();
      $("#log_area").append($signOutBtn);
      $("#log_area").append($profileBtn.text("PROFILE"));
      refreshfoods();
      getItems();
      $(".login_close_btn").click();

      localStorage.setItem("pantryUserId", logedInUserId);
      localStorage.setItem("pantryUserName", logedInUserName);
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      localStorage.setItem("pantryExpireTime", tomorrow);

    } else {
      alert("password not correct");
    }
  });
}; //submitToLogin end

//when load/refresh page, check if user log in
function checkToken(){
var userId=parseInt( localStorage.getItem("pantryUserId"))
var expireTime = localStorage.getItem("pantryExpireTime")
expireTime = new Date(expireTime)
// console.log(expireTime+"  "+new Date()+"  "+(expireTime>new Date()))
if(!userId){
  return
}
else if(userId<0)
{
  return
}
else if(expireTime>new Date()){
  $("#add_food_div").css("display", "unset");
  $("#log_area").empty();
  $("#log_area").append($signOutBtn);
  $("#log_area").append($profileBtn.text("PROFILE"));
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  localStorage.setItem("pantryExpireTime", tomorrow);
  logedInUserId=userId;
  logedInUserName=localStorage.getItem("pantryUserName");
  refreshfoods();
  getItems();
}
} 

//checkToken end

//save user
var submitToSave = function (event) {
  event.preventDefault();

  var user = {
    user_name: $signUpName.val().trim(),
    password: $signUpPassword.val().trim(),
    email: $signUpEmail.val().trim()
  };
  var signUpPassword2 = $signUpPassword2.val().trim();
  if (!(user.user_name && user.password && signUpPassword2)) {
    alert("You must enter user name, password ");
    return;
  };
  if (user.password != signUpPassword2) {
    alert("The passwords don't match");
    return;
  };
  if (user.password.length < 6 || user.password.length > 12) {
    alert("The password length must be between 6 and 12");
    return;
  };
  var isExist = [];
  getApi.findOneUser(user.user_name).then(function (data) {
    console.log(data)
    isExist = data;

    if (isExist.length != 0) {
      alert("user name exist!");
      return;
    } else {
      getApi.saveUser(user).then(function () {
        console.log("you are signed up, go to log in");
        $("#sign_up_label").text("you are signed up, go to log in!");
        $signUpName.val("");
        $signUpPassword.val("");
        $signUpPassword2.val("");
        $signUpEmail.val("");
      });
    }
  });
}; //save user submitToSave function end

//save food
var submitToSaveFood = function (event) {
  event.preventDefault();


  var food = {
    UserId: logedInUserId,
    item_name: $addIngredient.val().trim(),
    quantity: $ingredientQuantity.val().trim(),
    unit: $ingredientUnit.val().trim(),
    expireDate: $ingredientExpireDate.val().trim(),
  };
  if (!food.item_name) {
    alert("please input food name!")
    return;
  } else if (isNaN(food.quantity)) {
    alert("quantity should be a number")
  }
  getApi.saveFood(food).then(function (data) {
    console.log(data)
    $addIngredient.val("");
    $ingredientQuantity.val("");
    $ingredientUnit.val("");
    $ingredientExpireDate.val("");
    refreshfoods();
  });
}; //save food end

// get user's all food
var refreshfoods = function () {
  var UserId = logedInUserId;
  getApi.getAllFoods(UserId).then(function (data) {
    // console.log(data)

    var newTbody = $("#foodInfo");

    var newTr = $("<tr>");
    newTr.append(
      $('<th scope="col">').text("#"),
      $('<th scope="col" class="subtitles">').text("Name"),
      $('<th scope="col" class="subtitles">').text("Quantity"),
      $('<th scope="col" class="subtitles">').text("Unit"),
      $('<th scope="col" class="subtitles">').text("Expiration date"),
    );
    $("#food-thead").empty();

    $("#food-thead").append(newTr);
    newTbody.empty();
    for (var i = 0; i < data.length; i++) {
      // var $button = $("<button>").addClass("btn btn-danger float-right delete").text("ｘ");
      var newTbodyTr = $("<tr>").append(
        $("<td>").text(i + 1),
        $("<td>").text(data[i].item_name),
        $("<td>").text(data[i].quantity),
        $("<td>").text(data[i].unit),
        $("<td>").text(data[i].expireDate),
        // $button,
      );
      newTbody.append(newTbodyTr);
    }
  });
};

$signUpSubmit.on("click", submitToSave);
$signInSubmit.on("click", submitToLogin);
$addFoodBtn.on("click", submitToSaveFood)

// The API object contains methods for each kind of request we'll make
var API = {

  getRecipesRandom: function (recipe) {
    return $.ajax({
      type: "GET",
      url: "/api/sampleRecipes",
    })
  },

  getRecipesByIngredients: function (ingredients) {
    return $.ajax({
      type: "GET",
      url: "api/RecipesByIngredients/" + ingredients,
    });
  },
  saveRecipe: function (recipe) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/addRecipe",
      data: JSON.stringify(recipe)
    });
  }
};

// Add recipe
var addRecipe = function (event) {
  event.preventDefault();
  console.log($ingredientsFile);
  var recipe = {
    name: $recipeName.val().trim(),
    description: $recipeDescription.val().trim(),
    instructions: $recipeInstructions.val().trim(),
    img: $imgInput.val().trim()
  };
  
  var ingredients =  $recipeIngredients.val().trim();
  console.log(csvJSON(ingredients));
  
  if (!(recipe.name && recipe.description)) {
    alert("You must enter a recipe name and description!");
    return;
  }

  // TODO: removing ability to write to database because not able to write to all fields yet.
  // API.saveRecipe(recipe).then(function () {
  //   refreshExamples();
  // });

  $recipeName.val("");
  $recipeDescription.val("");
  $recipeInstructions.val("");
  $recipeIngredients.val("");
  $imgInput.val("");
  //TODO: may need to clear the ingredients and instructions text inputs after they are inserted into the Ingredients database table.
};

function IngredientsCsvJSON(csv){
  var lines=csv.split("\n");  
  var result = [];  
  var headers= ["quantity","unit","name"];  
  for(var i=0;i<lines.length;i++){  
    var obj = {};
    var currentline=lines[i].split(",");  
      obj[headers[0]] = currentline[0];
      obj[headers[1]] = parseFloat(currentline[1]);
      obj[headers[2]] = currentline[2];
    result.push(obj);  
  }    
  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}

// Search for recipes by ingredients
var getRecipesByIngredients = function (event) {
  event.preventDefault();
  if ($ingredientsInput.val().trim().length > 0) {
    API.getRecipesByIngredients($ingredientsInput.val())
      .then(function (data) {
        $("#foundRecipesHeader").empty();
        $("#foundRecipes").empty();
        $("#foundRecipesHeader").prepend("Found Recipes"); // Add Found Recipes Heading
        $("#foundRecipesHeader").append("<hr>");
        $("#noRecipesFound").empty();
        $ingredientsInput.val("");

        if(data.length>0){
          // Add new recipe card
          for (var i = 0; i < data.length; i++) {
            $("#foundRecipes").append(card);
            $(".card-img-top:eq(" + i + ")").attr("src", data[i].img);
            $(".recipeName:eq(" + i + ")").text(data[i].name);
            $(".recipeDescription:eq(" + i + ")").text(data[i].description);
            $(".recipeInstructions:eq(" + i + ")").text(data[i].instructions);

            for (var j = 0; j < data[i].ingredients.length; j++) {
              var li = '<li class="ingr">' + data[i].ingredients[j].recipeIngredients.quantity + " ";
              li += data[i].ingredients[j].recipeIngredients.unit + " " + data[i].ingredients[j].name + '</li>';
              $(".recipeIngredients:eq(" + i + ")").append(li);
            }
          };
          $("#foundRecipes").append("<hr>");
        }
        else{
          $("#noRecipesFound").prepend("No recipes found :(");
          $("#noRecipesFound").append("<hr>");
        }
      });
  } else {
    console.log('No ingredients entered');
  }
};

//SHOW RANDOM RECIPES
var getRecipesRandom = function () {
  console.log($ingredientsInput.val());
  API.getRecipesRandom()
    .then(function (data) {
      console.log(data);
      $("#foundRandomRecipes").empty();
      $("#foundRandomRecipesHeader").prepend("Our favorites"); // Add Found Recipes Heading
      $("#foundRandomRecipesHeader").append("<hr>");
      $ingredientsInput.val("");

      // Add new recipe card
      for (var i = 0; i < data.length; i++) {
        $("#foundRandomRecipes").append(card);
        $(".card-img-top:eq(" + i + ")").attr("src", data[i].img);
        $(".recipeName:eq(" + i + ")").text(data[i].name);
        $(".recipeDescription:eq(" + i + ")").text(data[i].description);
        $(".recipeInstructions:eq(" + i + ")").text(data[i].instructions);

        for (var j = 0; j < data[i].ingredients.length; j++) {
          var li = '<li class="ingr">' + data[i].ingredients[j].recipeIngredients.quantity + " ";
          li += data[i].ingredients[j].recipeIngredients.unit + " " + data[i].ingredients[j].name + '</li>';
          $(".recipeIngredients:eq(" + i + ")").append(li);
        }
      };
    });
};

getRecipesRandom();

// Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
$submitRecipeBtn.on("click", addRecipe);


// Listener for searching recipes by ingredients
$ingredientsSubmitBtn.on("click", getRecipesByIngredients);

$("#ingredientAddButton").on("click", function () {
  const name = $("#ingredientInput").val();
  $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "POST",
    url: "api/ingredients/add",
    data: JSON.stringify({
      name: name
    })
  });
});


// ------------SHOPPING LIST--------------

// $(document).ready(function () {
var $newItemInput = $("input.new-item");
var $itemContainer = $(".item-container");
$(document).on("click", "button.delete", deleteItem);
$(document).on("click", "button.complete", toggleComplete);
$(document).on("click", ".item-item", editItem);
$(document).on("keyup", ".item-item", finishEdit);
$(document).on("blur", ".item-item", cancelEdit);
$(document).on("submit", "#item-form", insertItem);

var items = [];



function initializeRows() {
  $itemContainer.empty();
  var rowsToAdd = [];
  for (var i = 0; i < items.length; i++) {
    rowsToAdd.push(createNewRow(items[i]));
  }
  $itemContainer.prepend(rowsToAdd);
}

function getItems() {
  $.get("/api/items/" + logedInUserId, function (data) {
    items = data;
    initializeRows();
  });
}

function deleteItem(event) {
  event.stopPropagation();
  var id = $(this).data("id");
  $.ajax({
    method: "DELETE",
    url: "/api/items/" + id
  }).then(getItems);
}

function editItem() {
  var currentItem = $(this).data("item");
  $(this).children().hide();
  $(this).children("input.edit").val(currentItem.text);
  $(this).children("input.edit").show();
  $(this).children("input.edit").focus();
}

function toggleComplete(event) {
  event.stopPropagation();
  var item = $(this).parent().data("item");
  item.complete = !item.complete;
  updateItem(item);
}

function finishEdit(event) {
  var updatedItem = $(this).data("item");
  if (event.which === 13) {
    updatedItem.text = $(this).children("input").val().trim();
    $(this).blur();
    updateItem(updatedItem);
  }
}

function updateItem(item) {
  $.ajax({
    method: "PUT",
    url: "/api/items",
    data: item
  }).then(getItems);
}

function cancelEdit() {
  var currentItem = $(this).data("item");
  if (currentItem) {
    $(this).children().hide();
    $(this).children("input.edit").val(currentItem.text);
    $(this).children("span").show();
    $(this).children("button").show();
  }
}

function createNewRow(item) {
  var $newInputRow = $(
    [
      "<li class='list-group-item item-item'>",
      "<span>",
      item.text,
      "</span>",
      "<input type='text' class='edit' style='display: none;'>",
      "<button class='delete btn btn-danger'>x</button>",
      "<button class='complete btn btn-primary'>✓</button>",
      "</li>"
    ].join("")
  );

  $newInputRow.find("button.delete").data("id", item.id);
  $newInputRow.find("input.edit").css("display", "none");
  $newInputRow.data("item", item);
  if (item.complete) {
    $newInputRow.find("span").css("text-decoration", "line-through");
  }
  return $newInputRow;
}

function insertItem(event) {
  event.preventDefault();
  var item = {
    text: $newItemInput.val().trim(),
    complete: false,
    userId: logedInUserId
  };

  $.post("/api/items", item, getItems);
  $newItemInput.val("");
}
// });


checkToken();
