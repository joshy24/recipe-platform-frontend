export const BASE_URL = "http://localhost:4000"
export const API_VERSION = "/api/v1"



//Auth

export const LOGIN_URL = API_VERSION+"/login"



//Dasboard

export const GET_ENTITIES_COUNT = API_VERSION+"/entities_count"




//Products

export const CREATE_PRODUCT = API_VERSION+"/login"

export const GET_ALL_PRODUCTS = API_VERSION+"/products"

export const SEARCH_PRODUCTS_URL = API_VERSION+"/products/search"

export const GET_PRODUCT = API_VERSION+"/product"

export const ADD_PRODUCT = API_VERSION+"/products/add"

export const ADD_MATERIALS_TO_PRODUCT = API_VERSION+"/product/add_materials"

export const ADD_RECIPES_TO_PRODUCT = API_VERSION+"/product/add_recipes"

export const ALL_RECIPES_URL = BASE_URL+API_VERSION+"/product/recipes"

export const ALL_MATERIALS_URL = BASE_URL+API_VERSION+"/product/materials"

export const DELETE_PRODUCT_MATERIAL = BASE_URL+API_VERSION+"/product/delete_material"

export const DELETE_PRODUCT_RECIPE = BASE_URL+API_VERSION+"/product/delete_recipe"

export const PRODUCTS_TO_ADD_URL = BASE_URL+API_VERSION+"/products/products_to_add"



//Recipes

export const CREATE_RECIPE = API_VERSION+"/recipes/add"

export const GET_ALL_RECIPES = API_VERSION+"/recipes"

export const GET_RECIPE = API_VERSION+"/recipe"

export const SEARCH_RECIPES_URL = BASE_URL+API_VERSION+"/recipes/search"

export const ALL_RECIPE_INGREDIENTS_URL = BASE_URL+API_VERSION+"/recipe/ingredients"

export const ADD_INGREDIENTS_TO_RECIPE_URL = BASE_URL+API_VERSION+"/recipe/add_ingredients"

export const EDIT_RECIPE_URL = BASE_URL+API_VERSION+"/recipe/edit"

export const DELETE_RECIPE_URL = BASE_URL+API_VERSION+"/recipe/delete"



//Inventory

export const GET_ALL_INVENTORY = API_VERSION+"/inventory"

export const SEARCH_INVENTORY_URL = BASE_URL+API_VERSION+"/inventory/search"

export const CREATE_INGREDIENT = API_VERSION+"/inventory/add_ingredient"

export const CREATE_MATERIAL = API_VERSION+"/inventory/add_material"

export const EDIT_INGREDIENT_URL = BASE_URL+API_VERSION+"/inventory/edit_ingredient"

export const EDIT_MATERIAL_URL = BASE_URL+API_VERSION+"/inventory/edit_material"

export const DELETE_INGREDIENT_URL = BASE_URL+API_VERSION+"/inventory/delete_ingredient"

export const DELETE_MATERIAL_URL = BASE_URL+API_VERSION+"/inventory/delete_material"



//To Add 
export const INGREDIENTS_TO_ADD = API_VERSION+"/inventory/ingredients_to_add"

export const MATERIALS_TO_ADD = BASE_URL+API_VERSION+"/inventory/materials_to_add"

export const RECIPES_TO_ADD  = BASE_URL+API_VERSION+"/inventory/recipes_to_add"





//Orders

export const ALL_ORDERS_URL  = BASE_URL+API_VERSION+"/orders"

export const DELETE_ORDER_URL  = BASE_URL+API_VERSION+"/orders/delete"

export const CREATE_ORDER_URL  = BASE_URL+API_VERSION+"/orders/add"

export const SEARCH_ORDERS_URL  = BASE_URL+API_VERSION+"/orders/search"

export const ORDER_PRODUCTS_URL  = BASE_URL+API_VERSION+"/order/products"

export const GET_ORDER_URL = BASE_URL+API_VERSION+"/order"

export const EDIT_ORDER_URL = BASE_URL+API_VERSION+"/order/edit"

export const FULFILL_ORDER_URL = BASE_URL+API_VERSION+"/order/fulfill"

export const ADD_PRODUCTS_TO_ORDER_URL = BASE_URL+API_VERSION+"/order/add_products"

export const EDIT_ORDER_PRODUCT_URL = BASE_URL+API_VERSION+"/order/edit_product"

export const DELETE_ORDER_PRODUCT_URL = BASE_URL+API_VERSION+"/order/delete_product"

export const ORDER_SHOPPING_LIST = BASE_URL+API_VERSION+"/order/shopping-list"