import React, { useEffect, useState } from 'react';
import useProductStore from '../store/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const paymentOptions = [
  { key: 'stripe', label: 'Stripe', logo: assets.stripe_logo },
  { key: 'razorpay', label: 'Razorpay', logo: assets.razorpay_logo },
  { key: 'cod', label: 'Cash on Delivery', logo: null },
];

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  street: '',
  city: '',
  state: '',
  zipcode: '',
  country: '',
  phone: '',
};

const PlaceOrder = () => {
  const { cart, products, currency, deliveryFee } = useProductStore();
  const [cartData, setCartData] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState('stripe');
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState('');
  const [invalidFields, setInvalidFields] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let tempCartData = [];
    let total = 0;
    for (const itemId in cart) {
      for (const size in cart[itemId]) {
        if (cart[itemId][size] > 0) {
          const product = products.find((p) => p._id === itemId);
          const itemTotal = product.price * cart[itemId][size];
          total += itemTotal;
          tempCartData.push({
            _id: itemId,
            size,
            quantity: cart[itemId][size],
            product,
            itemTotal,
          });
        }
      }
    }
    setCartData(tempCartData);
    setSubtotal(total);
  }, [cart, products]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setInvalidFields((prev) => prev.filter((f) => f !== e.target.name));
  };

  const handlePlaceOrder = () => {
    // Validate all fields
    const emptyFields = Object.entries(form)
      .filter(([key, value]) => value.trim() === '')
      .map(([key]) => key);
    if (emptyFields.length > 0) {
      setFormError('Please fill in all delivery information fields.');
      setInvalidFields(emptyFields);
      return;
    }
    setFormError('');
    setInvalidFields([]);
    if (!selectedPayment) {
      toast.error('Please select a payment method.');
      return;
    }
    navigate('/orders');
  };

  return (
    <div className="border-t pt-10 px-2 md:px-10 lg:px-24 xl:px-40 pb-10">
      <div className="mb-2">
        <Title text1="Delivery" text2="Information" />
      </div>
      {formError && (
        <div className="text-red-500 mb-4 text-sm font-medium">{formError}</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Delivery Information Form */}
        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={form.firstName}
              onChange={handleInputChange}
              className={`border rounded px-3 py-2 w-full ${invalidFields.includes('firstName') ? 'border-red-500' : ''}`}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleInputChange}
              className={`border rounded px-3 py-2 w-full ${invalidFields.includes('lastName') ? 'border-red-500' : ''}`}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleInputChange}
            className={`border rounded px-3 py-2 w-full ${invalidFields.includes('email') ? 'border-red-500' : ''}`}
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={form.street}
            onChange={handleInputChange}
            className={`border rounded px-3 py-2 w-full ${invalidFields.includes('street') ? 'border-red-500' : ''}`}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleInputChange}
              className={`border rounded px-3 py-2 w-full ${invalidFields.includes('city') ? 'border-red-500' : ''}`}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleInputChange}
              className={`border rounded px-3 py-2 w-full ${invalidFields.includes('state') ? 'border-red-500' : ''}`}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              name="zipcode"
              placeholder="Zipcode"
              value={form.zipcode}
              onChange={handleInputChange}
              className={`border rounded px-3 py-2 w-full ${invalidFields.includes('zipcode') ? 'border-red-500' : ''}`}
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={form.country}
              onChange={handleInputChange}
              className={`border rounded px-3 py-2 w-full ${invalidFields.includes('country') ? 'border-red-500' : ''}`}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleInputChange}
              className={`border rounded px-3 py-2 w-full ${invalidFields.includes('phone') ? 'border-red-500' : ''}`}
            />
          </div>
        </form>

        {/* Cart Totals and Payment Methods */}
        <div>
          <div className="mb-10">
            <Title text1="Cart" text2="Totals" />
          </div>
          <div className="space-y-2 mb-8">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>{currency}{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping Fee</span>
              <span>{currency}{deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total</span>
              <span>{currency}{(subtotal + deliveryFee).toFixed(2)}</span>
            </div>
          </div>
          <div className="mb-4">
            <Title text1="Payment" text2="Method" />
          </div>
          <div className="flex flex-col gap-4 mb-6">
            {paymentOptions.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setSelectedPayment(option.key)}
                className={`flex items-center gap-4 border rounded-lg px-6 py-4 w-full transition-colors duration-150 focus:outline-none ${selectedPayment === option.key ? 'border-green-500 bg-green-50' : 'bg-white hover:bg-gray-100'}`}
                style={{ minHeight: '64px' }}
              >
                {/* Green dot if selected */}
                <span className="flex items-center justify-center" style={{ width: 24 }}>
                  {selectedPayment === option.key ? (
                    <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                  ) : (
                    <span className="inline-block w-3 h-3 rounded-full border border-gray-300"></span>
                  )}
                </span>
                {option.logo && <img src={option.logo} alt={option.label} className="h-6" />}
                <span className="font-medium text-gray-700 text-base">{option.label}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={handlePlaceOrder}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
