import Form from './Form';
import styles from './page.module.scss';
import TotalPrice from './TotalPrice';

export const metadata = {
  title: {
    default: 'CHECKOUT',
  },
};

export default function CheckoutPage() {
  return (
    <main className={styles.main}>
      <h1>CHECKOUT</h1>
      <Form />
      <TotalPrice />
    </main>
  );
}
