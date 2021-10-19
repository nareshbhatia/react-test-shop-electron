import React, { Fragment } from 'react';
import { NumberUtils } from '@react-force/number-utils';
import { CartUtils } from '../../../models';
import { Loading } from '../../../components';
import { useCartQuery } from '../../../services';
import { StringUtils } from '../../../utils';

export const CartSummary = () => {
  const { isLoading, isError, error, data: cart } = useCartQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <main>
        <h1>{StringUtils.errorToString(error)}</h1>
      </main>
    );
  }

  if (cart === undefined) {
    return (
      <main>
        <h1>Could not fetch the cart</h1>
      </main>
    );
  }

  return (
    <Fragment>
      <h2>Shopping Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table data-testid="order-items" className="mt-3">
          <tbody>
            {cart.items.map((item, index) => (
              <tr key={index}>
                <td>{item.productName}</td>
                <td className="text-right">{item.quantity}</td>
                <td className="text-right" data-testid="price-cell">
                  {NumberUtils.formatAsMoney(item.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>Total</td>
              <td className="text-right">
                {NumberUtils.formatAsMoney(CartUtils.total(cart))}
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </Fragment>
  );
};
