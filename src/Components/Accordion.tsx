function Accordion() {
  return (
    <div className="ml-4">
      <p className="flex-col text-3xl font-bold text-white">FAQ</p>
      <div className="mt-4 mr-4">
        <div
          id="accordion-color"
          data-accordion="collapse"
          data-active-classNamees="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white"
        >
          <h2 id="accordion-color-heading-1">
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-t-xl border border-b-0 border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-blue-100 focus:ring-4 focus:ring-blue-200 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-blue-800"
              data-accordion-target="#accordion-color-body-1"
              aria-expanded="true"
              aria-controls="accordion-color-body-1"
            >
              <span>What is Ruby ?</span>
              <svg
                data-accordion-icon
                className="h-6 w-6 shrink-0 rotate-180"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </h2>
          <div
            id="accordion-color-body-1"
            className="hidden"
            aria-labelledby="accordion-color-heading-1"
          >
            <div className="border border-b-0 border-gray-200 p-5 font-light dark:border-gray-700 dark:bg-gray-900">
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Ruby is an open-source library of interactive components built
                on top of Tailwind CSS including buttons, dropdowns, modals,
                navbars, and more.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Check out this guide to learn how to{" "}
                <a
                  href="/docs/getting-started/introduction/"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  get started
                </a>{" "}
                and start developing websites even faster with components on top
                of Tailwind Css.
              </p>
            </div>
          </div>
          <h2 id="accordion-color-heading-2">
            <button
              type="button"
              className="flex w-full items-center justify-between border border-b-0 border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-blue-100 focus:ring-4 focus:ring-blue-200 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-blue-800"
              data-accordion-target="#accordion-color-body-2"
              aria-expanded="false"
              aria-controls="accordion-color-body-2"
            >
              <span>Is there a Figma file available?</span>
              <svg
                data-accordion-icon
                className="h-6 w-6 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </h2>
          <div
            id="accordion-color-body-2"
            className="hidden"
            aria-labelledby="accordion-color-heading-2"
          >
            <div className="border border-b-0 border-gray-200 p-5 font-light dark:border-gray-700">
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Ruby is first conceptualized and designed using the Figma
                software so everything you see in the library has a design
                equivalent in our Figma file.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Check out the{" "}
                <a
                  href="https://Ruby .com/figma/"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  Figma design system
                </a>{" "}
                based on the utility classNamees from Tailwind CSS and
                components from Ruby .
              </p>
            </div>
          </div>
          <h2 id="accordion-color-heading-3">
            <button
              type="button"
              className="flex w-full items-center justify-between border border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-blue-100 focus:ring-4 focus:ring-blue-200 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-blue-800"
              data-accordion-target="#accordion-color-body-3"
              aria-expanded="false"
              aria-controls="accordion-color-body-3"
            >
              <span>
                What are the differences between Ruby and Tailwind UI?
              </span>
              <svg
                data-accordion-icon
                className="h-6 w-6 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </h2>
          <div
            id="accordion-color-body-3"
            className="hidden"
            aria-labelledby="accordion-color-heading-3"
          >
            <div className="border border-t-0 border-gray-200 p-5 font-light dark:border-gray-700">
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                The main difference is that the core components from Ruby are
                open source under the MIT license, whereas Tailwind UI is a paid
                product. Another difference is that Ruby relies on smaller and
                standalone components, whereas Tailwind UI offers sections of
                pages.
              </p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                However, we actually recommend using both Ruby , Ruby Pro, and
                even Tailwind UI as there is no technical reason stopping you
                from using the best of two worlds.
              </p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Learn more about these technologies:
              </p>
              <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
                <li>
                  <a
                    href="https://Ruby .com/pro/"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Ruby Pro
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindui.com/"
                    rel="nofollow"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Tailwind UI
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
