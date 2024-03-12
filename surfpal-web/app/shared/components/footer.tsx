import React from "react"

const Footer = () => {
    return(
            <div className="w-full bg-gray-800 dark">
                <div className="py-4 md:py-8">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="grid md:grid-cols-12 gap-8 lg:gap-20 mb-8 md:mb-12">
                            <div className="md:col-span-4 lg:col-span-5">
                                <div className="mb-2">
                                    <a className="block" aria-label="Surfpal" href="/">
                                    </a>
                                </div>
                            </div>
                            <div className="md:col-span-8 lg:col-span-7 grid sm:grid-cols-3 gap-8">
                                <div className="text-sm">
                                    <div className="text-black font-medium mb-2 hover:text-gray-100 transition duration-150 ease-in-out">Company
                                    </div>
                                    <ul>
                                        <li className="mb-2 text-black hover:text-gray-100 transition duration-150 ease-in-out">
                                            {/* <a className="text-black hover:text-gray-100 transition duration-150 ease-in-out" href="/privacy">Privacy Policy
                                            </a> */}
                                            Privacy Policy
                                        </li>
                                        <li className="mb-2 text-black hover:text-gray-100 transition duration-150 ease-in-out">
                                            {/* <a className="text-black hover:text-gray-100 transition duration-150 ease-in-out" href="/terms">Terms
                                            </a> */}
                                            Terms
                                        </li>
                                    </ul>
                                </div>
                                <div className="text-sm">
                                    <div className="text-black font-medium mb-2 hover:text-gray-100 transition duration-150 ease-in-out">Developers
                                    </div>
                                    <ul>
                                        <li className="font-medium mb-2 text-black hover:text-gray-100 transition duration-150 ease-in-out">
                                            {/* <a className="text-black hover:text-gray-100 transition duration-150 ease-in-out" target="_blank" href="https://rapidapi.com/tldrthishq-tldrthishq-default/api/tldrthis/">API Access
                                            </a> */}
                                            API Access
                                        </li>
                                        </ul>
                                </div>
                            </div>
                        </div>
                        <div className="md:flex md:items-center md:justify-between">
                            {/* <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
                                <li>
                                    <a className="flex justify-center items-center text-purple-600 bg-gray-800 hover:text-gray-100 hover:bg-purple-600 rounded-full transition duration-150 ease-in-out" aria-label="Twitter" target="_black" href="https://twitter.com/tldrthis">
                                        <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                            <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z">
                                            </path>
                                        </svg>
                                    </a>
                                </li>
                                <li className="ml-4">
                                    <a className="flex justify-center items-center text-purple-600 bg-gray-800 hover:text-gray-100 hover:bg-purple-600 rounded-full transition duration-150 ease-in-out" aria-label="Facebook" target="_black" href="https://www.facebook.com/people/TLDR-This/100064919827945/">
                                        <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z">
                                            </path>
                                        </svg>
                                    </a>
                                </li>
                                <li className="ml-4">
                                    <a className="flex justify-center items-center text-purple-600 bg-gray-800 hover:text-gray-100 hover:bg-purple-600 rounded-full transition duration-150 ease-in-out" aria-label="Linkedin" target="_black" href="https://www.linkedin.com/company/tldrthis/">
                                        <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M23.3 8H8.7c-.4 0-.7.3-.7.7v14.7c0 .3.3.6.7.6h14.7c.4 0 .7-.3.7-.7V8.7c-.1-.4-.4-.7-.8-.7zM12.7 21.6h-2.3V14h2.4v7.6h-.1zM11.6 13c-.8 0-1.4-.7-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4-.1.7-.7 1.4-1.4 1.4zm10 8.6h-2.4v-3.7c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.8h-2.4V14h2.3v1c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v4.2h.1z">
                                            </path>
                                        </svg>
                                    </a>
                                </li>
                            </ul> */}
                            <div className="text-black text-sm mr-5 font-semibold">© 2024 SurfPal, all rights reserved
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
    )
}

export default Footer