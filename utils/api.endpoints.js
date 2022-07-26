export const BASE_URL = "http://localhost:4000"
export const API_VERSION = "/api/v1"



//Auth

export const LOGIN_URL = API_VERSION+"/login"



//Dasboard

export const GET_ENTITIES_COUNT = API_VERSION+"/entities_count"



//Orders

export const CREATE_ORDER = API_VERSION+"/login"

export const GET_ALL_ORDERS = API_VERSION+"/login"

export const SEARCH_ORDERS_URL = BASE_URL+API_VERSION+"/orders/search"



//Products

export const CREATE_PRODUCT = API_VERSION+"/login"

export const GET_ALL_PRODUCTS = API_VERSION+"/products"

export const SEARCH_PRODUCTS_URL = API_VERSION+"/products/search"

export const GET_PRODUCT = API_VERSION+"/product"

export const ADD_PRODUCT = API_VERSION+"/products/add"

export const ADD_MATERIALS_TO_PRODUCT = API_VERSION+"/product/add_materials"

export const ALL_RECIPES_URL = BASE_URL+API_VERSION+"/product/recipes"

export const ALL_MATERIALS_URL = BASE_URL+API_VERSION+"/product/materials"

export const DELETE_PRODUCT_MATERIAL = BASE_URL+API_VERSION+"/product/delete_material"

export const DELETE_PRODUCT_RECIPE = BASE_URL+API_VERSION+"/product/delete_recipe"



//Recipes

export const CREATE_RECIPE = API_VERSION+"/recipes/add"

export const GET_ALL_RECIPES = API_VERSION+"/recipes"

export const GET_RECIPE = API_VERSION+"/recipe"

export const SEARCH_RECIPES_URL = BASE_URL+API_VERSION+"/recipes/search"



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