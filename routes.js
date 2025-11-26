// routes.js
module.exports = {
    home: "/",
    admin: "/admin",

    adminCategories: "/admin/kategoriler",
    adminCategoriesCreate: "/admin/kategoriler/ekle",
    adminCategoriesEdit: "/admin/kategoriler/:id/duzenle",
    adminCategoriesShow: "/admin/kategoriler/:id",
    adminCategoriesDelete: "/admin/kategoriler/:id/sil",

    adminWriters: "/admin/yazarlar",
    adminWritersCreate: "/admin/yazarlar/ekle",
    adminWritersEdit: "/admin/yazarlar/:id/duzenle",
    adminWritersShow: "/admin/yazarlar/:id",
    adminWritersDelete: "/admin/yazarlar/:id/sil",

    adminPublishers: "/admin/yayincilar",
    adminPublishersCreate: "/admin/yayincilar/ekle",
    adminPublishersEdit: "/admin/yayincilar/:id/duzenle",
    adminPublishersShow: "/admin/yayincilar/:id",
    adminPublishersDelete: "/admin/yayincilar/:id/sil",

    adminProducts: "/admin/urunler",
    adminProductsCreate: "/admin/urunler/ekle",
    adminProductsEdit: "/admin/urunler/:id/duzenle",
    adminProductsShow: "/admin/urunler/:id",
    adminProductsDelete: "/admin/urunler/:id/sil",
};
