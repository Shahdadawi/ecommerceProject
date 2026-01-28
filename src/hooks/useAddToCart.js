import { useQueryClient, useMutation } from '@tanstack/react-query'
import axiosAuthInstance from '../Api/axiosAuthInstance';

export default function useAddToCart() {
    const queryClient = useQueryClient();

    const addToCartMutation = useMutation({
        mutationFn: async({ProductId, Count}) => {
            const response = await axiosAuthInstance.post('/Carts', {
                ProductId,
                Count
            });
            console.log("Add to cart response:", response.data); 
            return response.data;
        },
        onSuccess: () => {
            console.log("Invalidating queries..."); 
            queryClient.invalidateQueries({ queryKey: ['carts'] });
        }
    });
    
    return addToCartMutation;
}