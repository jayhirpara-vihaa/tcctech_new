/* This example requires Tailwind CSS v2.0+ */
// import { CheckIcon } from '@heroicons/react/24/solid'
import RingVector from "../../components/icons/ring_vector"

const steps = [
    { name: 'Create Your Ring', href: '#', status: 'complete' },
    { id: '1', name: 'Choose Setting', href: '#', status: 'upcoming' },
    { id: '2', name: 'Choose Diamond', href: '#', status: 'upcoming', img: "/public/assets/TCCimage/Ring_Vector.png" },
    { id: '3', name: 'Complete Ring', href: '#', status: 'upcoming' },
]

export default function Example() {
    return (
        <div className="flex-shrink-0 justify-between text-body text-xs md:text-sm leading-4 pe-4 md:me-6 ps-2 hidden lg:block ">
            <nav aria-label="Progress" className="my-7 mx-8 ">
                <ol role="list" className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0">
                    {steps.map((step, stepIdx) => (
                        <li key={step.name} className="relative md:flex md:flex-1">
                            {step.status === 'complete' ? (
                                <a href={step.href} className="group flex w-full items-center">
                                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
                                            {/* <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" /> */}
                                        </span>
                                        <span className="ml-4 text-sm font-medium text-gray-900">{step.name}</span>
                                        {step.name === "Create Your Ring" ? (<></>) : (<span>
                                            <img className="ml-4 text-sm font-medium text-gray-900" src={step.img} alt={""} />
                                        </span>)}

                                    </span>
                                </a>
                            ) : step.status === 'current' ? (
                                <a href={step.href} className="flex items-center px-6 py-4 text-sm font-medium" aria-current="step">
                                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center border-2 border-indigo-600">
                                        <span className="text-indigo-600">{step.id}</span>
                                    </span>
                                    <span className="ml-4 text-sm font-medium text-indigo-600">{step.name}</span>
                                    <span>
                                    </span>
                                </a>
                            ) : (
                                <a href={step.href} className="group flex items-center">
                                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center ">
                                            <span className="text-gray-900 ">{step.id}</span>
                                        </span>
                                        <span className="ml-4 text-sm font-medium text-gray-900">{step.name}</span>
                                        <span className="flex justify-end ml-12">
                                            <RingVector />
                                        </span>
                                    </span>
                                </a>
                            )}

                            {stepIdx !== steps.length - 1 ? (
                                <>
                                    {/* Arrow separator for lg screens and up */}
                                    <div className="absolute top-0 right-0 hidden h-full w-5 md:block" aria-hidden="true">
                                        <svg
                                            className="h-full w-full text-gray-300"
                                            viewBox="0 0 22 80"
                                            fill="none"
                                            preserveAspectRatio="none"
                                        >
                                            <path
                                                d="M0 -2L20 40L0 82"
                                                vectorEffect="non-scaling-stroke"
                                                stroke="currentcolor"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                </>
                            ) : null}
                        </li>
                    ))}
                </ol>
            </nav>
        </div>

    )
}
