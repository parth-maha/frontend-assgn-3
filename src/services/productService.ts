import api from "../components/api/axiosInstance"

export const fetchProducts = async() =>{
    const response = await api.get("/products")
    if(response.status === 200){
        return response.data.products;
    }

    throw new Error("Failed to fetch products")
}

export const fetchProductById = async(id : number) =>{
    const response = await api.get(`/products/${id}`)
    if(response.status === 200){
        return response.data;
    }
    
    throw new Error(`Failed to Product : ${id}`)
}

export default {fetchProductById, fetchProducts}