import { create } from "zustand";



export const useCounterStore = create((set)=>({
    counter:0,
}));