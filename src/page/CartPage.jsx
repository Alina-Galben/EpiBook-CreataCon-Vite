import { Container, Table, Button, Alert } from "react-bootstrap";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, total } = useCart();

  if (cart.length === 0) {
    return (
      <Container className="py-5">
        <Alert variant="info">Il carrello è vuoto.</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2>Carrello</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Titolo</th>
            <th>Prezzo</th>
            <th>Quantità</th>
            <th>Totale</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.asin}>
              <td>{item.title}</td>
              <td>${item.price}</td>
              <td>
                <Button size="sm" onClick={() => updateQuantity(item.asin, -1)}>-</Button>
                <span className="mx-2">{item.quantity}</span>
                <Button size="sm" onClick={() => updateQuantity(item.asin, 1)}>+</Button>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => removeFromCart(item.asin)}>
                  Rimuovi
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h4>Totale: ${total.toFixed(2)}</h4>
      <Button variant="secondary" onClick={clearCart}>Svuota tutto</Button>
    </Container>
  );
} 