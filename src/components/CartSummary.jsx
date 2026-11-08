// Totals for the cart. Products found through search have no price, so the subtotal
// counts only priced products and says how many it left out.
function CartSummary({ products }) {
  const priced = products.filter((product) => product.price != null)
  const unpricedCount = products.length - priced.length
  const subtotal = priced.reduce((sum, product) => sum + product.price, 0)

  return (
    <div className="flex flex-col gap-3 text-sm">
      <div className="flex items-center justify-between">
        <span className="text-muted">Products</span>
        <span className="font-medium text-fg">{products.length}</span>
      </div>
      <div className="flex items-center justify-between border-t border-border pt-3">
        <span className="font-display text-base text-fg">Subtotal</span>
        <span className="font-display text-base text-fg">{priced.length > 0 ? `$${subtotal.toFixed(2)}` : '—'}</span>
      </div>
      {unpricedCount > 0 && (
        <p className="leading-body text-muted">
          {unpricedCount === 1
            ? '1 product has no listed price and isn’t included.'
            : `${unpricedCount} products have no listed price and aren’t included.`}
        </p>
      )}
    </div>
  )
}

export default CartSummary
