import React, { useEffect } from "react";
import { Loading, MetaData } from "..";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
    getAdminProducts,
    deleteProduct,
    updateProductStatus,
    clearErrors,
} from "../../actions/productActions";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Sidebar from "../admin/Sidebar";
import {
    DELETE_PRODUCT_RESET,
    UPDATE_PRODUCT_RESET,
} from "../../constants/productConstants";

const ProductList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);
    const {
        error: deleteError,
        isDeleted,
        isUpdated,
        message,
    } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getAdminProducts());
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            alert.success(message);
            history.push("/admin/products");
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
        if (isUpdated) {
            alert.success("Product Status Updated");
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [
        dispatch,
        alert,
        error,
        deleteError,
        isUpdated,
        message,
        isDeleted,
        history,
    ]);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };

    const UpdateProductHandler = (id) => {
        dispatch(updateProductStatus(id));
    };

    const columns = [
        { field: "id", headerName: "Product ID", flex: 1, minWidth: 220 },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "seller",
            headerName: "Seller",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "price",
            headerName: "Price",
            renderCell: (cellValues) => {
                return (
                    <p className="font-bold text-blue-600 p-2 py-1 rounded-md bg-gray-200">
                        ₹ {cellValues.row.price}
                    </p>
                );
            },
            flex: 1,
            minWidth: 100,
        },
        {
            field: "stock",
            headerName: "Stock",
            renderCell: (cellValues) => {
                return cellValues.row.stock !== 0 ? (
                    <p className="p-4 py-1 rounded-full  bg-green-400 text-white">
                        {cellValues.row.stock}
                    </p>
                ) : (
                    <p className="p-4 py-1 rounded-full  bg-red-500 text-white">
                        {cellValues.row.stock}
                    </p>
                );
            },
            flex: 1,
            minWidth: 100,
        },
        {
            field: "sold",
            headerName: "Sold",
            renderCell: (cellValues) => {
                return cellValues.row.sold !== 0 ? (
                    <p className="p-4 py-1 rounded-full  bg-green-400 text-white">
                        {cellValues.row.sold}
                    </p>
                ) : (
                    <p className="p-4 py-1 rounded-full  bg-red-500 text-white">
                        {cellValues.row.sold}
                    </p>
                );
            },
            flex: 1,
            minWidth: 100,
        },
        {
            field: "status",
            headerName: "isActive",
            renderCell: (cellValues) => {
                return (
                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                        <input
                            type="checkbox"
                            onClickCapture={() =>
                                UpdateProductHandler(cellValues.row.id)
                            }
                            defaultChecked={cellValues.row.status}
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                        />
                        <label
                            htmlFor="toggle"
                            className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                    </div>
                );
            },
            flex: 1,
            minWidth: 100,
        },
        {
            field: "actions",
            headerName: "Action",
            renderCell: (cellValues) => {
                return (
                    <div className="flex flex-row space-x-4">
                        <Link to={`/product/${cellValues.row.id}`}>
                            <i className="fa fa-eye p-2 text-white bg-blue-500 rounded-md"></i>
                        </Link>
                        <Link to={`/admin/product/${cellValues.row.id}`}>
                            <button className="p-2 py-1 text-white bg-yellow-400 rounded-md">
                                <i className="fa fa-edit"></i>
                            </button>
                        </Link>
                        <button
                            onClick={() =>
                                deleteProductHandler(cellValues.row.id)
                            }
                            className="p-2 py-1 text-white bg-red-500 rounded-md">
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                );
            },
            flex: 1,
            minWidth: 140,
            sortable: false,
        },
    ];

    const setProducts = () => {
        const data = [];
        products &&
            products.forEach((product) =>
                data.push({
                    id: product._id,
                    name: product.name,
                    seller: product.seller,
                    price: `${product.price}`,
                    stock: product.stock,
                    sold: product.sold,
                    status: product.isActive,
                    actions: product._id,
                }),
            );
        return data;
    };
    return (
        <div className="max-w-screen-2xl mx-auto">
            <MetaData title={"All Products"} />
            <Sidebar />
            {loading ? (
                <Loading />
            ) : (
                <>
                    <h1 className="mt-4 text-2xl font-bold flex justify-center">
                        All Products
                    </h1>
                    <Box className="bg-white w-[90%] h-[65vh] mx-auto mt-10 rounded-md">
                        <DataGrid
                            rows={setProducts()}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            experimentalFeatures={{ newEditingApi: false }}
                            components={{
                                Toolbar: GridToolbar,
                            }}
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: "name", sort: "asc" }],
                                },
                            }}
                        />
                    </Box>
                </>
            )}
        </div>
    );
};

export default ProductList;
