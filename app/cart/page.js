import { cookies } from 'next/headers';
import { getShop } from '../../database/shop';
import CheckoutButton from './CheckoutButton';
import styles from './page.module.scss';
import RemoveButton from './RemoveButton';

export const metadata = {
  title: {
    default: 'CART',
  },
};

export default async function CartPage() {
  const itemsCookie = cookies().get('cart');
  const shop = await getShop();

  let itemsCookieParsed = [];

  if (itemsCookie) {
    itemsCookieParsed = JSON.parse(itemsCookie.value);
  }

  console.log('shop', shop);

  // adding property 'amount' to every item
  const itemsWithAmount = shop.map((item) => {
    const itemWithAmount = { ...item, amount: 0 };

    // read the cookie to find the item
    const itemInCookie = itemsCookieParsed.find(
      (itemObject) => item.id === itemObject.id,
    );

    // if find the item, update the amount
    if (itemInCookie) {
      itemWithAmount.amount = itemInCookie.amount;
    }
    return itemWithAmount;
  });
  //  filtering the items with amount over 0
  const itemsWithAmountOverNull = itemsWithAmount.filter(
    (item) => item.amount > 0,
  );

  // making a new array, in order to push there the prices from the itemsWithAmountOverNull
  const priceSum = [];

  return (
    <main className={styles.mainmain}>
      <h1 className={styles.h1}>CART</h1>
      <div>
        {itemsWithAmountOverNull.map((item) => {
          priceSum.push(item.price * item.amount);

          return (
            <div
              className={styles.product}
              key={item.id}
              data-test-id={`cart-product-${item.id}`}
            >
              <h2>{item.name}</h2>
              <div>
                <h3>Quantity:</h3>
                <p data-test-id={`cart-product-quantity-${item.id}`}>
                  {item.amount}
                </p>
                <p>Price per item: {item.price}€</p>
              </div>
              <RemoveButton item={item} className={styles.removeButton} />
            </div>
          );
        })}
      </div>

      <div className={styles.checkoutAndPrice}>
        <h2> Nice choice! </h2>
        <h2>
          Total price:
          {priceSum.reduce((partialSum, a) => partialSum + a, 0)} €
        </h2>
        <CheckoutButton />
        {/* should send to checkout page */}
      </div>
    </main>
  );
}
