

export const BASE_URL = "http://localhost:4000"



//Auth

export const LOGIN_URL = "/api/v1/login"



//Dasboard

export const GET_ENTITIES_COUNT = "/api/v1/entities_count"



//Orders

export const CREATE_ORDER = "/api/v1/login"

export const GET_ALL_ORDERS = "/api/v1/login"

export const SEARCH_ORDERS_URL = BASE_URL+"/api/v1/orders/search"



//Products

export const CREATE_PRODUCT = "/api/v1/login"

export const GET_ALL_PRODUCTS = "/api/v1/products"

export const SEARCH_PRODUCTS_URL = "/api/v1/products/search"

export const GET_PRODUCT = "/api/v1/product"

export const ADD_PRODUCT = "/api/v1/products/add"

export const ADD_MATERIALS_TO_PRODUCT = "/api/v1/product/add_materials"

export const ALL_MATERIALS = "/api/v1/product/materials"

export const ALL_RECIPES = "/api/v1/product/recipes"



//Recipes

export const CREATE_RECIPE = "/api/v1/recipes/add"

export const GET_ALL_RECIPES = "/api/v1/recipes"

export const GET_RECIPE = "/api/v1/recipe"

export const SEARCH_RECIPES_URL = BASE_URL+"/api/v1/recipes/search"



//Inventory

export const GET_ALL_INVENTORY = "/api/v1/inventory"

export const SEARCH_INVENTORY_URL = BASE_URL+"/api/v1/inventory/search"

export const CREATE_INGREDIENT = "/api/v1/inventory/add_ingredient"

export const CREATE_MATERIAL = "/api/v1/inventory/add_material"



//To Add 
export const INGREDIENTS_TO_ADD = "/api/v1/inventory/ingredients_to_add"

export const MATERIALS_TO_ADD = "/api/v1/inventory/materials_to_add"