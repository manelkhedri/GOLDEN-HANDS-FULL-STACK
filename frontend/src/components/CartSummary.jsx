import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../features/cartSlice';

function CartSummary() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <section className="cart-summary">
      <h2>
        Shopping Cart ({totalQuantity})
      </h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                {(item.price * item.quantity).toLocaleString('fr-DZ')} DA
              </span>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>
            </div>
          ))}

          <h3>
            Total: {totalPrice.toLocaleString('fr-DZ')} DA
          </h3>

          <button onClick={() => dispatch(clearCart())}>
            Clear Cart
          </button>
        </>
      )}
    </section>
  );
}

export default CartSummary;