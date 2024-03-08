export const CheckBox = ({ checked, onCheckBoxClick }) => {
  return (
    <>
      <p>
        <input type="checkbox" onClick={onCheckBoxClick} value={checked} />
        Only show products in stock
      </p>
    </>
  );
};
