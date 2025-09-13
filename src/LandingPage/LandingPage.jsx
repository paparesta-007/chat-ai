'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import supabase from "../library/supabaseclient.js";

const navigation = [
    { name: 'Models', href: '#' },
    { name: 'Discover', href: '#' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Enterprise', href: '#' },
]


const LandingPage = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [user, setUser] = useState(false)
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);

        });

    }, []);

    return (
        <div className="bg-gray-950 h-full ">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                    {/* Logo on the left */}
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5 flex items-center">
                            <span className="sr-only">Your Company</span>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" fill="#2ed992" width="40" height="40" viewBox="0 0 50 50"> <path d="M 25 4.5 C 15.204 4.5 5.9439688 11.985969 3.9179688 21.542969 C 3.9119687 21.571969 3.9200156 21.599906 3.9160156 21.628906 C 1.5620156 23.233906 -0.04296875 26.383 -0.04296875 30 C -0.04296875 35.238 3.3210312 39.5 7.4570312 39.5 C 7.7850313 39.5 8.0913438 39.339313 8.2773438 39.070312 C 8.4643437 38.800312 8.5065781 38.456438 8.3925781 38.148438 C 8.3775781 38.110438 6.9550781 34.244 6.9550781 29.5 C 6.9550781 24.506 8.3091719 22.022187 8.3261719 21.992188 C 8.5011719 21.683187 8.4983125 21.305047 8.3203125 20.998047 C 8.1433125 20.689047 7.8130313 20.5 7.4570312 20.5 C 7.0350313 20.5 6.62275 20.554625 6.21875 20.640625 C 8.58675 12.613625 16.57 6.5 25 6.5 C 32.992 6.5 40.688641 12.044172 43.431641 19.576172 C 43.133641 19.530172 42.831438 19.5 42.523438 19.5 C 42.169438 19.5 41.841109 19.689094 41.662109 19.996094 C 41.482109 20.302094 41.481297 20.683187 41.654297 20.992188 C 41.668297 21.016188 43.023437 23.5 43.023438 28.5 C 43.023438 32.44 42.045078 35.767641 41.705078 36.806641 C 40.558078 37.740641 38.815344 39.034297 36.777344 40.154297 C 36.016344 39.305297 34.839391 38.873437 33.650391 39.148438 L 31.867188 39.558594 C 31.024188 39.751594 30.308609 40.262094 29.849609 40.996094 C 29.391609 41.728094 29.245453 42.5965 29.439453 43.4375 C 29.783453 44.9335 31.11975 45.949219 32.59375 45.949219 C 32.83275 45.949219 33.074359 45.923187 33.318359 45.867188 L 35.103516 45.455078 C 35.945516 45.262078 36.661141 44.752531 37.119141 44.019531 C 37.503141 43.406531 37.653984 42.698234 37.583984 41.990234 C 39.728984 40.828234 41.570453 39.481469 42.814453 38.480469 C 46.814453 38.285469 50.023438 34.114 50.023438 29 C 50.023438 25.237 48.284437 21.989172 45.773438 20.451172 C 45.769438 20.376172 45.777859 20.301563 45.755859 20.226562 C 43.152859 11.113563 34.423 4.5 25 4.5 z M 12 19 C 11.447 19 11 19.447 11 20 L 11 32 C 11 32.553 11.447 33 12 33 L 28.044922 33 C 27.540922 34.057 26.743578 35.482375 26.142578 36.484375 C 25.941578 36.819375 25.954828 37.2405 26.173828 37.5625 C 26.360828 37.8395 26.673 38 27 38 C 27.055 38 27.109063 37.995328 27.164062 37.986328 C 33.351062 36.955328 38.412 32.95125 38.625 32.78125 C 38.862 32.59125 39 32.304 39 32 L 39 20 C 39 19.447 38.553 19 38 19 L 12 19 z M 13 21 L 37 21 L 37 31.501953 C 35.952 32.266953 32.821953 34.393672 29.001953 35.513672 C 29.643953 34.334672 30.328469 32.955266 30.480469 32.197266 C 30.539469 31.903266 30.462438 31.598187 30.273438 31.367188 C 30.082438 31.135188 29.8 31 29.5 31 L 13 31 L 13 21 z M 44.121094 21.822266 C 46.378094 22.758266 48.023437 25.622 48.023438 29 C 48.023438 32.456 46.299891 35.373281 43.962891 36.238281 C 44.420891 34.565281 45.023438 31.747 45.023438 28.5 C 45.023438 25.445 44.556094 23.226266 44.121094 21.822266 z M 5.859375 22.822266 C 5.423375 24.225266 4.9570313 26.445 4.9570312 29.5 C 4.9570312 32.747 5.5595781 35.565281 6.0175781 37.238281 C 3.6805781 36.373281 1.9570312 33.456 1.9570312 30 C 1.9570312 26.622 3.602375 23.758266 5.859375 22.822266 z M 18.5 23 C 17.098 23 16 24.317 16 26 C 16 27.683 17.098 29 18.5 29 C 19.902 29 21 27.683 21 26 C 21 24.317 19.902 23 18.5 23 z M 31.5 23 C 30.098 23 29 24.317 29 26 C 29 27.683 30.098 29 31.5 29 C 32.902 29 34 27.683 34 26 C 34 24.317 32.902 23 31.5 23 z M 18.5 25 C 18.677 25 19 25.38 19 26 C 19 26.62 18.677 27 18.5 27 C 18.323 27 18 26.62 18 26 C 18 25.38 18.323 25 18.5 25 z M 31.5 25 C 31.677 25 32 25.38 32 26 C 32 26.62 31.677 27 31.5 27 C 31.323 27 31 26.62 31 26 C 31 25.38 31.323 25 31.5 25 z M 34.376953 41.064453 C 34.605953 41.064453 34.83225 41.128906 35.03125 41.253906 C 35.31025 41.428906 35.504125 41.702391 35.578125 42.025391 C 35.652125 42.348391 35.598828 42.678984 35.423828 42.958984 C 35.248828 43.237984 34.976297 43.433812 34.654297 43.507812 L 34.652344 43.507812 L 32.869141 43.917969 C 32.208141 44.071969 31.540672 43.654234 31.388672 42.990234 C 31.314672 42.668234 31.369922 42.337641 31.544922 42.056641 C 31.719922 41.777641 31.992453 41.581813 32.314453 41.507812 L 34.097656 41.097656 C 34.190656 41.076656 34.284953 41.064453 34.376953 41.064453 z"></path> </svg>
                        </a>
                    </div>

                    {/* Right side: nav items + button */}
                    <div className="flex items-center gap-x-6">
                        <div className="hidden lg:flex lg:gap-x-12">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm/6 border-b-2 border-transparent transition duration-150 hover:border-white font-semibold text-white"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                        <div className="hidden lg:flex">
                            {user ? (
                                <a
                                    href="/chat"
                                    className="text-sm/6 font-semibold bg-white text-black px-4 py-2 rounded-lg"
                                >
                                    {user.email}
                                </a>
                            ) : (
                                <a
                                    href="/login"
                                    className="text-sm/6 font-semibold bg-white text-black px-4 py-2 rounded-lg"
                                >
                                    Sign up for free
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                </nav>

                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-50" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    alt=""
                                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                    className="h-8 w-auto"
                                />
                            </a>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-200"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-white/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                                <div className="py-6">

                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>

            <div className=" px-6 pt-14 lg:px-8">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >

                </div>
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
                            Added Claude and Groq API integration.{' '}
                            <a href="#" className="font-semibold text-[var(--color-Tertiary)]">
                                <span aria-hidden="true" className="absolute inset-0" />
                                Read more <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
                            AI Chat & Tools, all in one place
                        </h1>
                        <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
                            Ask anything, learn in real time, connect with APIs, and run code seamlessly
                        </p>

                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                href="#"
                                className="rounded-md bg-[var(--background-Tertiary)] border border-[var(--border-Tertiary)] px-3.5 py-2.5 ho text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Get started
                            </a>
                            <a href="#" className="text-sm/6 font-semibold text-white">
                                Learn more <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                >

                </div>
            </div>
            <div className="flex flex-col">
                <span>Ciao</span>
                <span>Ciao</span>
                <span>Ciao</span>
                <span>Ciao</span>
                <span>Ciao</span>
                <span>Ciao</span>
                <span>Ciao</span>
                <span>Ciao</span>
            </div>
        </div>
    )
}
export default LandingPage
