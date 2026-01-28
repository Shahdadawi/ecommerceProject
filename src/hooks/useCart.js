import React from "react";
import useFetch from "./useFetch";
import axiosAuthInstance from "../Api/axiosAuthInstance";

export default function useCart() {
  return useFetch(["carts"], "/Carts", axiosAuthInstance); 
}