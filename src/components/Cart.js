import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {

    const cartItems=useSelector((store) => store.cart.items)

    const dispatch = useDispatch();
    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return <div className="text-center  p-10">
        <h1 className="text-2xl font-bold">Cart</h1>
        <div className="w-6/12 m-auto">
            <button className="p-2 my-10 bg-gray-600 rounded-lg text-white"
            onClick={handleClearCart}
            >Clear Cart</button>
            {cartItems.length==0 &&<div className="m-2 p-2 flex flex-row justify-around text-center"> 
             <h1 className=" font-mono text-center my-24"> Cart is Empty.... Add Items to the Cart !</h1> 
             <img className="p-5 m-5 w-64 h-auto"  src="https://t3.ftcdn.net/jpg/03/24/11/70/360_F_324117084_teePsAHoQ6znuO8JqiLXdcAKE1VaWeFF.jpg"></img> </div>}
            <ItemList items={cartItems}/>
        </div>
    </div>
};
export default Cart;