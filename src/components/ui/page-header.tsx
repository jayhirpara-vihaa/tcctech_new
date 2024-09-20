
const steps = [
	{ id: 'Step 1', name: 'Cart', href: '#', status: 'complete' },
	{ id: 'Step 2', name: 'Checkout', href: '/checkout', status: 'current' },
	{ id: 'Step 3', name: 'Payment', href: '#', status: 'upcoming' },
	{ id: 'Step 4', name: 'Order Status', href: '#', status: 'upcoming' },
]

export default function Example() {

	return (
		<></>
		// <nav aria-label="Progress">
		// 	<ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
		// 		{steps.map((step) => (
		// 			<li key={step.name} className="md:flex-1">
		// 				{step.status === 'complete' ? (
		// 					<a
		// 						href={step.href}
		// 						className="group flex flex-col border-l-4 border-orange-300 py-2 pl-4 hover:border-orange-500 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
		// 					>
		// 						<span className="text-sm font-medium border-orange-300 group-hover:border-orange-500">{step.id}</span>
		// 						<span className="text-sm font-medium">{step.name}</span>
		// 					</a>
		// 				) : step.status === 'current' ? (
		// 					<a
		// 						href={step.href}
		// 						className="flex flex-col border-l-4 border-orange-300 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
		// 						aria-current="step"
		// 					>
		// 						<span className="text-sm font-medium text-orange-300">{step.id}</span>
		// 						<span className="text-sm font-medium">{step.name}</span>
		// 					</a>
		// 				) : (
		// 					<a
		// 						href={step.href}
		// 						className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
		// 					>
		// 						<span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">{step.id}</span>
		// 						<span className="text-sm font-medium">{step.name}</span>
		// 					</a>
		// 				)}
		// 			</li>
		// 		))}
		// 	</ol>
		// </nav>
	)
}
