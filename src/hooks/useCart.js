import React from "react";
import useFetch from "./useFetch";
import axiosAuthInstance from "../Api/axiosAuthInstance";
import i18n from "../i18n";

export default function useCart() {
  return useFetch(['carts' ,i18n.language], "/Carts", axiosAuthInstance); 
}