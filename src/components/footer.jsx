import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-blue-450" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
                <div className="mt-8 border-t border-blue-550 pt-5 md:flex md:items-center md:justify-between">
                    <p className="mt-5 text-base text-gray-400 md:mt-0 md:order-1">
                        View <span className="text-blue-550">here</span> for privacy policy and terms of use.
                        All information used in this tool is provided by the 
                        <span className="text-blue-550"><a target="_blank" rel="noreferrer" href="https://www.cdc.gov/coronavirus/2019-ncov/index.html">
                        {' '}CDC (Centers for Disease Control and Prevention)</a></span>. All interactive graphs used on this tool are provided by the
                        <span className="text-blue-550"><a target="_blank" rel="noreferrer" href="https://www.domo.com/covid19/embed-visualizations/ ">
                        {' '}Domo Coronavirus Tracker</a></span> and <span className="text-blue-550"><a target="_blank" rel="noreferrer" 
                        href="https://ourworldindata.org/coronavirus?country=">{' '}Our World in Data</a></span>.
                    </p>
                </div>
            </div>
        </footer>
    )
}