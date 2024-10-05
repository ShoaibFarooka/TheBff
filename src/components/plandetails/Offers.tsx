// import { Offer } from "@/types/offer"
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
// import DiscountIcon from "./DiscountIcon"

// export type OffersProps = {
//     offers: Offer[]
// }

// const Offers = ({ offers }: OffersProps) => {
//     // const offers = await offersPromsie

//     if (!offers?.length) return null

//     return (
//         <div>
//             <h1 className='text-white text-[2rem] font-semibold'>Offers</h1>
//             {/* Offers will be automatically be applied on checkout */}
//             <p className='text-neutral-300 text-sm mb-5'>
//                 Offers will be automatically applied on checkout
//             </p>

//             <Accordion type="single" collapsible className='rounded-xl'>
//                 {offers.map(offer => (
//                     <AccordionItem
//                         key={offer.id} // react-map key
//                         value={offer.id}
//                         className="border-0 px-5 bg-gradient-to-r from-[#4A2F70] to-[#344363] rounded-xl mt-5">
//                         <div className='py-2 mb-5'>
//                             <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-2">
//                                 <div className="flex gap-4 items-center max-w-max">
//                                     <DiscountIcon />
//                                     <p className='text-neutral-200 font-semibold'>
//                                         <span className="text-[#F2BD4D]">{offer.offerName} </span>
//                                         | {offer.displayText}</p>
//                                 </div>

//                                 <div className="">
//                                     <AccordionTrigger className="text-y hover:no-underline py-0 max-w-max pl-12 md:pl-0">
//                                         <button className='p-0 rounded-xl !min-w-10'>T & C</button>
//                                     </AccordionTrigger>
//                                 </div>
//                             </div>

//                             <AccordionContent className="py-2 whitespace-pre-line">
//                                 <p className='text-neutral-200'>{offer.terms}</p>
//                             </AccordionContent>
//                         </div>
//                     </AccordionItem>
//                 ))}
//             </Accordion>
//         </div>
//     )
// }

// export default Offers