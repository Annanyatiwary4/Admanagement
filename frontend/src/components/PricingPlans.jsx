function PricingPlans() {
  return (
    <section className="bg-gray-100 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-2">Free</h3>
          <p className="text-lg font-bold mb-4">$0 / month</p>
          <ul className="text-gray-600 mb-4 space-y-2">
            <li>Access to basic tools</li>
            <li>5 downloads per day</li>
            <li>Standard quality</li>
          </ul>
          <button className="bg-blue-600 text-white py-2 px-6 rounded-full">Get Started</button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-2">Monthly</h3>
          <p className="text-lg font-bold mb-4">$9.99 / month</p>
          <ul className="text-gray-600 mb-4 space-y-2">
            <li>All tools access</li>
            <li>Unlimited downloads</li>
            <li>HD quality</li>
            <li>URL shortener with analytics</li>
          </ul>
          <button className="bg-blue-600 text-white py-2 px-6 rounded-full">Get Started</button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-2">Yearly</h3>
          <p className="text-lg font-bold mb-4">$99.99 / year</p>
          <ul className="text-gray-600 mb-4 space-y-2">
            <li>Everything in Monthly</li>
            <li>Priority support</li>
            <li>Early access to new tools</li>
            <li>No ads</li>
          </ul>
          <button className="bg-blue-600 text-white py-2 px-6 rounded-full">Get Started</button>
        </div>
      </div>
    </section>
  );
}

export default PricingPlans;
