import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export const CartReducer = (state, action) => {

    const { shoppingCart, totalPrice, totalQty } = state;

    let product;
    let index;
    let updatedPrice;
    let updatedQty;

    console.log(shoppingCart)

    switch (action.type) {
        case 'ADD_TO_CART':
            
            const check = shoppingCart.find(product=> product.ProductID === action.id)
            //check if product already in cart
            if (check) {
                toast.info('this product is already in your cart', {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
                return state;
            }
            //else add the product

            else {
                product = action.product;
                product['qty'] = 1;
                product['TotalProductPrice'] = product.ProductPrice * product.qty;
                updatedQty = totalQty + 1;
                updatedPrice = totalPrice + product.ProductPrice;
                return {
                    shoppingCart: [product, ...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
                }
            }
            break;

            case 'INC':
                product = action.cart;
                product.qty = ++product.qty;
                product.TotalProductPrice = product.qty * product.ProductPrice;
                updatedQty = totalQty + 1;
                updatedPrice = totalPrice + product.ProductPrice;
                index = shoppingCart.findIndex(cart => cart.ProductID === action.id);
                shoppingCart[index] = product;
                return {
                    shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
                }
                break;

            case 'DEC':
                product = action.cart;
                if (product.qty > 1) {
                    product.qty = product.qty - 1;
                    product.TotalProductPrice = product.qty * product.ProductPrice;
                    updatedPrice = totalPrice - product.ProductPrice;
                    updatedQty = totalQty - 1;
                    index = shoppingCart.findIndex(cart => cart.ProductID === action.id);
                    shoppingCart[index] = product;
                    return {
                        shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
                    }
                }
                else if(product.qty === 1) {
                    toast.warning('Please Click on the delete button to remove the Product', {
                        position: "top-center",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    return state;
                }
                break;

                case 'DELETE':
            const filtered = shoppingCart.filter(product => product.ProductID !== action.id);
            product = action.cart;
            updatedQty = totalQty - product.qty;
            updatedPrice = totalPrice - product.qty * product.ProductPrice;
            return {
                shoppingCart: [...filtered], totalPrice: updatedPrice, totalQty: updatedQty
            }
            break;

            case 'EMPTY':
                return {
                    shoppingCart: [], totalPrice: 0, totalQty: 0
                }

            default :
            return state
    }

}