import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Common
      "login": "Login",
      "logout": "Logout",
      "username": "Username",
      "password": "Password",
      "submit": "Submit",
      "cancel": "Cancel",
      "save": "Save",
      "delete": "Delete",
      "edit": "Edit",
      "add": "Add",
      "search": "Search",
      "total": "Total",
      "close": "Close",
      "print": "Print",
      "confirm": "Confirm",
      "back": "Back",

      // Navigation
      "pos": "POS",
      "tables": "Tables",
      "kitchen": "Kitchen",
      "menu": "Menu",
      "reports": "Reports",

      // Roles
      "admin": "Admin",
      "cashier": "Cashier",
      "kitchen_staff": "Kitchen",

      // Tables
      "table": "Table",
      "table_number": "Table #",
      "available": "Available",
      "occupied": "Occupied",
      "reserved": "Reserved",

      // Orders
      "new_order": "New Order",
      "order": "Order",
      "order_number": "Order #",
      "orders": "Orders",
      "order_status": "Order Status",
      "pending": "Pending",
      "preparing": "Preparing",
      "ready": "Ready",
      "completed": "Completed",
      "cancelled": "Cancelled",
      "items": "Items",
      "quantity": "Qty",
      "price": "Price",
      "subtotal": "Subtotal",
      "notes": "Notes",
      "add_item": "Add Item",
      "remove_item": "Remove Item",

      // Payment
      "payment": "Payment",
      "pay_now": "Pay Now",
      "cash": "Cash",
      "card": "Card",
      "payment_method": "Payment Method",
      "paid": "Paid",
      "unpaid": "Unpaid",

      // Menu
      "menu_management": "Menu Management",
      "category": "Category",
      "categories": "Categories",
      "pizza": "Pizza",
      "doner": "Doner",
      "kurdish_food": "Kurdish Food",
      "arabic_food": "Arabic Food",
      "name": "Name",
      "description": "Description",
      "add_menu_item": "Add Menu Item",
      "edit_menu_item": "Edit Menu Item",

      // Kitchen
      "kitchen_display": "Kitchen Display",
      "start_preparing": "Start Preparing",
      "mark_ready": "Mark Ready",
      "time": "Time",

      // Reports
      "daily_report": "Daily Report",
      "weekly_report": "Weekly Report",
      "sales_summary": "Sales Summary",
      "total_orders": "Total Orders",
      "total_revenue": "Total Revenue",
      "cash_revenue": "Cash Revenue",
      "card_revenue": "Card Revenue",
      "top_items": "Top Items",
      "category_revenue": "Revenue by Category",
      "orders_by_hour": "Orders by Hour",

      // Messages
      "login_success": "Login successful",
      "login_failed": "Invalid credentials",
      "order_created": "Order created successfully",
      "order_updated": "Order updated successfully",
      "payment_success": "Payment processed successfully",
      "select_table": "Select a table",
      "select_items": "Select items to order",
      "no_items": "No items in order",
    }
  },
  ar: {
    translation: {
      // Common - Arabic
      "login": "تسجيل الدخول",
      "logout": "تسجيل الخروج",
      "username": "اسم المستخدم",
      "password": "كلمة المرور",
      "submit": "إرسال",
      "cancel": "إلغاء",
      "save": "حفظ",
      "delete": "حذف",
      "edit": "تعديل",
      "add": "إضافة",
      "search": "بحث",
      "total": "المجموع",
      "close": "إغلاق",
      "print": "طباعة",
      "confirm": "تأكيد",
      "back": "رجوع",

      // Navigation
      "pos": "نقطة البيع",
      "tables": "الطاولات",
      "kitchen": "المطبخ",
      "menu": "القائمة",
      "reports": "التقارير",

      // Roles
      "admin": "مدير",
      "cashier": "كاشير",
      "kitchen_staff": "المطبخ",

      // Tables
      "table": "طاولة",
      "table_number": "رقم الطاولة",
      "available": "متاحة",
      "occupied": "مشغولة",
      "reserved": "محجوزة",

      // Orders
      "new_order": "طلب جديد",
      "order": "طلب",
      "order_number": "رقم الطلب",
      "orders": "الطلبات",
      "order_status": "حالة الطلب",
      "pending": "قيد الانتظار",
      "preparing": "قيد التحضير",
      "ready": "جاهز",
      "completed": "مكتمل",
      "cancelled": "ملغى",
      "items": "العناصر",
      "quantity": "الكمية",
      "price": "السعر",
      "subtotal": "المجموع الفرعي",
      "notes": "ملاحظات",
      "add_item": "إضافة عنصر",
      "remove_item": "إزالة عنصر",

      // Payment
      "payment": "الدفع",
      "pay_now": "ادفع الآن",
      "cash": "نقدي",
      "card": "بطاقة",
      "payment_method": "طريقة الدفع",
      "paid": "مدفوع",
      "unpaid": "غير مدفوع",

      // Menu
      "menu_management": "إدارة القائمة",
      "category": "الفئة",
      "categories": "الفئات",
      "pizza": "بيتزا",
      "doner": "دونر",
      "kurdish_food": "طعام كردي",
      "arabic_food": "طعام عربي",
      "name": "الاسم",
      "description": "الوصف",
      "add_menu_item": "إضافة عنصر قائمة",
      "edit_menu_item": "تعديل عنصر القائمة",

      // Kitchen
      "kitchen_display": "شاشة المطبخ",
      "start_preparing": "بدء التحضير",
      "mark_ready": "وضع علامة جاهز",
      "time": "الوقت",

      // Reports
      "daily_report": "التقرير اليومي",
      "weekly_report": "التقرير الأسبوعي",
      "sales_summary": "ملخص المبيعات",
      "total_orders": "إجمالي الطلبات",
      "total_revenue": "إجمالي الإيرادات",
      "cash_revenue": "إيرادات نقدية",
      "card_revenue": "إيرادات البطاقة",
      "top_items": "العناصر الأكثر مبيعاً",
      "category_revenue": "الإيرادات حسب الفئة",
      "orders_by_hour": "الطلبات حسب الساعة",

      // Messages
      "login_success": "تم تسجيل الدخول بنجاح",
      "login_failed": "بيانات اعتماد غير صحيحة",
      "order_created": "تم إنشاء الطلب بنجاح",
      "order_updated": "تم تحديث الطلب بنجاح",
      "payment_success": "تمت معالجة الدفع بنجاح",
      "select_table": "اختر طاولة",
      "select_items": "اختر العناصر للطلب",
      "no_items": "لا توجد عناصر في الطلب",
    }
  },
  ku: {
    translation: {
      // Common - Kurdish
      "login": "چوونەژوورەوە",
      "logout": "دەرچوون",
      "username": "ناوی بەکارهێنەر",
      "password": "وشەی نهێنی",
      "submit": "ناردن",
      "cancel": "هەڵوەشاندنەوە",
      "save": "پاشەکەوتکردن",
      "delete": "سڕینەوە",
      "edit": "دەستکاریکردن",
      "add": "زیادکردن",
      "search": "گەڕان",
      "total": "کۆی گشتی",
      "close": "داخستن",
      "print": "چاپکردن",
      "confirm": "پشتڕاستکردنەوە",
      "back": "گەڕانەوە",

      // Navigation
      "pos": "خاڵی فرۆشتن",
      "tables": "مێزەکان",
      "kitchen": "چێشتخانە",
      "menu": "لیست",
      "reports": "ڕاپۆرتەکان",

      // Roles
      "admin": "بەڕێوەبەر",
      "cashier": "کاشێر",
      "kitchen_staff": "چێشتخانە",

      // Tables
      "table": "مێز",
      "table_number": "ژمارەی مێز",
      "available": "بەردەستە",
      "occupied": "قەرەباڵغە",
      "reserved": "حجز کراوە",

      // Orders
      "new_order": "داواکاریی نوێ",
      "order": "داواکاری",
      "order_number": "ژمارەی داواکاری",
      "orders": "داواکاریەکان",
      "order_status": "دۆخی داواکاری",
      "pending": "چاوەڕوانی",
      "preparing": "ئامادەکردن",
      "ready": "ئامادەیە",
      "completed": "تەواوبوو",
      "cancelled": "هەڵوەشاوەتەوە",
      "items": "بڕگەکان",
      "quantity": "بڕ",
      "price": "نرخ",
      "subtotal": "کۆی لاوەکی",
      "notes": "تێبینیەکان",
      "add_item": "زیادکردنی بڕگە",
      "remove_item": "لابردنی بڕگە",

      // Payment
      "payment": "پارەدان",
      "pay_now": "ئێستا پارە بدە",
      "cash": "کاش",
      "card": "کارت",
      "payment_method": "شێوازی پارەدان",
      "paid": "پارە دراوە",
      "unpaid": "پارە نەدراوە",

      // Menu
      "menu_management": "بەڕێوەبردنی لیست",
      "category": "هاوپۆل",
      "categories": "هاوپۆلەکان",
      "pizza": "پیتزا",
      "doner": "دۆنەر",
      "kurdish_food": "خواردنی کوردی",
      "arabic_food": "خواردنی عەرەبی",
      "name": "ناو",
      "description": "وەسف",
      "add_menu_item": "زیادکردنی بڕگەی لیست",
      "edit_menu_item": "دەستکاریکردنی بڕگەی لیست",

      // Kitchen
      "kitchen_display": "پیشاندانی چێشتخانە",
      "start_preparing": "دەستپێکردنی ئامادەکردن",
      "mark_ready": "نیشانکردن وەک ئامادە",
      "time": "کات",

      // Reports
      "daily_report": "ڕاپۆرتی ڕۆژانە",
      "weekly_report": "ڕاپۆرتی هەفتانە",
      "sales_summary": "پوختەی فرۆشتن",
      "total_orders": "کۆی گشتی داواکاریەکان",
      "total_revenue": "کۆی گشتی داهات",
      "cash_revenue": "داهاتی کاش",
      "card_revenue": "داهاتی کارت",
      "top_items": "بڕگە بەناوبانگەکان",
      "category_revenue": "داهات بەپێی هاوپۆل",
      "orders_by_hour": "داواکاریەکان بەپێی کاتژمێر",

      // Messages
      "login_success": "چوونەژوورەوە سەرکەوتووبوو",
      "login_failed": "زانیاری هەڵەیە",
      "order_created": "داواکاری بە سەرکەوتوویی دروستکرا",
      "order_updated": "داواکاری بە سەرکەوتوویی نوێکرایەوە",
      "payment_success": "پارەدان بە سەرکەوتوویی ئەنجامدرا",
      "select_table": "مێزێک هەڵبژێرە",
      "select_items": "بڕگەکان هەڵبژێرە بۆ داواکاری",
      "no_items": "هیچ بڕگەیەک لە داواکاریدا نییە",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
