import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: {
        translation: {
          "Home": "Home",
          "Categories":"Categories",
          "Products":"Products",
          "Featured Categories":"Featured Categories",
          "Choose your necessary products from this feature categories.":"Choose your necessary products from this feature categories.",
          "All Categories":"All Categories",
          "Shop":"Shop",
          "Contact Us":"Contact Us",
          "Blog":"Blog",
          "Profile":"Profile",
          "Logout":"Logout",
          "Shopping Cart":"Shopping Cart",
          "Review your items and proceed to checkout":"Review your items and proceed to checkout",
          "Quantity":"Quantity",
          "Unit Price":"Unit Price",
          "Total":"Total",
          "Continue shopping":"Continue shopping",
          "Update cart":"Update cart",
          "Cart Totals":"Cart Totals",
          "Subtotal":"Subtotal",
          "Shipping":"Shipping",
          "Proceed to Checkout":"Proceed to Checkout",
          "Showing":"Showing",
          "results":"results",
          "Product Categories":"Product Categories",
          "Price":"Price",
          "Colors":"Colors",
          "New":"New",
          "Add to Cart":"  Add to Cart",
          "Buy now":"Buy now",
          "Add to wishlist":"Add to wishlist",
          "Error loading Cart Items":"Error loading Cart Items",
          "Your cart is empty":"Your cart is empty",
          "Add items to your cart and they'll appear here":"Add items to your cart and they'll appear here",
          "Remove item?":"Remove item?",
          "Product":"Product"

        }
      },
       ar: {
        translation: {
          "Home": "الرئيسية",
          "Categories":"الفئات",
          "Products":"المنتجات",
          "Featured Categories":"الفئات المميزة",
          "Choose your necessary products from this feature categories.":"اختر المنتجات التي تحتاجها من هذه الفئات المميزة",
          "All Categories":"جميع الفئات",
          "Shop":"تسوق",
          "Contact Us":"تواصل معنا",
          "Blog":"مدونة",
          "Profile":"حسابك",
          "Logout":"تسجيل خروج",
          "Shopping Cart":"سلة التسوق",
          "Review your items and proceed to checkout.":"راجع مشترياتك وانتقل إلى صفحة الدفع",
          "Quantity":"الكمية",
          "Unit Price":"سعر الوحدة",
          "Total":"المجموع",
          "Continue shopping":"تابع التسوق",
          "Update cart":"تحديث سلة التسوق",
          "Cart Totals":"إجمالي سلة التسوق",
          "Subtotal":"المجموع الفرعي",
          "Shipping":"شحن",
          "Proceed to Checkout":"انتقل إلى صفحة الدفع",
          "Showing":"عرض",
          "results":"نتائج",
          "Product Categories":"فئات المنتجات",
          "Price":"السعر",
          "Colors":"الألوان",
          "New":"جديد",
          "Add to Cart":"أضف إلى السلة",
          "Buy now":"اشتري الاّن",
          "Add to wishlist":"أضف إلى قائمة الأمنيات",
          "Error loading Cart Items":"حدث خطأ أثناء تحميل عناصر سلة التسوق",
          "Your cart is empty":"سلة التسوق الخاصة بك فارغة",
          "Add items to your cart and they'll appear here":"أضف المنتجات إلى سلة التسوق وستظهر هنا",
          "Remove item?":"هل تريد حذف العنصر؟",
          "Product":"المنتج"
        }
      }

    },
    lng: "en", 
    fallbackLng: "en",


  });

  export default i18n;
