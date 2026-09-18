import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useAdminSession } from "../../../zustand/adminSession"

import {
  Plus,
  Search,
  RefreshCw,
  Edit3,
  Trash2,
  X,
  Package,
  BookOpen,
  IndianRupee,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Image as ImageIcon,
  Eye,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowUpDown,
  Check,
  MoreVertical,
} from "lucide-react";


const API = "http://localhost:8080/products";

const adminAuthHeaders = (admin) => ({
  Authorization: `Bearer ${admin?.token || ""}`,
});


const EMPTY_PRODUCT = {
  title: "",
  price: "",
  discount: "",
  category: "",
  image: "",
  description: "",
  author: "",
  quantity: 1
};


const AdminDashboard = () => {

  /* =========================
     STATE
  ========================= */

  const [product, setProduct] = useState(EMPTY_PRODUCT);

  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("All");

  const [sortBy, setSortBy] = useState("newest");

  const [selectedProducts, setSelectedProducts] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [previewProduct, setPreviewProduct] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage] = useState(8);

  const { admin } = useAdminSession(state => state);
  const [orderSummary, setOrderSummary] = useState({ ordersCount: 0, units: 0, revenue: 0, recentOrders: [] });

  const fetchOrderSummary = async () => {
    try {
      const response = await fetch("http://localhost:8080/orders/admin/summary", {
        headers: adminAuthHeaders(admin),
      });
      if (response.ok) setOrderSummary(await response.json());
    } catch (error) {
      console.error("Order summary error:", error);
    }
  };

  /* =========================
     FETCH PRODUCTS
  ========================= */

  const fetchProducts = async () => {

    try {

      setLoading(true);

      const response = await fetch(API, {
        headers: adminAuthHeaders(admin),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      const newData = data.filter(chunks => chunks.admin_id == admin.admin.id);

      setProducts(Array.isArray(newData) ? newData : []);

    } catch (error) {

      console.error(error);

      toast.error(
        "Unable to load products. Check your server."
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    fetchProducts();
    fetchOrderSummary();
  }, [admin?.admin?.id]);


  /* =========================
     FORM CHANGE
  ========================= */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  /* =========================
     RESET FORM
  ========================= */

  const resetForm = () => {

    setProduct(EMPTY_PRODUCT);

    setEditingId(null);

    setShowForm(false);

  };


  /* =========================
     VALIDATION
  ========================= */

  const validateProduct = () => {

    if (!product.title.trim()) {
      toast.error("Book title is required");
      return false;
    }

    if (!product.author.trim()) {
      toast.error("Author name is required");
      return false;
    }

    if (!product.price || Number(product.price) <= 0) {
      toast.error("Enter a valid price");
      return false;
    }

    if (
      product.discount === "" ||
      Number(product.discount) < 0 ||
      Number(product.discount) > 100
    ) {
      toast.error("Discount must be between 0 and 100");
      return false;
    }

    if (!product.category.trim()) {
      toast.error("Category is required");
      return false;
    }

    if (!product.image.trim()) {
      toast.error("Image URL is required");
      return false;
    }

    if (!product.description.trim()) {
      toast.error("Description is required");
      return false;
    }

    return true;
  };


  /* =========================
     CREATE PRODUCT
  ========================= */

  const createProduct = async (e) => {

    e.preventDefault();

    if (!validateProduct()) return;

    try {
      const newProduct = {
        ...product,
        admin_id: admin.admin.id
      };

      console.log("Product being sent:", newProduct);
      console.log("Admin ID:", newProduct.admin_id);



      setSaving(true);

      const response = await fetch(API, {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
          ...adminAuthHeaders(admin),
        },

        body: JSON.stringify(newProduct),

      });


      if (!response.ok) {

        throw new Error(
          "Failed to create product"
        );

      }


      await response.json();

      toast.success(
        "Book added successfully!"
      );

      resetForm();

      await fetchProducts();

    } catch (error) {

      console.error(error);

      toast.error(
        "Unable to add book."
      );

    } finally {

      setSaving(false);

    }

  };


  /* =========================
     START EDITING
  ========================= */

  const startEdit = (item) => {

    setProduct({
      title: item.title || "",
      price: item.price || "",
      discount: item.discount || "",
      category: item.category || "",
      image: item.image || "",
      description: item.description || "",
      author: item.author || "",
      quantity: item.quantity ?? 0,
    });

    setEditingId(item._id);

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* =========================
     UPDATE PRODUCT
  ========================= */

  const updateProduct = async (e) => {

    e.preventDefault();

    if (!validateProduct()) return;

    if (!editingId) return;

    try {

      setSaving(true);

      const response = await fetch(
        `${API}/${editingId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            ...adminAuthHeaders(admin),
          },

          body: JSON.stringify(product),
        }
      );


      if (!response.ok) {

        throw new Error(
          "Failed to update product"
        );

      }


      await response.json();

      toast.success(
        "Book updated successfully!"
      );

      resetForm();

      await fetchProducts();

    } catch (error) {

      console.error(error);

      toast.error(
        "Unable to update book."
      );

    } finally {

      setSaving(false);

    }

  };


  /* =========================
     UPDATE QUANTITY
  ========================= */

  const updateQuantity = async (id, currentQuantity, change) => {
    try {
      const response = await fetch(
        `${API}/${id}/quantity`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...adminAuthHeaders(admin),
          },
          body: JSON.stringify({
            change: change
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update quantity"
        );
      }

      const newQuantity = data.quantity;

      setProducts((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
              ...item,
              quantity: newQuantity
            }
            : item
        )
      );

      setPreviewProduct((prev) =>
        prev && prev._id === id
          ? {
            ...prev,
            quantity: newQuantity
          }
          : prev
      );

      toast.success(
        change > 0
          ? "Quantity increased"
          : "Quantity decreased"
      );

    } catch (error) {
      console.error("Quantity update error:", error);

      toast.error(
        error.message || "Unable to update quantity."
      );
    }
  };


  /* =========================
     DELETE PRODUCT
  ========================= */

  const deleteProduct = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmed) return;


    try {

      const response = await fetch(
        `${API}/${id}`,
        {
          method: "DELETE",
          headers: adminAuthHeaders(admin),
        }
      );


      if (!response.ok) {
        throw new Error(
          "Delete failed"
        );
      }


      toast.success(
        "Book deleted successfully!"
      );

      setSelectedProducts((prev) =>
        prev.filter((item) => item !== id)
      );

      await fetchProducts();

    } catch (error) {

      console.error(error);

      toast.error(
        "Unable to delete book."
      );

    }

  };


  /* =========================
     BULK DELETE
  ========================= */

  const bulkDelete = async () => {

    if (selectedProducts.length === 0) {
      return;
    }


    const confirmed = window.confirm(
      `Delete ${selectedProducts.length} selected books?`
    );


    if (!confirmed) return;


    try {

      setLoading(true);


      await Promise.all(

        selectedProducts.map((id) =>
          fetch(`${API}/${id}`, {
            method: "DELETE",
            headers: adminAuthHeaders(admin),
          })
        )

      );


      toast.success(
        `${selectedProducts.length} books deleted`
      );


      setSelectedProducts([]);

      await fetchProducts();

    } catch (error) {

      console.error(error);

      toast.error(
        "Some products could not be deleted."
      );

    } finally {

      setLoading(false);

    }

  };


  /* =========================
     SELECT PRODUCT
  ========================= */

  const toggleProductSelection = (id) => {

    setSelectedProducts((prev) => {

      if (prev.includes(id)) {

        return prev.filter(
          (item) => item !== id
        );

      }

      return [...prev, id];

    });

  };


  /* =========================
     SELECT ALL
  ========================= */

  const toggleSelectAll = () => {

    const pageIds = paginatedProducts.map(
      (item) => item._id
    );


    const allSelected = pageIds.every(
      (id) =>
        selectedProducts.includes(id)
    );


    if (allSelected) {

      setSelectedProducts((prev) =>
        prev.filter(
          (id) => !pageIds.includes(id)
        )
      );

    } else {

      setSelectedProducts((prev) => [

        ...new Set([
          ...prev,
          ...pageIds,
        ]),

      ]);

    }

  };


  /* =========================
     CATEGORIES
  ========================= */

  const categories = useMemo(() => {

    const unique = [
      ...new Set(
        products
          .map((item) => item.category)
          .filter(Boolean)
      ),
    ];

    return unique.sort();

  }, [products]);


  /* =========================
     FILTER + SORT
  ========================= */

  const filteredProducts = useMemo(() => {

    let result = [...products];


    // SEARCH

    if (search.trim()) {

      const query =
        search.toLowerCase();

      result = result.filter((item) =>

        `${item.title || ""}
                 ${item.author || ""}
                 ${item.category || ""}`
          .toLowerCase()
          .includes(query)

      );

    }


    // CATEGORY

    if (categoryFilter !== "All") {

      result = result.filter(
        (item) =>
          item.category ===
          categoryFilter
      );

    }


    // SORT

    switch (sortBy) {

      case "price-low":

        result.sort(
          (a, b) =>
            Number(a.price) -
            Number(b.price)
        );

        break;


      case "price-high":

        result.sort(
          (a, b) =>
            Number(b.price) -
            Number(a.price)
        );

        break;


      case "name":

        result.sort((a, b) =>
          (a.title || "").localeCompare(
            b.title || ""
          )
        );

        break;


      case "discount":

        result.sort(
          (a, b) =>
            Number(b.discount) -
            Number(a.discount)
        );

        break;


      default:
        break;

    }


    return result;

  }, [
    products,
    search,
    categoryFilter,
    sortBy,
  ]);


  /* =========================
     PAGINATION
  ========================= */

  const totalPages = Math.ceil(
    filteredProducts.length /
    itemsPerPage
  );


  const paginatedProducts =
    filteredProducts.slice(

      (currentPage - 1) *
      itemsPerPage,

      currentPage *
      itemsPerPage

    );


  useEffect(() => {

    setCurrentPage(1);

  }, [
    search,
    categoryFilter,
    sortBy,
  ]);


  /* =========================
     STATISTICS
  ========================= */

  const totalBooks = products.length;


  const totalCategories =
    categories.length;


  const totalValue = products.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0),
    0
  );


  const averagePrice =
    totalBooks > 0
      ? totalValue / totalBooks
      : 0;


  const discountedBooks =
    products.filter(
      (item) =>
        Number(item.discount || 0) > 0
    ).length;


  /* =========================
     DISCOUNTED PRICE
  ========================= */

  const discountedPrice =

    product.price
      ? (
        Number(product.price) -
        (
          Number(product.price) *
          Number(product.discount || 0)
        ) /
        100
      ).toFixed(2)
      : "0.00";


  return (

    <div className="min-h-screen bg-slate-50">

      {/* =========================
                HEADER
            ========================= */}

      <header className="border-b bg-white">

        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">

                BookVerse Administration

              </p>

              <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">

                Store Dashboard

              </h1>

              <p className="mt-1 text-sm text-slate-500">

                Manage your bookstore inventory and products.

              </p>

            </div>


            <div className="flex gap-2">

              <button
                onClick={fetchProducts}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >

                <RefreshCw
                  size={17}
                  className={
                    loading
                      ? "animate-spin"
                      : ""
                  }
                />

                Refresh

              </button>


              <button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >

                <Plus size={18} />

                Add Book

              </button>

            </div>

          </div>

        </div>

      </header>


      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">


        {/* =========================
                    STATISTICS
                ========================= */}

        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">


          <StatCard
            title="Total Books"
            value={totalBooks}
            icon={<BookOpen size={21} />}
            description="Books in catalogue"
          />


          <StatCard
            title="Paid Orders"
            value={orderSummary.ordersCount}
            icon={<ShoppingBag size={21} />}
            description="Orders containing your books"
          />

          <StatCard
            title="Store Revenue"
            value={`₹${Number(orderSummary.revenue || 0).toLocaleString("en-IN")}`}
            icon={<IndianRupee size={21} />}
            description="Paid sales for your store"
          />

          <StatCard
            title="Categories"
            value={totalCategories}
            icon={<Package size={21} />}
            description="Active categories"
          />


          <StatCard
            title="Catalogue Value"
            value={`₹${totalValue.toLocaleString("en-IN")}`}
            icon={<IndianRupee size={21} />}
            description="Before discounts"
          />


          <StatCard
            title="On Sale"
            value={discountedBooks}
            icon={<TrendingUp size={21} />}
            description="Discounted books"
          />

        </section>


        {/* =========================
                    PRODUCT FORM
                ========================= */}

        {showForm && (

          <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b p-5">

              <div>

                <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">

                  Product Management

                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">

                  {editingId
                    ? "Edit Book"
                    : "Add New Book"}

                </h2>

              </div>


              <button
                onClick={resetForm}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >

                <X size={20} />

              </button>

            </div>


            <form
              onSubmit={
                editingId
                  ? updateProduct
                  : createProduct
              }
              className="p-5"
            >

              <div className="grid gap-6 lg:grid-cols-[1fr_280px]">


                {/* FORM */}

                <div className="grid gap-4 sm:grid-cols-2">


                  <InputField
                    label="Book Title"
                    name="title"
                    value={product.title}
                    onChange={handleChange}
                    placeholder="Atomic Habits"
                  />


                  <InputField
                    label="Author"
                    name="author"
                    value={product.author}
                    onChange={handleChange}
                    placeholder="James Clear"
                  />


                  <InputField
                    label="Price"
                    name="price"
                    type="number"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="499"
                  />


                  <InputField
                    label="Discount (%)"
                    name="discount"
                    type="number"
                    value={product.discount}
                    onChange={handleChange}
                    placeholder="10"
                  />

                  <InputField
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={product.quantity}
                    onChange={handleChange}
                    placeholder="10"
                  />


                  <InputField
                    label="Category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    placeholder="Self Help"
                  />


                  <InputField
                    label="Image URL"
                    name="image"
                    value={product.image}
                    onChange={handleChange}
                    placeholder="https://..."
                  />


                  <div className="sm:col-span-2">

                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">

                      Description

                    </label>

                    <textarea
                      name="description"
                      value={product.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Enter a detailed description..."
                      className="w-full resize-none rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                      required
                    />

                  </div>


                  {/* PRICE PREVIEW */}

                  <div className="sm:col-span-2 rounded-xl bg-indigo-50 p-4">

                    <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">

                      Pricing Preview

                    </p>


                    <div className="mt-2 flex items-center gap-3">

                      <span className="text-2xl font-bold text-indigo-700">

                        ₹{discountedPrice}

                      </span>


                      {Number(product.discount) > 0 && (

                        <>

                          <del className="text-sm text-slate-400">

                            ₹{product.price}

                          </del>

                          <span className="rounded-md bg-green-100 px-2 py-1 text-xs font-bold text-green-700">

                            {product.discount}% OFF

                          </span>

                        </>

                      )}

                    </div>

                  </div>


                  {/* ACTIONS */}

                  <div className="flex gap-3 sm:col-span-2">

                    <button
                      type="submit"
                      disabled={saving}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >

                      {saving ? (
                        <>
                          <RefreshCw
                            size={17}
                            className="animate-spin"
                          />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Check size={17} />

                          {editingId
                            ? "Update Book"
                            : "Add Book"}
                        </>
                      )}

                    </button>


                    <button
                      type="button"
                      onClick={resetForm}
                      className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-600 hover:bg-slate-50"
                    >

                      Cancel

                    </button>

                  </div>

                </div>


                {/* IMAGE PREVIEW */}

                <div>

                  <p className="mb-2 text-sm font-semibold text-slate-700">

                    Cover Preview

                  </p>


                  <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50">

                    {product.image ? (

                      <img
                        src={product.image}
                        alt="Book preview"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display =
                            "none";
                        }}
                      />

                    ) : (

                      <div className="text-center text-slate-400">

                        <ImageIcon
                          size={40}
                          className="mx-auto"
                        />

                        <p className="mt-2 text-sm">

                          Image preview

                        </p>

                      </div>

                    )}

                  </div>

                </div>

              </div>

            </form>

          </section>

        )}


        {/* =========================
                    INVENTORY TOOLBAR
                ========================= */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">


          <div className="border-b p-4 sm:p-5">

            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">


              {/* SEARCH */}

              <div className="relative flex-1">

                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search books, authors or categories..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
                />

              </div>


              <div className="flex flex-wrap gap-2">


                {/* CATEGORY */}

                <div className="relative">

                  <Filter
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    value={categoryFilter}
                    onChange={(e) =>
                      setCategoryFilter(
                        e.target.value
                      )
                    }
                    className="h-11 rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-sm outline-none"
                  >

                    <option value="All">
                      All Categories
                    </option>

                    {categories.map(
                      (category) => (
                        <option
                          key={category}
                          value={category}
                        >
                          {category}
                        </option>
                      )
                    )}

                  </select>

                </div>


                {/* SORT */}

                <div className="relative">

                  <ArrowUpDown
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(
                        e.target.value
                      )
                    }
                    className="h-11 rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-sm outline-none"
                  >

                    <option value="newest">
                      Newest
                    </option>

                    <option value="name">
                      Name
                    </option>

                    <option value="price-low">
                      Price: Low → High
                    </option>

                    <option value="price-high">
                      Price: High → Low
                    </option>

                    <option value="discount">
                      Highest Discount
                    </option>

                  </select>

                </div>

              </div>

            </div>

          </div>


          {/* BULK ACTION */}

          {selectedProducts.length > 0 && (

            <div className="flex items-center justify-between border-b bg-indigo-50 px-4 py-3">

              <span className="text-sm font-semibold text-indigo-700">

                {selectedProducts.length} selected

              </span>


              <button
                onClick={bulkDelete}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700"
              >

                <Trash2 size={15} />

                Delete Selected

              </button>

            </div>

          )}


          {/* =========================
                        DESKTOP TABLE
                    ========================= */}

          <div className="hidden overflow-x-auto md:block">

            <table className="w-full text-left">

              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">

                <tr>

                  <th className="w-12 px-5 py-4">

                    <input
                      type="checkbox"
                      checked={
                        paginatedProducts.length > 0 &&
                        paginatedProducts.every(
                          (item) =>
                            selectedProducts.includes(
                              item._id
                            )
                        )
                      }
                      onChange={
                        toggleSelectAll
                      }
                    />

                  </th>

                  <th className="px-5 py-4">
                    Book
                  </th>

                  <th className="px-5 py-4">
                    Category
                  </th>

                  <th className="px-5 py-4">
                    Price
                  </th>

                  <th className="px-5 py-4">
                    Discount
                  </th>

                  <th className="px-5 py-4">
                    Quantity
                  </th>

                  <th className="px-5 py-4 text-right">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-slate-100">

                {loading ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="py-16 text-center"
                    >

                      <RefreshCw
                        size={25}
                        className="mx-auto animate-spin text-indigo-600"
                      />

                      <p className="mt-3 text-sm text-slate-500">

                        Loading inventory...

                      </p>

                    </td>

                  </tr>

                ) : paginatedProducts.length === 0 ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="py-16 text-center"
                    >

                      <Package
                        size={40}
                        className="mx-auto text-slate-300"
                      />

                      <p className="mt-3 font-semibold text-slate-700">

                        No books found

                      </p>

                      <p className="mt-1 text-sm text-slate-400">

                        Try changing your search or filters.

                      </p>

                    </td>

                  </tr>

                ) : (

                  paginatedProducts.map(
                    (item) => (

                      <ProductRow
                        key={item._id}
                        item={item}
                        selected={selectedProducts.includes(
                          item._id
                        )}
                        onSelect={() =>
                          toggleProductSelection(
                            item._id
                          )
                        }
                        onEdit={() =>
                          startEdit(item)
                        }
                        onDelete={() =>
                          deleteProduct(
                            item._id
                          )
                        }
                        onPreview={() =>
                          setPreviewProduct(
                            item
                          )
                        }
                        onQuantityChange={(change) =>
                          updateQuantity(
                            item._id,
                            item.quantity,
                            change
                          )
                        }
                      />

                    )
                  )

                )}

              </tbody>

            </table>

          </div>


          {/* =========================
                        MOBILE CARDS
                    ========================= */}

          <div className="grid gap-4 p-4 md:hidden">

            {paginatedProducts.map(
              (item) => (

                <MobileProductCard
                  key={item._id}
                  item={item}
                  selected={selectedProducts.includes(
                    item._id
                  )}
                  onSelect={() =>
                    toggleProductSelection(
                      item._id
                    )
                  }
                  onEdit={() =>
                    startEdit(item)
                  }
                  onDelete={() =>
                    deleteProduct(
                      item._id
                    )
                  }
                  onPreview={() =>
                    setPreviewProduct(
                      item
                    )
                  }
                  onQuantityChange={(change) =>
                    updateQuantity(
                      item._id,
                      item.quantity,
                      change
                    )
                  }
                />

              )
            )}

          </div>


          {/* =========================
                        PAGINATION
                    ========================= */}

          {totalPages > 1 && (

            <div className="flex items-center justify-between border-t px-4 py-4">

              <p className="text-xs text-slate-500">

                Showing{" "}
                <strong>
                  {(
                    (currentPage - 1) *
                    itemsPerPage +
                    1
                  )}
                </strong>{" "}
                -
                <strong>
                  {Math.min(
                    currentPage *
                    itemsPerPage,
                    filteredProducts.length
                  )}
                </strong>{" "}
                of{" "}
                <strong>
                  {filteredProducts.length}
                </strong>

              </p>


              <div className="flex gap-2">

                <button
                  disabled={
                    currentPage === 1
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) =>
                        page - 1
                    )
                  }
                  className="rounded-lg border p-2 disabled:opacity-40"
                >

                  <ChevronLeft size={17} />

                </button>


                <span className="flex items-center px-2 text-sm font-semibold">

                  {currentPage} / {totalPages}

                </span>


                <button
                  disabled={
                    currentPage ===
                    totalPages
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) =>
                        page + 1
                    )
                  }
                  className="rounded-lg border p-2 disabled:opacity-40"
                >

                  <ChevronRight size={17} />

                </button>

              </div>

            </div>

          )}

        </section>

      </main>


      {/* =========================
                PRODUCT PREVIEW MODAL
            ========================= */}

      {previewProduct && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b p-5">

              <h2 className="font-bold text-lg">
                Book Preview
              </h2>

              <button
                onClick={() =>
                  setPreviewProduct(null)
                }
                className="rounded-lg p-2 hover:bg-slate-100"
              >

                <X size={20} />

              </button>

            </div>


            <div className="grid gap-6 p-6 md:grid-cols-[200px_1fr]">

              <img
                src={
                  previewProduct.image
                }
                alt={
                  previewProduct.title
                }
                className="mx-auto aspect-[4/5] w-full max-w-[200px] rounded-xl object-cover"
              />


              <div>

                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">

                  {
                    previewProduct.category
                  }

                </span>


                <h2 className="mt-3 text-2xl font-bold">

                  {
                    previewProduct.title
                  }

                </h2>


                <p className="mt-1 text-slate-500">

                  by{" "}
                  {
                    previewProduct.author
                  }

                </p>


                <div className="mt-5 flex items-center gap-3">

                  <strong className="text-2xl text-indigo-600">

                    ₹
                    {(
                      Number(
                        previewProduct.price
                      ) -
                      (
                        Number(
                          previewProduct.price
                        ) *
                        Number(
                          previewProduct.discount ||
                          0
                        )
                      ) /
                      100
                    ).toFixed(2)}

                  </strong>


                  {Number(
                    previewProduct.discount
                  ) > 0 && (

                      <del className="text-sm text-slate-400">

                        ₹
                        {
                          previewProduct.price
                        }

                      </del>

                    )}

                </div>


                <p className="mt-5 text-sm leading-6 text-slate-600">

                  {
                    previewProduct.description
                  }

                </p>


                <div className="mt-6 grid grid-cols-2 gap-3">

                  <div className="rounded-xl bg-slate-50 p-3">

                    <p className="text-xs text-slate-400">
                      Discount
                    </p>

                    <strong>
                      {
                        previewProduct.discount
                      }
                      %
                    </strong>

                  </div>


                  <div className="rounded-xl bg-slate-50 p-3">

                    <p className="text-xs text-slate-400">
                      Stock Quantity
                    </p>

                    <strong
                      className={
                        Number(previewProduct.quantity || 0) === 0
                          ? "text-red-600"
                          : "text-green-600"
                      }
                    >
                      {previewProduct.quantity ?? 0} units
                    </strong>

                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">

                    <p className="text-xs text-slate-400">
                      Product ID
                    </p>

                    <strong className="block truncate text-xs">
                      {
                        previewProduct._id
                      }
                    </strong>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};


/* =====================================================
   STAT CARD
===================================================== */

const StatCard = ({
  title,
  value,
  icon,
  description,
}) => (

  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

    <div className="flex items-start justify-between">

      <div>

        <p className="text-sm text-slate-500">
          {title}
        </p>

        <h3 className="mt-2 text-2xl font-bold text-slate-900">
          {value}
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          {description}
        </p>

      </div>


      <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">

        {icon}

      </div>

    </div>

  </div>

);


/* =====================================================
   INPUT FIELD
===================================================== */

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) => (

  <div>

    <label className="mb-1.5 block text-sm font-semibold text-slate-700">

      {label}

    </label>

    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
      required
    />

  </div>

);


/* =====================================================
   PRODUCT ROW
===================================================== */

const ProductRow = ({
  item,
  selected,
  onSelect,
  onEdit,
  onDelete,
  onPreview,
  onQuantityChange
}) => {

  const finalPrice = (
    Number(item.price || 0) -
    (
      Number(item.price || 0) *
      Number(item.discount || 0)
    ) /
    100
  ).toFixed(2);


  return (

    <tr className="transition hover:bg-slate-50">

      <td className="px-5 py-4">

        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
        />

      </td>


      <td className="px-5 py-4">

        <div className="flex min-w-[250px] items-center gap-3">

          <img
            src={item.image}
            alt={item.title}
            className="h-14 w-11 rounded-lg object-cover"
          />


          <div>

            <p className="font-semibold text-slate-800">

              {item.title}

            </p>

            <p className="mt-0.5 text-xs text-slate-500">

              {item.author}

            </p>

          </div>

        </div>

      </td>


      <td className="px-5 py-4">

        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">

          {item.category}

        </span>

      </td>


      <td className="px-5 py-4">

        <div>

          <strong className="text-sm text-slate-800">

            ₹{finalPrice}

          </strong>

          {Number(item.discount) > 0 && (

            <del className="ml-2 text-xs text-slate-400">

              ₹{item.price}

            </del>

          )}

        </div>

      </td>


      <td className="px-5 py-4">

        {Number(item.discount) > 0 ? (

          <span className="rounded-md bg-green-50 px-2 py-1 text-xs font-bold text-green-600">

            {item.discount}% OFF

          </span>

        ) : (

          <span className="text-xs text-slate-400">
            No discount
          </span>

        )}

      </td>


      <td className="px-5 py-4">
        <div className="flex items-center gap-2">

          <button
            type="button"
            onClick={() => onQuantityChange(-1)}
            disabled={Number(item.quantity || 0) <= 0}
            title="Decrease quantity"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            −
          </button>

          <span
            className={`min-w-[35px] text-center text-sm font-bold ${Number(item.quantity || 0) === 0
                ? "text-red-600"
                : "text-slate-800"
              }`}
          >
            {item.quantity ?? 0}
          </span>

          <button
            type="button"
            onClick={() => onQuantityChange(1)}
            title="Increase quantity"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition hover:bg-indigo-100"
          >
            +
          </button>

        </div>

        <p
          className={`mt-1 text-[10px] font-semibold ${Number(item.quantity || 0) === 0
              ? "text-red-500"
              : Number(item.quantity || 0) <= 5
                ? "text-orange-500"
                : "text-green-600"
            }`}
        >
          {Number(item.quantity || 0) === 0
            ? "Out of stock"
            : Number(item.quantity || 0) <= 5
              ? "Low stock"
              : "In stock"}
        </p>
      </td>


      <td className="px-5 py-4">

        <div className="flex justify-end gap-1">

          <button
            onClick={onPreview}
            title="Preview"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >

            <Eye size={17} />

          </button>


          <button
            onClick={onEdit}
            title="Edit"
            className="rounded-lg p-2 text-indigo-600 hover:bg-indigo-50"
          >

            <Edit3 size={17} />

          </button>


          <button
            onClick={onDelete}
            title="Delete"
            className="rounded-lg p-2 text-red-500 hover:bg-red-50"
          >

            <Trash2 size={17} />

          </button>

        </div>

      </td>

    </tr>

  );

};


/* =====================================================
   MOBILE PRODUCT CARD
===================================================== */

const MobileProductCard = ({
  item,
  selected,
  onSelect,
  onEdit,
  onDelete,
  onPreview,
  onQuantityChange
}) => {

  const finalPrice = (
    Number(item.price || 0) -
    (
      Number(item.price || 0) *
      Number(item.discount || 0)
    ) /
    100
  ).toFixed(2);


  return (

    <article className="rounded-xl border border-slate-200 bg-white p-4">

      <div className="flex gap-3">

        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
          className="mt-2"
        />


        <img
          src={item.image}
          alt={item.title}
          className="h-24 w-16 rounded-lg object-cover"
        />


        <div className="min-w-0 flex-1">

          <span className="text-[10px] font-bold uppercase text-indigo-600">

            {item.category}

          </span>


          <h3 className="mt-1 truncate font-bold text-slate-800">

            {item.title}

          </h3>


          <p className="text-xs text-slate-500">

            {item.author}

          </p>


          <div className="mt-2 flex items-center gap-2">

            <strong className="text-indigo-600">

              ₹{finalPrice}

            </strong>

            {Number(item.discount) > 0 && (

              <span className="text-xs font-semibold text-green-600">

                {item.discount}% off

              </span>

            )}

          </div>

        </div>

      </div>


      <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-50 p-2">

        <div>
          <p className="text-[10px] font-semibold uppercase text-slate-400">
            Stock
          </p>

          <p
            className={`text-sm font-bold ${Number(item.quantity || 0) === 0
                ? "text-red-600"
                : Number(item.quantity || 0) <= 5
                  ? "text-orange-500"
                  : "text-green-600"
              }`}
          >
            {item.quantity ?? 0} units
          </p>
        </div>

        <div className="flex items-center gap-2">

          <button
            type="button"
            onClick={() => onQuantityChange(-1)}
            disabled={Number(item.quantity || 0) <= 0}
            title="Decrease quantity"
            className="h-8 w-8 rounded-lg border bg-white font-bold disabled:cursor-not-allowed disabled:opacity-40"
          >
            −
          </button>

          <span className="w-6 text-center text-sm font-bold">
            {item.quantity ?? 0}
          </span>

          <button
            type="button"
            onClick={() => onQuantityChange(1)}
            title="Increase quantity"
            className="h-8 w-8 rounded-lg bg-indigo-600 text-white font-bold"
          >
            +
          </button>

        </div>

      </div>


      <div className="mt-4 flex gap-2 border-t pt-3">

        <button
          onClick={onPreview}
          className="flex-1 rounded-lg border py-2 text-xs font-semibold"
        >

          <Eye
            size={14}
            className="mr-1 inline"
          />

          View

        </button>


        <button
          onClick={onEdit}
          className="flex-1 rounded-lg bg-indigo-50 py-2 text-xs font-semibold text-indigo-600"
        >

          <Edit3
            size={14}
            className="mr-1 inline"
          />

          Edit

        </button>


        <button
          onClick={onDelete}
          className="flex-1 rounded-lg bg-red-50 py-2 text-xs font-semibold text-red-600"
        >

          <Trash2
            size={14}
            className="mr-1 inline"
          />

          Delete

        </button>

      </div>

    </article>

  );

};


export default AdminDashboard;