import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="flex items-center h-screen p-16 bg-gray-50 dark:bg-gray-700">
      <div className="container flex flex-col items-center mx-auto">
        <div className="flex flex-col gap-6 max-w-md text-center">
          <h2 className="font-extrabold text-9xl text-gray-600 dark:text-gray-100">
            {/* <span className="sr-only">Error</span>404 */}
            <img src="https://i.ibb.co/xf8dW74/sadface.gif" alt="" />
          </h2>
          <p className="text-2xl md:text-3xl dark:text-gray-300">Sorry, we couldn&apos;t find this page.</p>
          <Link to={'/'} className="px-8 py-4 text-xl font-semibold rounded bg-purple-600 text-gray-50 hover:text-gray-200">Back to home</Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;